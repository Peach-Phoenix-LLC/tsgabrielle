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
        <div className="bg-white/80 backdrop-blur-xl border-y border-black/5 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#a932bd]">tsgabrielle®</span>
                        <div className="size-1 rounded-full bg-black/10" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/40 font-light">{subtitle}</span>
                    </div>
                    <h1 className="text-3xl font-extralight tracking-tighter text-[#1a1a1a]">{title}</h1>
                </div>

                <div className="flex items-center gap-10">
                    <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]/30 mb-1 font-bold">Inquiry Price</p>
                        <p className="text-2xl font-light tracking-tighter text-[#1a1a1a]">{price}</p>
                    </div>

                    <div className="flex gap-3">
                        {badges.map((b, i) => (
                            <Badge key={i} variant={i === 0 ? 'purple' : 'outline'}>{b}</Badge>
                        ))}
                    </div>

                    <button className="h-14 px-10 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-[0.3em] rounded-full hover:bg-[#a932bd] shadow-xl transition-all duration-700">
                        Initiate Order
                    </button>
                </div>
            </div>
        </div>
    );
};
