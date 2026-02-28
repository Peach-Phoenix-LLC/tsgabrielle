'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NewArrivals = () => {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background Blob */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-center opacity-[0.06] pointer-events-none scale-150">
                <motion.svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <path
                        fill="#a932bd"
                        d="M39.9,-68.2C51.2,-61.1,59.5,-49.6,66.1,-37.4C72.7,-25.2,77.7,-12.6,76.5,-0.7C75.3,11.2,67.9,22.4,59.8,32.7C51.6,43,42.7,52.4,32,60.1C21.4,67.8,9,73.8,-4.2,81.1C-17.4,88.4,-31.4,96.9,-43.3,95C-55.2,93.1,-65,80.7,-71.4,68.2C-77.9,55.7,-81,43.2,-83,30.3C-85.1,17.4,-86.1,4.1,-83.4,-8.1C-80.8,-20.3,-74.6,-31.3,-66.9,-42.2C-59.2,-53.1,-49.9,-64,-38.5,-71.1C-27.1,-78.2,-13.6,-81.4,0.1,-81.6C13.8,-81.8,28.6,-75.4,39.9,-68.2Z"
                        transform="translate(100 100)"
                    />
                </motion.svg>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10 relative">
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="rounded-[40px] overflow-hidden aspect-[3/4] shadow-[0_20px_60px_rgba(0,0,0,0.05)] holo-shimmer">
                        <img
                            src="https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/2/transparent_bg.png"
                            alt="New Arrival"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.3em] mb-4">
                        NEW ARRIVALS
                    </h2>
                    <h3 className="text-[42px] font-light text-[#1a1a1a] leading-tight uppercase tracking-[0.1em] mb-8">
                        THE PRISM<br />GRADIENT
                    </h3>
                    <p className="text-[15px] font-light text-[#888888] leading-relaxed mb-10 max-w-[420px]">
                        light as it should be. our new tech-woven fabrics react to movement, revealing a subtle iridescent shift as you walk.
                    </p>
                    <Link
                        href="/shop"
                        className="text-[13px] font-light text-[#1a1a1a] uppercase tracking-[0.2em] border-b border-[#a932bd] pb-2 hover:text-[#a932bd] transition-colors"
                    >
                        EXPLORE COLLECTION
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default NewArrivals;
