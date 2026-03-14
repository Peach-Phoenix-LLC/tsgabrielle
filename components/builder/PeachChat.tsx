"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageSquare, Loader2, Sparkles, User, Bot } from "lucide-react";

export function PeachChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Bonjour! I am Peach, your tsgabrielle® DevOps bot. How can I help you build today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      // Connect to the OpenClaw Gateway on your local PC
      const res = await fetch("/api/admin/peach-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.reply || "I'm sorry, I couldn't reach the Oracle brain." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Connection error. Make sure OpenClaw Gateway is running on your PC." }]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[9999] bg-[#a932bd] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 group"
      >
        <Sparkles className="group-hover:animate-pulse" size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-[10px] uppercase font-bold tracking-widest pl-0 group-hover:pl-2">
          Chat with Peach
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-[9999] w-[380px] h-[500px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(169,50,189,0.3)] border border-[#a932bd]/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-[#a932bd] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Peach AI</h3>
            <p className="text-[10px] opacity-70 uppercase tracking-widest font-medium">DevOps Guardian</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfaff]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === "user" 
                ? "bg-[#a932bd] text-white rounded-tr-none shadow-lg" 
                : "bg-white text-[#111] border border-[#a932bd]/10 rounded-tl-none shadow-sm"
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {m.role === "user" ? <User size={10} /> : <Bot size={10} />}
                <span className="text-[9px] uppercase font-bold tracking-widest">{m.role === "user" ? "You" : "Peach"}</span>
              </div>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#a932bd]/10 shadow-sm">
              <Loader2 className="animate-spin text-[#a932bd]" size={16} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-[#a932bd]/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Peach for a new feature..."
            className="w-full bg-[#f9f9f9] border-none rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#a932bd]/20 transition-all"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-2 bg-[#a932bd] text-white rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
