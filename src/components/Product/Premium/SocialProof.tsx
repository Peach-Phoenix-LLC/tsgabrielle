"use client";

import React from 'react';
import { Star, Users, Flame } from 'lucide-react';

interface SocialProofProps {
    rating: number;
    reviewCount: number;
    soldCount: number;
    stockLevel?: 'low' | 'normal';
}

export const SocialProof = ({ rating, reviewCount, soldCount, stockLevel }: SocialProofProps) => {
    return (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-10 border-t border-zinc-100">
            {/* Rating */}
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(rating) ? "fill-[#a932bd] text-[#a932bd]" : "fill-zinc-200 text-zinc-200"}
                        />
                    ))}
                </div>
                <span className="text-[11px] font-bold text-text-dark/60 tracking-widest">{rating} ({reviewCount})</span>
            </div>

            {/* Sold Count */}
            <div className="flex items-center gap-2">
                <Users size={14} className="text-zinc-300" />
                <span className="text-[11px] font-bold text-text-dark/40 tracking-widest leading-none">
                    <span className="text-text-dark">{soldCount}</span> curated pieces in 24h
                </span>
            </div>

            {/* Stock Pulse */}
            {stockLevel === 'low' && (
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Flame size={14} className="text-[#a932bd]" />
                        <div className="absolute inset-0 bg-[#a932bd]/30 rounded-full animate-ping" />
                    </div>
                    <span className="text-[11px] font-bold text-[#a932bd] tracking-widest uppercase">Limited Collection Left</span>
                </div>
            )}
        </div>
    );
};
