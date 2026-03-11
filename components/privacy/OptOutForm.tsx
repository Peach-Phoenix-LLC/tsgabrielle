"use client";

import React, { useState } from "react";

export function OptOutForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 bg-[#fdfcf5]/50 border border-[#a932bd]/10 rounded-xl">
        <p className="text-[#a932bd] font-bold uppercase tracking-widest mb-2">Request Received</p>
        <p className="text-black/60 text-xs">Thank you. Your request has been recorded and will be processed within 15 days.</p>
      </div>
    );
  }

  return (
    <div className="p-8 border border-black/5 rounded-2xl bg-white shadow-sm">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-black/80">Method B: Manual Opt-Out Request</h3>
      <p className="text-[11px] text-black/60 mb-8 leading-relaxed">
        If you would like to ensure your personal identifiers are excluded from any data-sharing practices, please complete the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="name" className="text-[9px] uppercase tracking-widest text-black/40">Full Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="e.g. Jean Gabrielle"
              className="w-full bg-transparent border-b border-black/10 py-2 text-xs focus:border-[#a932bd] outline-none transition-colors placeholder:text-black/10"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-black/40">Email Address</label>
            <input
              type="email"
              id="email"
              required
              placeholder="e.g. contact@tsgabrielle.us"
              className="w-full bg-transparent border-b border-black/10 py-2 text-xs focus:border-[#a932bd] outline-none transition-colors placeholder:text-black/10"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 py-2 border-y border-black/5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer appearance-none w-4 h-4 border border-black/20 rounded checked:bg-[#a932bd] checked:border-[#a932bd] transition-all" />
              <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">Do Not Sell My Info</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input type="checkbox" className="peer appearance-none w-4 h-4 border border-black/20 rounded checked:bg-[#a932bd] checked:border-[#a932bd] transition-all" />
              <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">Do Not Share for Targeted Ads</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold py-4 rounded-full hover:bg-[#a932bd] transition-all duration-500 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
