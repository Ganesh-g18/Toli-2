import { knowledgeBase, type KBEntry } from "./chat-knowledge";

/**
 * Simple client-side chat engine that matches user questions
 * against the local knowledge base. No API costs, works offline.
 */

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function computeScore(userTokens: string[], keywords: string[]): number {
  if (keywords.length === 0) return 0;

  let score = 0;
  for (const token of userTokens) {
    for (const kw of keywords) {
      if (token === kw) {
        score += 3; // exact match
      } else if (token.includes(kw) || kw.includes(token)) {
        score += 1.5; // partial match
      }
    }
  }

  // Bonus for higher keyword density
  const matchedKeywords = new Set(
    keywords.filter((kw) =>
      userTokens.some(
        (t) => t === kw || t.includes(kw) || kw.includes(t)
      )
    )
  );
  if (matchedKeywords.size > 1) {
    score *= 1 + matchedKeywords.size * 0.2;
  }

  return score;
}

/**
 * Find the best matching response from the knowledge base.
 * Returns the response string for the highest-scoring entry.
 */
export function findResponse(userMessage: string): string {
  const userTokens = tokenize(userMessage);

  if (userTokens.length === 0) {
    return knowledgeBase[knowledgeBase.length - 1].response; // fallback
  }

  let bestScore = -1;
  let bestEntry: KBEntry = knowledgeBase[knowledgeBase.length - 1]; // fallback

  for (const entry of knowledgeBase) {
    if (entry.keywords.length === 0) continue; // skip fallback entry
    const score = computeScore(userTokens, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // If no meaningful match, use fallback
  if (bestScore < 1) {
    return knowledgeBase[knowledgeBase.length - 1].response;
  }

  return bestEntry.response;
}
