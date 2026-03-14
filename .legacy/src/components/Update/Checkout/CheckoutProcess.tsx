'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = ['Refraction Identity', 'Gateway of Shipping', 'Final Shift'];

const CheckoutProcess = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleContinue = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsProcessing(true);
            setTimeout(() => {
                // Success redirect logic would go here
                window.location.href = '/thank-you';
            }, 2500);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto py-12">
            {/* Step Indicator: Organic Blobs */}
            <div className="flex items-center justify-between mb-24 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#e7e7e7] -translate-y-1/2 z-0" />
                {steps.map((step, i) => (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={false}
                            animate={{
                                backgroundColor: i <= currentStep ? '#a932bd' : '#ffffff',
                                borderColor: i <= currentStep ? '#a932bd' : '#e7e7e7',
                                scale: i === currentStep ? 1.4 : 1,
                                boxShadow: i === currentStep ? '0 0 30px rgba(169, 50, 189, 0.4)' : 'none'
                            }}
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-700 relative ${i <= currentStep ? 'holo-shimmer' : ''}`}
                        >
                            {i < currentStep && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center text-white text-[10px]"
                                >
                                    ✓
                                </motion.span>
                            )}
                        </motion.div>
                        <span className={`mt-6 text-[9px] uppercase tracking-[0.4em] font-light text-center transition-colors duration-500 whitespace-nowrap ${i <= currentStep ? 'text-[#a932bd]' : 'text-[#888888]'}`}>
                            {step}
                        </span>
                    </div>
                ))}
            </div>

            <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div>
                                <h3 className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.4em] mb-8">Refraction Identity</h3>
                                <div className="space-y-6">
                                    <div className="group relative">
                                        <input
                                            type="email"
                                            placeholder="RECIPIENT EMAIL"
                                            className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30"
                                        />
                                        <div className="absolute bottom-0 left-0 h-px bg-[#a932bd] w-0 group-focus-within:w-full transition-all duration-700" />
                                    </div>
                                    <div className="flex items-center space-x-4 pt-4">
                                        <input type="checkbox" className="w-4 h-4 rounded-full border-[#e7e7e7] text-[#a932bd] focus:ring-[#a932bd] accent-[#a932bd]" />
                                        <span className="text-[12px] font-light text-[#888888] uppercase tracking-[0.1em]">Notify me of future Refraction shifts</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            key="shipping"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <h3 className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.4em] mb-8">Gateway of Shipping</h3>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                <div className="group relative">
                                    <input placeholder="FIRST NAME" className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30" />
                                </div>
                                <div className="group relative">
                                    <input placeholder="LAST NAME" className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30" />
                                </div>
                                <div className="group relative col-span-2">
                                    <input placeholder="SURFACE ADDRESS" className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30" />
                                </div>
                                <div className="group relative">
                                    <input placeholder="REGION / CITY" className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30" />
                                </div>
                                <div className="group relative">
                                    <input placeholder="DIMENSION CODE (ZIP)" className="w-full bg-white border-b border-[#e7e7e7] px-2 py-4 text-[16px] font-light tracking-[0.1em] focus:outline-none focus:border-[#a932bd] transition-all uppercase placeholder:text-[#888888]/30" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <h3 className="text-[11px] font-light text-[#a932bd] uppercase tracking-[0.4em] mb-8">Final Shift</h3>
                            <div className="grid grid-cols-1 gap-8">
                                <div className="p-12 border border-[#a932bd]/20 rounded-[32px] bg-[#a932bd]/5 relative group overflow-hidden transition-all duration-700 hover:border-[#a932bd]/40">
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl -z-10" />
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center gap-6">
                                            <span className="material-symbols-outlined text-[#a932bd] text-[32px] font-light">shield_with_heart</span>
                                            <div>
                                                <h4 className="text-[14px] font-light text-[#1a1a1a] uppercase tracking-[0.15em] mb-1">Encrypted Payment Gateway</h4>
                                                <p className="text-[11px] font-light text-[#888888] uppercase tracking-[0.1em]">Ready for secure authorization</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-1.5 bg-[#a932bd] rounded-full">
                                            <span className="text-[9px] text-white font-light uppercase tracking-[0.2em]">Verified</span>
                                        </div>
                                    </div>
                                    <p className="text-[13px] font-light text-[#888888] leading-relaxed">
                                        Your details are secured using spectral encryption. Payment authorization will occur in a separate secure refraction layer.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-16 flex items-center justify-between">
                    {currentStep > 0 && (
                        <button
                            type="button"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="text-[11px] font-light text-[#888888] uppercase tracking-[0.4em] border-b border-transparent hover:border-[#888888] transition-all py-1 pb-2"
                        >
                            Back to Previous Layer
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isProcessing}
                        className="ml-auto px-16 py-5 bg-[#1a1a1a] text-white text-[12px] font-light tracking-[0.4em] uppercase rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-[#a932bd] transition-all duration-700 relative overflow-hidden group"
                    >
                        <span className={`relative z-10 transition-opacity duration-300 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
                            {currentStep === 2 ? 'Place Reflection Order' : 'Advance to Next Layer'}
                        </span>
                        {isProcessing && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-[#a932bd] translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutProcess;
