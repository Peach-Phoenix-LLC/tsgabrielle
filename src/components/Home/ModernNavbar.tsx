"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useCartStore } from '@/lib/store';

interface ModernNavbarProps {
    config?: any;
    siteSettings?: any;
}

const ModernNavbar = ({ config = {}, siteSettings = {} }: ModernNavbarProps) => {
    const { data: session, status } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { items } = useCartStore();

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    const announcementBar = config.announcement_bar || {};
    const navLinks = config.links || [
        { label: 'Shop', url: '/shop' },
        { label: 'Collections', url: '/collections' },
        { label: 'Our story', url: '/about' }
    ];

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sticky = config.sticky !== false;
    const transparent = config.transparent !== false;

    const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-primary/10 py-4 shadow-sm'
            : transparent ? 'bg-transparent py-6' : 'bg-white py-4 shadow-sm'
        }`;

    // Logo logic: use logo from site settings if available, else default
    const logoUrl = siteSettings.logo_url || "/images/logo-white.png";

    // When absolute white background (scrolled), we might need a dark logo version if the user provided one,
    // but the system doesn't have "dark_logo_url" yet. Let's assume the primary logo works or add a check.
    const textColor = scrolled ? 'text-primary' : 'text-text-dark';
    const iconColor = scrolled ? 'text-primary' : 'text-text-dark';

    return (
        <header className={navClass}>
            {announcementBar.enabled && (
                <div
                    className="w-full py-2 text-center text-[10px] uppercase tracking-[0.3em] font-bold"
                    style={{ backgroundColor: announcementBar.bg_color || '#a932bd', color: announcementBar.text_color || '#ffffff' }}
                >
                    {announcementBar.text}
                </div>
            )}
            <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                {/* Desktop Nav Links (Left) */}
                <nav className="hidden lg:flex items-center gap-14">
                    {navLinks.map((link: any, idx: number) => (
                        <Link key={idx} href={link.url} className={`transition-opacity hover:opacity-50 text-[14px] uppercase tracking-widest font-light ${textColor}`}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Logo (Centered) */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center justify-center pt-2">
                    <div className="relative w-[180px] h-[40px]">
                        <Image
                            src={logoUrl}
                            alt={siteSettings.brand_name || "tsgabrielle logo"}
                            fill
                            className={`object-contain transition-all duration-500 ${scrolled ? 'brightness-0 contrast-100' : ''}`}
                            priority
                        />
                    </div>
                </Link>

                {/* Right Icons */}
                <div className="flex items-center gap-8">
                    <button className={`p-2 transition-opacity hover:opacity-50 ${iconColor}`}>
                        <span className="material-symbols-outlined text-[22px]">search</span>
                    </button>
                    <Link href="/cart" className={`p-2 transition-opacity hover:opacity-50 relative flex items-center justify-center ${iconColor}`}>
                        <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                        {mounted && itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-light text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {status === 'loading' ? (
                        <div className={`w-6 h-6 rounded-full border border-current border-t-transparent animate-spin ${iconColor}`} />
                    ) : session ? (
                        <Link href="/profile" className={`p-2 transition-opacity hover:opacity-50 flex items-center justify-center ${iconColor}`}>
                            <span className="material-symbols-outlined text-[22px]">person</span>
                        </Link>
                    ) : (
                        <button onClick={() => signIn('google')} className={`transition-opacity hover:opacity-50 text-[12px] uppercase tracking-widest font-light hidden lg:block ${textColor}`}>
                            Account
                        </button>
                    )}

                    <button className={`lg:hidden p-2 ${iconColor}`}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ModernNavbar;
