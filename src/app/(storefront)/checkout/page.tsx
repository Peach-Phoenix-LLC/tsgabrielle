import React from 'react';
import CheckoutForm from '@/components/Stitch/Checkout/CheckoutForm';
import CheckoutSummary from '@/components/Stitch/Checkout/CheckoutSummary';

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 md:py-60">
                <header className="mb-24">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold block mb-6">Maison Acquisition</span>
                    <h1 className="text-7xl font-extralight tracking-tighter text-[#1a1a1a]">Secure Checkout</h1>
                </header>

                <div className="flex flex-col-reverse lg:flex-row gap-20 lg:gap-32">
                    {/* Left Column: Checkout Form */}
                    <div className="flex-1">
                        <CheckoutForm />
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <CheckoutSummary />
                    </div>
                </div>
            </div>
        </main>
    );
}

