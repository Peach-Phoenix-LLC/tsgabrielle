"use client";

import React, { useState, useEffect } from 'react';

export default function SiteSettingsSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        brand_name: "tsgabrielle®",
        tagline: "The French Trans Touch™",
        logo_url: "",
        contact_email: "",
        currency: "USD",
        timezone: "UTC",
        language: "en",
        seo_defaults: { title: "", desc: "" },
        maintenance_mode: false
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Site Settings</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Core brand and operational configurations.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50"
                >
                    {saving ? 'Syncing...' : 'Save Configuration'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Brand Name</label>
                        <input
                            type="text"
                            value={formData.brand_name}
                            onChange={(e) => handleChange('brand_name', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] transition-colors text-[#1a1a1a]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Tagline</label>
                        <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] transition-colors text-[#1a1a1a]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Brand Logo URL</label>
                        <input
                            type="text"
                            value={formData.logo_url}
                            onChange={(e) => handleChange('logo_url', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] transition-colors text-[#1a1a1a]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Contact Email</label>
                        <input
                            type="email"
                            value={formData.contact_email}
                            onChange={(e) => handleChange('contact_email', e.target.value)}
                            className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] transition-colors text-[#1a1a1a]"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] mb-2">SEO Defaults</h4>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Default Title</label>
                            <input
                                type="text"
                                value={formData.seo_defaults.title}
                                onChange={(e) => handleChange('seo_defaults', { ...formData.seo_defaults, title: e.target.value })}
                                className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] transition-colors text-[#1a1a1a]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Default Description</label>
                            <textarea
                                value={formData.seo_defaults.desc}
                                onChange={(e) => handleChange('seo_defaults', { ...formData.seo_defaults, desc: e.target.value })}
                                className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] resize-none transition-colors text-[#1a1a1a]"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Currency</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => handleChange('currency', e.target.value)}
                                className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#a932bd] transition-colors appearance-none text-[#1a1a1a]"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Language</label>
                            <select
                                value={formData.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#a932bd] transition-colors appearance-none text-[#1a1a1a]"
                            >
                                <option value="en">English</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Timezone</label>
                            <select
                                value={formData.timezone}
                                onChange={(e) => handleChange('timezone', e.target.value)}
                                className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#a932bd] transition-colors appearance-none text-[#1a1a1a]"
                            >
                                <option value="UTC">UTC</option>
                                <option value="EST">EST</option>
                                <option value="PST">PST</option>
                                <option value="CET">CET</option>
                            </select>
                        </div>
                    </div>

                    <div className="p-8 bg-neutral-50 border border-black/5 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Maintenance Mode</h4>
                                <p className="text-[10px] text-[#1a1a1a]/30 mt-1">Take the store offline for updates.</p>
                            </div>
                            <button
                                onClick={() => handleChange('maintenance_mode', !formData.maintenance_mode)}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.maintenance_mode ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-4 bg-white rounded-full transition-all shadow-sm ${formData.maintenance_mode ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
