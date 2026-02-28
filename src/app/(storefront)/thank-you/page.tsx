"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 50 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 40 * (timeLeft / duration);

            // Refraction Colors: #a932bd, #3a86ff, #06ffa5
            const colors = ['#a932bd', '#e7e7e7', '#ffffff', '#3a86ff'];

            confetti({
                ...defaults,
                particleCount,
                colors,
                origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                colors,
                origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-[#ffffff] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Organic Background Blobs */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-[600px] h-[600px] fill-[#a932bd] blur-3xl">
                    <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5Z" />
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0 w-[800px] h-[800px] fill-[#a932bd] blur-3xl">
                    <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5Z" />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-[600px] w-full bg-white/60 backdrop-blur-3xl border border-[#e7e7e7] p-16 rounded-[48px] shadow-[0_40px_100px_rgba(169,50,189,0.08)] relative z-10 text-center"
            >
                {/* Success Icon */}
                <div className="w-24 h-24 bg-[#a932bd] rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_15px_40px_rgba(169,50,189,0.3)] holo-shimmer group">
                    <span className="material-symbols-outlined text-white text-[42px] font-light">auto_awesome</span>
                </div>

                <h1 className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.6em] mb-4">Final Shift Complete</h1>
                <h2 className="text-[clamp(32px,4vw,48px)] font-light text-[#1a1a1a] uppercase tracking-[0.1em] mb-8 leading-tight">
                    Order Refracted
                </h2>

                <p className="text-[16px] font-light text-[#888888] leading-relaxed mb-12 max-w-sm mx-auto">
                    Your elements have been committed to the shift. Secure confirmation has been dispatched to your identity address.
                </p>

                <div className="py-8 border-y border-[#e7e7e7] mb-12 flex justify-center gap-16">
                    <div>
                        <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-2">Order ID</p>
                        <p className="text-[16px] font-light text-[#1a1a1a] tracking-[0.1em]">UPD-9942</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] mb-2">Shift Date</p>
                        <p className="text-[16px] font-light text-[#1a1a1a] tracking-[0.1em]">Feb 27, 2026</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/shop" className="px-12 py-5 bg-[#1a1a1a] text-white text-[12px] font-light tracking-[0.4em] uppercase rounded-full hover:bg-[#a932bd] transition-all duration-700 shadow-xl">
                        Return to Surface
                    </Link>
                    <button className="px-12 py-5 bg-white border border-[#e7e7e7] text-[#1a1a1a] text-[12px] font-light tracking-[0.4em] uppercase rounded-full hover:border-[#a932bd] transition-all duration-700">
                        View Reflection
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
                    <div className="w-12 h-px bg-[#888888]" />
                    <span className="text-[10px] font-light uppercase tracking-[0.5em] text-[#888888]">The Future is Now</span>
                    <div className="w-12 h-px bg-[#888888]" />
                </div>
            </motion.div>
        </main>
    );
}

