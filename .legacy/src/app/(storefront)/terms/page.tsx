import React from 'react';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            

            <header className="pt-48 pb-20 border-b border-black/10">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Mentions Légales</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Terms of Service</h1>
                    <p className="text-sm text-[#1a1a1a]/60 font-light leading-relaxed uppercase tracking-[0.2em]">
                        The legal framework governing your experience with the tsgabrielle® digital atelier.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-[#1a1a1a]/60 font-light leading-relaxed">

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">01. Acceptance of Terms</h2>
                        <p>
                            By accessing tsgabrielle.us, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">02. Intellectual Property</h2>
                        <p>
                            All content on this site, including designs, photography, text, and logos, is the exclusive intellectual property of tsgabrielle® and protected by international copyright laws. Reproduction of any materials without express written consent is strictly prohibited.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">03. Commercial Transactions</h2>
                        <p>
                            All orders are subject to acceptance and availability. Prices are listed in USD and are subject to change. We reserve the right to refuse service to anyone at any time for any reason.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">04. Limitation of Liability</h2>
                        <p>
                            tsgabrielle® shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the services provided on this website.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-black/10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Last Updated: February 2026</p>
                    </div>

                </div>
            </section>

            
        </main>
    );
}

