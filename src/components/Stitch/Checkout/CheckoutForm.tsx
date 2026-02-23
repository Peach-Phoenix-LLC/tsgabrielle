"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { createPayPalOrderAction, capturePayPalOrderAction } from '@/app/actions/paypal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSession } from 'next-auth/react';
import { useGrowthTracking } from '@/components/Analytics/GrowthTracker';

export default function CheckoutForm() {
    const { items, clearCart } = useCartStore();
    const { trackEvent } = useGrowthTracking();
    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const userId = (session?.user as any)?.id || null;

    useEffect(() => {
        setMounted(true);

        if (items.length > 0) {
            trackEvent('begin_checkout', {
                value: items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
                currency: 'USD'
            });
        }
    }, [items, trackEvent]);

    const handleCreateOrder = async () => {
        if (items.length === 0) {
            setError("Your cart is empty.");
            return "";
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await createPayPalOrderAction(items, userId);

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
            const result = await capturePayPalOrderAction(data.orderID, orderId);

            if (result.success) {
                trackEvent('purchase', {
                    item_id: orderId,
                    value: items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
                    currency: 'USD'
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
                            <input type="email" placeholder="Identity@domain.com" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
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
                            <select className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors appearance-none font-light text-sm" defaultValue="US">
                                <option value="US">United States</option>
                                <option value="FR">France</option>
                                <option value="JP">Japan</option>
                                <option value="UK">United Kingdom</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" placeholder="First name" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                        </div>
                        <div>
                            <input type="text" placeholder="Last name" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <input type="text" placeholder="Street address" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                        </div>
                        <div>
                            <input type="text" placeholder="City" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="State" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                            <input type="text" placeholder="Zip code" className="w-full px-4 py-4 bg-white border border-primary/10 rounded-sm text-text-dark focus:outline-none focus:border-primary transition-colors placeholder:text-text-dark/20 font-light text-sm" />
                        </div>
                    </div>
                </motion.div>

                {/* 3. Shipping Method */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 }}
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
                    transition={{ duration: 0.35, delay: 0.4 }}
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
