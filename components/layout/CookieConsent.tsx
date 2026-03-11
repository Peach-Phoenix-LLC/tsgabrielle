"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for luxury feel
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    // In a real app, you would enable tracking here
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
    // Enable "Restricted Data Processing"
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("set", "restricted_data_processing", true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-white/95">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-phoenix">Privacy Preferences</h3>
            <p className="text-[11px] leading-relaxed text-black/70">
              We use cookies to enhance your experience and analyze our traffic. You can choose to accept all cookies or reject non-essential ones.
              For more details, visit our{" "}
              <Link href="/privacy/do-not-sell" className="underline hover:text-phoenix transition-colors">
                Do Not Sell or Share My Personal Information
              </Link>{" "}
              page.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-black text-white text-[10px] uppercase tracking-widest font-bold py-3 rounded-full hover:bg-black/90 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleReject}
              className="flex-1 bg-white border border-black/10 text-black text-[10px] uppercase tracking-widest font-bold py-3 rounded-full hover:bg-black/5 transition-colors"
            >
              Reject All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
