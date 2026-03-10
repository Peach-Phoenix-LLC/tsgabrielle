"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Share2, Eye, Check, Facebook, Twitter, Send, MessageCircle, X, Copy } from 'lucide-react';

export interface ProductVariant {
    id: string | number;
    color: string;
    size_label: string;
    msrp: string;
    inventory: string;
    variant_sku: string;
    // We might need an image per variant in the future, for now using main
}

export interface PublicProduct {
    id: string | number;
    peach_number: string | number;
    title: string;
    subtitle: string;
    msrp_display: string;
    media_primary_url?: string;
    media_gallery_urls?: string[];
    product_type: string;
    composition: string;
    status: string;
    variants: ProductVariant[];
}

const ShareModal = ({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: PublicProduct }) => {
    const [copied, setCopied] = useState(false);
    if (!isOpen) return null;

    const shareUrl = `https://tsgabrielle.us/${product.peach_number}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white border border-black/5 p-8 rounded-2xl w-full max-w-md relative shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-black/40 hover:text-[#a932bd] transition-colors">
                        <X size={20} />
                    </button>
                    <h3 className="text-xl font-light tracking-widest uppercase mb-6 text-[#1a1a1a]">Share Product</h3>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {[
                            { icon: Facebook, label: 'Facebook', color: '#1877F2' },
                            { icon: Twitter, label: 'Twitter', color: '#1DA1F2' },
                            { icon: Send, label: 'Telegram', color: '#0088cc' },
                            { icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
                        ].map((net) => (
                            <button key={net.label} className="flex flex-col items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black/5 transition-all">
                                    <net.icon size={20} className="text-[#1a1a1a]/40 group-hover:text-[#a932bd]" />
                                </div>
                                <span className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-tighter">{net.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest">Copy Connection Link</span>
                        <div className="flex bg-neutral-50 rounded-lg border border-black/5 p-1">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 bg-transparent border-none text-xs text-[#1a1a1a]/60 px-3 outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="bg-[#a932bd] text-white px-4 py-2 rounded-md text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#c13edf] transition-colors"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export const ProductCard = ({ product }: { product: PublicProduct }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [buyState, setBuyState] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleBuy = () => {
        setBuyState('loading');
        setTimeout(() => setBuyState('success'), 1500);
        setTimeout(() => setBuyState('idle'), 4000);
    };

    const mainImage = product.media_primary_url || "https://images.unsplash.com/photo-1549493527-134cca013146?q=80&w=800&auto=format&fit=crop";
    const hoverImage = product.media_gallery_urls?.[0] || mainImage;
    const isSoldOut = product.status === 'sold_out' || product.variants.every(v => v.inventory === 'Out of Stock');

    return (
        <div
            className="group relative flex flex-col bg-white border border-black/5 rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={isHovered ? 'hover' : 'main'}
                        src={isHovered ? hoverImage : mainImage}
                        alt={product.title}
                        className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-110"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Badge (Mocking some for UX) */}
                {(product.id as number) % 5 === 0 && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-md border bg-[#a932bd]/20 border-[#a932bd]/40 text-[#a932bd]">
                            Atelier Selection
                        </span>
                    </div>
                )}
                {isSoldOut && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-md border bg-red-500/20 border-red-500/40 text-red-400">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Actions Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Link
                        href={`/${product.peach_number}`}
                        className="flex-1 mr-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest h-11 flex items-center justify-center rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        <Eye size={14} className="mr-2" />
                        Details
                    </Link>
                    <button
                        onClick={() => setIsShareOpen(true)}
                        className="w-11 h-11 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center rounded-lg hover:bg-white/20 transition-all"
                    >
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="space-y-1">
                    <p className="text-[10px] text-[#a932bd] font-medium uppercase tracking-[0.3em]">{product.subtitle || 'tsgabrielle®'}</p>
                    <h3 className="text-lg font-light tracking-tight text-[#1a1a1a] group-hover:text-[#a932bd] transition-colors">{product.title}</h3>
                </div>

                <div className="flex items-end justify-between">
                    <div className="space-y-3">
                        <p className="text-xl font-light text-[#1a1a1a]">{product.msrp_display}</p>

                        {/* Swatches (Visual only for list view) */}
                        {product.variants.length > 1 && (
                            <div className="flex items-center gap-2 pt-1">
                                {product.variants.slice(0, 4).map((v, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-4 h-4 rounded-full border border-black/10`}
                                        style={{ backgroundColor: v.color === 'Default' ? '#ffffff' : v.color }}
                                    />
                                ))}
                                {product.variants.length > 4 && <span className="text-[9px] text-[#1a1a1a]/40">+{product.variants.length - 4}</span>}
                            </div>
                        )}
                    </div>

                    <button
                        disabled={isSoldOut}
                        onClick={handleBuy}
                        className={`relative h-12 px-6 rounded-xl overflow-hidden text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${isSoldOut ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5' :
                            buyState === 'success' ? 'bg-green-500 text-white' :
                                'bg-gradient-to-r from-[#a932bd] to-[#8a299b] text-white hover:scale-105 active:scale-95 shadow-[0_10px_20px_-10px_rgba(169,50,189,0.5)]'
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {buyState === 'idle' && (
                                <motion.span
                                    key="idle"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <ShoppingBag size={14} />
                                    {isSoldOut ? 'Sold Out' : 'Buy Now'}
                                </motion.span>
                            )}
                            {buyState === 'loading' && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center"
                                >
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </motion.div>
                            )}
                            {buyState === 'success' && (
                                <motion.span
                                    key="success"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <Check size={16} />
                                    Added
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} product={product} />
        </div>
    );
};
