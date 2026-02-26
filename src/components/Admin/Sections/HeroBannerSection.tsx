"use client";

import React, { useState, useEffect } from 'react';

export default function HeroBannerSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        headline: "2026 Official Catalogue",
        subtitle: "The House of tsgabrielle® represents a new era of high-end fashion.",
        badge: "Limited Edition",
        cta1_text: "Discover",
        cta1_url: "/shop",
        cta2_text: "About",
        cta2_url: "/about",
        background_type: "image",
        background_url: "",
        overlay_opacity: 0.4,
        layout_alignment: "center",
        fullscreen: true
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Hero Banner</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage the main entry point of the storefront.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50"
                >
                    {saving ? 'Syncing...' : 'Save Appearance'}
                </button>
            </div>

            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Main Headline</label>
                        <input
                            type="text"
                            value={formData.headline}
                            onChange={(e) => handleChange('headline', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Featured Badge</label>
                        <input
                            type="text"
                            value={formData.badge}
                            onChange={(e) => handleChange('badge', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Subtitle / Body Text</label>
                    <textarea
                        rows={3}
                        value={formData.subtitle}
                        onChange={(e) => handleChange('subtitle', e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] resize-none text-[#1a1a1a]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA 1 Label</label>
                                <input type="text" value={formData.cta1_text} onChange={(e) => handleChange('cta1_text', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA 1 URL</label>
                                <input type="text" value={formData.cta1_url} onChange={(e) => handleChange('cta1_url', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA 2 Label</label>
                                <input type="text" value={formData.cta2_text} onChange={(e) => handleChange('cta2_text', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA 2 URL</label>
                                <input type="text" value={formData.cta2_url} onChange={(e) => handleChange('cta2_url', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Background Type</label>
                                <select value={formData.background_type} onChange={(e) => handleChange('background_type', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-4 text-xs text-[#1a1a1a] outline-none appearance-none focus:border-[#a932bd]">
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                    <option value="color">Solid Color</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Background URL/Value</label>
                                <input type="text" value={formData.background_url} onChange={(e) => handleChange('background_url', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 border border-black/5 p-8 rounded-2xl shadow-sm space-y-8 ring-1 ring-black/5">
                        <div className="flex justify-between items-center text-[#1a1a1a]">
                            <span className="text-[10px] uppercase tracking-widest opacity-40">Overlay Opacity</span>
                            <span className="text-[10px] font-bold">{(formData.overlay_opacity * 100).toFixed(0)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.1"
                            value={formData.overlay_opacity}
                            onChange={(e) => handleChange('overlay_opacity', parseFloat(e.target.value))}
                            className="w-full accent-[#a932bd]"
                        />

                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-widest opacity-40 text-[#1a1a1a]">Fullscreen</span>
                            <button
                                onClick={() => handleChange('fullscreen', !formData.fullscreen)}
                                className={`w-10 h-5 rounded-full transition-all relative ${formData.fullscreen ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-3 bg-white rounded-full transition-all shadow-sm ${formData.fullscreen ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-widest opacity-40 text-[#1a1a1a]">Alignment</span>
                            <div className="flex gap-2">
                                {['left', 'center', 'right'].map(align => (
                                    <button
                                        key={align}
                                        onClick={() => handleChange('layout_alignment', align)}
                                        className={`px-3 py-1 text-[9px] uppercase tracking-widest rounded-full border transition-all ${formData.layout_alignment === align ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm' : 'border-black/10 opacity-40 text-[#1a1a1a] hover:opacity-100'}`}
                                    >
                                        {align}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
