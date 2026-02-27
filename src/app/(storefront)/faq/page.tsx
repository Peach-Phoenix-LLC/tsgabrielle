import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
    const faqs = [
        {
            category: "The Collection",
            items: [
                { q: "Are your pieces truly limited edition?", a: "Yes. To maintain exclusivity and minimize waste, we produce in small-batch ateliers. Once a specific textile or silhouette is exhausted, it is rarely restocked." },
                { q: "Where are the garments produced?", a: "All tsgabrielle® pieces are conceived in Paris and handcrafted by master artisans in our vetted European partner ateliers." }
            ]
        },
        {
            category: "Identity & Fit",
            items: [
                { q: "How do I ensure the correct fit?", a: "We provide detailed measurements on every product page. Please consult our Size Guide for comprehensive translation between international standards." },
                { q: "Do you offer custom tailoring?", a: "For our 'Atelier' tier pieces, we offer bespoke adjustments for local Parisian clients. Please contact our concierge for remote styling advice." }
            ]
        },
        {
            category: "Orders & Secure Payment",
            items: [
                { q: "Which payment methods do you accept?", a: "We accept all major credit cards, Apple Pay, and secure PayPal transactions." },
                { q: "Is my data secure?", a: "Absolutely. We utilize bank-grade encryption and never store full payment details on our servers." }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Questions Fréquentes</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">How Can We Help?</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em] max-w-xl mx-auto">
                        A curated guide to our service, craft, and philosophies.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-3xl mx-auto space-y-24">
                    {faqs.map((group, idx) => (
                        <div key={idx} className="space-y-12">
                            <h2 className="text-xs uppercase tracking-[0.4em] text-slate-500 font-bold border-b border-white/5 pb-4">{group.category}</h2>
                            <div className="space-y-12">
                                {group.items.map((item, i) => (
                                    <div key={i} className="group">
                                        <h3 className="text-xl font-light mb-4 group-hover:text-[#a932bd] transition-colors">{item.q}</h3>
                                        <p className="text-sm text-slate-400 font-light leading-relaxed tracking-wide">
                                            {item.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-20 border-t border-white/5 text-center">
                        <p className="text-sm text-slate-500 font-light uppercase tracking-widest mb-8">Still have questions?</p>
                        <Link href="/contact" className="inline-block px-12 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-white transition-all rounded-sm">
                            Contact Concierge
                        </Link>
                    </div>
                </div>
            </section>

            
        </main>
    );
}

