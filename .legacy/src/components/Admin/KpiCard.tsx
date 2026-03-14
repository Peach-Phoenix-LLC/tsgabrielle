"use client";

import React from 'react';

interface KpiCardProps {
    label: string;
    value: string;
    delta: string;
    icon: string;
    variant: 'purple' | 'blue' | 'green';
}

export default function KpiCard({ label, value, delta, icon, variant }: KpiCardProps) {
    const iconStyles = {
        purple: 'bg-purple-50 text-purple-600',
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600'
    };

    return (
        <div className="relative bg-white rounded-2xl p-6 shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all border border-transparent hover:border-purple-200 group overflow-hidden">
            {/* Holographic Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-white to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-2 rounded-lg ${iconStyles[variant]}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{delta}</span>
            </div>

            <div className="flex flex-col relative z-10">
                <span className="text-slate-500 text-sm font-medium">{label}</span>
                <h3 className={`text-4xl font-extrabold mt-1 tracking-tight ${variant === 'purple' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400' : 'text-slate-900'}`}>{value}</h3>
            </div>
        </div>
    );
}
