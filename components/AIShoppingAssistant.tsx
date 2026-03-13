"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour! ✨ I'm your tsgabrielle® style advisor. How can I help you find something fabulous today?",
};

export function AIShoppingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput("");
    setError(null);

    const userMsg: Message = { role: "user", content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);

    // Placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setStreaming(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `Error ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const chunk = JSON.parse(data);
              if (chunk.content) {
                accumulated += chunk.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: accumulated,
                  };
                  return updated;
                });
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
      setMessages((prev) => prev.slice(0, -1)); // remove empty assistant msg
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, messages, streaming]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setError(null);
    setStreaming(false);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        id="ai-assistant-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI shopping assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #a932bd 0%, #7b1fa2 100%)",
          boxShadow: "0 4px 24px rgba(169,50,189,0.45)",
        }}
      >
        {open ? (
          // X icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Sparkle / chat icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 8v4M10 10h4" stroke="white" strokeWidth="1.8" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="ai-assistant-panel"
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "480px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.35)",
            background: "linear-gradient(160deg, #1a0a2e 0%, #0d001a 100%)",
            border: "1px solid rgba(169,50,189,0.35)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(90deg, #a932bd 0%, #7b1fa2 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-white text-lg">✨</span>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Style Advisor
                </p>
                <p className="text-white/70 text-xs leading-tight">
                  <em>tsgabrielle®</em>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                title="New conversation"
                className="text-white/70 hover:text-white transition-colors text-xs px-2 py-1 rounded-lg hover:bg-white/10"
              >
                New chat
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-6 h-6 rounded-full shrink-0 mr-2 mt-1 flex items-center justify-center text-xs"
                    style={{ background: "linear-gradient(135deg, #a932bd, #7b1fa2)" }}
                  >
                    ✨
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-tr-sm"
                      : "text-white/90 rounded-tl-sm"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "rgba(169,50,189,0.7)" }
                      : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(169,50,189,0.2)" }
                  }
                >
                  {msg.content || (
                    <span className="flex gap-1 items-center">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <div className="text-red-400 text-xs text-center px-4 py-2 bg-red-900/20 rounded-lg">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="shrink-0 flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid rgba(169,50,189,0.2)" }}
          >
            <input
              ref={inputRef}
              id="ai-assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about styles, sizing…"
              disabled={streaming}
              className="flex-1 bg-white/8 text-white placeholder-white/30 text-sm rounded-xl px-3 py-2 outline-none transition-all focus:ring-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(169,50,189,0.25)",
              }}
              maxLength={500}
            />
            <button
              id="ai-assistant-send"
              onClick={sendMessage}
              disabled={!input.trim() || streaming}
              aria-label="Send message"
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-40 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #a932bd, #7b1fa2)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
