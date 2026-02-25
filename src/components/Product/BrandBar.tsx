import React from 'react';
import { Badge } from './ui';

interface BrandBarProps {
    title: string;
    subtitle: string;
    price: string;
    badges?: string[];
}

export const BrandBar: React.FC<BrandBarProps> = ({ title, subtitle, price, badges = [] }) => {
    return (
        <div className="bg-black/80 backdrop-blur-xl border-y border-white/10 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">tsgabrielle®</span>
                        <div className="size-1 rounded-full bg-white/20" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{subtitle}</span>
                    </div>
                    <h1 className="text-xl font-light tracking-wide text-white">{title}</h1>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Commercial Value</p>
                        <p className="text-xl font-light tracking-tight">{price}</p>
                    </div>

                    <div className="flex gap-2">
                        {badges.map((b, i) => (
                            <Badge key={i} variant={i === 0 ? 'purple' : 'outline'}>{b}</Badge>
                        ))}
                    </div>

                    <button className="h-12 px-8 bg-white text-black text-[11px] uppercase font-bold tracking-[0.2em] rounded-full hover:bg-[#a932bd] hover:text-white transition-all duration-500">
                        Initiate Order
                    </button>
                </div>
            </div>
        </div>
    );
};
