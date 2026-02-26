"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Twitter, Link as LinkIcon, Send } from 'lucide-react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    productUrl: string;
    productTitle: string;
}

export const ShareModal = ({ isOpen, onClose, productUrl, productTitle }: ShareModalProps) => {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(productUrl);
        // Maybe show a checkmark or toast?
    };

    const shareOptions = [
        { name: 'Instagram', icon: <Instagram size={24} />, color: 'bg-zinc-100 hover:bg-zinc-200' },
        { name: 'X / Twitter', icon: <Twitter size={24} />, color: 'bg-zinc-100 hover:bg-zinc-200' },
        { name: 'Facebook', icon: <Facebook size={24} />, color: 'bg-zinc-100 hover:bg-zinc-200' },
        { name: 'WhatsApp', icon: <Send size={24} />, color: 'bg-zinc-100 hover:bg-zinc-200' },
        { name: 'Pinterest', icon: <Send size={24} />, color: 'bg-zinc-100 hover:bg-zinc-200' },
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-sm p-10 shadow-2xl"
                >
                    <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 transition-colors">
                        <X size={20} />
                    </button>

                    <div className="text-center space-y-2 mb-10">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Curate & Share</span>
                        <h2 className="text-2xl font-light tracking-tight">Invite your circle</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-10">
                        {shareOptions.map((opt) => (
                            <button
                                key={opt.name}
                                className={`flex flex-col items-center gap-3 p-4 rounded-sm transition-all ${opt.color}`}
                            >
                                {opt.icon}
                                <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">{opt.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <span className="block text-[10px] uppercase tracking-widest text-zinc-400 font-bold ml-1">Copy unique link</span>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={productUrl}
                                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-sm px-4 py-3 text-[12px] opacity-60 outline-none"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-sm hover:bg-zinc-900 transition-all"
                            >
                                <LinkIcon size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
