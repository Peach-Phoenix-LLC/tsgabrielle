"use client";

import React, { useState, useEffect } from 'react';

export default function NotificationsSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        order_confirmation: { subject: "Order Received", enabled: true },
        welcome_email: { subject: "Welcome to the Maison", enabled: true },
        abandoned_cart: { delay: 1, enabled: false },
        newsletter_optin: { enabled: true },
        low_stock_alert: { threshold: 5, enabled: true }
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (path: string, key: string, value: any) => {
        setFormData({ ...formData, [path]: { ...formData[path], [key]: value } });
    };

    const handleToggle = (path: string) => {
        setFormData({ ...formData, [path]: { ...formData[path], enabled: !formData[path].enabled } });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">E-mail Notifications</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage customer touchpoints and internal alerts.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Protocols'}
                </button>
            </div>

            <div className="space-y-6 text-[#1a1a1a]">
                {[
                    { label: 'Order Confirmation', path: 'order_confirmation', type: 'email' },
                    { label: 'Welcome Narrative', path: 'welcome_email', type: 'email' },
                    { label: 'Abandoned Cart Pulse', path: 'abandoned_cart', type: 'pulse' },
                    { label: 'Low Stock Intelligence', path: 'low_stock_alert', type: 'alert' },
                ].map((item) => (
                    <div key={item.path} className="bg-neutral-50 border border-black/10 p-8 rounded-2xl shadow-sm ring-1 ring-black/5 hover:bg-neutral-100 transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">{item.label}</h3>
                            <button
                                onClick={() => handleToggle(item.path)}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData[item.path].enabled ? 'bg-[#a932bd]' : 'bg-black/10'}`}
                            >
                                <div className={`absolute top-1 size-4 bg-white rounded-full transition-all shadow-sm ${formData[item.path].enabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.type === 'email' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Subject Line</label>
                                    <input
                                        type="text"
                                        value={formData[item.path].subject}
                                        onChange={(e) => handleChange(item.path, 'subject', e.target.value)}
                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs focus:border-[#a932bd] outline-none text-[#1a1a1a]"
                                    />
                                </div>
                            )}
                            {item.path === 'abandoned_cart' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Delay (Hours)</label>
                                    <input
                                        type="number"
                                        value={formData[item.path].delay}
                                        onChange={(e) => handleChange(item.path, 'delay', parseInt(e.target.value))}
                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]"
                                    />
                                </div>
                            )}
                            {item.path === 'low_stock_alert' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40">Threshold (Units)</label>
                                    <input
                                        type="number"
                                        value={formData[item.path].threshold}
                                        onChange={(e) => handleChange(item.path, 'threshold', parseInt(e.target.value))}
                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#a932bd]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
