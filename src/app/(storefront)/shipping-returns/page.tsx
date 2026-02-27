import React from 'react';
import Link from 'next/link';

export default function ShippingReturnsPage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Logistics & Care</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Shipping & Returns</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Your journey with tsgabrielle® is handled with the utmost precision, from our atelier to your door.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Shipping Policy */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-serif">Worldwide Delivery</h2>
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white">United States</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                                        Complimentary overnight shipping on all orders over $500. Standard delivery (3-5 business days) is always complimentary.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white">International</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                                        Express global shipping via DHL. Delivery timelines vary by region but typically arrive within 5-7 business days.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-8 rounded-sm border border-white/5">
                                <p className="text-xs text-slate-300 font-light italic leading-relaxed">
                                    *Please note that all international orders are subject to import duties and taxes which are the responsibility of the recipient.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Returns Policy */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-serif">Returns & Exchanges</h2>
                        <div className="space-y-6 text-sm text-slate-400 font-light leading-relaxed">
                            <p>
                                We take immense pride in the quality of our pieces. If you are not completely satisfied with your acquisition, we offer a <b>14-day return window</b> from the date of delivery.
                            </p>
                            <ul className="list-disc pl-5 space-y-4 pt-4">
                                <li>Items must be in original, unworn condition with all tags and protective packaging intact.</li>
                                <li>Custom commissions and intimate wear are final sale and cannot be returned.</li>
                                <li>Returns must be initiated through our <Link href="/contact" className="text-white hover:text-[#a932bd] underline decoration-[#a932bd]/30 underline-offset-4 transition-colors">Digital Concierge</Link>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Procedure */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-serif">The Return Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 border border-white/10 rounded-sm space-y-4">
                                <span className="text-2xl font-serif text-[#a932bd]">01</span>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Request</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">Notify our concierge within 14 days of receipt.</p>
                            </div>
                            <div className="p-8 border border-white/10 rounded-sm space-y-4">
                                <span className="text-2xl font-serif text-[#a932bd]">02</span>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Pack</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">Use the original shipping box and included return label.</p>
                            </div>
                            <div className="p-8 border border-white/10 rounded-sm space-y-4">
                                <span className="text-2xl font-serif text-[#a932bd]">03</span>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Refund</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">Upon inspection, your refund will be processed to the original payment method.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            
        </main>
    );
}

