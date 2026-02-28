import React from 'react';
import CartItems from '@/components/Update/Cart/CartItems';
import OrderSummary from '@/components/Update/Cart/OrderSummary';
import OrganicDivider from '@/components/Update/OrganicDivider';

export default function CartPage() {
    return (
        <main className="min-h-screen bg-white pt-40 pb-24">
            <div className="max-w-[1280px] mx-auto px-6">
                <header className="mb-20">
                    <h1 className="text-[12px] font-light text-[#888888] uppercase tracking-[0.4em] mb-4 text-center">Your Spectrum</h1>
                    <h2 className="text-[42px] font-light text-[#1a1a1a] uppercase tracking-[0.2em] text-center">Shopping Bag</h2>
                </header>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
                    <CartItems />
                    <OrderSummary />
                </div>
            </div>

            <div className="mt-32">
                <OrganicDivider />
                <div className="h-40 bg-white" />
            </div>
        </main>
    );
}
