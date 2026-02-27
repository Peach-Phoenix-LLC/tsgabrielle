import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Disclaimer — tsgabrielle®',
    description: 'Important disclaimers regarding the use of tsgabrielle.us and the information provided therein.',
};

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Legal Notice</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Disclaimer</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Important limitations and notices regarding the information on this website.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            The information provided on tsgabrielle.us is for general informational purposes only. While we strive to keep the content accurate, Peach Phoenix, LLC. makes no warranties about the completeness, reliability, or accuracy of this information.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. General Information</h2>
                        <p>
                            The content on this website is provided &ldquo;as is&rdquo; without any representations or warranties, express or implied. tsgabrielle® does not warrant that the website will be available uninterrupted or error-free.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Product Representations</h2>
                        <p>
                            Product images on our website are for illustrative purposes. Actual colors and details may vary slightly due to monitor display settings and the nature of handcrafted or limited-edition items.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. External Links</h2>
                        <p>
                            Our website may contain links to third-party websites. These links are provided for your convenience. tsgabrielle® has no control over the content of these external sites and assumes no responsibility for the accuracy or legality of their content.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. Limitation of Liability</h2>
                        <p>
                            In no event shall tsgabrielle® or Peach Phoenix, LLC. be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with the use of this website, whether based on warranty, contract, tort, or any other legal theory.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">05. Professional Advice</h2>
                        <p>
                            Nothing on this website constitutes professional, legal, financial, or medical advice. You should not act or refrain from acting based on any content included on this site without seeking appropriate professional counsel.
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

