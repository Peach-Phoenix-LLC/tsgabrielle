'use client';

import React, { useState } from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import './contact.css';

export default function ContactPage() {
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate success for the prototype
        setStatus('success');
    };

    return (
        <main className="min-h-screen bg-white text-black font-sans overflow-hidden">
            <ModernNavbar />

            {/* Background Accent */}
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#a932bd] opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-48 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">

                    {/* Left Side: Contact Information */}
                    <div className="space-y-16">
                        <header className="space-y-6">
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold">L'Assistance</p>
                            <h1 className="text-7xl font-serif tracking-tight">Connect With Our Atelier</h1>
                            <p className="text-sm text-slate-600 font-light max-w-md leading-relaxed uppercase tracking-[0.2em]">
                                Whether you seek personal styling, order assistance, or a collaboration dialogue—we are at your service.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black">General Inquiries</h3>
                                <p className="text-sm font-light text-slate-600 hover:text-[#a932bd] transition-colors cursor-pointer">atelier@tsgabrielle.us</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black">Global Press</h3>
                                <p className="text-sm font-light text-slate-600 hover:text-[#a932bd] transition-colors cursor-pointer">press@tsgabrielle.us</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black">Paris Office</h3>
                                <p className="text-sm font-light text-slate-600 leading-relaxed uppercase tracking-widest">
                                    75001 Paris,<br />Place Vendôme
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black">Concierge Hours</h3>
                                <p className="text-sm font-light text-slate-600 leading-relaxed uppercase tracking-widest">
                                    Mon — Fri<br />10:00 - 18:00 CET
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-8 opacity-60 hover:opacity-100 transition-opacity pt-8">
                            <a href="https://www.instagram.com/tsgabrielle3/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.4em] hover:text-[#a932bd] transition-all">Instagram</a>
                            <a href="https://www.facebook.com/tsgabrielle/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.4em] hover:text-[#a932bd] transition-all">Facebook</a>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="relative">
                        <div className="glass-panel p-12 rounded-sm border border-black/5 relative z-10 bg-white shadow-lg">
                            {status === 'success' ? (
                                <div className="py-20 text-center space-y-6 animate-fade-in">
                                    <span className="material-symbols-outlined text-6xl text-[#a932bd]">check_circle</span>
                                    <h3 className="text-2xl font-serif">Message Received</h3>
                                    <p className="text-xs text-slate-600 uppercase tracking-widest leading-relaxed">
                                        Our concierge will respond to your inquiry within 24 standard business hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus(null)}
                                        className="text-[10px] uppercase tracking-[0.3em] text-[#a932bd] font-bold hover:brightness-125 transition-all mt-8"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold block ml-1">Identity</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-black/5 border border-black/10 p-5 text-sm font-light tracking-wide outline-none focus:border-[#a932bd] transition-colors rounded-sm text-black placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold block ml-1">Digital Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full bg-black/5 border border-black/10 p-5 text-sm font-light tracking-wide outline-none focus:border-[#a932bd] transition-colors rounded-sm text-black placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold block ml-1">Inquiry Type</label>
                                        <select className="w-full bg-black/5 border border-black/10 p-5 text-sm font-light tracking-wide outline-none focus:border-[#a932bd] transition-colors rounded-sm appearance-none text-black">
                                            <option className="bg-white">Customer Assistance</option>
                                            <option className="bg-white">Collab Inquiry</option>
                                            <option className="bg-white">Press Request</option>
                                            <option className="bg-white">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold block ml-1">Message</label>
                                        <textarea
                                            required
                                            rows={6}
                                            placeholder="How can we assist you?"
                                            className="w-full bg-black/5 border border-black/10 p-5 text-sm font-light tracking-wide outline-none focus:border-[#a932bd] transition-colors rounded-sm resize-none text-black placeholder:text-slate-400"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-6 bg-[#a932bd] text-white text-[10px] font-bold uppercase tracking-[0.5em] hover:brightness-110 transition-all rounded-sm shadow-[0_10px_30px_rgba(169,50,189,0.2)]"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                        {/* Decorative background for the form */}
                        <div className="absolute -inset-4 border border-black/5 -z-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <ModernFooter />
        </main>
    );
}
