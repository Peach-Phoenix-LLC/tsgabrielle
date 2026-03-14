"use client";

import React, { useState } from "react";

interface NewsletterSectionProps {
  heading: string;
  description?: string;
  buttonText?: string;
  backgroundColor?: string;
}

export default function NewsletterSection({
  heading,
  description,
  buttonText = "Subscribe",
  backgroundColor = "#f8f2e7",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 px-6" style={{ backgroundColor }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)]">
          {heading}
        </h2>
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:border-[#a932bd] focus:outline-none text-sm"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-[#a932bd] hover:bg-[#921fa6] text-white rounded-full text-sm uppercase tracking-widest font-bold transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : buttonText}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 text-sm mt-3">You&apos;re subscribed!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
