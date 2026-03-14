import React from 'react';
import CheckoutProcess from '@/components/Update/Checkout/CheckoutProcess';
import OrderSummary from '@/components/Update/Cart/OrderSummary';

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-white pt-40 pb-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <header className="mb-20 text-center">
                    <h1 className="text-[12px] font-light text-[#888888] uppercase tracking-[0.4em] mb-4">Refraction Acquisition</h1>
                    <h2 className="text-[42px] font-light text-[#1a1a1a] uppercase tracking-[0.2em]">Secure Checkout</h2>
                </header>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
                    <div className="flex-grow">
                        <CheckoutProcess />
                    </div>
                    <div className="hidden lg:block">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </main>
    );
}
