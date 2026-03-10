'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const BUCKET_URL = "https://storage.googleapis.com/tsgabrielle-media-prod";
    const slides = [
        `${BUCKET_URL}/images/slides/slide1.png`,
        `${BUCKET_URL}/images/slides/slide2.png`,
        `${BUCKET_URL}/images/slides/slide3.png`,
        `${BUCKET_URL}/images/slides/slide4.png`
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // 8 seconds per slide for a slower pace
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
            {/* Fullscreen Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 3, // 3 second cross-fade transition
                            ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[currentSlide]}
                            alt={`Background Slide ${currentSlide + 1}`}
                            className="w-full h-full object-cover filter brightness-75 contrast-125"
                        />
                        {/* Dynamic Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Static Content Layer */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-[clamp(48px,12vw,140px)] font-light text-white leading-[0.9] uppercase tracking-[0.15em] mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        wear the<br />
                        <span className="text-[#a932bd]">shift</span>
                    </h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="h-[1px] bg-[#a932bd] mb-8"
                    />

                    <p className="text-[14px] md:text-[16px] font-light text-white/80 tracking-[0.3em] uppercase mb-12 max-w-[500px] leading-relaxed drop-shadow-md">
                        a holographic perspective on modern existence. crafted for those who embrace transformation.
                    </p>

                    <Link
                        href="/shop"
                        className="group relative inline-flex items-center justify-center px-16 py-5 overflow-hidden font-light tracking-[0.2em] text-white uppercase transition-all duration-300 bg-transparent border border-white/30 rounded-full hover:border-[#a932bd] active:scale-95"
                    >
                        <span className="absolute inset-0 w-full h-full bg-[#a932bd] origin-left transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        <span className="relative z-10">EXPLORE THE COLLECTION</span>
                    </Link>
                </motion.div>
            </div>

            {/* Subtle Animated Particles or Grain Overlay if needed */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </section>
    );
};

export default Hero;
