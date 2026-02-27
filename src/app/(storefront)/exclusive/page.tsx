"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';

export default function ExclusivePage() {
    return (
        <main className="min-h-screen bg-bg-dark text-white selection:bg-primary/30">
            <ModernNavbar />

            <div className="relative pt-32 pb-20 px-8 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl text-center"
                >
                    <span className="text-primary font-light tracking-[0.2em] uppercase text-sm mb-6 block">
                        Privileged Access
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none italic uppercase">
                        Exclusive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[subtle-shift_5s_linear_infinite]">
                            Experience
                        </span>
                    </h1>

                    <p className="text-white/60 text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed">
                        The tsgabrielle® Exclusive portal is currently being refined to ensure total privacy and immersion for our most loyal clients.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-12 py-4 bg-primary text-white font-black uppercase text-sm tracking-widest hover:bg-primary-dark transition-all transform hover:scale-105 shadow-xl shadow-primary/20">
                            Apply for Access
                        </button>
                        <button className="px-12 py-4 border border-white/20 hover:border-white/40 text-white font-light uppercase text-sm tracking-widest transition-all">
                            Member Login
                        </button>
                    </div>
                </motion.div>

                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="py-24 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <h3 className="text-primary uppercase tracking-widest text-xs font-bold">Priority Drops</h3>
                        <p className="text-white/40 font-light italic">Secure pieces before they enter the public atelier.</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-primary uppercase tracking-widest text-xs font-bold">Bespoke Concierge</h3>
                        <p className="text-white/40 font-light italic">One-on-one virtual tailoring for custom silhouettes.</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-primary uppercase tracking-widest text-xs font-bold">Immersion Events</h3>
                        <p className="text-white/40 font-light italic">Exclusive invitations to digital and physical showcases.</p>
                    </div>
                </div>
            </div>

            <ModernFooter />
        </main>
    );
}

