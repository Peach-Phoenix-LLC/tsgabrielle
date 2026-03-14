'use client';

import React from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

const OrderSummary = () => {
    const { getSubtotal, items } = useCartStore();
    const subtotal = getSubtotal();
    const shipping = subtotal > 150 ? 0 : 15;
    const total = subtotal + shipping;

    if (items.length === 0) return null;

    return (
        <aside className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-32 p-12 rounded-[40px] bg-white border border-[#e7e7e7] glass-panel shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative overflow-hidden">
                {/* Subtle Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a932bd] opacity-[0.03] blur-3xl rounded-full translate-x-10 -translate-y-10" />

                <h2 className="text-[12px] font-light text-[#1a1a1a] uppercase tracking-[0.4em] mb-12 border-b border-[#e7e7e7] pb-6">Summary</h2>

                <div className="space-y-8 mb-12">
                    <div className="flex justify-between text-[14px] font-light tracking-[0.05em]">
                        <span className="text-[#888888] uppercase text-[11px] tracking-[0.2em]">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] font-light tracking-[0.05em]">
                        <span className="text-[#888888] uppercase text-[11px] tracking-[0.2em]">Shipping</span>
                        <span className={shipping === 0 ? 'text-[#a932bd]' : ''}>
                            {shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    {shipping !== 0 && (
                        <p className="text-[10px] font-light text-[#888888] uppercase tracking-[0.1em] mt-2">
                            Add ${(150 - subtotal).toFixed(2)} for complimentary shipping
                        </p>
                    )}

                    <div className="pt-8 border-t border-[#e7e7e7] flex justify-between items-end">
                        <span className="text-[11px] font-light text-[#1a1a1a] uppercase tracking-[0.3em]">Total Refraction</span>
                        <span className="text-[28px] font-light text-[#a932bd] tracking-[0.05em] leading-none">${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="p-8 bg-[#f7f7f7] rounded-[24px] mb-12 border border-[#e7e7e7] group hover:border-[#a932bd]/20 transition-all">
                    <p className="text-[10px] font-light text-[#a932bd] tracking-[0.3em] uppercase mb-2">Rewards Earned</p>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[18px] text-[#a932bd]">auto_awesome</span>
                        <p className="text-[15px] font-light text-[#1a1a1a] tracking-[0.05em]">{Math.floor(subtotal)} Refraction Peaches</p>
                    </div>
                </div>

                <Link
                    href="/checkout"
                    className="w-full py-6 bg-[#a932bd] text-white text-[12px] font-light tracking-[0.4em] uppercase rounded-full flex items-center justify-center hover:shadow-[0_25px_60px_rgba(169,50,189,0.4)] transition-all duration-500 group overflow-hidden relative"
                >
                    <span className="relative z-10">Initiate Checkout</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
                </Link>

                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-center gap-4 opacity-40">
                        <div className="w-8 h-px bg-[#888888]" />
                        <span className="text-[9px] font-light uppercase tracking-[0.3em] text-[#888888]">Secure Encrypted</span>
                        <div className="w-8 h-px bg-[#888888]" />
                    </div>
                    <p className="text-[10px] text-[#888888] font-light text-center uppercase tracking-[0.15em] leading-relaxed">
                        Taxes and potential duties calculated during the final shift.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default OrderSummary;
