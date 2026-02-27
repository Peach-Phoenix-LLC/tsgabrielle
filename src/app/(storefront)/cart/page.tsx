import React from 'react';
import CartItems from '@/components/Stitch/Checkout/CartItems';
import OrderSummary from '@/components/Stitch/Checkout/OrderSummary';

export default function ShoppingBagPage() {
    return (
        <main className="min-h-screen bg-white text-slate-100 font-sans selection:bg-white/30 selection:text-white">
            {/* Global Navbar */}
            <div className="bg-white shadow-sm pb-1 relative z-50">
                
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Left Column: Cart Items */}
                    <CartItems />

                    {/* Right Column: Order Summary (Sticky) */}
                    <OrderSummary />

                </div>

            </div>

            {/* Global Footer */}
            
        </main>
    );
}

