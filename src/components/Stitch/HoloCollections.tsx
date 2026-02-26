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
                        Curated collections
                    </h2>
                    <div className="w-16 h-px bg-primary mx-auto mb-6"></div>
                    <p className="text-lg text-text-dark/50 font-thin">
                        Discover our most beautiful selections by <span className="text-primary">tsgabrielle® usa</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-12">
                    {products.slice(0, 4).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link href={`/product/${product.id}`} className="flex flex-col items-center group cursor-pointer">
                                {/* Border Container */}
                                <div className="relative p-1 rounded-full border border-primary/10 w-60 h-60 md:w-64 md:h-64 transition-all duration-500 group-hover:border-primary/40 group-hover:-translate-y-1">
                                    {/* Image Circle */}
                                    <div className="w-full h-full bg-white relative z-10 rounded-full overflow-hidden">
                                        {(product.media_primary_url || product.image_url) ? (
                                            <img
                                                alt={product.title || product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                src={product.media_primary_url || product.image_url || ''}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">No image</div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="mt-8 text-lg font-thin text-text-dark transition-colors duration-300 group-hover:text-primary">
                                    {product.title || product.name}
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
                        <span className="relative z-10">View all collections</span>
                    </Link>
                </motion.div>

            </div>

            {/* Iridescent Separator */}
            <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        </section >
    );
}
