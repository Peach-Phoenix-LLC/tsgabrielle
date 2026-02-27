"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { createPayPalOrderAction, capturePayPalOrderAction } from '@/app/actions/paypal';
import { trackStartedCheckoutAction } from '@/app/actions/klaviyo';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSession } from 'next-auth/react';
import { useGrowthTracking } from '@/components/Analytics/GrowthTracker';

export default function CheckoutForm() {
    const { items, clearCart } = useCartStore();
    const { trackEvent } = useGrowthTracking();
    const { data: session } = useSession();

    // Identity
    const [email, setEmail] = useState('');

    // Shipping Location
    const [shipping, setShipping] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
    });

    // Peaches
    const [peachesToRedeem, setPeachesToRedeem] = useState(0);
    const userPeaches = (session?.user as any)?.peaches || 0;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const userId = (session?.user as any)?.id || null;

    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (items.length > 0) {
            trackEvent('begin_checkout', {
                value: items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
                currency: 'USD'
            });
        }
    }, [items, trackEvent]);

    useEffect(() => {
        const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (mounted && items.length > 0 && email && validateEmail(email) && !hasTrackedCheckout) {
            const timer = setTimeout(async () => {
                const total = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
                await trackStartedCheckoutAction(email, { items, total });
                setHasTrackedCheckout(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [email, items, mounted, hasTrackedCheckout]);

    const handleCreateOrder = async () => {
        if (items.length === 0) {
            setError("Your cart is empty.");
            return "";
        }

        if (!email || !shipping.address || !shipping.city) {
            setError("Please complete identity and location details.");
            return "";
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createPayPalOrderAction(
                items,
                userId,
                {
                    customer_name: `${shipping.firstName} ${shipping.lastName}`,
                    customer_email: email,
                    shipping_address1: shipping.address,
                    shipping_city: shipping.city,
                    shipping_state: shipping.state,
                    shipping_zip: shipping.zip,
                    shipping_country: shipping.country
                },
                peachesToRedeem
            );

            if (result.success && result.paypalOrderId) {
                // Store the Prisma Order ID in state so the capture hook can access it
                setOrderId(result.prismaOrderId || null);
                return result.paypalOrderId; // Return PayPal ID to the SDK
            } else {
                setError(result.error || "Failed to initialize PayPal.");
                return "";
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            return "";
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleApprove = async (data: any, actions: any) => {
        if (!orderId) {
            setError("Session mismatch. Please refresh.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Try to get GA4 Client ID if available
            let gaClientId = 'browser_client';
            if (typeof window !== 'undefined' && (window as any).gtag) {
                try {
                    (window as any).gtag('get', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, 'client_id', (id: string) => {
                        gaClientId = id;
                    });
                } catch (e) { }
            }

            const result = await capturePayPalOrderAction(data.orderID, orderId, gaClientId);

            if (result.success) {
                trackEvent('purchase', {
                    transaction_id: orderId,
                    value: items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
                    currency: 'USD',
                    items: items.map(i => ({
                        item_id: i.id,
                        item_name: i.name,
                        quantity: i.quantity,
                        price: i.price
                    }))
                });
                setSuccess(true);
                clearCart();
            } else {
                setError(result.error || "Payment was not approved.");
            }
        } catch (err) {
            setError("An unexpected error occurred during capture.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // The PayPal Client ID can be passed in standard or sandbox formats.
    // Ensure you match the Sandbox Client ID in `.env.local`.
    const initialOptions = {
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        "currency": "USD",
        "intent": "capture",
        "enable-funding": "applepay,googlepay", // Explicitly enable these
    };

    if (success) {
        return (
            <div className="flex-1 lg:pr-12 xl:pr-16 text-center py-20">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-primary text-4xl font-light">check_circle</span>
                    </div>
                    <h1 className="text-3xl font-light text-text-dark mb-4">Order confirmed</h1>
                    <p className="text-text-dark/50 mb-8 font-light text-[14px]">Thank you. Your order #{orderId?.substring(0, 8)} is being processed.</p>
                    <a href="/" className="inline-block border border-primary text-primary px-8 py-4 rounded-sm font-light text-sm hover:bg-primary/5 transition-all">
                        Return to home
                    </a>
                </motion.div>
            </div>
        );
    }

    if (!mounted) {
        return (
            <div className="flex-1 lg:pr-12 xl:pr-16">
                <h1 className="text-3xl font-light text-text-dark mb-8">Secure checkout</h1>
                <div className="text-text-dark/30 font-light text-sm py-4">Loading checkout...</div>
            </div>
        );
    }

    const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const discount = Math.floor(peachesToRedeem / 100);

    return (
        <div className="flex-1 lg:pr-12 xl:pr-16">

            <h1 className="text-3xl font-light text-text-dark mb-8">Secure checkout</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-sm flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] font-light">error_outline</span>
                    <p className="text-sm font-light">{error}</p>
                </div>
            )}

            <div className="space-y-12">

                {/* 1. Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                >
                    <h2 className="text-lg font-light text-text-dark mb-6 flex items-center gap-3">
                        <span className="w-6 h-6 border border-primary/20 text-primary flex items-center justify-center text-[10px] font-light rounded-full">01</span>
                        Identity
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <input
                                type="email"
                                placeholder="Identity@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-3 mt-2">
                            <input type="checkbox" id="newsletter" className="w-4 h-4 accent-primary bg-white border-primary/20 rounded-sm" defaultChecked />
                            <label htmlFor="newsletter" className="text-[12px] text-text-dark/50 font-light">Acknowledge updates & exclusive access</label>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Shipping Address */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                >
                    <h2 className="text-lg font-light text-text-dark mb-6 flex items-center gap-3">
                        <span className="w-6 h-6 border border-primary/20 text-primary flex items-center justify-center text-[10px] font-light rounded-full">02</span>
                        Location
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <select
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors appearance-none font-light text-sm"
                                value={shipping.country}
                                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                            >
                                <option value="US">United States</option>
                                <option value="FR">France</option>
                                <option value="JP">Japan</option>
                                <option value="GB">United Kingdom</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="First name"
                                value={shipping.firstName}
                                onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last name"
                                value={shipping.lastName}
                                onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Street address"
                                value={shipping.address}
                                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="City"
                                value={shipping.city}
                                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="State"
                                value={shipping.state}
                                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Zip code"
                                value={shipping.zip}
                                onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                                className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* 3. Peaches Loyalty */}
                {session && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 }}
                    >
                        <h2 className="text-lg font-light text-text-dark mb-6 flex items-center gap-3">
                            <span className="w-6 h-6 border border-primary/20 text-primary flex items-center justify-center text-[10px] font-light rounded-full">03</span>
                            Peaches Loyalty
                        </h2>

                        <div className="p-6 border border-primary/10 bg-white rounded-sm">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[12px] text-text-dark/60 font-light">Available balance: <span className="text-primary font-medium">🍑 {userPeaches}</span></span>
                                <span className="text-[10px] uppercase tracking-widest text-text-dark/40">100 🍑 = $1 discount</span>
                            </div>

                            {userPeaches >= 100 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max={Math.min(userPeaches, subtotal * 100)}
                                            step="100"
                                            value={peachesToRedeem}
                                            onChange={(e) => setPeachesToRedeem(parseInt(e.target.value))}
                                            className="flex-grow h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-sm font-light text-text-dark min-w-[60px] text-right">🍑 {peachesToRedeem}</span>
                                    </div>
                                    <p className="text-[11px] text-text-dark/50 font-light italic">Applying <span className="text-primary">${discount.toFixed(2)}</span> discount to your order.</p>
                                </div>
                            ) : (
                                <p className="text-[11px] text-text-dark/40 font-light italic text-center">Earn 100 Peaches to start redeeming rewards.</p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 3. Shipping Method */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: session ? 0.4 : 0.3 }}
                >
                    <h2 className="text-lg font-light text-text-dark mb-6 flex items-center gap-3">
                        <span className="w-6 h-6 border border-primary/20 text-primary flex items-center justify-center text-[10px] font-light rounded-full">03</span>
                        Flow
                    </h2>

                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-5 border border-primary bg-primary/5 rounded-sm cursor-pointer transition-all">
                            <div className="flex items-center gap-5">
                                <input type="radio" name="shipping_method" className="w-4 h-4 accent-primary" defaultChecked />
                                <div>
                                    <p className="text-[13px] text-text-dark font-light">Maison express delivery</p>
                                    <p className="text-[11px] text-text-dark/40 mt-1 font-light">2-3 business cycles</p>
                                </div>
                            </div>
                            <span className="text-[11px] text-primary font-light">Complimentary</span>
                        </label>
                    </div>
                </motion.div>

                {/* 4. Payment */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: session ? 0.5 : 0.4 }}
                >
                    <h2 className="text-lg font-light text-text-dark mb-6 flex items-center gap-3">
                        <span className="w-6 h-6 border border-primary/20 text-primary flex items-center justify-center text-[10px] font-light rounded-full">04</span>
                        Transfer
                    </h2>
                    <p className="text-text-dark/40 font-light text-[12px] mb-8">Secure encrypted transfer via PayPal authority.</p>

                    <div className="p-8 border border-primary/10 bg-white shadow-sm flex flex-col justify-center min-h-[250px] relative overflow-hidden rounded-sm">
                        <div className="relative z-10">
                            {/* Security Shield Header */}
                            <div className="flex items-center justify-center gap-3 mb-8 pb-8 border-b border-primary/5">
                                <span className="material-symbols-outlined text-primary text-sm font-light">enhanced_encryption</span>
                                <p className="text-[10px] font-light text-text-dark/60">
                                    Secure maison portal — authenticated by PayPal
                                </p>
                            </div>

                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    createOrder={() => handleCreateOrder()}
                                    onApprove={(data, actions) => handleApprove(data, actions)}
                                    disabled={isSubmitting || items.length === 0}
                                    style={{
                                        layout: "vertical",
                                        color: "gold",
                                        shape: "rect",
                                        label: "paypal"
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
