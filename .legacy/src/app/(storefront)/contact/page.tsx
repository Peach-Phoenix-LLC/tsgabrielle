'use client';

import React, { useState } from 'react';
import './contact.css';

export default function ContactPage() {
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('success');
    };

    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-white/10 selection:text-black">
            {/* Background Accent */}
            <div className="fixed top-[-10%] right-[-10%] w-[800px] h-[800px] bg-white opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-60 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">

                    {/* Left Side: Contact Information */}
                    <div className="space-y-24">
                        <header className="space-y-8">
                            <p className="text-[10px] uppercase tracking-[0.6em] text-[#a932bd] font-bold">L'Assistance</p>
                            <h1 className="text-8xl font-extralight tracking-tighter leading-tight text-[#1a1a1a]">Connect With Our Atelier</h1>
                            <p className="text-sm text-[#1a1a1a]/40 font-light max-w-md leading-relaxed uppercase tracking-[0.4em]">
                                Whether you seek personal styling, order assistance, or a collaboration dialogue—we are at your service.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-black/5">
                            <div className="space-y-6">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/20">General Inquiries</h3>
                                <p className="text-lg font-light text-[#1a1a1a] hover:text-[#a932bd] transition-all cursor-pointer tracking-tight">atelier@tsgabrielle.us</p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/20">Global Press</h3>
                                <p className="text-lg font-light text-[#1a1a1a] hover:text-[#a932bd] transition-all cursor-pointer tracking-tight">press@tsgabrielle.us</p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/20">Paris Office</h3>
                                <p className="text-base font-light text-[#1a1a1a]/60 leading-relaxed uppercase tracking-widest">
                                    75001 Paris,<br />Place Vendôme
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/20">Concierge Hours</h3>
                                <p className="text-base font-light text-[#1a1a1a]/60 leading-relaxed uppercase tracking-widest">
                                    Mon — Fri<br />10:00 - 18:00 CET
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-12 pt-16 border-t border-black/5">
                            <a href="https://www.instagram.com/tsgabrielle3/" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#1a1a1a]/40 hover:text-[#a932bd] transition-all">Instagram</a>
                            <a href="https://www.facebook.com/tsgabrielle/" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#1a1a1a]/40 hover:text-[#a932bd] transition-all">Facebook</a>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="relative pt-12">
                        <div className="bg-neutral-50 p-16 rounded-[3rem] border border-black/5 relative z-10 shadow-sm">
                            {status === 'success' ? (
                                <div className="py-24 text-center space-y-10 animate-fade-in">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                                        <span className="material-symbols-outlined text-5xl text-[#a932bd]">check_circle</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-extralight tracking-tighter text-[#1a1a1a]">Message Received</h3>
                                        <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-[0.3em] font-bold max-w-xs mx-auto leading-loose">
                                            Our concierge will respond to your inquiry within 24 standard business hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setStatus(null)}
                                        className="inline-block mt-8 px-12 py-5 bg-white text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all rounded-full shadow-xl"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-12">
                                    <div className="space-y-6">
                                        <label className="text-[9px] uppercase tracking-[0.5em] text-[#1a1a1a]/30 font-bold block ml-4">Full Identity</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-white border border-black/5 p-6 text-sm font-light tracking-widest uppercase outline-none focus:border-[#a932bd] focus:ring-4 focus:ring-[#a932bd]/5 transition-all rounded-3xl text-black placeholder:text-[#1a1a1a]/20"
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-[9px] uppercase tracking-[0.5em] text-[#1a1a1a]/30 font-bold block ml-4">Digital Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full bg-white border border-black/5 p-6 text-sm font-light tracking-widest uppercase outline-none focus:border-[#a932bd] focus:ring-4 focus:ring-[#a932bd]/5 transition-all rounded-3xl text-black placeholder:text-[#1a1a1a]/20"
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-[9px] uppercase tracking-[0.5em] text-[#1a1a1a]/30 font-bold block ml-4">Inquiry Nature</label>
                                        <div className="relative">
                                            <select className="w-full bg-white border border-black/5 p-6 text-sm font-light tracking-widest uppercase outline-none focus:border-[#a932bd] transition-all rounded-3xl appearance-none text-black">
                                                <option className="bg-white">Customer Assistance</option>
                                                <option className="bg-white">Creative Collaboration</option>
                                                <option className="bg-white">Global Press Inquiry</option>
                                                <option className="bg-white">Other</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-[#1a1a1a]/20 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-[9px] uppercase tracking-[0.5em] text-[#1a1a1a]/30 font-bold block ml-4">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="How can we assist you?"
                                            className="w-full bg-white border border-black/5 p-8 text-sm font-light tracking-widest uppercase outline-none focus:border-[#a932bd] focus:ring-4 focus:ring-[#a932bd]/5 transition-all rounded-[2rem] resize-none text-black placeholder:text-[#1a1a1a]/20"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-8 bg-white text-white text-[10px] font-bold uppercase tracking-[1em] hover:bg-white transition-all rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(169,50,189,0.3)]"
                                    >
                                        Transmit
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

