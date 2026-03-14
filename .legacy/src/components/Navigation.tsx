'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, X, Home, Compass, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';

interface NavigationProps {
    config?: any;
}

export default function Navigation({ config }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);

    const menuData = config?.header?.mega_menu || [
        {
            id: "I",
            title: "WELCOME",
            description: "The high-fashion portal. The entry point to the 2026 \"Glow\" aesthetic.",
            links: [
                { label: "Home", url: "/" }
            ]
        },
        {
            id: "II",
            title: "Categories",
            description: "Defined by craftsmanship and lifestyle extension.",
            links: [
                { label: "Beauté Beauty", url: "/categories/beauty" },
                { label: "Accessories", url: "/categories/accessories" },
                { label: "Hats", url: "/categories/hats" },
                { label: "For Him 👔 / For Her 👗", url: "/categories/gender" },
                { label: "🏡 Home & Décor", url: "/categories/home-decor" }
            ]
        },
        {
            id: "III",
            title: "Collections",
            description: "Your intellectual and spiritual property. Each link represents a distinct movement.",
            links: [
                { label: "Peach Phoenix™", url: "/collections/peach-phoenix" },
                { label: "Paris", url: "/collections/paris" },
                { label: "Arizona 🌵", url: "/collections/arizona" },
                { label: "Made In USA", url: "/collections/made-in-usa" },
                { label: "TransLove™", url: "/collections/translove" },
                { label: "TransFLOWer™", url: "/collections/transflower" },
                { label: "Womanizer", url: "/collections/womanizer" },
                { label: "Flamant 🦩 Rose", url: "/collections/flamant-rose" },
                { label: "🌌✨ Édition Spatiale", url: "/collections/edition-spatiale" },
                { label: "Unicorn 🦄", url: "/collections/unicorn" },
                { label: "Crystal Skies.", url: "/collections/crystal-skies" },
                { label: "🌈 Pride 26", url: "/collections/pride26" },
                { label: "❄️ Glow in Winter 26", url: "/collections/glow-winter26" },
                { label: "Good Vibes Only.", url: "/collections/good-vibes-only" }
            ]
        },
        {
            id: "IV",
            title: "The Collabs",
            description: "The intersection of performance and luxury.",
            links: [
                { label: "Adidas x tsgabrielle®", url: "/collabs/adidas" },
                { label: "Champion® Heritage", url: "/collabs/champion" },
                { label: "Columbia Sportswear", url: "/collabs/columbia" },
                { label: "Under Armour® Performance", url: "/collabs/under-armour" }
            ]
        },
        {
            id: "V",
            title: "The Universe of tsgabrielle®",
            description: "The brand’s expansive ecosystem.",
            links: [
                { label: "Your Inclusive Store", url: "/store" },
                { label: "About Gabrielle", url: "/about" },
                { label: "Sustainability", url: "/sustainability" },
                { label: "The Blogs", url: "/blog" },
                { label: "Videos by YouTube", url: "/videos" }
            ]
        },
        {
            id: "VI",
            title: "Meet tsgabrielle®",
            description: "The human and operational side of the house.",
            links: [
                { label: "The Brand", url: "/brand" },
                { label: "Peaches", url: "/community/peaches" },
                { label: "FAQ / Contact tsgabrielle®", url: "/contact" },
                { label: "Legal Hub", url: "/legal" }
            ]
        }
    ];

    const announcement = config?.announcement;

    const { getUniqueItemCount } = useCartStore();
    const cartCount = getUniqueItemCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const leftLinks = menuData.slice(0, 3);
    const rightLinks = menuData.slice(3, 6);

    return (
        <>
            {/* Announcement Bar */}
            {announcement?.is_active && (
                <div
                    className="fixed top-0 left-0 w-full z-[60] py-2 px-4 shadow-sm"
                    style={{ backgroundColor: announcement.bg_color || '#a932bd' }}
                >
                    <div className="max-w-[1440px] mx-auto text-center">
                        <span
                            className="text-[10px] font-bold tracking-[0.2em] uppercase"
                            style={{ color: announcement.text_color || '#ffffff' }}
                        >
                            {announcement.text}
                        </span>
                    </div>
                </div>
            )}

            {/* Desktop Navigation */}
            <nav
                className={`fixed left-0 w-full z-50 transition-all duration-700 ease-in-out px-4 xl:px-8 ${announcement?.is_active ? 'top-[36px]' : 'top-0'} ${isScrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-[#e7e7e7] py-3' : 'bg-transparent py-6'}`}
                onMouseLeave={() => setActiveMegaMenu(null)}
            >
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                    {/* Left: Menu Links */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 h-full">
                        {leftLinks.map((section: any) => (
                            <div
                                key={section.title}
                                className="h-full flex items-center cursor-pointer relative group py-4"
                                onMouseEnter={() => setActiveMegaMenu(section.title)}
                            >
                                <span className={`text-[10px] xl:text-[11px] font-light text-[#1a1a1a] uppercase tracking-[0.3em] hover:text-[#a932bd] transition-all ${activeMegaMenu === section.title ? 'text-[#a932bd]' : ''}`}>
                                    {section.title}
                                </span>
                                <span className={`absolute bottom-2 left-1/2 w-0 h-[1px] bg-[#a932bd] transition-all group-hover:w-full group-hover:left-0 ${activeMegaMenu === section.title ? 'w-full left-0' : ''}`} />
                            </div>
                        ))}
                    </div>

                    {/* Center: Branding */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 group z-[60]" onMouseEnter={() => setActiveMegaMenu(null)}>
                        <div className="flex flex-col items-center">
                            <span className="text-[#a932bd] font-light text-[20px] xl:text-[24px] tracking-[0.3em] uppercase transition-all group-hover:tracking-[0.4em] duration-700">
                                tsgabrielle®
                            </span>
                            <span className="text-[6px] xl:text-[7px] font-light text-[#888888] uppercase tracking-[0.5em] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                the 2026 glow
                            </span>
                        </div>
                    </Link>

                    {/* Right: Menu Links & Tools */}
                    <div className="flex items-center space-x-6 xl:space-x-10 h-full">
                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 h-full">
                            {rightLinks.map((section: any) => (
                                <div
                                    key={section.title}
                                    className="h-full flex items-center cursor-pointer relative group py-4"
                                    onMouseEnter={() => setActiveMegaMenu(section.title)}
                                >
                                    <span className={`text-[10px] xl:text-[11px] font-light text-[#1a1a1a] uppercase tracking-[0.3em] hover:text-[#a932bd] transition-all ${activeMegaMenu === section.title ? 'text-[#a932bd]' : ''}`}>
                                        {section.title}
                                    </span>
                                    <span className={`absolute bottom-2 left-1/2 w-0 h-[1px] bg-[#a932bd] transition-all group-hover:w-full group-hover:left-0 ${activeMegaMenu === section.title ? 'w-full left-0' : ''}`} />
                                </div>
                            ))}
                        </div>

                        {/* Search & Cart */}
                        <div className="flex items-center space-x-6 z-[60]" onMouseEnter={() => setActiveMegaMenu(null)}>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-[#1a1a1a] hover:text-[#a932bd] transition-all opacity-70 hover:opacity-100"
                            >
                                <Search size={18} strokeWidth={1} />
                            </button>

                            <Link href="/cart" className="relative text-[#1a1a1a] hover:text-[#a932bd] transition-all group">
                                <ShoppingBag size={18} strokeWidth={1} />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-[#a932bd] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-light"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeMegaMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-[#e7e7e7] shadow-2xl py-12 px-8 overflow-hidden z-40"
                        >
                            <div className="max-w-[1440px] mx-auto">
                                {menuData.map((section: any) => (
                                    section.title === activeMegaMenu && (
                                        <div key={section.title} className="flex gap-24">
                                            {/* Mega Menu Left Text */}
                                            <div className="w-1/3 border-r border-[#e7e7e7]/50 pr-12">
                                                <h3 className="text-[14px] text-[#a932bd] font-light uppercase tracking-[0.5em] mb-4">{section.title}</h3>
                                                <p className="text-[13px] text-[#888888] font-light leading-relaxed max-w-sm">{section.description}</p>
                                            </div>

                                            {/* Mega Menu Links Grid */}
                                            <div className="w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                                {section.links.map((link: { label: string, url: string }) => (
                                                    <Link
                                                        key={link.label}
                                                        href={link.url}
                                                        className="text-[13px] text-[#1a1a1a] font-light hover:text-[#a932bd] hover:translate-x-2 transition-transform inline-flex items-center"
                                                        onClick={() => setActiveMegaMenu(null)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Inline Search Panel */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-[#e7e7e7] overflow-hidden absolute top-full left-0 w-full z-40 shadow-xl"
                        >
                            <div className="max-w-[1440px] mx-auto px-6 py-12">
                                <input
                                    type="text"
                                    placeholder="Surface the Collection..."
                                    className="w-full bg-transparent border-b border-[#a932bd]/20 py-6 text-[28px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] uppercase placeholder:text-[#e7e7e7]"
                                    autoFocus
                                />
                                <div className="mt-6 flex gap-6 text-[10px] font-light text-[#888888] uppercase tracking-[0.2em]">
                                    <span>Trending:</span>
                                    <button className="hover:text-[#a932bd] transition-colors">TransLove™</button>
                                    <button className="hover:text-[#a932bd] transition-colors">Peach Phoenix™</button>
                                    <button className="hover:text-[#a932bd] transition-colors">Adidas Collab</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Bottom Portal Navigation */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[60]">
                <div className="bg-white/80 backdrop-blur-2xl border border-white/40 p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-around">
                    <Link href="/" className="p-3 text-[#1a1a1a]/60 hover:text-[#a932bd] transition-all">
                        <Home size={20} strokeWidth={1} />
                    </Link>
                    <Link href="/collections" className="p-3 text-[#1a1a1a]/60 hover:text-[#a932bd] transition-all">
                        <Compass size={20} strokeWidth={1} />
                    </Link>
                    {/* Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-[#a932bd] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="text-white text-[10px] font-light tracking-widest relative z-10">MENU</span>
                    </button>
                    <Link href="/my-account" className="p-3 text-[#1a1a1a]/60 hover:text-[#a932bd] transition-all">
                        <User size={20} strokeWidth={1} />
                    </Link>
                    <Link href="/cart" className="p-3 text-[#1a1a1a]/60 hover:text-[#a932bd] transition-all relative">
                        <ShoppingBag size={20} strokeWidth={1} />
                        {cartCount > 0 && (
                            <span className="absolute top-2 right-2 bg-[#a932bd] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-[#ffffff] z-[70] flex flex-col p-8 overflow-y-auto"
                    >
                        {/* Organic Blobs */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none fixed">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a932bd] blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <div className="flex justify-between items-center mb-12 relative z-10 shrink-0">
                            <span className="text-[#a932bd] text-[18px] font-light tracking-[0.4em] uppercase">tsgabrielle®</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full border border-[#e7e7e7] flex items-center justify-center bg-white shadow-sm hover:border-[#a932bd] hover:text-[#a932bd] transition-colors">
                                <X size={20} strokeWidth={1} />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2 relative z-10 pb-32">
                            {menuData.map((section: any, i: number) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="border-b border-[#e7e7e7]/50"
                                >
                                    <button
                                        onClick={() => setMobileOpenSection(mobileOpenSection === section.title ? null : section.title)}
                                        className="w-full flex justify-between items-center py-6 text-[18px] font-light text-[#1a1a1a] uppercase tracking-[0.1em]"
                                    >
                                        {section.title}
                                        <motion.div
                                            animate={{ rotate: mobileOpenSection === section.title ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-[#a932bd]"
                                        >
                                            <ChevronDown size={20} strokeWidth={1} />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {mobileOpenSection === section.title && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-col space-y-4 pb-8 pl-4 border-l border-[#a932bd]/20 ml-2">
                                                    <p className="text-[11px] text-[#888888] mb-2">{section.description}</p>
                                                    {section.links.map((link: any) => (
                                                        <Link
                                                            key={link.label}
                                                            href={link.url}
                                                            className="text-[14px] font-light text-[#1a1a1a] hover:text-[#a932bd] transition-colors flex items-center gap-2"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-[#a932bd] opacity-50" />
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        <div className="fixed bottom-0 left-0 w-full py-8 bg-gradient-to-t from-white via-white to-white/0 flex justify-center z-20 pointer-events-none">
                            <div className="pointer-events-auto mt-6">
                                <Link
                                    href="/my-account"
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-[#1a1a1a] text-white text-[11px] font-light uppercase tracking-[0.3em] rounded-full shadow-xl hover:bg-[#a932bd] transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User size={14} /> My tsgabrielle®
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
