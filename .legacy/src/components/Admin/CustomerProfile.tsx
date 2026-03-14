"use client";

import React from 'react';

interface CustomerProfileProps {
    customer: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
        tier: string;
        ltv: string;
        aov: string;
        orders: number;
        bio: string;
        joinedDate: string;
    };
    onBack: () => void;
}

export default function CustomerProfile({ customer, onBack }: CustomerProfileProps) {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-[#a932bd] transition-colors group"
            >
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                <span className="text-sm font-bold uppercase tracking-widest">Back to Customers</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Personal Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-2xl shadow-purple-500/5 items-center flex flex-col text-center">
                        <div className="relative mb-6">
                            <div className="p-1 bg-gradient-to-tr from-[#a932bd] to-[#00d4ff] rounded-full">
                                <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <img
                                        src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=a932bd&color=fff`}
                                        alt={customer.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 right-4 px-3 py-1 bg-[#a932bd] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white">
                                {customer.tier}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{customer.name}</h3>
                        <p className="text-[#a932bd] font-medium text-sm mb-4">{customer.email}</p>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                            {customer.bio}
                        </p>
                        <div className="w-full h-[1px] bg-slate-100 my-6"></div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Joined</p>
                                <p className="text-sm font-bold text-slate-800">{customer.joinedDate}</p>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Customer ID</p>
                                <p className="text-sm font-bold text-slate-800">#{customer.id.slice(-6).toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white overflow-hidden relative group">
                        <div className="absolute top-[-20%] right-[-20%] size-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-6 relative z-10">Premium Member Perks</h4>
                        <ul className="space-y-4 relative z-10">
                            {['Early Access to Drops', 'Concierge Styling', 'Lifetime Guarantee'].map((perk, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <span className="material-symbols-outlined text-purple-400 text-[18px]">verified</span>
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Statistics & Activity */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Performance Row */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-purple-500/5 border border-purple-50">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Lifetime Value</p>
                            <p className="text-3xl font-black text-[#a932bd] tracking-tighter">{customer.ltv}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-purple-500/5 border border-purple-50">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">AOV</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{customer.aov}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-xl shadow-purple-500/5 border border-purple-50">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Orders</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{customer.orders}</p>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-2xl shadow-purple-500/5 flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Purchase History</h3>
                            <button className="text-xs font-bold text-[#a932bd] uppercase tracking-widest hover:underline">Download Invoices</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-50 hover:border-purple-200 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-500 transition-colors">
                                            <span className="material-symbols-outlined">shopping_bag</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Silk Midnight Gown</p>
                                            <p className="text-xs text-slate-400">#ORD-992{i} · Oct {24 - i}, 2023</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">$1,200.00</p>
                                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Delivered</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
