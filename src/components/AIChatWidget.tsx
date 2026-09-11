import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { findResponse } from "@/lib/chat-engine";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How do I book an appointment?",
  "What are your working hours?",
  "Where are you located?",
];

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const btn = btnRef.current;
    if (!btn) return;
    animate(btn, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 200,
      ease: "outQuad",
      delay: 100,
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const response = findResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  };

  return createPortal(
    <>
      {/* Toggle button */}
      {!open && (
        <button
          ref={btnRef}
          onClick={() => setOpen(true)}
          className="fixed bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ bottom: "78px", right: "12px", zIndex: 2147483647 }}
          aria-label="Open AI Chat"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed w-[calc(100vw-2rem)] sm:w-96 h-[min(28rem,calc(100dvh-6rem))] luxury-glass border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
          style={{ bottom: "78px", right: "12px", zIndex: 2147483647 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 border-b border-border bg-primary text-primary-foreground rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-display text-base sm:text-lg tracking-wider">TOLI AI ASSISTANT</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Close AI chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-3 sm:px-4 py-3">
            {messages.length === 0 && (
              <div className="text-center space-y-3 mt-4">
                <p className="text-muted-foreground text-sm">Hi! 👋 How can I help you today?</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </ScrollArea>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 p-2 sm:p-3 border-t border-border"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              aria-label="Message Toli AI Assistant"
              className="flex-1 text-sm"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={isTyping || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>,
    document.body
  );
};

export default AIChatWidget;
