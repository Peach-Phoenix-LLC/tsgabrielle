"use client";

import React, { useState, useEffect } from 'react';

export default function AnalyticsSection() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('/api/admin/analytics/data');
                const result = await res.json();
                if (res.ok) {
                    setData(result);
                } else {
                    setError(result.error || 'Failed to fetch analytics');
                }
            } catch (err) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="size-10 border-2 border-black/5 border-t-[#a932bd] rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest opacity-40">Synthesizing Data Insights...</p>
        </div>
    );

    if (error) return (
        <div className="p-12 border border-dashed border-red-200 rounded-2xl bg-red-50 text-center">
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <p className="text-[10px] mt-2 opacity-50 uppercase tracking-widest">Verify GA4_PROPERTY_ID and credentials</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Analytics Intelligence</h2>
                <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Surface-level insights from GA4 integration.</p>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 border border-black/5 p-8 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Live Now</p>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-light text-[#a932bd]">{data.activeUsersNow || 0}</span>
                        <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold pb-2 animate-pulse">Active Users</span>
                    </div>
                </div>
                <div className="bg-neutral-50 border border-black/5 p-8 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Conversions (7d)</p>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-light">{data.dailyData?.reduce((acc: any, d: any) => acc + (parseInt(d.users) || 0), 0) || 0}</span>
                        <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold pb-2">Visitors</span>
                    </div>
                </div>
                <div className="bg-neutral-50 border border-black/5 p-8 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Revenue (Estimated 7d)</p>
                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-light">${data.dailyData?.reduce((acc: any, d: any) => acc + (parseFloat(d.revenue) || 0), 0).toFixed(2) || '0.00'}</span>
                        <span className="text-[10px] text-primary opacity-60 uppercase tracking-widest font-bold pb-2">USD</span>
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Top Products */}
                <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-black/5 bg-neutral-50">
                        <h3 className="text-[10px] uppercase tracking-widest font-bold">Top 5 Most Viewed Products</h3>
                    </div>
                    <div className="divide-y divide-black/5">
                        {data.topProducts?.map((p: any, i: number) => (
                            <div key={i} className="px-6 py-4 flex justify-between items-center group hover:bg-neutral-50 transition-colors">
                                <span className="text-[11px] font-medium text-[#1a1a1a]">{p.name}</span>
                                <span className="text-[10px] text-[#a932bd] font-bold">{p.views} Views</span>
                            </div>
                        ))}
                        {(!data.topProducts || data.topProducts.length === 0) && (
                            <div className="p-8 text-center text-xs opacity-20 italic">No data available for this timeframe.</div>
                        )}
                    </div>
                </div>

                {/* Daily Engagement */}
                <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-black/5 bg-neutral-50">
                        <h3 className="text-[10px] uppercase tracking-widest font-bold">7-Day Engagement Trend</h3>
                    </div>
                    <div className="p-6">
                        <div className="h-48 flex items-end gap-2">
                            {data.dailyData?.map((day: any, i: number) => {
                                const maxUsers = Math.max(...data.dailyData.map((d: any) => parseInt(d.users) || 1));
                                const height = ((parseInt(day.users) || 0) / maxUsers) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="w-full relative bg-neutral-100 rounded-t-lg overflow-hidden h-full">
                                            <div
                                                className="absolute bottom-0 left-0 right-0 bg-[#a932bd]/20 group-hover:bg-[#a932bd]/40 transition-all rounded-t-lg"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                        <span className="text-[8px] uppercase tracking-tighter opacity-40">{day.date.slice(4, 6)}/{day.date.slice(6)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
