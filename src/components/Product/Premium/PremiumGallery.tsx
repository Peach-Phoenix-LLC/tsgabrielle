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
            className="flex flex-col lg:flex-row gap-4 h-full"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Thumbnail Strip - Vertical on Desktop */}
            <div className="hidden lg:flex flex-col gap-3 w-20 overflow-y-auto no-scrollbar order-2 lg:order-1">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-[#a932bd]' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Stage */}
            <div className="relative flex-1 aspect-[3/4] bg-zinc-100 rounded-sm overflow-hidden order-1 lg:order-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full relative"
                    >
                        <img
                            src={images[activeIndex]}
                            alt={`Product view ${activeIndex + 1}`}
                            className="w-full h-full object-cover cursor-zoom-in"
                            onClick={() => setIsZoomed(true)}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* GIF Badge */}
                {gifBadge && (
                    <div className="absolute top-6 left-6 z-20">
                        <img src={gifBadge} alt="Badge" className="w-16 h-16 object-contain mix-blend-multiply opacity-80" />
                    </div>
                )}

                {/* Slide Counter */}
                <div className="absolute bottom-6 left-6 z-20">
                    <div className="px-3 py-1 bg-black/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                            {activeIndex + 1} / {images.length}
                        </span>
                    </div>
                </div>

                {/* Arrow Navigation */}
                <AnimatePresence>
                    {showControls && (
                        <>
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-zinc-900 z-30"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-zinc-900 z-30"
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </>
                    )}
                </AnimatePresence>

                {/* Maximize Button */}
                <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-30 hover:bg-white/40 transition-all"
                >
                    <Maximize2 size={18} />
                </button>
            </div>

            {/* Responsive Thumbnails (Mobile) */}
            <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar py-2 order-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative flex-shrink-0 w-16 aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-[#a932bd]' : 'border-transparent opacity-60'
                            }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Lightbox / Zoomed View */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center px-4"
                    >
                        <button
                            onClick={() => setIsZoomed(false)}
                            className="absolute top-10 right-10 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </button>

                        <div className="relative w-full max-w-6xl aspect-[3/4] max-h-[90vh]">
                            <img
                                src={images[activeIndex]}
                                alt="Zoomed View"
                                className="w-full h-full object-contain"
                            />

                            {/* Inner navigation */}
                            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-all">
                                <ChevronLeft size={60} />
                            </button>
                            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-all">
                                <ChevronRight size={60} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
