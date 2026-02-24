"use client";

import React from 'react';

interface Customer {
    id: string;
    name: string;
    email: string;
    lastActive: string;
    avatar?: string;
    tier: 'Platinum' | 'Gold' | 'Silver' | 'Guest';
}

interface CustomersTableProps {
    customers: Customer[];
    onViewProfile: (id: string) => void;
}

const TIER_CLASSES = {
    Platinum: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 font-black',
    Gold: 'text-amber-500 font-bold',
    Silver: 'text-slate-400 font-medium',
    Guest: 'text-slate-300'
};

export default function CustomersTable({ customers, onViewProfile }: CustomersTableProps) {
    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-xl shadow-purple-500/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200/60 bg-white/40">
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tier</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Active</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {customers.map((c) => (
                            <tr key={c.id} className="hover:bg-purple-500/5 transition-colors group">
                                <td className="p-4 pl-5">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 overflow-hidden border-2 border-white shadow-sm">
                                            {c.avatar
                                                ? <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                                                : c.name.charAt(0)
                                            }
                                        </div>
                                        <span className="text-sm text-slate-900 font-bold">{c.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-500">{c.email}</td>
                                <td className="p-4">
                                    <span className={`text-[11px] uppercase tracking-widest ${TIER_CLASSES[c.tier]}`}>
                                        {c.tier}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400 font-medium">{c.lastActive}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => onViewProfile(c.id)}
                                        className="px-4 py-2 bg-white text-[#a932bd] border border-[#a932bd]/20 hover:bg-[#a932bd] hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm group-hover:shadow-md"
                                    >
                                        View Profile
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
