"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumTabsProps {
    tabs: {
        label: string;
        content: React.ReactNode;
    }[];
}

export const PremiumTabs = ({ tabs }: PremiumTabsProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-primary/10 overflow-x-auto no-scrollbar mb-8">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`relative px-10 py-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all whitespace-nowrap ${activeTab === idx ? 'text-text-dark' : 'text-text-dark/40 hover:text-text-dark/60'
                            }`}
                    >
                        {tab.label}
                        {activeTab === idx && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a932bd]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="relative min-h-[150px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-[14px] leading-relaxed font-light text-text-dark/70"
                    >
                        {tabs[activeTab].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
