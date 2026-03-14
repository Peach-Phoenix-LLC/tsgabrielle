"use client";

import React, { useState, useEffect } from 'react';

const MOCK_VISITORS = [
    { id: 1, country: 'FR', city: 'Paris', page: '/product/12', device: 'iPhone 15 Pro', duration: '2m 14s', flag: '🇫🇷' },
    { id: 2, country: 'US', city: 'New York', page: '/', device: 'MacBook Air', duration: '45s', flag: '🇺🇸' },
    { id: 3, country: 'GB', city: 'London', page: '/shop', device: 'iPad Pro', duration: '5m 30s', flag: '🇬🇧' },
    { id: 4, country: 'JP', city: 'Tokyo', page: '/collections', device: 'Android', duration: '12m 05s', flag: '🇯🇵' },
    { id: 5, country: 'IT', city: 'Milan', page: '/about', device: 'iPhone 14', duration: '1m 20s', flag: '🇮🇹' },
];

export default function ConnectionsSection() {
    const [visitors, setVisitors] = useState(MOCK_VISITORS);
    const [stats, setStats] = useState({
        active: 142,
        peakToday: 890,
        avgDuration: '4m 32s',
        conversion: '3.2%'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate random traffic updates
            setStats(prev => ({
                ...prev,
                active: prev.active + (Math.random() > 0.5 ? 1 : -1)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Maison Connections</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Real-time global activity and visitor intelligence.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest text-[#a932bd] font-bold">Live Pulse</span>
                        <div className="flex items-center gap-2">
                            <span className="size-2 bg-[#a932bd] rounded-full animate-ping" />
                            <span className="text-xl font-light text-[#1a1a1a]">{stats.active} Active Access</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Peak Access TODAY', value: stats.peakToday, icon: 'trending_up' },
                    { label: 'Avg Session', value: stats.avgDuration, icon: 'timer' },
                    { label: 'Conversion Rate', value: stats.conversion, icon: 'shopping_bag' }
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-neutral-50 border border-black/5 rounded-2xl shadow-sm ring-1 ring-black/5">
                        <span className="material-symbols-outlined text-[#1a1a1a]/20 mb-3">{stat.icon}</span>
                        <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-1">{stat.label}</p>
                        <p className="text-xl font-light text-[#1a1a1a]">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <div className="px-8 py-6 border-b border-black/5 bg-neutral-50 flex justify-between items-center">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Session Live Feed</h3>
                    <span className="text-[10px] text-[#1a1a1a]/40">Last updated: Just now</span>
                </div>
                <table className="w-full text-left">
                    <thead className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/30 border-b border-black/10 bg-neutral-50/50">
                        <tr>
                            <th className="px-8 py-4">Visitor Origin</th>
                            <th className="px-8 py-4">Active View</th>
                            <th className="px-8 py-4">Device Architecture</th>
                            <th className="px-8 py-4 text-right">Stay</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-[#1a1a1a]">
                        {visitors.map((visitor) => (
                            <tr key={visitor.id} className="border-b border-black/5 hover:bg-neutral-50 transition-colors group">
                                <td className="px-8 py-6 font-medium">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{visitor.flag}</span>
                                        <div>
                                            <p>{visitor.city}</p>
                                            <p className="text-[9px] text-[#1a1a1a]/30 uppercase tracking-tighter">{visitor.country}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-black/5 rounded-full text-[10px] lowercase tracking-tight font-mono">
                                        {visitor.page}
                                    </span>
                                </td>
                                <td className="px-8 py-6 opacity-40 font-light italic">{visitor.device}</td>
                                <td className="px-8 py-6 text-right font-mono text-[#a932bd]">{visitor.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-neutral-50 text-center border-t border-black/5">
                    <button className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 hover:text-[#a932bd] transition-colors">View all live traffic telemetry</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-[#1a1a1a] text-white rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="material-symbols-outlined text-9xl">public</span>
                    </div>
                    <h3 className="text-sm uppercase tracking-widest font-bold">Global Presence</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'France', share: '45%', color: 'bg-blue-500' },
                            { name: 'United States', share: '32%', color: 'bg-red-500' },
                            { name: 'United Kingdom', share: '12%', color: 'bg-white' },
                            { name: 'Other', share: '11%', color: 'bg-gray-500' }
                        ].map((c) => (
                            <div key={c.name} className="space-y-1">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-60">
                                    <span>{c.name}</span>
                                    <span>{c.share}</span>
                                </div>
                                <div className="h-0.5 w-full bg-white/10 rounded-full">
                                    <div className={`h-full ${c.color} rounded-full`} style={{ width: c.share }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-50 border border-black/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4">
                    <div className="size-16 rounded-full bg-[#a932bd]/10 flex items-center justify-center text-[#a932bd]">
                        <span className="material-symbols-outlined text-3xl">add_chart</span>
                    </div>
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Intelligence Sync</h3>
                    <p className="text-[10px] text-[#1a1a1a]/40 max-w-[200px]">Connecting to Google Analytics 4 and Facebook Pixel for deeper audience synthesis.</p>
                    <button className="px-6 py-2 border border-black/10 rounded-full text-[9px] uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">Sync Metrics</button>
                </div>
            </div>
        </div>
    );
}
