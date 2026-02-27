"use client";

import React, { useState, useEffect } from 'react';

interface Tab {
    id: string;
    label: string;
}

const TABS: Tab[] = [
    { id: 'product', label: 'Artisan Narrative' },
    { id: 'identifiers', label: 'Technical DNA' },
    { id: 'specs', label: 'Specs & Atelier Care' },
    { id: 'logistics', label: 'Maison Logistics' },
    { id: 'legal', label: 'Legal & Compliance' },
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
            { threshold: 0.5, rootMargin: '-150px 0px -50% 0px' }
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
            const offset = 140;
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
        <nav className="bg-white/95 backdrop-blur-md border-b border-black/5 sticky top-[112px] z-30">
            <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
                <div className="flex h-14 items-center gap-12 min-w-max">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => scrollTo(tab.id)}
                            className={`text-[9px] uppercase tracking-[0.4em] font-bold h-full border-b-2 transition-all duration-500 ${activeTab === tab.id
                                ? 'border-[#a932bd] text-[#1a1a1a]'
                                : 'border-transparent text-[#1a1a1a]/30 hover:text-black'
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
