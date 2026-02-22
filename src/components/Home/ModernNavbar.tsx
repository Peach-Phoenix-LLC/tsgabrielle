"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useCartStore } from '@/lib/store';

interface ModernNavbarProps {
    theme?: 'light' | 'dark';
}

const ModernNavbar = ({ theme = 'dark' }: ModernNavbarProps) => {
    const { data: session, status } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { items } = useCartStore();

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine which logo to use. 
    // If the navbar is scrolled or explicitly dark, we use the white logo (since the scrolled bg is dark).
    // If it's over a light background (not yet implemented but supported), we use purple.
    const isDarkBackground = scrolled; // For now, let's say when scrolled it has a slight background
    const textColor = scrolled ? 'text-primary' : (theme === 'dark' ? 'text-white' : 'text-text-dark');
    const iconColor = scrolled ? 'text-primary' : (theme === 'dark' ? 'text-white' : 'text-text-dark');

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg-light/80 backdrop-blur-md border-b border-primary/10 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                {/* Desktop Nav Links (Left) */}
                <nav className="hidden lg:flex items-center gap-12">
                    <Link href="/shop" className={`transition-opacity hover:opacity-50 text-[14px] font-light ${textColor}`}>Shop</Link>
                    <Link href="/collections" className={`transition-opacity hover:opacity-50 text-[14px] font-light ${textColor}`}>Collections</Link>
                    <Link href="/about" className={`transition-opacity hover:opacity-50 text-[14px] font-light ${textColor}`}>Our story</Link>
                </nav>

                {/* Logo (Centered) */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center">
                    <div className="relative w-48 h-10 transition-transform duration-300">
                        <Image
                            src={scrolled ? "/images/logo-purple.png" : (theme === 'dark' ? "/images/logo-white.png" : "/images/logo-purple.png")}
                            alt="tsgabrielle logo"
                            fill
                            className="object-contain transition-opacity duration-300"
                            priority
                            onError={(e) => {
                                // Hide the failed image container and show the text fallback
                                (e.target as any).style.display = 'none';
                            }}
                        />
                        {/* High-end text fallback if image is missing or loading */}
                        <span className={`absolute inset-0 flex items-center justify-center text-[22px] font-black tracking-[-0.05em] uppercase pointer-events-none ${textColor} transition-opacity duration-300 whitespace-nowrap`}>
                            tsgabrielle®
                        </span>
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

                    {/* Auth Status */}
                    {status === 'loading' ? (
                        <div className={`w-6 h-6 rounded-full border border-current border-t-transparent animate-spin ${iconColor}`} />
                    ) : session ? (
                        <Link href="/profile" className={`p-2 transition-opacity hover:opacity-50 flex items-center justify-center ${iconColor}`}>
                            <span className="material-symbols-outlined text-[22px]">person</span>
                        </Link>
                    ) : (
                        <button onClick={() => signIn('google')} className={`transition-opacity hover:opacity-50 text-[14px] font-light hidden lg:block ${textColor}`}>
                            Sign in
                        </button>
                    )}

                    {/* Mobile Menu Trigger */}
                    <button className={`lg:hidden p-2 ${iconColor}`}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default ModernNavbar;
