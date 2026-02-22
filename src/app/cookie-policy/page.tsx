import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Cookie Policy — tsgabrielle®',
    description: 'How tsgabrielle® uses cookies and similar tracking technologies to improve your browsing experience.',
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-[#050406] text-white font-sans">
            <ModernNavbar />

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Digital Transparency</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Cookie Policy</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Understanding how we use cookies to provide you with the best experience.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            This Cookie Policy explains how tsgabrielle®, operated by Peach Phoenix, LLC., uses cookies and similar tracking technologies on our website.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. What Are Cookies</h2>
                        <p>
                            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owner.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Types of Cookies We Use</h2>
                        <p>
                            <b className="text-white">Essential cookies</b> are necessary for the website to function properly and cannot be switched off. <b className="text-white">Analytics cookies</b> allow us to count visits and traffic sources so we can measure and improve performance of our website. We use tools such as Google Analytics for this purpose. <b className="text-white">Preference cookies</b> enable the website to remember information that changes the way the website behaves or looks. <b className="text-white">Marketing cookies</b> may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Third-Party Cookies</h2>
                        <p>
                            Our website may include content from third-party platforms such as YouTube, Instagram, TikTok, Facebook, X, Pinterest, LinkedIn, and Snapchat, which may set their own cookies. We do not control these cookies and recommend reviewing the cookie policies of those platforms directly.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. Managing Cookies</h2>
                        <p>
                            You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. You can also opt out of Google Analytics by using the Google Analytics opt-out browser add-on.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">05. Changes to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.
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

            <ModernFooter />
        </main>
    );
}
