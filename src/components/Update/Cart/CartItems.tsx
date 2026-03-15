'use client';

import React, { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CartItems = () => {
    const posthog = usePostHog();
    const { items, updateQuantity, removeItem } = useCartStore();

    useEffect(() => {
        // Track cart view
        if (items.length > 0) {
            const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            posthog?.capture("cart_viewed", {
                item_count: items.length,
                total_value: totalValue,
                currency: "USD",
                product_names: items.map(i => i.name),
            });
        }
    }, [items.length, posthog]);

    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-grow flex flex-col items-center justify-center py-40 space-y-10"
            >
                <div className="w-40 h-40 bg-[#f7f7f7] rounded-full flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#a932bd] opacity-5 group-hover:opacity-10 transition-opacity" />
                    <span className="material-symbols-outlined text-[56px] text-[#a932bd] font-light opacity-40">shopping_bag</span>
                    {/* Animated Ring */}
                    <div className="absolute inset-0 border border-[#a932bd] opacity-10 rounded-full scale-90 animate-pulse" />
                </div>
                <div className="text-center space-y-4">
                    <h3 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.4em]">Your Spectrum is Clear</h3>
                    <p className="text-[12px] font-light text-[#888888] uppercase tracking-[0.2em]">Begin your shift today.</p>
                </div>
                <Link href="/shop" className="px-12 py-4 bg-[#1a1a1a] text-white text-[11px] font-light uppercase tracking-[0.3em] rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all">
                    Explore Collection
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="flex-grow">
            <div className="flex justify-between items-end mb-16 px-2">
                <h2 className="text-[11px] font-light text-[#888888] uppercase tracking-[0.4em]">Selection Spectrum</h2>
                <span className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.2em]">{items.length} Elements</span>
            </div>

            <div className="space-y-12">
                <AnimatePresence mode="popLayout">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                            exit={{ opacity: 0, x: -50, scale: 0.95 }}
                            className="flex items-start gap-10 pb-12 border-b border-[#e7e7e7] group relative"
                        >
                            <Link href={`/product/${item.id.split('-')[0]}`} className="w-32 aspect-[3/4] rounded-[24px] overflow-hidden bg-[#f7f7f7] shrink-0 relative holo-shimmer group-hover:shadow-2xl transition-all duration-700">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <div className="flex-grow pt-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-[18px] font-light text-[#1a1a1a] uppercase tracking-[0.1em] mb-1 group-hover:text-[#a932bd] transition-colors">{item.name}</h3>
                                        <p className="text-[11px] font-light text-[#a932bd] tracking-[0.3em] uppercase opacity-70">
                                            {item.size} {item.color && `· ${item.color}`}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            removeItem(item.id);
                                            posthog?.capture("product_removed_from_cart", {
                                                product_id: item.id,
                                                product_name: item.name,
                                                price: item.price,
                                                quantity_removed: item.quantity,
                                                currency: "USD",
                                            });
                                        }}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-[#888888] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                </div>

                                <div className="flex justify-between items-end mt-12">
                                    <div className="flex items-center space-x-10 border border-[#e7e7e7] px-8 py-3 rounded-full bg-white group-hover:border-[#a932bd]/30 transition-colors">
                                        <button
                                            onClick={() => {
                                                const newQuantity = item.quantity - 1;
                                                updateQuantity(item.id, newQuantity);
                                                if (newQuantity > 0) {
                                                    posthog?.capture("cart_quantity_updated", {
                                                        product_id: item.id,
                                                        product_name: item.name,
                                                        old_quantity: item.quantity,
                                                        new_quantity: newQuantity,
                                                        change: -1,
                                                    });
                                                }
                                            }}
                                            className="text-[#1a1a1a] hover:text-[#a932bd] transition-colors text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="text-[14px] font-light w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => {
                                                const newQuantity = item.quantity + 1;
                                                updateQuantity(item.id, newQuantity);
                                                posthog?.capture("cart_quantity_updated", {
                                                    product_id: item.id,
                                                    product_name: item.name,
                                                    old_quantity: item.quantity,
                                                    new_quantity: newQuantity,
                                                    change: 1,
                                                });
                                            }}
                                            className="text-[#1a1a1a] hover:text-[#a932bd] transition-colors text-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[18px] font-light text-[#1a1a1a] tracking-[0.05em]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CartItems;
