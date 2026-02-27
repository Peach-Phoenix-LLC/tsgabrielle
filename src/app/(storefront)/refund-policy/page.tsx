import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Refund Policy — tsgabrielle®',
    description: 'Detailed guidelines on returns and our satisfaction guarantee for tsgabrielle® products and services.',
};

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Satisfaction Guarantee</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Refund Policy</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Your satisfaction is our priority. Please review our refund guidelines before making a purchase.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            At tsgabrielle®, operated by Peach Phoenix, LLC., we are committed to your satisfaction. Please read this policy carefully before making a purchase.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Digital Products &amp; Services</h2>
                        <p>
                            Due to the nature of digital products and services, all sales are final once the product has been delivered or access has been granted. We do not offer refunds on digital downloads, templates, presets, or any instantly accessible digital content unless the product is defective or not as described.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Physical Products</h2>
                        <p>
                            If you received a physical product that is damaged, defective, or incorrect, please contact us within 14 days of delivery. We will review your request and, if approved, offer a replacement, store credit, or refund at our discretion. Items must be unused and in their original packaging to be eligible for a return.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Services</h2>
                        <p>
                            Refunds for services are evaluated on a case-by-case basis. If you are unsatisfied with a service, please contact us within 7 days of delivery. We will work with you to find a fair resolution. Services that have been fully rendered are generally not eligible for a refund.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. Subscription Plans</h2>
                        <p>
                            If you are on a subscription plan, you may cancel at any time. Cancellations will take effect at the end of the current billing period. We do not offer partial refunds for unused time within a billing period unless required by law.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">05. How to Request a Refund</h2>
                        <p>
                            To request a refund, please contact us at <Link href="mailto:contact@tsgabrielle.us" className="text-white hover:text-[#a932bd] underline decoration-[#a932bd]/30 underline-offset-4 transition-colors">contact@tsgabrielle.us</Link> with your order number, the reason for your request, and any supporting documentation such as photos of a damaged item. We will respond within 5 business days.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">06. Processing Time</h2>
                        <p>
                            Approved refunds will be processed within 7 to 10 business days and returned to your original payment method. Processing times may vary depending on your bank or payment provider.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">07. Non-Refundable Items</h2>
                        <p>
                            The following are not eligible for refunds: gift cards, downloadable software or digital files once accessed, and any services already fully rendered.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-white/5 space-y-4">
                        <h2 className="text-xl font-serif text-white">Contact</h2>
                        <div className="bg-white/5 p-8 rounded-sm border border-white/5 space-y-2">
                            <p className="text-xs text-white font-bold">Peach Phoenix, LLC.</p>
                            <p className="text-xs">Trading Name: tsgabrielle®</p>
                            <p className="text-xs">Email: <Link href="mailto:contact@tsgabrielle.us" className="text-[#a932bd]">contact@tsgabrielle.us</Link></p>
                            <p className="text-xs">1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, US</p>
                            <p className="text-xs">USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 pt-4">Last Updated: February 2026</p>
                    </div>

                </div>
            </section>

            
        </main>
    );
}

