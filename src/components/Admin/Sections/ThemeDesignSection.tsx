"use client";

import React, { useState, useEffect } from 'react';

export default function ThemeDesignSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        colors: {
            primary: "#a932bd",
            secondary: "#d4af37",
            background: "#ffffff",
            text: "#1a1a1a",
            accent: "#a932bd",
            scarcity: "#fef08a"
        },
        styles: {
            border_radius: "4px",
            card_style: "glass",
            button_style: "pill",
            dark_mode: false,
            heading_font: 'Inter',
            body_font: 'Roboto'
        }
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleColorChange = (key: string, value: string) => {
        setFormData({ ...formData, colors: { ...formData.colors, [key]: value } });
    };

    const handleStyleChange = (key: string, value: any) => {
        setFormData({ ...formData, styles: { ...formData.styles, [key]: value } });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Theme & Design</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">The visual soul of the Maison.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Update Visuals'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-10">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Palette Master</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {Object.keys(formData.colors).map((key) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 border border-black/10 rounded-xl group hover:border-[#a932bd]/20 transition-all shadow-sm">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">{key.replace('_', ' ')}</p>
                                    <p className="text-[10px] text-[#1a1a1a]/40 mt-1 uppercase font-mono">{formData.colors[key]}</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="color"
                                        value={formData.colors[key]}
                                        onChange={(e) => handleColorChange(key, e.target.value)}
                                        className="size-10 bg-transparent border-none cursor-pointer ring-1 ring-black/10 rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-10">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Structural DNA</h3>
                    <div className="bg-neutral-50 border border-black/10 p-8 rounded-2xl space-y-8 shadow-sm ring-1 ring-black/5">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 underline underline-offset-4 decoration-black/5">Border Radius (px)</label>
                            <div className="flex gap-4 items-center">
                                <input type="range" min="0" max="40" value={parseInt(formData.styles.border_radius)} onChange={(e) => handleStyleChange('border_radius', `${e.target.value}px`)} className="flex-grow accent-[#a932bd]" />
                                <span className="text-xs font-mono font-bold text-[#1a1a1a]">{formData.styles.border_radius}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 underline underline-offset-4 decoration-black/5">Button Architecture</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['pill', 'rounded', 'square'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleStyleChange('button_style', s)}
                                        className={`py-3 text-[10px] uppercase tracking-widest rounded-lg border transition-all ${formData.styles.button_style === s ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm' : 'bg-white border-black/10 text-[#1a1a1a]/40'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 underline underline-offset-4 decoration-black/5">Heading Font</label>
                                <select value={formData.styles.heading_font} onChange={(e) => handleStyleChange('heading_font', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] appearance-none text-[#1a1a1a]">
                                    <option value="Inter">Inter</option>
                                    <option value="Lato Light">Lato Light</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Outfit">Outfit</option>
                                    <option value="Playfair Display">Playfair Display</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 underline underline-offset-4 decoration-black/5">Body Font</label>
                                <select value={formData.styles.body_font} onChange={(e) => handleStyleChange('body_font', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] appearance-none text-[#1a1a1a]">
                                    <option value="Inter">Inter</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Outfit">Outfit</option>
                                    <option value="Lato">Lato</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-black/5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Global Dark Mode</span>
                            <button
                                onClick={() => handleStyleChange('dark_mode', !formData.styles.dark_mode)}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.styles.dark_mode ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-4 bg-white rounded-full transition-all shadow-sm ${formData.styles.dark_mode ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
