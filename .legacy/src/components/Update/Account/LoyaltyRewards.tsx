'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoyaltyRewards = () => {
    // Mock loyalty data
    const balance = 1250;
    const nextTier = 2500;
    const progress = (balance / nextTier) * 100;

    const tiers = [
        { name: 'Crystal', points: '0+', active: true },
        { name: 'Prism', points: '1000+', active: true },
        { name: 'Spectrum', points: '2500+', active: false },
        { name: 'Holographic', points: '5000+', active: false }
    ];

    const rewards = [
        { name: '$15 OFF YOUR NEXT SHIFT', points: 500 },
        { name: 'FREE COMPLIMENTARY ACCESSORY', points: 1000 },
        { name: 'LIMITED EDITION PRISM TEE', points: 2500 }
    ];

    const transactions = [
        { date: 'FEB 24, 2024', action: 'Purchase #1042', points: '+150', positive: true },
        { date: 'JAN 12, 2024', action: 'Redeemed: $15 OFF', points: '-500', positive: false },
        { date: 'DEC 20, 2023', action: 'Purchase #1038', points: '+1200', positive: true }
    ];

    return (
        <div className="space-y-12">
            {/* Points Balance */}
            <div className="bg-white p-12 rounded-[32px] border border-[#e7e7e7] shadow-[0_20px_60px_rgba(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
                    <span className="material-symbols-outlined text-[160px] text-[#a932bd]">auto_awesome</span>
                </div>

                <h3 className="text-[14px] font-light text-[#888888] uppercase tracking-[0.2em] mb-4">Your Balance</h3>
                <div className="flex items-baseline space-x-4 mb-10">
                    <span className="text-[72px] font-light text-[#a932bd] leading-none tracking-tight">{balance}</span>
                    <span className="text-[14px] font-light text-[#888888] uppercase tracking-[0.2em]">Refraction points</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-4">
                    <div className="flex justify-between text-[11px] font-light uppercase tracking-[0.1em]">
                        <span>Prism level</span>
                        <span className="text-[#888888]">1,250 points to Spectrum</span>
                    </div>
                    <div className="h-2 w-full bg-[#f0f0f0] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-[#a932bd] rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Tiers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((tier) => (
                    <div key={tier.name} className={`p-6 rounded-[20px] border transition-all ${tier.active ? 'bg-white border-[#a932bd]/20' : 'bg-[#f7f7f7] border-[#e7e7e7] opacity-60'}`}>
                        <p className={`text-[12px] font-light uppercase tracking-[0.2em] mb-1 ${tier.active ? 'text-[#a932bd]' : 'text-[#888888]'}`}>{tier.name}</p>
                        <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.1em]">{tier.points}</p>
                        {tier.name === 'Prism' && (
                            <div className="mt-4 inline-block px-3 py-1 bg-[#a932bd]/10 text-[#a932bd] text-[8px] font-light uppercase tracking-[0.2em] rounded-full">Current Tier</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Rewards Grid */}
            <div>
                <h3 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.2em] mb-8">Available Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rewards.map((reward) => (
                        <div key={reward.name} className="bg-white p-8 rounded-[24px] border border-[#e7e7e7] flex flex-col items-center text-center group hover:border-[#a932bd]/30 transition-all">
                            <div className="w-16 h-16 bg-[#f7f7f7] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#a932bd]/5 transition-colors">
                                <span className="material-symbols-outlined text-[24px] text-[#a932bd]">confirmation_number</span>
                            </div>
                            <h4 className="text-[13px] font-light text-[#1a1a1a] uppercase tracking-[0.1em] mb-6 leading-relaxed h-10 flex items-center">{reward.name}</h4>
                            <button className={`w-full py-3 rounded-full text-[10px] font-light uppercase tracking-[0.2em] transition-all ${balance >= reward.points ? 'bg-[#a932bd] text-white hover:shadow-lg' : 'bg-transparent border border-[#e7e7e7] text-[#888888] cursor-not-allowed'}`}>
                                Redeem {reward.points} Pts
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transactions */}
            <div>
                <h3 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.2em] mb-8">Recent History</h3>
                <div className="bg-white rounded-[24px] border border-[#e7e7e7] overflow-hidden">
                    {transactions.map((t, i) => (
                        <div key={i} className={`flex items-center justify-between p-6 ${i !== transactions.length - 1 ? 'border-b border-[#e7e7e7]' : ''}`}>
                            <div>
                                <p className="text-[13px] font-light text-[#1a1a1a] uppercase tracking-[0.05em] mb-1">{t.action}</p>
                                <p className="text-[10px] font-light text-[#888888] tracking-[0.1em]">{t.date}</p>
                            </div>
                            <span className={`text-[14px] font-light tracking-[0.1em] ${t.positive ? 'text-green-500' : 'text-[#a932bd]'}`}>
                                {t.points}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoyaltyRewards;
