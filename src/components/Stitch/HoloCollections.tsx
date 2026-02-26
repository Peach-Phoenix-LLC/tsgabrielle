"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface CollectionProduct {
    id: string | number;
    name?: string;
    title?: string;
    image_url?: string | null;
    media_primary_url?: string | null;
    seo_description?: string | null;
    short_description?: string | null;
    category: string;
}

interface HoloCollectionsProps {
    products: CollectionProduct[];
}

export default function HoloCollections({ products }: HoloCollectionsProps) {
    return (
        <section className="relative w-full overflow-hidden bg-bg-light py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-thin mb-4 text-text-dark">
                        Collections
                    </h2>
                    <div className="w-16 h-px bg-primary mx-auto mb-6"></div>
                    <p className="text-lg text-text-dark/50 font-thin">
                        Explore our iconic lines by <span className="text-primary">tsgabrielle® usa</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-12">
                    {products.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/collections/${collection.id}`} className="flex flex-col items-center group cursor-pointer">
                                {/* Circular Container */}
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/10 p-2 transition-all duration-700 group-hover:border-primary/40 group-hover:-translate-y-2 shadow-sm bg-white">
                                    <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                                        {(collection.media_primary_url || collection.image_url) ? (
                                            <img
                                                alt={collection.title || collection.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                src={collection.media_primary_url || collection.image_url || ''}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">No image</div>
                                        )}

                                        {/* Discover Button overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                            <div className="px-8 py-3 bg-white/90 backdrop-blur-md text-primary text-[10px] uppercase tracking-[0.3em] font-medium border border-primary/20 rounded-full shadow-lg">
                                                Discover
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle outer glow on hover */}
                                    <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                                </div>

                                <h3 className="mt-10 text-xl font-thin text-text-dark tracking-widest text-center uppercase group-hover:text-primary transition-colors">
                                    {collection.title || collection.name}
                                </h3>
                                <div className="mt-2 w-0 group-hover:w-12 h-px bg-primary transition-all duration-500"></div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-24 text-center"
                >
                    <Link
                        href="/collections"
                        className="group relative inline-flex items-center justify-center px-12 py-4 font-thin text-sm border border-primary/50 hover:border-primary rounded-sm text-primary transition-all duration-300 hover:bg-primary/5"
                    >
                        <span className="relative z-10 text-[10px] uppercase tracking-[0.3em]">View all collections</span>
                    </Link>
                </motion.div>

            </div>

            {/* Iridescent Separator */}
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        </section >
    );
}
