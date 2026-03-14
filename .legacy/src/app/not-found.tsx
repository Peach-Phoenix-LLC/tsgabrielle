"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Full Screen YouTube Video Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <iframe
                    className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src="https://www.youtube.com/embed/cqFGFRERCiM?autoplay=1&mute=1&controls=0&loop=1&playlist=cqFGFRERCiM&showinfo=0&rel=0"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <h1 className="text-white text-9xl font-extralight tracking-tighter opacity-20">404</h1>
                    <div className="space-y-4">
                        <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight uppercase">Dimension Lost</h2>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">The piece you are seeking does not exist in this realm.</p>
                    </div>

                    <div className="pt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/5 backdrop-blur-xl"
                        >
                            Return Home
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Brand Watermark */}
            <div className="absolute bottom-12 left-12 z-20">
                <p className="text-white/10 text-[10px] uppercase tracking-[1em]">tsgabrielle®</p>
            </div>
        </div>
    );
}
