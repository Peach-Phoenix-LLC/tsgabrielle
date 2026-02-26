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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
                    {products.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link href={`/collections/${collection.id}`} className="flex flex-col group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100">
                                    {(collection.media_primary_url || collection.image_url) ? (
                                        <img
                                            alt={collection.title || collection.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            src={collection.media_primary_url || collection.image_url || ''}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">No image</div>
                                    )}

                                    {/* Discover Button overlay at bottom of image */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-full py-4 px-6 bg-white/90 backdrop-blur-md text-primary text-[10px] uppercase tracking-[0.3em] font-medium text-center border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                                            Discover
                                        </div>
                                    </div>
                                </div>

                                <h3 className="mt-8 text-xl font-thin text-text-dark tracking-wide text-center">
                                    {collection.title || collection.name}
                                </h3>
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
