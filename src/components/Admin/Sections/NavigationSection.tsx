"use client";

import React, { useState, useEffect } from 'react';

export default function NavigationSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        announcement: {
            text: "Free complementary shipping for the Amethyst Era.",
            bg_color: "#a932bd",
            text_color: "#ffffff",
            is_active: true
        },
        header: {
            is_sticky: true,
            is_transparent: true,
            links: [
                { label: 'Shop', url: '/shop' },
                { label: 'Collections', url: '/collections' },
                { label: 'About', url: '/about' }
            ]
        }
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (path: string, value: any) => {
        const keys = path.split('.');
        const newData = { ...formData };
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setFormData(newData);
    };

    const addLink = () => {
        const newLinks = [...formData.header.links, { label: '', url: '' }];
        handleChange('header.links', newLinks);
    };

    const removeLink = (index: number) => {
        const newLinks = formData.header.links.filter((_: any, i: number) => i !== index);
        handleChange('header.links', newLinks);
    };

    const updateLink = (index: number, key: string, value: string) => {
        const newLinks = formData.header.links.map((link: any, i: number) => i === index ? { ...link, [key]: value } : link);
        handleChange('header.links', newLinks);
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Navigation & Announcement</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Configure how users move through the Maison.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Navigation'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-8">
                    <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl space-y-6 shadow-sm ring-1 ring-black/5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Announcement Bar</h3>
                            <button
                                onClick={() => handleChange('announcement.is_active', !formData.announcement.is_active)}
                                className={`w-10 h-5 rounded-full transition-all relative ${formData.announcement.is_active ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-3 bg-white rounded-full transition-all shadow-sm ${formData.announcement.is_active ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Announcement Text</label>
                            <input type="text" value={formData.announcement.text} onChange={(e) => handleChange('announcement.text', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Background Hex</label>
                                <div className="flex gap-2">
                                    <input type="color" value={formData.announcement.bg_color} onChange={(e) => handleChange('announcement.bg_color', e.target.value)} className="bg-transparent border-none rounded-sm size-8 cursor-pointer ring-1 ring-black/10" />
                                    <input type="text" value={formData.announcement.bg_color} onChange={(e) => handleChange('announcement.bg_color', e.target.value)} className="bg-white border border-black/10 rounded-lg px-2 text-[10px] flex-grow font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Text Hex</label>
                                <div className="flex gap-2">
                                    <input type="color" value={formData.announcement.text_color} onChange={(e) => handleChange('announcement.text_color', e.target.value)} className="bg-transparent border-none rounded-sm size-8 cursor-pointer ring-1 ring-black/10" />
                                    <input type="text" value={formData.announcement.text_color} onChange={(e) => handleChange('announcement.text_color', e.target.value)} className="bg-white border border-black/10 rounded-lg px-2 text-[10px] flex-grow font-mono" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Header Links</h3>
                        <button onClick={addLink} className="px-4 py-2 border border-black/10 text-[9px] uppercase tracking-widest rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">Add Link</button>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {formData.header.links.map((link: any, i: number) => (
                            <div key={i} className="flex gap-2 items-center group">
                                <input placeholder="Label" value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} className="w-1/3 bg-neutral-50 border border-black/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                                <input placeholder="URL (e.g. /shop)" value={link.url} onChange={(e) => updateLink(i, 'url', e.target.value)} className="flex-grow bg-neutral-50 border border-black/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                                <button onClick={() => removeLink(i)} className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity text-[#1a1a1a]">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
