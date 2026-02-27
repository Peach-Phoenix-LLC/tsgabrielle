"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
    id: number;
    label: string;
    caption: string;
    sub_caption: string;
    accent_color: string;
    image_url: string | null;
    bg_gradient: string | null;
}

interface GalleryProps {
    slides: Slide[];
}

export default function Gallery({ slides = [] }: GalleryProps) {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const hasSlides = slides && slides.length > 0;

    useEffect(() => {
        if (!hasSlides) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 8000);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + (100 / 800);
            });
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(progressTimer);
        };
    }, [hasSlides, slides.length, index]);

    useEffect(() => {
        setProgress(0);
    }, [index]);

    if (!hasSlides) {
        return (
            <div className="relative h-screen min-h-[700px] w-full bg-white flex items-center justify-center">
                <p className="text-[#1a1a1a]/20 uppercase tracking-[0.5em] text-[10px]">No visuals Available</p>
            </div>
        );
    }

    const activeSlide = slides[index];

    return (
        <div className="relative h-screen min-h-[700px] w-full bg-white overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                    style={{
                        background: activeSlide.image_url ? `url(${activeSlide.image_url}) center/cover no-repeat` : activeSlide.bg_gradient || '#fff'
                    }}
                >
                    {/* Overlay for better readability */}
                    <div className="absolute inset-0 bg-white/5" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-20">
                        <div className="max-w-4xl">
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-[11px] uppercase tracking-[0.4em] font-bold mb-6"
                                style={{ color: activeSlide.accent_color || '#a932bd' }}
                            >
                                {activeSlide.label}
                            </motion.p>

                            <motion.h2
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-7xl font-light tracking-tighter text-[#1a1a1a] mb-6 leading-[1.1]"
                            >
                                {activeSlide.caption}
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-xl text-[#1a1a1a]/60 font-serif italic max-w-xl"
                            >
                                {activeSlide.sub_caption}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar Container */}
            <div className="absolute bottom-40 left-20 right-20 z-20">
                <div className="flex gap-4 items-center">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setIndex(i)}
                            className="flex-1 h-px bg-black/10 relative cursor-pointer group/item"
                        >
                            {i === index && (
                                <motion.div
                                    className="absolute inset-0 bg-primary origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 8, ease: "linear" }}
                                />
                            )}
                            <div className="absolute -top-10 opacity-0 group-hover/item:opacity-40 transition-opacity text-[9px] text-black uppercase tracking-widest">
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-20 left-20 flex gap-12 items-center z-20">
                <button
                    onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="text-black/40 hover:text-black transition-colors"
                >
                    <span className="material-symbols-outlined text-4xl font-light">chevron_left</span>
                </button>
                <div className="flex items-baseline gap-2 text-black">
                    <span className="text-2xl font-light">0{index + 1}</span>
                    <span className="text-black/20 text-xs">/ 0{slides.length}</span>
                </div>
                <button
                    onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
                    className="text-black/40 hover:text-black transition-colors"
                >
                    <span className="material-symbols-outlined text-4xl font-light">chevron_right</span>
                </button>
            </div>

            {/* Decorative Branded Corners */}
            <div className="absolute top-10 left-10 text-[10px] tracking-[0.4em] uppercase text-black/20 vertical-text h-32 flex items-center justify-center">
                Atelier Perspective
            </div>
            <div className="absolute bottom-10 right-10 flex gap-4 rotate-90">
                <div className="w-12 h-px bg-black/10" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-black/40">Paris • Phoenix</span>
            </div>
        </div>
    );
}
