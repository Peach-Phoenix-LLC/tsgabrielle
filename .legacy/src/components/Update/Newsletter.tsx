'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <section className="py-32 bg-[#e7e7e7]">
            <div className="max-w-[500px] mx-auto px-6 text-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[32px] font-light text-[#1a1a1a] uppercase tracking-[0.2em] mb-6">
                        join the spectrum
                    </h2>
                    <p className="text-[14px] font-light text-[#888888] mb-12 tracking-widest uppercase">
                        the shift is happening. stay updated on drops and rewards.
                    </p>
                    <form className="flex flex-col space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="bg-transparent border-b border-[#a932bd] py-3 text-[15px] font-light tracking-[0.1em] focus:outline-none focus:placeholder-transparent uppercase text-center"
                        />
                        <button
                            type="submit"
                            className="bg-[#a932bd] text-white text-[13px] font-light tracking-[0.2em] py-4 rounded-full hover:shadow-[0_10px_30px_rgba(169,50,189,0.3)] transition-all uppercase"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
