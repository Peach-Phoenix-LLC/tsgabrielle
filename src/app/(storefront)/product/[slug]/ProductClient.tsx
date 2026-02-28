'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductClientProps {
    product: any;
}

const ProductClient = ({ product }: ProductClientProps) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();

    const sizes = Array.from(new Set(product.variants.map((v: any) => v.size_label))).filter(Boolean);
    const colors = Array.from(new Set(product.variants.map((v: any) => v.color))).filter(Boolean);

    const price = parseFloat(product.msrp_display?.replace('$', '').replace(',', '') || '0');

    const handleAddToCart = () => {
        addItem({
            id: `${product.id}-${selectedSize}-${selectedColor}`,
            name: product.title,
            price: price,
            image: product.media_primary_url,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor
        });
        // You could trigger a nice slide-out cart here
    };

    return (
        <div className="flex flex-col select-none">
            {/* Tagline / Subtitle */}
            <span className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.5em] mb-6 block">
                {product.tagline || 'Limited Refraction'}
            </span>

            {/* Title & Price */}
            <div className="space-y-4 mb-12">
                <h1 className="text-[clamp(32px,4vw,52px)] font-light text-[#1a1a1a] uppercase tracking-[0.15em] leading-[1.1]">
                    {product.title}
                </h1>
                <div className="flex items-center gap-6">
                    <p className="text-[28px] font-light text-[#a932bd] tracking-[0.05em]">
                        ${price.toFixed(2)}
                    </p>
                    <div className="px-3 py-1 bg-[#a932bd]/10 rounded-full">
                        <span className="text-[9px] font-light text-[#a932bd] uppercase tracking-[0.2em]">+ {Math.floor(price)} PEACHES</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#e7e7e7] mb-12" />

            {/* Short Narrative */}
            <div 
                className="text-[15px] font-light text-[#888888] leading-relaxed mb-12 max-w-md prose prose-sm prose-neutral"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
            />

            {/* Variants */}
            <div className="space-y-12 mb-16">
                {sizes.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-[11px] font-light text-[#888888] uppercase tracking-[0.3em]">Dimension</h4>
                            <button className="text-[10px] font-light text-[#a932bd] uppercase tracking-[0.2em] border-b border-[#a932bd]/30 hover:border-[#a932bd] transition-all">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {sizes.map((size: any) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`min-w-[70px] h-[70px] rounded-full border text-[13px] font-light transition-all duration-500 flex items-center justify-center uppercase tracking-[0.1em] ${selectedSize === size
                                            ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-xl scale-105'
                                            : 'bg-white border-[#e7e7e7] text-[#1a1a1a] hover:border-[#a932bd]'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {colors.length > 0 && (
                    <div>
                        <h4 className="text-[11px] font-light text-[#888888] uppercase tracking-[0.3em] mb-6">Iridescence</h4>
                        <div className="flex flex-wrap gap-4">
                            {colors.map((color: any) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-8 py-3 rounded-full border text-[12px] font-light transition-all duration-500 uppercase tracking-[0.2em] ${selectedColor === color
                                            ? 'bg-white border-[#a932bd] text-[#a932bd] shadow-[0_10px_30px_rgba(169,50,189,0.15)] ring-1 ring-[#a932bd]'
                                            : 'bg-white border-[#e7e7e7] text-[#1a1a1a] hover:border-[#a932bd]'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-12">
                    <div>
                        <h4 className="text-[11px] font-light text-[#888888] uppercase tracking-[0.3em] mb-4">Quantity</h4>
                        <div className="flex items-center space-x-8 border border-[#e7e7e7] w-fit px-8 py-3 rounded-full bg-white">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#1a1a1a] hover:text-[#a932bd] transition-colors">-</button>
                            <span className="text-[14px] font-light w-4 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="text-[#1a1a1a] hover:text-[#a932bd] transition-colors">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <button
                    onClick={handleAddToCart}
                    disabled={(!selectedSize && sizes.length > 0) || (!selectedColor && colors.length > 0)}
                    className="w-full py-6 bg-[#a932bd] text-white text-[12px] font-light tracking-[0.4em] uppercase rounded-full hover:shadow-[0_25px_50px_rgba(169,50,189,0.4)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                    <span className="relative z-10">Commit to Shift</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
                </button>

                <p className="text-center text-[10px] font-light text-[#888888] uppercase tracking-[0.2em]">
                    Secured Refraction Checkout
                </p>
            </div>

            {/* Brand Proofs */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[#e7e7e7] pt-12 text-[11px] font-light text-[#888888] uppercase tracking-[0.1em]">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-[#a932bd]/60">shutter_speed</span>
                    <span>3-5 Day Refraction</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-[#a932bd]/60">verified_user</span>
                    <span>Authentic Update®</span>
                </div>
            </div>

            {/* Mobile Sticky Navigation (Visible on small screens) */}
            <div className="md:hidden fixed bottom-1 left-0 w-full px-4 z-[100]">
                <div className="bg-white/80 backdrop-blur-2xl border border-white/50 p-6 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-light text-[#888888] uppercase tracking-[0.2em] block mb-1">Total Refraction</span>
                        <span className="text-[20px] font-light text-[#a932bd] tracking-[0.05em]">${(price * quantity).toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={(!selectedSize && sizes.length > 0) || (!selectedColor && colors.length > 0)}
                        className="px-10 py-4 bg-[#a932bd] text-white text-[11px] font-light tracking-[0.3em] uppercase rounded-full shadow-lg active:scale-95 transition-all disabled:opacity-50"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductClient;
