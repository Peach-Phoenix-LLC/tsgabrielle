'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoyaltyRewards from '@/components/Update/Account/LoyaltyRewards';
import OrdersList from '@/components/Update/Account/OrdersList';

const tabs = [
    { id: 'orders', label: 'My Orders', icon: 'inventory_2' },
    { id: 'loyalty', label: 'Loyalty Rewards', icon: 'auto_awesome' },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite' },
    { id: 'settings', label: 'Profile Settings', icon: 'settings' }
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState('loyalty');

    return (
        <main className="min-h-screen bg-white pt-40 pb-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <header className="mb-20">
                    <h1 className="text-[12px] font-light text-[#888888] uppercase tracking-[0.4em] mb-4">Member Portal</h1>
                    <h2 className="text-[42px] font-light text-[#1a1a1a] uppercase tracking-[0.2em]">Your Account</h2>
                </header>

                <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
                    {/* Sidebar */}
                    <aside className="w-full md:w-[280px] shrink-0">
                        <div className="bg-[#f7f7f7] rounded-[24px] p-8 border border-[#e7e7e7] sticky top-32">
                            <nav className="flex flex-col space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-4 px-6 py-4 rounded-xl text-[12px] uppercase tracking-[0.15em] transition-all duration-300 ${activeTab === tab.id
                                                ? 'bg-white text-[#a932bd] shadow-sm border-l-2 border-[#a932bd]'
                                                : 'text-[#888888] hover:text-[#1a1a1a] hover:bg-white/50'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'loyalty' && (
                                <motion.div
                                    key="loyalty"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <LoyaltyRewards />
                                </motion.div>
                            )}
                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <OrdersList />
                                </motion.div>
                            )}
                            {(activeTab === 'wishlist' || activeTab === 'settings') && (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full py-24 text-center opacity-30"
                                >
                                    <span className="material-symbols-outlined text-[64px] mb-8">construction</span>
                                    <h3 className="text-[14px] uppercase tracking-[0.2em]">Module Evolving</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
