import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Affiliate Disclosure — tsgabrielle®',
    description: 'Information about affiliate relationships and sponsored content on tsgabrielle.us.',
};

export default function AffiliateDisclosurePage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Financial Transparency</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Affiliate Disclosure</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Our transparent disclosure regarding affiliate relationships and sponsored content.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            In the interest of full transparency, this page discloses how tsgabrielle®, operated by Peach Phoenix, LLC., may earn compensation through affiliations and partnerships.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Affiliate Links</h2>
                        <p>
                            Some of the links on tsgabrielle.us may be affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at no additional cost to you. These commissions help support the operation of our website and allow us to continue creating content.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Sponsored Content</h2>
                        <p>
                            From time to time, tsgabrielle® may publish content that is sponsored by or created in partnership with third-party brands. All sponsored content will be clearly labeled as such. Our editorial integrity remains paramount; we only collaborate with brands whose values align with our own.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Product Reviews</h2>
                        <p>
                            Any product reviews or recommendations on tsgabrielle.us reflect our honest opinions. If a product was received for free or at a discount for review purposes, this will be disclosed. Our reviews are not influenced by compensation.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. FTC Compliance</h2>
                        <p>
                            This disclosure is provided in accordance with the Federal Trade Commission&apos;s guidelines on endorsements and testimonials. We are committed to complying with all applicable regulations regarding transparency in advertising.
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

