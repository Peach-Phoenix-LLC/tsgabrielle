"use client";

import React, { useState, useEffect } from 'react';

export default function SeoAnalyticsSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        ga4_id: "",
        facebook_pixel: "",
        gsc_verification: "",
        robots_txt: "User-agent: *\nAllow: /",
        canonical_base: "https://tsgabrielle.us",
        og_image_url: "",
        sitemap_enabled: true
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">SEO & Analytics</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage your Digital Maison's global reach.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Meta Configuration'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-8">
                    <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl space-y-6 shadow-sm ring-1 ring-black/5">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Tracker Protocols</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">GA4 Measurement ID</label>
                                <input type="text" placeholder="G-XXXXXXXXXX" value={formData.ga4_id} onChange={(e) => handleChange('ga4_id', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs font-mono text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Facebook Pixel ID</label>
                                <input type="text" value={formData.facebook_pixel} onChange={(e) => handleChange('facebook_pixel', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs font-mono text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl space-y-6 shadow-sm ring-1 ring-black/5">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Identity Graph</h3>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Global OG Image URL</label>
                            <input type="text" value={formData.og_image_url} onChange={(e) => handleChange('og_image_url', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Robots.txt Architecture</label>
                        <textarea rows={8} value={formData.robots_txt} onChange={(e) => handleChange('robots_txt', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 font-mono text-xs resize-none text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                    </div>
                    <div className="flex justify-between items-center p-6 border border-black/10 rounded-xl bg-neutral-50 shadow-sm ring-1 ring-black/5">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Auto-generate Sitemap</span>
                        <button
                            onClick={() => handleChange('sitemap_enabled', !formData.sitemap_enabled)}
                            className={`w-10 h-5 rounded-full transition-all relative ${formData.sitemap_enabled ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                        >
                            <div className={`absolute top-1 size-3 bg-white rounded-full transition-all shadow-sm ${formData.sitemap_enabled ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
