"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function PageAnimations({ children }: { children: React.ReactNode }) {
    return (
        <>
            {React.Children.map(children, (child, index) => {
                // If it's HoloHero, it fades in without scrolling requirement
                if (index === 0) {
                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            {child}
                        </motion.div>
                    )
                }

                return (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 }}
                    >
                        {child}
                    </motion.div>
                )
            })}
        </>
    );
}
