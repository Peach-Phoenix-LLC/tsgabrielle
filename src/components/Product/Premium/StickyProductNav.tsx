"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StickyProductNavProps {
    productTitle: string;
    productPrice: string;
    cartCount: number;
    onShare: () => void;
}

export const StickyProductNav = ({ productTitle, productPrice, cartCount, onShare }: StickyProductNavProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 z-[500] bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-3 px-6 shadow-sm"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/shop" className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900">
                                <ArrowLeft size={20} />
                            </Link>
                            <div className="hidden md:flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-[#a932bd] font-bold leading-tight">tsgabrielle®</span>
                                <h2 className="text-[13px] font-bold text-text-dark tracking-tight truncate max-w-[300px]">{productTitle}</h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-[14px] font-bold text-text-dark">{productPrice}</span>
                                <span className="text-[9px] uppercase tracking-widest text-green-600 font-bold">In Stock</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={onShare} className="p-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                                    <Share2 size={18} />
                                </button>
                                <button className="p-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                                    <Heart size={18} />
                                </button>
                                <button className="relative p-3 bg-black text-white rounded-full hover:bg-zinc-900 transition-all flex items-center justify-center">
                                    <ShoppingBag size={18} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#a932bd] text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};
