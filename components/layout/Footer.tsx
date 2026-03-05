"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandName } from "@/components/BrandName";


export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe.");
      }

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setMessage("Subscription failed. Please try again.");
    }

    setLoading(false);
  }

  return (
    <footer 
      className="relative w-full flex flex-col justify-end overflow-hidden bg-cover bg-top pt-48 pb-16 text-[#ffffff]"
      style={{ backgroundColor: "#bc2ab7", backgroundImage: "url('/images/tsgabrielle-footer.png')" }}
    >
      <div className="container-luxe relative z-10">
        {/* Centered Logo positioned near the wavy top edge */}
        <div className="flex justify-center mb-16 -mt-16 md:-mt-20">
           <img 
            src="/images/logo-icon.png" 
            alt="ts logo" 
            className="h-14 md:h-20 w-auto opacity-100 transition-opacity hover:opacity-80" 
           />
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="text-2xl font-light mb-4">Join the Universe</h3>
          <p className="text-sm opacity-80 mb-6">
            Subscribe for exclusive updates, new collections, and special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-[#bc2ab7] rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-xs mt-4">{message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-x-20 text-center md:text-left">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <Link href="/collections" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              All Collections
            </Link>
            <Link href="/collections/transcendent-holidays" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              Transcendent Holidays
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <Link href="/about" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              Discover <BrandName />
            </Link>
            <Link href="/about-gabrielle" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              About Gabrielle
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <Link href="/account" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              Welcome
            </Link>
            <Link href="/profile" className="text-xl md:text-2xl font-light hover:opacity-75 transition-opacity">
              My Profile
            </Link>
          </div>
        </div>

        {/* Shopping Bag Icon in Bottom Right */}
        <div className="mt-16 flex justify-end">
          <Link href="/checkout" className="group">
            <div className="bg-white rounded-full p-4 shadow-2xl transition-all group-hover:scale-110 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#bc2ab7" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
          </Link>
        </div>
        
        {/* Minimal Legal Credit */}
        <div className="mt-12 text-[10px] font-light flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8">
          <span className="opacity-50">
            2023-2026© <BrandName includeSymbol="" /> USA the <BrandName includeSymbol="" /> logo and names and trademarks associated with <BrandName includeSymbol="" /> products are registered trademarks of Peach Phoenix, LLC. and/or its affiliates • All other trademarks are the property of their respective owners.
          </span>
          <div className="flex gap-8 items-center">
            <div className="group relative">
              <span className="opacity-50 text-[8px] uppercase tracking-widest">© 2026 Peach Phoenix, LLC.</span>
              <Link 
                href="/admin" 
                className="absolute -bottom-4 left-0 text-[6px] text-transparent group-hover:text-white/20 transition-colors uppercase tracking-widest"
              >
                Adm
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

