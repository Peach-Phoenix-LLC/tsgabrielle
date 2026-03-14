"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'orders', label: 'Orders', icon: 'shopping_bag' },
    { id: 'products', label: 'Products', icon: 'checkroom' },
    { id: 'collections', label: 'Collections', icon: 'filter_none' },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
];

interface AdminSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
    const { data: session } = useSession();

    const userName = session?.user?.name ?? 'Admin';
    const userImage = session?.user?.image ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT9vy-FMmgpcTQoIuMPxR-IUhY_Luk0_jDP-ieCyHh3svX0pw4oaGSCiOlzMTADN3OjpKfwg-K9vIAveqk1UdLjjIO6sPjvR5bueLuh5V_7QAcN1p48HljkvJwD-AuNDtm8DlDZXiaYf2UlnVpEeFT7eWO7I_Tn_gfAXmjq50Rgt_haVCYzWYX994mgo9UlkBeBK6QMxPciQnJ1Ry-Umzv6No9zzKdR06xhuWRgGVfkQ9qUwtAx1zfw5gsSgomc-E3UJMwtnFf-4-0';

    return (
        <aside className="w-72 h-screen flex flex-col justify-between py-8 px-6 bg-white/80 backdrop-blur-xl border-r border-white/50 relative z-20 shadow-2xl shadow-purple-500/5">
            <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-[#a932bd] to-[#e0c3fc] flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                        <span className="material-symbols-outlined text-lg">diamond</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">tsgabrielle<sup>&reg;</sup></h1>
                </div>

                {/* Navigation Menu */}
                <nav className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${activeTab === item.id
                                ? 'bg-[#a932bd]/10 text-[#a932bd] font-semibold'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                }`}
                        >
                            {activeTab === item.id && (
                                <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            )}
                            <span className={`material-symbols-outlined ${activeTab === item.id ? 'filled' : ''}`}>
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Maintenance Mode Toggle */}
            <div className="px-4 py-4 border-t border-white/50 mb-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            onChange={(e) => {
                                fetch('/api/settings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ enabled: e.target.checked })
                                });
                            }}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a932bd]"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#a932bd] transition-colors">Maintenance</span>
                </label>
            </div>

            {/* User Profile */}
            <div
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/40 border border-white/60 backdrop-blur-sm cursor-pointer hover:bg-white/60 transition group"
                onClick={() => {
                    if (confirm('Sign out?')) signOut({ callbackUrl: '/' });
                }}
            >
                <div className="relative">
                    <img
                        alt={`Portrait of ${userName}`}
                        className="size-10 rounded-full bg-slate-200 object-cover ring-2 ring-white"
                        src={userImage}
                    />
                    <div className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold text-slate-900 truncate">{userName}</span>
                    <span className="text-xs text-slate-500">Admin</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 ml-auto group-hover:text-red-500 transition-colors">logout</span>
            </div>
        </aside>
    );
}
