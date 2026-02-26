"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Slide {
    image: string;
    title: string;
    description: string;
}

const slides: Slide[] = [
    {
        image: "/images/slides/slide1.png",
        title: "Welcome to the 2026 tsgabrielle® USA Collection",
        description: "Rooted in the vision of founder Gabrielle."
    },
    {
        image: "/images/slides/slide2.png",
        title: "The French Trans Touch",
        description: "Bridging Paris elegance with American Southwest energy."
    },
    {
        image: "/images/slides/slide3.png",
        title: "Peach Phoenix™",
        description: "Symbolizing rebirth and boundless creativity."
    },
    {
        image: "/images/slides/slide4.png",
        title: "Iconic Design",
        description: "Experience the refined elegance of our latest creations."
    }
];

export default function HoloHero() {
    const [current, setCurrent] = useState(0);
    const { scrollY } = useScroll();

    // Parallax: As we scroll down (0 to 1000px), move background image slightly (0 to 150px)
    const y = useTransform(scrollY, [0, 1000], [0, 150]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <motion.img
                        style={{ y }}
                        alt={slides[current].title}
                        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover brightness-[0.9] contrast-[1.05]"
                        src={slides[current].image}
                    />
                    <div className="absolute inset-0 bg-white/10"></div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20 z-20">
                <motion.div
                    key={`text-${current}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-white/20 backdrop-blur-md p-12 rounded-sm border border-white/30"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-charcoal mb-6 drop-shadow-sm leading-tight max-w-4xl">
                        {slides[current].title}
                    </h1>
                    <p className="text-charcoal/80 text-lg md:text-xl font-thin mb-10 max-w-2xl mx-auto">
                        {slides[current].description}
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-10 py-4 font-thin text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-sm"
                    >
                        Explore collection
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-12 h-0.5 transition-all duration-500 ${current === i ? 'bg-primary' : 'bg-charcoal/20'}`}
                    />
                ))}
            </div>
        </div>
    );
}
