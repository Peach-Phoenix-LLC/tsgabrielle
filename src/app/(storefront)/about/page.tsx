'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Heart } from 'lucide-react';
import OrganicDivider from '@/components/Update/OrganicDivider';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Section 1: Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none scale-150">
                    <motion.svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <path
                            fill="#a932bd"
                            d="M45.2,-77.4C58.9,-70.2,70.6,-58.9,78.2,-45.2C85.8,-31.5,89.3,-15.8,87.6,-0.9C85.9,13.9,79,27.9,70.4,40.4C61.8,52.8,51.6,63.7,39.1,71.2C26.6,78.7,11.8,82.8,-2.9,87.8C-17.6,92.8,-32.2,98.6,-45.2,96.6C-58.2,94.6,-69.6,84.7,-77.8,72.4C-86,60.1,-91.1,45.4,-92.9,30.3C-94.7,15.2,-93.3,-0.3,-89.6,-14.8C-85.9,-29.3,-80.1,-42.8,-70.7,-53.4C-61.4,-64.1,-48.5,-71.8,-35.3,-78.3C-22,-84.8,-8.5,-90.1,3.4,-95.9C15.3,-101.7,31.6,-84.6,45.2,-77.4Z"
                            transform="translate(100 100)"
                        />
                    </motion.svg>
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-[clamp(42px,8vw,64px)] font-light text-[#1a1a1a] leading-tight mb-8 lowercase tracking-[0.06em]"
                    >
                        we are light, refracted.
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-[16px] font-light text-[#888888] max-w-[520px] mx-auto leading-relaxed tracking-widest uppercase"
                    >
                        update is an exploration of perspective. we create pieces that shift with you, designed to capture the spectrum of modern existence.
                    </motion.p>
                </div>
            </section>

            {/* Section 2: Brand Values */}
            <section className="py-32 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: Zap, title: 'Transformation', desc: 'Garments that evolve with your movement and environment.' },
                            { icon: Shield, title: 'Resilience', desc: 'Premium tech-fabrics designed for the longevity of style.' },
                            { icon: Heart, title: 'Identity', desc: 'Crafted to amplify the unique spectrum of who you are.' }
                        ].map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center space-y-6"
                            >
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#a932bd] opacity-10 rounded-full scale-125" />
                                    <value.icon className="w-8 h-8 text-[#a932bd] stroke-[1px]" />
                                </div>
                                <h3 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.2em]">{value.title}</h3>
                                <p className="text-[15px] font-light text-[#888888] leading-relaxed max-w-[280px]">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Full-width Editorial */}
            <section className="py-32 bg-white">
                <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#a932bd]/5 -rotate-6 rounded-[100px] scale-110 pointer-events-none" />
                        <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.05)] holo-shimmer">
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
                                alt="Lifestyle"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <h2 className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.3em]">The Origin</h2>
                        <h3 className="text-[32px] font-light text-[#1a1a1a] uppercase tracking-[0.1em] leading-tight">Crafting the<br />New Horizon</h3>
                        <div className="space-y-6 text-[16px] font-light text-[#888888] leading-[1.9]">
                            <p>Founded at the intersection of light and fabric, Update emerged from a desire to redefine luxury for a world in constant flux.</p>
                            <p>Every collection is a dialogue between technology and tradition. We source iridescent fibers and organic materials to create a wardrobe that doesn't just sit on the body—it reacts to it.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 4: Manifesto */}
            <section className="py-40 bg-[#a932bd] relative overflow-hidden text-center text-white px-6">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none">
                    <motion.svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[80%] h-[80%]"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                        }}
                    >
                        <path
                            fill="#ffffff"
                            d="M37.5,-64.3C48.6,-57.8,57.7,-47.9,64.4,-36.5C71.1,-25.1,75.4,-12.3,75.6,0.1C75.8,12.5,71.9,24.5,65.3,35.1C58.7,45.7,49.4,54.9,38.4,61.6C27.4,68.3,14.7,72.4,1.1,70.5C-12.5,68.6,-25.1,60.7,-36.6,53.2C-48.1,45.7,-58.5,38.6,-65.4,28.6C-72.3,18.6,-75.7,5.7,-74.6,-6.4C-73.5,-18.5,-67.9,-29.8,-59.6,-38.7C-51.3,-47.6,-40.3,-54.1,-29.1,-60.6C-17.9,-67.1,-6.6,-73.6,5,-82.2C16.6,-90.8,33.2,-101.5,37.5,-64.3Z"
                            transform="translate(100 100)"
                        />
                    </motion.svg>
                </div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <h2 className="text-[28px] md:text-[42px] font-light leading-snug uppercase tracking-[0.1em]">
                        "WE DON'T MANUFACTURE GARMENTS. WE ARCHITECT THE SPECTRUM OF IDENTITY THROUGH TRANSFORMATIONAL DESIGN."
                    </h2>
                </motion.div>
            </section>

            {/* Section 5: Team / CTA */}
            <section className="py-32 bg-white text-center">
                <OrganicDivider />
                <div className="mt-20 px-6">
                    <h2 className="text-[12px] font-light text-[#888888] uppercase tracking-[0.3em] mb-12">Join the Shift</h2>
                    <h3 className="text-[32px] font-light text-[#1a1a1a] uppercase tracking-[0.1em] mb-12">Start Your Spectrum</h3>
                    <Link
                        href="/shop"
                        className="inline-block px-12 py-4 bg-[#a932bd] text-white text-[13px] font-light tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-all shadow-lg"
                    >
                        SHOP NOW
                    </Link>
                </div>
            </section>
        </main>
    );
}
