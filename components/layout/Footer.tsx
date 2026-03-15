"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
import { BrandName } from "@/components/BrandName";
import { BrandLogo } from "./BrandLogo";
import { useSettings } from "@/components/providers/SettingsProvider";
import { trackNewsletterSubscribed } from "@/lib/posthog-events";
import { MENU_GROUPS } from "@/lib/menu";


export function Footer() {
  const settings = useSettings();
  const posthog = usePostHog();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      posthog?.capture("newsletter_signup_attempted", {
        source: "footer",
      });

      const response = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe.");
      }

      // Extract domain from email for privacy
      const emailDomain = email.split("@")[1];
      trackNewsletterSubscribed(email, "footer");
      posthog?.capture("newsletter_signup_confirmed", {
        email_domain: emailDomain,
        source: "footer",
      });

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      posthog?.capture("newsletter_signup_failed", {
        error_type: error instanceof Error ? error.message : "unknown",
        source: "footer",
      });
      setMessage("Subscription failed. Please try again.");
    }

    setLoading(false);
  }

  const socialLinks = [
    {
      name: "Facebook",
      url: settings.facebook_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: settings.instagram_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: settings.tiktok_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: settings.youtube_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Twitter / X",
      url: settings.twitter_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      url: settings.pinterest_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: settings.linkedin_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: "Snapchat",
      url: settings.snapchat_url,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M12.017 0C8.396 0 5.977 1.67 4.67 4.14c-.518.977-.557 2.63-.557 3.51v1.117c-.31.136-.638.187-.972.154-.334-.033-.638-.154-.894-.336-.154-.11-.37-.11-.49.054-.12.164-.11.386.033.517.574.532 1.302.838 2.073.88-.27.516-.672.967-1.172 1.279-.114.074-.147.226-.074.34.074.114.226.147.34.074.756-.473 1.34-1.19 1.666-2.023.296.033.59.05.886.05.09 0 .18-.003.27-.007-.004.04-.007.08-.007.12 0 2.12 1.69 3.847 3.847 3.847.386 0 .76-.057 1.113-.163.517.74 1.3 1.27 2.207 1.453.44.093.886.14 1.335.14.295 0 .59-.02.88-.063.064.28.125.564.184.85.115.56.29 1.1.523 1.613.084.185.046.4-.096.546-.143.144-.348.18-.533.092-1.38-.654-2.883-.77-4.28-.334-.6.185-1.18.45-1.73.772-.115.066-.163.207-.113.33.05.122.18.18.306.147.387-.107.77-.205 1.153-.28.753-.147 1.52-.206 2.29-.175 1.017.043 2.02.258 2.956.635.296.12.632.065.872-.143.24-.208.322-.538.21-.83-.23-.605-.372-1.24-.425-1.884 1.497-.393 2.636-1.64 2.879-3.188.074 0 .147.003.22.003.296 0 .594-.017.886-.05.326.833.91 1.55 1.666 2.023.114.073.266.04.34-.074.073-.114.04-.266-.074-.34-.5-.312-.9-.763-1.173-1.279.772-.042 1.5-.348 2.074-.88.143-.13.153-.353.033-.517-.12-.164-.336-.164-.49-.054-.256.182-.56.303-.894.336-.334.033-.662-.018-.972-.154V7.65c0-.88-.039-2.533-.557-3.51C18.04 1.67 15.617 0 12 0h.017z"/>
        </svg>
      ),
    },
  ].filter(link => link.url);

  const footerMenuGroups = MENU_GROUPS.filter((group) => "children" in group);
  const columns = [0, 1, 2, 3].map((columnIndex) =>
    footerMenuGroups.filter((_, index) => index % 4 === columnIndex)
  );

  return (
    <>
      {/* Newsletter Signup */}
      <div className="w-full bg-white py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <h3 className="text-2xl font-light mb-4 text-[#111111]">Join the Universe</h3>
          <p className="text-sm opacity-80 mb-6 text-[#555555]">
            Subscribe for exclusive updates, new collections, and special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow bg-black/5 border border-black/10 rounded-full px-6 py-3 text-[#111111] placeholder-black/50 focus:outline-none focus:border-black/30 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-holographic-outline !px-8 !py-3 !rounded-full !text-sm font-bold uppercase tracking-wider"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-xs mt-4 text-[#111111]">{message}</p>}
        </div>
      </div>

      <footer
        className="relative w-full flex flex-col justify-end overflow-hidden pt-0 pb-16 text-[#ffffff]"
        style={{ backgroundColor: "#a932bd" }}
      >
        {/* Gradient Transition from White to Purple */}
        <div className="w-full h-32 bg-gradient-to-b from-white to-transparent absolute top-0 left-0 z-10" />

        {/* tsgabrielle icon — top of footer */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
          <Image
            src="/images/tsgabrielle-icon.png"
            alt="tsgabrielle"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-contain"
          />
        </div>

        <div className="container-luxe relative z-10 pt-16">

          {/* Social Links — white icons */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center flex-wrap gap-6 mb-16">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-white hover:opacity-60 transition-opacity"
              >
                {link.icon}
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
          <BrandLogo color="light" className="h-[50px] w-auto opacity-100 transition-all duration-700" />
          
          <div className="flex justify-center items-center w-full overflow-hidden">
            <Image
              src="/images/tsgabrielle-payment-methods.png"
              alt="Accepted Payment Methods"
              width={4000}
              height={400}
              className="w-full max-w-[1600px] h-auto object-contain scale-[5]"
              style={{ transformOrigin: "center center" }}
            />
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
                href="/privacy/do-not-sell" 
                className="text-[8px] text-white/40 hover:text-white transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Do Not Sell or Share My Personal Information
              </Link>
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
    </>
  );
}
