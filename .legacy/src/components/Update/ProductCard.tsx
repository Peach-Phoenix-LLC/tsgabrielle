'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col"
        >
            <Link
                href={`/product/${product.slug || product.id}`}
                className="aspect-[3/4] overflow-hidden bg-[#f7f7f7] rounded-[32px] mb-8 relative group-hover:shadow-[0_40px_80px_rgba(169,50,189,0.12)] transition-all duration-700"
            >
                {/* Product Image */}
                <Image
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    src={product.media_primary_url || "https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/transparent_bg.png"}
                />

                {/* Holographic Iridescent Foil Shimmer Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none holo-shimmer" />

                {/* Wishlist Heart - Glowing on hover */}
                <button className="absolute top-8 right-8 text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-all duration-500 hover:text-[#a932bd] hover:scale-125 z-10">
                    <span className="material-symbols-outlined text-[24px] font-light">favorite</span>
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
                    <button className="w-full bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[11px] font-light tracking-[0.3em] py-5 rounded-2xl uppercase shadow-xl hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
                        Quick Add
                    </button>
                </div>
            </Link>

            <div className="px-4 space-y-2">
                <span className="text-[10px] font-light text-[#888888] uppercase tracking-[0.3em] block">
                    {product.catalogue_category || 'Essential'}
                </span>
                <div className="flex justify-between items-baseline">
                    <h3 className="text-[16px] font-light text-[#1a1a1a] uppercase tracking-[0.15em] group-hover:text-[#a932bd] transition-colors duration-300">
                        {product.title}
                    </h3>
                    <span className="text-[15px] font-light text-[#a932bd] tracking-[0.1em]">
                        ${product.msrp_display || '0.00'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
