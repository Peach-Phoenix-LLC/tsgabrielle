"use client";

import React, { useState, useEffect } from 'react';

export default function FooterSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        tagline: "Designed in France with Love.",
        copyright: "© 2026 tsgabrielle® Official",
        links_columns: [
            { title: 'Info', links: [{ label: 'Contact', url: '/contact' }] }
        ],
        socials: {
            instagram: "https://instagram.com/tsgabrielle",
            tiktok: "",
            pinterest: "",
            threads: ""
        }
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSocialChange = (key: string, value: string) => {
        setFormData({ ...formData, socials: { ...formData.socials, [key]: value } });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Footer Master</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage the foundational links and identities.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Footer'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-10">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Footer Tagline</label>
                        <input type="text" value={formData.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Copyright Line</label>
                        <input type="text" value={formData.copyright} onChange={(e) => handleChange('copyright', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                    </div>
                </div>

                <div className="space-y-8 p-8 bg-neutral-50 border border-black/10 rounded-2xl shadow-sm ring-1 ring-black/5">
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-4 text-[#1a1a1a]">Social Signatures</h3>
                    {Object.keys(formData.socials).map((key) => (
                        <div key={key} className="space-y-2">
                            <label className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 ml-1">{key}</label>
                            <input
                                type="text"
                                value={formData.socials[key]}
                                onChange={(e) => handleSocialChange(key, e.target.value)}
                                placeholder={`https://${key}.com/...`}
                                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs placeholder:opacity-40 outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
