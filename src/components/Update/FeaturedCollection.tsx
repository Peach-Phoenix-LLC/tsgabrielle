'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
    id: number;
    title: string;
    msrp_display: string;
    media_primary_url: string;
    catalogue_category: string;
}

const FeaturedCollection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return null;

    return (
        <section className="py-24 bg-[#e7e7e7]">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.2em]">
                        THE COLLECTION
                    </h2>
                    <div className="w-20 h-[1px] bg-[#a932bd] mt-4 opacity-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] group"
                        >
                            <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden holo-shimmer">
                                <img
                                    src={product.media_primary_url || '/placeholder.jpg'}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white text-[#1a1a1a] text-[11px] font-light tracking-[0.1em] px-8 py-3 rounded-full uppercase shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        Quick Add
                                    </span>
                                </div>
                            </Link>

                            <div className="p-8 text-center">
                                <p className="text-[10px] text-[#888888] uppercase tracking-[0.2em] mb-2">
                                    {product.catalogue_category}
                                </p>
                                <h3 className="text-[16px] font-light text-[#1a1a1a] uppercase tracking-[0.1em] mb-3">
                                    {product.title}
                                </h3>
                                <p className="text-[15px] font-light text-[#a932bd] tracking-[0.05em]">
                                    {product.msrp_display}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
