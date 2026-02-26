"use client";

import React, { useState, useEffect } from 'react';

export default function CheckoutSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        guest_checkout: true,
        require_phone: false,
        coupons_enabled: true,
        gift_cards: false,
        min_order_value: 0,
        free_shipping_threshold: 150,
        tax_rate: 0,
        order_prefix: "TSG-",
        thank_you_message: "Welcome to the Amethyst Era."
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Checkout Logic</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Configure the final steps of the customer journey.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Rules'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-6">
                    {[
                        { label: 'Allow Guest Checkout', key: 'guest_checkout' },
                        { label: 'Require Phone Number', key: 'require_phone' },
                        { label: 'Enable Promo Codes', key: 'coupons_enabled' },
                        { label: 'Enable Gift Cards', key: 'gift_cards' },
                    ].map((opt) => (
                        <div key={opt.key} className="flex justify-between items-center p-6 bg-neutral-50 border border-black/10 rounded-2xl group transition-all hover:bg-neutral-100 shadow-sm">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">{opt.label}</span>
                            <button
                                onClick={() => handleChange(opt.key, !formData[opt.key])}
                                className={`w-10 h-5 rounded-full transition-all relative ${formData[opt.key] ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-3 bg-white rounded-full transition-all shadow-sm ${formData[opt.key] ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-neutral-50 border border-black/10 p-8 rounded-2xl space-y-6 shadow-sm ring-1 ring-black/5">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Free Shipping Threshold ($)</label>
                            <input type="number" value={formData.free_shipping_threshold} onChange={(e) => handleChange('free_shipping_threshold', parseInt(e.target.value))} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Order Prefix</label>
                            <input type="text" value={formData.order_prefix} onChange={(e) => handleChange('order_prefix', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#a932bd]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Post-Checkout Message</label>
                            <textarea value={formData.thank_you_message} onChange={(e) => handleChange('thank_you_message', e.target.value)} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs resize-none text-[#1a1a1a] outline-none focus:border-[#a932bd]" rows={3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
