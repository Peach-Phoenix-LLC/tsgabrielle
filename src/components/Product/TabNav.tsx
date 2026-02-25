"use client";

import React, { useState, useEffect } from 'react';

interface Tab {
    id: string;
    label: string;
}

const TABS: Tab[] = [
    { id: 'product', label: 'Product Page' },
    { id: 'identifiers', label: 'Identifiers & Variants' },
    { id: 'specs', label: 'Specs & Care' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'legal', label: 'Compliance & Legal' },
];

export const TabNav = () => {
    const [activeTab, setActiveTab] = useState('product');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
        );

        TABS.forEach((tab) => {
            const el = document.getElementById(tab.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120; // Accounts for BrandBar + TabNav height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="bg-black border-b border-white/10 sticky top-24 z-30">
            <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
                <div className="flex h-16 items-center gap-12 min-w-max">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => scrollTo(tab.id)}
                            className={`text-[10px] uppercase tracking-[0.3em] font-bold h-full border-b-2 transition-all duration-300 ${activeTab === tab.id
                                    ? 'border-[#a932bd] text-white'
                                    : 'border-transparent text-white/40 hover:text-white/60'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};
