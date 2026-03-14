"use client";

import React, { useState, useEffect } from 'react';
import ImagePicker from '../ImagePicker';

export default function HeroBannerSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        slides: [
            {
                headline: "2026 Official Catalogue",
                subtitle: "The House of tsgabrielle® represents a new era of high-end fashion.",
                badge: "Limited Edition",
                cta_text: "Discover",
                cta_url: "/shop",
                image_url: "",
                image_alt: ""
            }
        ],
        overlay_opacity: 0.4,
        layout_alignment: "center",
        fullscreen: true
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSlideChange = (index: number, key: string, value: any) => {
        const newSlides = [...formData.slides];
        newSlides[index] = { ...newSlides[index], [key]: value };
        setFormData({ ...formData, slides: newSlides });
    };

    const addSlide = () => {
        setFormData({
            ...formData,
            slides: [...formData.slides, { headline: '', subtitle: '', badge: '', cta_text: '', cta_url: '', image_url: '', image_alt: '' }]
        });
    };

    const removeSlide = (index: number) => {
        if (formData.slides.length <= 1) return;
        const newSlides = formData.slides.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, slides: newSlides });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Hero Orchestration</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage the multidimensional entry points of the storefront.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Appearance'}
                </button>
            </div>

            <div className="space-y-16">
                {/* Slides Management */}
                <div className="space-y-12">
                    {formData.slides?.map((slide: any, index: number) => (
                        <div key={index} className="relative p-10 bg-neutral-50/30 border border-black/5 rounded-3xl space-y-10 group">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd]">Slide {index + 1}</span>
                                <button
                                    onClick={() => removeSlide(index)}
                                    className="text-[9px] uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Remove Slide
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Main Headline</label>
                                    <input
                                        type="text"
                                        value={slide.headline}
                                        onChange={(e) => handleSlideChange(index, 'headline', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] text-[#1a1a1a] text-sm"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Featured Badge</label>
                                    <input
                                        type="text"
                                        value={slide.badge}
                                        onChange={(e) => handleSlideChange(index, 'badge', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] text-[#1a1a1a] text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Subtitle / Body Text</label>
                                <textarea
                                    rows={2}
                                    value={slide.subtitle}
                                    onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                                    className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a932bd] resize-none text-[#1a1a1a] text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA Label</label>
                                    <input type="text" value={slide.cta_text} onChange={(e) => handleSlideChange(index, 'cta_text', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">CTA URL</label>
                                    <input type="text" value={slide.cta_url} onChange={(e) => handleSlideChange(index, 'cta_url', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-6 py-4 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                                </div>
                            </div>

                            <ImagePicker
                                label="Slide Backdrop"
                                value={slide.image_url || ''}
                                altValue={slide.image_alt || ''}
                                onChange={(url) => handleSlideChange(index, 'image_url', url)}
                                onAltChange={(alt) => handleSlideChange(index, 'image_alt', alt)}
                            />
                        </div>
                    ))}

                    <button
                        onClick={addSlide}
                        className="w-full py-6 border-2 border-dashed border-black/10 rounded-3xl text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/30 hover:border-[#a932bd]/30 hover:text-[#a932bd] transition-all"
                    >
                        + Add Celestial Slide
                    </button>
                </div>

                {/* Global Settings */}
                <div className="bg-neutral-50/50 border border-black/5 p-10 rounded-3xl shadow-sm space-y-8 ring-1 ring-black/5">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/60">Global Layout</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center text-[#1a1a1a]">
                                <span className="text-[10px] uppercase tracking-widest opacity-40">Overlay Intensity</span>
                                <span className="text-[10px] font-bold">{(formData.overlay_opacity * 100).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.1"
                                value={formData.overlay_opacity}
                                onChange={(e) => handleChange('overlay_opacity', parseFloat(e.target.value))}
                                className="w-full accent-[#a932bd]"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase tracking-widest opacity-40 text-[#1a1a1a]">Typography Alignment</span>
                                <div className="flex gap-2">
                                    {['left', 'center', 'right'].map(align => (
                                        <button
                                            key={align}
                                            onClick={() => handleChange('layout_alignment', align)}
                                            className={`px-4 py-2 text-[9px] uppercase tracking-widest rounded-full border transition-all ${formData.layout_alignment === align ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm' : 'border-black/10 opacity-40 text-[#1a1a1a] hover:opacity-100'}`}
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
        </div>
    );
}
