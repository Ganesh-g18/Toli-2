import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ---- Validation limits ----
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;
const ALLOWED_ROLES = new Set(["user", "assistant"]);

// ---- Simple in-memory rate limiter (per IP) ----
// Note: edge function instances are ephemeral; this provides best-effort throttling.
const RATE_LIMIT_MAX = 10; // requests
const RATE_LIMIT_WINDOW_MS = 60_000; // per minute
const rateBuckets = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (rateBuckets.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, arr);
    return true;
  }
  arr.push(now);
  rateBuckets.set(ip, arr);
  return false;
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // ---- Rate limit ----
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return jsonError("Too many requests. Please slow down and try again shortly.", 429);
    }

    // ---- Parse + validate body ----
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError("Invalid request body.", 400);
    }

    const raw = (body as { messages?: unknown })?.messages;
    if (!Array.isArray(raw)) {
      return jsonError("Invalid request: 'messages' must be an array.", 400);
    }
    if (raw.length === 0) {
      return jsonError("Invalid request: 'messages' cannot be empty.", 400);
    }
    if (raw.length > MAX_MESSAGES) {
      return jsonError(`Too many messages. Maximum is ${MAX_MESSAGES}.`, 400);
    }

    const messages: { role: string; content: string }[] = [];
    for (const m of raw) {
      if (!m || typeof m !== "object") {
        return jsonError("Invalid message format.", 400);
      }
      const role = (m as { role?: unknown }).role;
      const content = (m as { content?: unknown }).content;
      if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
        // Silently strip system/other roles to prevent injection
        continue;
      }
      if (typeof content !== "string" || content.length === 0) {
        return jsonError("Invalid message content.", 400);
      }
      if (content.length > MAX_CONTENT_LENGTH) {
        return jsonError(`Message too long. Maximum is ${MAX_CONTENT_LENGTH} characters.`, 400);
      }
      messages.push({ role, content });
    }

    if (messages.length === 0) {
      return jsonError("No valid messages provided.", 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return jsonError("Service temporarily unavailable. Please try again later.", 500);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful customer support assistant for Toli Motors, a multi-brand car workshop in Anantapur, Andhra Pradesh. You help customers with questions about car services, pricing, appointment booking, and general automobile advice. Be friendly, professional, and concise. If asked about specific pricing, suggest they contact the workshop directly at +91-8074946335.",
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return jsonError("Rate limit exceeded. Please try again shortly.", 429);
      }
      if (response.status === 402) {
        return jsonError("AI credits exhausted. Please try again later.", 402);
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return jsonError("AI service temporarily unavailable.", 500);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return jsonError("Internal server error. Please try again later.", 500);
  }
});
