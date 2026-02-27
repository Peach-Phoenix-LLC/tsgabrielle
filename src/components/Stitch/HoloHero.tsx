"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface HoloHeroProps {
    config?: any;
}

export default function HoloHero({ config = {} }: HoloHeroProps) {
    const [current, setCurrent] = useState(0);
    const { scrollY } = useScroll();

    const slides = config.slides || [
        {
            image_url: "/images/slides/slide1.png",
            image_alt: "Celestial Collection",
            headline: "",
            subtitle: ""
        }
    ];

    const y = useTransform(scrollY, [0, 1000], [0, 150]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (slides.length === 0) return null;

    const currentSlide = slides[current];

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <motion.img
                        style={{ y }}
                        alt={currentSlide.image_alt || "tsgabrielle® slide"}
                        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover brightness-[0.85] contrast-[1.1]"
                        src={currentSlide.image_url || currentSlide.image}
                    />
                    <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ backgroundColor: `rgba(0,0,0,${config.overlay_opacity || 0.1})` }}
                    />
                </motion.div>
            </AnimatePresence>

            {(currentSlide.headline || currentSlide.subtitle || currentSlide.cta_text) && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-20 ${config.layout_alignment === 'left' ? 'md:items-start md:text-left md:max-w-4xl md:ml-32' : config.layout_alignment === 'right' ? 'md:items-end md:text-right md:max-w-4xl md:mr-32 ml-auto' : ''}`}>
                    <motion.div
                        key={`text-${current}`}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {currentSlide.badge && (
                            <span className="text-[10px] uppercase tracking-[0.8em] text-white/60 mb-4 block font-bold">{currentSlide.badge}</span>
                        )}

                        {currentSlide.headline && (
                            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white leading-tight">
                                {currentSlide.headline}
                            </h1>
                        )}

                        {currentSlide.subtitle && (
                            <p className="text-sm md:text-lg font-light text-white/70 max-w-2xl mx-auto md:mx-0 tracking-widest uppercase">
                                {currentSlide.subtitle}
                            </p>
                        )}

                        {(currentSlide.cta_text) && (
                            <div className={`flex flex-col sm:flex-row gap-6 pt-6 justify-center ${config.layout_alignment === 'left' ? 'md:justify-start' : config.layout_alignment === 'right' ? 'md:justify-end' : ''}`}>
                                <Link
                                    href={currentSlide.cta_url || "/shop"}
                                    className="inline-flex items-center justify-center px-12 py-5 font-bold text-[10px] uppercase tracking-[0.3em] border border-white text-white hover:bg-white hover:text-black transition-all duration-700 rounded-full bg-white/5 backdrop-blur-xl"
                                >
                                    {currentSlide.cta_text}
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            {slides.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                    {slides.map((_: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-16 h-0.5 transition-all duration-700 ${current === i ? 'bg-white scale-x-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white/20'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
