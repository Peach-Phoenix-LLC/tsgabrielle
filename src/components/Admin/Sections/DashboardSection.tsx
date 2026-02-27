"use client";

import React, { useState, useEffect } from 'react';

export default function DashboardSection({ stats }: { stats?: any }) {
    const [gaData, setGaData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGA = async () => {
            try {
                const res = await fetch('/api/admin/analytics/data');
                if (res.ok) {
                    const data = await res.json();
                    setGaData(data);
                }
            } catch (e) {
                console.error("Dashboard GA Error:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGA();
    }, []);

    const total7dVisitors = gaData?.dailyData?.reduce((acc: number, d: any) => acc + (parseInt(d.users) || 0), 0) || 0;
    const total7dRevenue = gaData?.dailyData?.reduce((acc: number, d: any) => acc + (parseFloat(d.revenue) || 0), 0) || 0;

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Maison Overview</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Live performance metrics and store status.</p>
                </div>
                {gaData?.activeUsersNow > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full animate-pulse">
                        <span className="size-2 bg-green-500 rounded-full" />
                        <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">{gaData.activeUsersNow} Active Users Now</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: '7d Revenue', value: total7dRevenue > 0 ? `$${total7dRevenue.toFixed(2)}` : (stats?.revenue || '$0.00'), icon: 'payments', trend: 'Live GA4' },
                    { label: '7d Visitors', value: total7dVisitors || '0', icon: 'visibility', trend: 'Live GA4' },
                    { label: 'AOV', value: stats?.aov || '$0.00', icon: 'analytics', trend: 'Stable' },
                    { label: 'Orders (All Time)', value: stats?.orders || '0', icon: 'local_shipping', trend: 'In Progress' },
                ].map((stat, i) => (
                    <div key={i} className="bg-neutral-50 border border-black/5 p-6 rounded-2xl hover:bg-neutral-100 transition-all group shadow-sm">
                        <span className="material-symbols-outlined text-[#1a1a1a]/20 mb-4 group-hover:text-[#a932bd] transition-colors">{stat.icon}</span>
                        <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-1">{stat.label}</p>
                        <p className="text-xl font-light text-[#1a1a1a]">{stat.value}</p>
                        <p className="text-[10px] mt-4 text-[#1a1a1a]/20 uppercase tracking-tighter font-bold">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="bg-neutral-50 border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Store Status</h3>
                    <span className="flex items-center gap-2 text-[10px] text-green-600 uppercase tracking-widest">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                        Operational
                    </span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-[11px] py-3 border-b border-black/5 text-[#1a1a1a]">
                        <span className="opacity-40">Storefront API</span>
                        <span className="text-green-600 font-medium">Stable (42ms)</span>
                    </div>
                    <div className="flex justify-between text-[11px] py-3 border-b border-black/5 text-[#1a1a1a]">
                        <span className="opacity-40">Payment Gateway</span>
                        <span className="text-green-600 font-medium">Connected</span>
                    </div>
                    <div className="flex justify-between text-[11px] py-3 text-[#1a1a1a]">
                        <span className="opacity-40">Print-on-Demand Connection</span>
                        <span className="text-green-600 font-medium">Synced</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
