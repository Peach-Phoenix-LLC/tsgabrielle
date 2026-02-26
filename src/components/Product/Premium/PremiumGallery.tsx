"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface PremiumGalleryProps {
    images: string[];
    gifBadge?: string;
}

export const PremiumGallery = ({ images = [], gifBadge }: PremiumGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setIsZoomed(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    if (!images || images.length === 0) return null;

    return (
        <div
            className="relative w-full h-full min-h-[500px] lg:h-screen flex flex-col lg:flex-row bg-zinc-50"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* 1. Thumbnail Strip (Sticky Left in logic, but here it's part of the full-screen construct) */}
            <div className="hidden lg:flex flex-col gap-4 w-24 h-full py-10 px-4 bg-white/50 backdrop-blur-sm border-r border-black/5 z-20 overflow-y-auto no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-[3/4] flex-shrink-0 w-full rounded-sm overflow-hidden transition-all duration-500 hover:scale-105 ${activeIndex === idx
                                ? 'ring-2 ring-[#a932bd] ring-offset-2 opacity-100 shadow-lg'
                                : 'opacity-40 grayscale hover:grayscale-0'
                            }`}
                    >
                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* 2. Main Full Screen Stage */}
            <div className="relative flex-1 h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full relative"
                    >
                        <img
                            src={images[activeIndex]}
                            alt={`Product view ${activeIndex + 1}`}
                            className="w-full h-full object-cover cursor-zoom-in"
                            onClick={() => setIsZoomed(true)}
                        />

                        {/* Dramatic Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none" />
                    </motion.div>
                </AnimatePresence>

                {/* GIF Badge - Luxury Indication */}
                {gifBadge && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-10 right-10 z-30 pointer-events-none"
                    >
                        <img src={gifBadge} alt="Badge" className="w-32 h-32 object-contain mix-blend-multiply drop-shadow-2xl" />
                    </motion.div>
                )}

                {/* Progress Controls Overlay */}
                <div className="absolute bottom-12 left-12 right-12 z-30 flex items-end justify-between">
                    {/* Slide Counter */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white mix-blend-difference">Atelier Perspective</span>
                        <div className="flex items-baseline gap-4">
                            <span className="text-6xl font-black text-white mix-blend-difference leading-none tracking-tighter">0{activeIndex + 1}</span>
                            <span className="text-xl font-light text-white/40 mix-blend-difference">/ 0{images.length}</span>
                        </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Maximize Icon */}
                <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-10 left-10 w-12 h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-all"
                >
                    <Maximize2 size={20} />
                </button>
            </div>

            {/* Lightbox - Full Viewport Zoom */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/98 flex items-center justify-center p-4 lg:p-20"
                    >
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors group flex items-center gap-4"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Close View</span>
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={images[activeIndex]}
                                alt="Zoomed High Detail"
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />

                            {/* Full-screen Nav */}
                            <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-8 text-white/20 hover:text-white transition-all">
                                <ChevronLeft size={80} strokeWidth={1} />
                            </button>
                            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-8 text-white/20 hover:text-white transition-all">
                                <ChevronRight size={80} strokeWidth={1} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
