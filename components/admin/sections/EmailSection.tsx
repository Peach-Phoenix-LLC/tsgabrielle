"use client";

import { useState } from "react";
import { Mail, Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function EmailSection() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send email");

      setMessage({ type: "success", text: "Email sent successfully!" });
      setTo("");
      setSubject("");
      setBody("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="border-b border-black/5 pb-4">
        <h3 className="text-xl font-light text-[#111]">Email Center</h3>
        <p className="text-[10px] uppercase tracking-widest text-black/40 mt-1">Manual Customer Outreach & Manual Campaigns</p>
      </header>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-xs font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSend} className="space-y-6 bg-[#fdfcf5]/50 p-8 rounded-2xl border border-black/5">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Recipient Email</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="customer@example.com"
            required
            className="w-full bg-white border-b border-black/10 px-4 py-3 text-xs focus:border-[#a932bd] transition-colors outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Welcome to tsgabrielle®"
            required
            className="w-full bg-white border-b border-black/10 px-4 py-3 text-xs focus:border-[#a932bd] transition-colors outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Email Body (HTML Supported)</label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message here..."
            required
            className="w-full bg-white border border-black/10 px-4 py-4 text-xs focus:border-[#a932bd] transition-colors outline-none resize-none rounded-lg"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-12 py-4 bg-[#a932bd] text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
            {loading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 border border-black/5 rounded-xl bg-white space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Klaviyo Lists</h4>
          <p className="text-[8px] text-black/40 uppercase tracking-widest">Connected to: {process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID || "Not Configured"}</p>
          <button className="text-[10px] font-medium underline">Manage Lists in Klaviyo</button>
        </div>
        <div className="p-6 border border-black/5 rounded-xl bg-white space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Email Provider</h4>
          <p className="text-[8px] text-black/40 uppercase tracking-widest">Resend Transactional API</p>
          <p className="text-[8px] text-red-500 uppercase tracking-widest">Setup Required: RESEND_API_KEY</p>
        </div>
      </div>
    </div>
  );
}
