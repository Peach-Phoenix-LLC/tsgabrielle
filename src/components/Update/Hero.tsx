'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        "https://storage.googleapis.com/tsgabrielle-media-prod/images/slides/slide1.png",
        "https://storage.googleapis.com/tsgabrielle-media-prod/images/slides/slide2.png",
        "https://storage.googleapis.com/tsgabrielle-media-prod/images/slides/slide3.png",
        "https://storage.googleapis.com/tsgabrielle-media-prod/images/slides/slide4.png"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white flex items-center">
            {/* Background Blob */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
                <motion.svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[80%] h-[80%]"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <path
                        fill="#a932bd"
                        d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.2,-0.9C83.4,13.8,76.3,27.6,67.6,39.6C58.8,51.6,48.5,61.8,36.2,68.9C23.9,76,9.6,79.9,-4.6,87.9C-18.8,95.9,-32.9,107.9,-46,108.9C-59.1,109.9,-71.2,100,-78.9,87.2C-86.7,74.5,-90.1,59,-90.7,44.1C-91.3,29.1,-89,14.6,-86.6,0.3C-84.2,-14,-81.7,-28,-74.6,-40.1C-67.5,-52.2,-55.8,-62.4,-42.6,-69.8C-29.4,-77.2,-14.7,-81.9,0.5,-82.7C15.7,-83.5,31.3,-80.5,44.7,-76.4Z"
                        transform="translate(100 100)"
                    />
                </motion.svg>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-[clamp(56px,8vw,96px)] font-light text-[#1a1a1a] leading-[1.1] uppercase tracking-[0.08em] mb-6">
                        wear the<br />shift
                    </h1>
                    <p className="text-[16px] font-light text-[#888888] tracking-widest uppercase mb-10 max-w-[420px]">
                        holographic perspective on modern essentials. crafted for those who embrace transformation.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-12 py-4 bg-[#a932bd] text-white text-[13px] font-light tracking-[0.15em] uppercase rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(169,50,189,0.3)] hover:shadow-[0_15px_40px_rgba(169,50,189,0.4)]"
                    >
                        EXPLORE
                    </Link>
                </motion.div>

                {/* Right Product Slideshow */}
                <motion.div
                    className="relative flex justify-center items-center w-full h-[60vh] md:h-auto"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative w-full md:w-[90%] aspect-[4/5] md:aspect-square animate-float holo-shimmer rounded-2xl overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentSlide}
                                src={slides[currentSlide]}
                                alt={`Featured Slide ${currentSlide + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </AnimatePresence>
                        {/* Shimmer Overlay (Handled by .holo-shimmer in globals.css) */}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
