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
            facebook: "https://www.facebook.com/tsgabrielle3",
            instagram: "https://www.instagram.com/tsgabrielle3",
            x: "https://x.com/tsgabrielle3",
            youtube: "https://www.youtube.com/@tsgabrielle3",
            tiktok: "https://www.tiktok.com/@tsgabrielle3",
            pinterest: "https://www.pinterest.com/tsgabrielle3/",
            linkedin: "https://www.linkedin.com/company/tsgabrielle/",
            snapchat: "https://www.snapchat.com/@tsgabrielle3"
        }
    });

    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFaviconFile(e.target.files[0]);
    };

    const handleFaviconUpload = async () => {
        if (!faviconFile) return;
        setUploading(true);
        const body = new FormData();
        body.append("file", faviconFile);

        try {
            const res = await fetch("/api/admin/config/favicon", {
                method: "POST",
                body,
            });
            const resultData = await res.json();
            if (resultData.faviconUrl) {
                setFormData({ ...formData, faviconUrl: resultData.faviconUrl });
            }
        } catch (err) {
            console.error(err);
        }
        setFaviconFile(null);
        setUploading(false);
    };
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

                    <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl shadow-sm space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Newsletter Section</h3>
                            <button
                                onClick={() => handleChange('newsletter_enabled', !formData.newsletter_enabled)}
                                className={`w-10 h-5 rounded-full transition-all relative ${formData.newsletter_enabled ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-3 bg-white rounded-full transition-all shadow-sm ${formData.newsletter_enabled ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Newsletter Headline</label>
                            <input type="text" value={formData.newsletter_title || "Stay Inspired"} onChange={(e) => handleChange('newsletter_title', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl shadow-sm space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold block mb-2">Site Favicon</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept=".ico,.png,.svg"
                            onChange={handleFaviconChange}
                            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-[#a932bd] file:text-white hover:file:bg-[#8b1a9b] cursor-pointer rounded file:rounded-full file:transition-all text-sm w-full max-w-[200px]"
                        />
                        <button
                            onClick={handleFaviconUpload}
                            disabled={!faviconFile || uploading}
                            className="px-6 py-2 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    {formData.faviconUrl && (
                        <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 mt-4">
                            Current: <code className="bg-white px-2 py-1 rounded shadow-sm text-xs opacity-75 lowercase tracking-normal font-mono">{formData.faviconUrl}</code>
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Link Columns</h3>
                    <button
                        onClick={() => {
                            const newCols = [...(formData.links_columns || []), { title: 'New Column', links: [] }];
                            handleChange('links_columns', newCols);
                        }}
                        className="px-4 py-2 border border-black/10 text-[9px] uppercase tracking-widest rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm"
                    >
                        Add Column
                    </button>
                </div>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {(formData.links_columns || []).map((col: any, colIdx: number) => (
                        <div key={colIdx} className="p-6 bg-neutral-50 border border-black/10 rounded-2xl space-y-4 relative group">
                            <button
                                onClick={() => {
                                    const newCols = formData.links_columns.filter((_: any, i: number) => i !== colIdx);
                                    handleChange('links_columns', newCols);
                                }}
                                className="absolute top-4 right-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                            <input
                                value={col.title}
                                onChange={(e) => {
                                    const newCols = [...formData.links_columns];
                                    newCols[colIdx].title = e.target.value;
                                    handleChange('links_columns', newCols);
                                }}
                                className="bg-transparent font-bold text-xs uppercase tracking-widest outline-none border-b border-black/5 pb-1 focus:border-[#a932bd] text-[#1a1a1a]"
                            />
                            <div className="space-y-2">
                                {col.links.map((link: any, linkIdx: number) => (
                                    <div key={linkIdx} className="flex gap-2">
                                        <input
                                            placeholder="Label"
                                            value={link.label}
                                            onChange={(e) => {
                                                const newCols = [...formData.links_columns];
                                                newCols[colIdx].links[linkIdx].label = e.target.value;
                                                handleChange('links_columns', newCols);
                                            }}
                                            className="w-1/3 bg-white border border-black/10 rounded-lg px-3 py-2 text-[10px] outline-none text-[#1a1a1a]"
                                        />
                                        <input
                                            placeholder="URL"
                                            value={link.url}
                                            onChange={(e) => {
                                                const newCols = [...formData.links_columns];
                                                newCols[colIdx].links[linkIdx].url = e.target.value;
                                                handleChange('links_columns', newCols);
                                            }}
                                            className="flex-grow bg-white border border-black/10 rounded-lg px-3 py-2 text-[10px] outline-none text-[#1a1a1a]"
                                        />
                                        <button
                                            onClick={() => {
                                                const newCols = [...formData.links_columns];
                                                newCols[colIdx].links = col.links.filter((_: any, i: number) => i !== linkIdx);
                                                handleChange('links_columns', newCols);
                                            }}
                                            className="text-[#1a1a1a]/40 hover:text-red-600 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-xs">close</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newCols = [...formData.links_columns];
                                        newCols[colIdx].links.push({ label: '', url: '' });
                                        handleChange('links_columns', newCols);
                                    }}
                                    className="text-[9px] uppercase tracking-widest text-[#a932bd] font-bold mt-2 hover:underline"
                                >
                                    + Add Link
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-neutral-50 border border-black/10 rounded-2xl shadow-sm ring-1 ring-black/5 space-y-6">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">Social Signatures</h3>
                    <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.keys(formData.socials).map((key) => (
                            <div key={key} className="space-y-2">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 ml-1">{key}</label>
                                <input
                                    type="text"
                                    value={formData.socials[key]}
                                    onChange={(e) => handleSocialChange(key, e.target.value)}
                                    placeholder={`https://${key}.com/...`}
                                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[10px] placeholder:opacity-40 outline-none focus:border-[#a932bd] text-[#1a1a1a]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
