"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BrandName } from "@/components/BrandName";
import { BrandLogo } from "./BrandLogo";
import { useSettings } from "@/components/providers/SettingsProvider";
import { MENU_GROUPS } from "@/lib/menu";


export function Footer() {
  const settings = useSettings();
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

  const socialLinks = [
    { name: "Facebook", url: settings.facebook_url },
    { name: "Instagram", url: settings.instagram_url },
    { name: "TikTok", url: settings.tiktok_url },
    { name: "YouTube", url: settings.youtube_url },
    { name: "Twitter", url: settings.twitter_url },
    { name: "Pinterest", url: settings.pinterest_url },
    { name: "LinkedIn", url: settings.linkedin_url },
    { name: "Snapchat", url: settings.snapchat_url },
  ].filter(link => link.url);

  const footerMenuGroups = MENU_GROUPS.filter((group) => "children" in group);
  const columns = [0, 1, 2, 3].map((columnIndex) =>
    footerMenuGroups.filter((_, index) => index % 4 === columnIndex)
  );

  return (
    <footer 
      className="relative w-full flex flex-col justify-end overflow-hidden pt-0 pb-16 text-[#ffffff]"
      style={{ backgroundColor: "#a932bd" }}
    >
      {/* Gradient Transition from White to Purple */}
      <div className="w-full h-32 bg-gradient-to-b from-white to-transparent absolute top-0 left-0 z-10" />

      <div className="container-luxe relative z-10 pt-16">

        {/* Newsletter Signup */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="text-2xl font-light mb-4 text-white">Join the Universe</h3>
          <p className="text-sm opacity-80 mb-6 text-white">
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
              className="btn-holographic-outline !px-8 !py-3 !rounded-full !text-sm font-bold uppercase tracking-wider"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-xs mt-4 text-white">{message}</p>}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-8 mb-16">
            {socialLinks.map(link => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] font-medium text-white hover:opacity-60 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-x-12 text-left">
          {columns.map((column, columnIndex) => (
            <div key={`footer-col-${columnIndex}`} className="space-y-8">
              {column.map((group) => (
                <div key={group.label} className="space-y-3">
                <Link href={group.href} className="block text-[11px] tracking-[0.22em] font-semibold text-white hover:opacity-80 transition-opacity">
                  {group.label}
                </Link>
                  {"children" in group && (
                    <ul className="space-y-2">
                      {group.children.map((item) => {
                        const isExternal = item.href.startsWith("http");
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className="text-[12px] leading-relaxed text-white opacity-90 hover:opacity-60 transition-opacity"
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
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
                stroke="#a932bd" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
          </Link>
        </div>
        {/* Brand & Payments Section */}
        <div className="mt-20 flex flex-col items-center gap-10 border-t border-white/10 pt-16">
          <BrandLogo color="light" className="h-10 w-auto opacity-70 hover:opacity-100 transition-all duration-700" />
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 brightness-0 invert opacity-100 transition-all duration-1000">
            <div className="flex items-center gap-10">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" width={28} height={28} className="h-7 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" width={20} height={20} className="h-5 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={20} height={20} className="h-5 w-auto" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Venmo_logo.svg" alt="Venmo" width={28} height={28} className="h-7 w-auto" />
            </div>
            
            <div className="flex items-center gap-8 border-l border-white/20 pl-12 h-6 hidden md:flex">
               <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={16} height={16} className="h-4 w-auto" />
               <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={20} height={20} className="h-5 w-auto" />
               <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/American_Express_logo_%282018%29.svg" alt="Amex" width={20} height={20} className="h-5 w-auto" />
            </div>
          </div>
        </div>
        
        {/* Minimal Legal Credit */}
        <div className="mt-12 text-[10px] font-light flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 text-white/50">
          <span>
            2023-2026© <BrandName includeSymbol="" /> USA the <BrandName includeSymbol="" /> logo and names and trademarks associated with <BrandName includeSymbol="" /> products are registered trademarks of Peach Phoenix, LLC. and/or its affiliates • All other trademarks are the property of their respective owners.
          </span>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-4">
              <span className="text-[8px] uppercase tracking-widest">© 2026 Peach Phoenix, LLC.</span>
              <Link 
                href="/admin" 
                className="text-[8px] text-white/10 hover:text-white/40 transition-colors uppercase tracking-widest"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
