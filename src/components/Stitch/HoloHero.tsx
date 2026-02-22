"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn7d33aUR8mKHtpFidHn9nS5ApaGDapJ6dXVPRVyuKhuw9xgEbe51TUmGuQBvVOASjYf3FaGvH2J22yNN3PKLwxRkTJkJhJspQE7PlQc7KP6OD4o0v397Yb1ktF21xlJhwvbrjpHA9DHoQQOwKWAF01-TTXzJgcLPOD9XxNn3qWA-vNlJtibJFXNigcSQNscxeHq4JE5-_gs1QtVkWt7Ocixhaj9JkZxDe6PyU7VumiuuF3MIaULzZQVBSzLp6J6ER8hhdawFDs2X4",
        title: "Welcome to the 2026 tsgabrielle® USA Collection",
        description: "Rooted in the vision of founder Gabrielle."
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACTCjaRxPQnGB4rJnQOlIUMOSkK16FlF6fNwL0xohfFTxswI5L-H7O2j2hy_DI6OIUcbSJG9uw7CwW6n9cUt3JPa7W7STLZAG8YoW-lL2bLiZkxCE3coQ7fEn56vYdd_jxokBIo2B0vz8BfjSgzjt0ZBl1D4NU9hLMKlHjcm_Cz7j2a2qQ2B08fxaXFLRuTQA9y8vn39i1LEomCUqpaQ3qa6K46CWcabGD9PhyIfCr9bNOF5EtXzHimiuRBZi4_JGaseAbpSxYpw2U",
        title: "The French Trans Touch",
        description: "Bridging Paris elegance with American Southwest energy."
    },
    {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhxL3GBdpJjUJRPmFMx_apyJapKUHNsfJv5hMQTNONtBbZja4edpdtPMZRCEsavsNvCOgUzHiSpAz3mSMI43mWm3zWbdP4HG3cE-lBJzQcoLAH-9c4ZjnOR2d2616Uzwda51sWDBigXSILz2s8Rpdh6nUp-Xrs0drHSYnVFDZgJKEoDeojo5qWVq_3Z0yAn0QCu52xq3M2Sj_voEv3Uawd71Ogn4STH62QJ7x1YRygs9Hki-ft1ZhEPfIcQUNNzLLUuJiVRNLN49qq",
        title: "Peach Phoenix™",
        description: "Symbolizing rebirth and boundless creativity."
    }
];

export default function HoloHero() {
    const [current, setCurrent] = useState(0);

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
                    <img
                        alt={slides[current].title}
                        className="w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
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
