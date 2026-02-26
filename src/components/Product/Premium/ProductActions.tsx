"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronDown, ChevronUp, Check, Heart, Share2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface ProductActionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        inventory?: string;
    };
    variants: { id: string; size_label: string; inventory: string }[];
    onShare: () => void;
}

export const ProductActions = ({ product, variants, onShare }: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const addItem = useCartStore((state) => state.addItem);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = () => {
        if (!selectedSize && variants.length > 0) {
            showToast("Please select a size first.");
            return;
        }

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
        });

        setAdded(true);
        showToast("Success: Piece added to your atelier bag.");
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        showToast(!isWishlisted ? "Saved: item added to your wishlist." : "Removed: item removed from your wishlist.");
    };

    return (
        <div className="space-y-10">
            {/* Size Selector */}
            {variants.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] uppercase tracking-widest font-bold text-text-dark">Select Size</span>
                        <button className="text-[10px] uppercase tracking-widest text-text-dark/40 hover:text-text-dark transition-colors border-b border-transparent hover:border-text-dark/20">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {variants.map((v) => {
                            const isOut = v.inventory === 'Out of Stock';
                            return (
                                <button
                                    key={v.id}
                                    disabled={isOut}
                                    onClick={() => setSelectedSize(v.size_label)}
                                    className={`h-12 flex items-center justify-center text-[11px] uppercase tracking-widest transition-all rounded-sm border ${selectedSize === v.size_label
                                            ? 'bg-black text-white border-black'
                                            : isOut
                                                ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed'
                                                : 'hover:border-black border-zinc-200 text-zinc-600'
                                        }`}
                                >
                                    {v.size_label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Quantity Selector & Buy Section */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-zinc-200 rounded-sm">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-14 flex items-center justify-center hover:bg-zinc-50 transition-colors"
                        >
                            <ChevronDown size={14} />
                        </button>
                        <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-14 flex items-center justify-center hover:bg-zinc-50 transition-colors"
                        >
                            <ChevronUp size={14} />
                        </button>
                    </div>

                    {/* Add to Bag */}
                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 h-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] font-bold transition-all ${added ? 'bg-green-600 text-white' : 'bg-[#a932bd] text-white hover:brightness-110'
                            } rounded-sm shadow-xl`}
                    >
                        {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                        {added ? 'Confident Addition' : 'Acquire Piece'}
                    </button>
                </div>

                {/* Buy Now & Payment Methods */}
                <button className="w-full h-14 bg-black text-white text-[11px] uppercase tracking-[0.3em] font-bold rounded-sm border border-black hover:bg-zinc-900 transition-all flex items-center justify-center gap-4">
                    Express Checkout
                    <div className="flex gap-2">
                        {/* Mock Apple/Google Pay icons or text */}
                        <span className="text-[14px]">Pay</span>
                        <span className="text-[14px]">GPay</span>
                    </div>
                </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4 pt-4 border-t border-zinc-100">
                <button
                    onClick={handleWishlist}
                    className="flex-1 h-12 flex items-center justify-center gap-2 border border-zinc-200 hover:border-text-dark transition-all rounded-sm text-[10px] uppercase tracking-widest"
                >
                    <Heart size={14} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                    {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                <button
                    onClick={onShare}
                    className="flex-1 h-12 flex items-center justify-center gap-2 border border-zinc-200 hover:border-text-dark transition-all rounded-sm text-[10px] uppercase tracking-widest"
                >
                    <Share2 size={14} />
                    Share Selection
                </button>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1001] bg-black text-white px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl border border-white/10"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#a932bd] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
