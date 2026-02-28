'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Instagram, Twitter, Youtube, Facebook, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const socialNav = [
    { label: "Instagram", url: "https://instagram.com/tsgabrielle" },
    { label: "TikTok", url: "https://tiktok.com/@tsgabrielle" },
    { label: "YouTube", url: "https://youtube.com/tsgabrielle" },
    { label: "Facebook", url: "https://facebook.com/tsgabrielle" },
    { label: "X (Twitter)", url: "https://x.com/tsgabrielle" },
    { label: "Pinterest", url: "https://pinterest.com/tsgabrielle" },
    { label: "LinkedIn", url: "https://linkedin.com/company/tsgabrielle" },
    { label: "Snapchat", url: "https://snapchat.com/add/tsgabrielle" }
];

const userAccountNav = [
    { label: "My Account", url: "/my-account" },
    { label: "My Orders", url: "/my-orders" },
    { label: "My Wishlist", url: "/my-wishlist" },
    { label: "My Settings", url: "/my-settings" }
];

export default function Footer() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const footerLinks = {
        "Private Suite": userAccountNav,
        "Support": [
            { label: 'Shipping & Returns', url: '/shipping-returns' },
            { label: 'Privacy Policy', url: '/privacy-policy' },
            { label: 'Terms of Service', url: '/terms-of-service' },
            { label: 'Accessibility', url: '/accessibility' }
        ]
    };

    return (
        <footer className="bg-white border-t border-[#e7e7e7] pt-32 pb-12 relative overflow-hidden">
            {/* Subtle Gradient Glow in Footer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[#a932bd] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Info & Socials */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-[#a932bd] text-[24px] font-light tracking-[0.3em] uppercase">
                                tsgabrielle®
                            </h3>
                            <p className="text-[14px] font-light text-[#888888] leading-relaxed max-w-[380px]">
                                The high-fashion portal. The entry point to the 2026 "Glow" aesthetic. Experience the intersection of performance and luxury.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-light text-[#1a1a1a] uppercase tracking-[0.4em]">
                                The Social Ecosystem
                            </h4>
                            <div className="flex flex-wrap gap-x-8 gap-y-4 max-w-[400px]">
                                {socialNav.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] font-light text-[#888888] uppercase tracking-[0.2em] hover:text-[#a932bd] transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Links (Columns) */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="hidden md:block space-y-8">
                            <h4 className="text-[12px] font-light text-[#1a1a1a] uppercase tracking-[0.3em]">
                                {title === "Private Suite" ? "My tsgabrielle®" : title}
                            </h4>
                            <div className="flex flex-col space-y-5">
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className="text-[13px] font-light text-[#888888] hover:text-[#a932bd] hover:translate-x-1 inline-block transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Mobile Accordions */}
                    <div className="md:hidden space-y-4 w-full">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title} className="border-b border-[#e7e7e7]">
                                <button
                                    onClick={() => toggleSection(title)}
                                    className="w-full flex justify-between items-center py-6 text-[12px] font-light text-[#1a1a1a] uppercase tracking-[0.3em]"
                                >
                                    {title === "Private Suite" ? "My tsgabrielle®" : title}
                                    <motion.div
                                        animate={{ rotate: openSection === title ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={16} strokeWidth={1} className="text-[#a932bd]" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openSection === title && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col space-y-5 pb-8 pl-2 border-l border-[#a932bd]/20 ml-2">
                                                {links.map((link) => (
                                                    <Link
                                                        key={link.label}
                                                        href={link.url}
                                                        className="text-[13px] font-light text-[#888888] flex items-center gap-2"
                                                        onClick={() => setOpenSection(null)}
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-[#a932bd] opacity-40 inline-block" />
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div className="py-20 border-y border-[#e7e7e7] mb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
                    <div className="absolute top-1/2 right-10 w-[200px] h-[200px] bg-[#a932bd] blur-[120px] rounded-full opacity-[0.04] pointer-events-none -translate-y-1/2" />
                    <div className="space-y-4 relative z-10">
                        <h4 className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.4em]">The 2026 Pulse</h4>
                        <p className="text-[20px] font-light text-[#1a1a1a] max-w-sm">Join the glow. Receive early access and exclusive drops.</p>
                    </div>
                    <form className="flex gap-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="flex-grow bg-[#f9f9f9] px-8 py-5 rounded-full text-[12px] font-light tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-[#a932bd]/50 uppercase placeholder:text-[#888888]/40 border border-[#e7e7e7]/50"
                        />
                        <button
                            type="submit"
                            className="bg-[#1a1a1a] text-white px-12 py-5 rounded-full text-[11px] font-light uppercase tracking-[0.3em] hover:bg-[#a932bd] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                        >
                            JOIN
                        </button>
                    </form>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 text-[10px] font-light text-[#888888] uppercase tracking-[0.2em]">
                    <p>© {new Date().getFullYear()} tsgabrielle® LLC. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                        <p className="hover:text-[#a932bd] cursor-pointer transition-colors">Paris Hub</p>
                        <p className="hover:text-[#a932bd] cursor-pointer transition-colors">Arizona Oasis</p>
                        <div className="flex items-center gap-3 bg-[#f9f9f9] px-4 py-2 rounded-full border border-[#e7e7e7]/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                            <span className="text-[9px] tracking-[0.3em]">All Systems Glowing</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
