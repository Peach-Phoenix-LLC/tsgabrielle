"use client";

import React from 'react';

interface AdminHeaderProps {
    title: string;
    description: string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function AdminHeader({ title, description, searchQuery, setSearchQuery }: AdminHeaderProps) {
    return (
        <header className="flex justify-between items-end mb-2">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
                <p className="text-slate-500 mt-1">{description}</p>
            </div>
            <div className="flex gap-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                    <input
                        className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:border-[#a932bd] focus:ring-[#a932bd]/20 w-64 text-sm transition-all shadow-sm outline-none"
                        placeholder="Search..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#a932bd] hover:border-[#a932bd] transition-colors shadow-sm relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
