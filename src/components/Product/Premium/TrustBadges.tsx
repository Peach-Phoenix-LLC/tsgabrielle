"use client";

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const TrustBadges = () => {
    const badges = [
        { icon: <Truck size={24} />, title: "Free Global Shipping", desc: "Over $150 purchases" },
        { icon: <ShieldCheck size={24} />, title: "Secure Checkout", desc: "Encrypted payments" },
        { icon: <RotateCcw size={24} />, title: "30-Day Returns", desc: "Hassle-free collection" },
        { icon: <Award size={24} />, title: "Authenticity", desc: "Certified brand items" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-y border-zinc-100 mt-20">
            {badges.map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-3 p-4">
                    <div className="text-[#a932bd] opacity-40">{b.icon}</div>
                    <div className="space-y-1">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-dark">{b.title}</h4>
                        <p className="text-[9px] text-text-dark/40 font-light">{b.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
