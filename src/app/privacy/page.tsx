import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Priority — tsgabrielle®',
    description: 'At tsgabrielle®, your trust is our most valuable asset. We are committed to protecting your digital identity and personal information.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <ModernNavbar />

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Confidentiality Protocols</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Privacy Priority</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Your trust is our most valuable asset. We are committed to protecting your digital identity.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            This privacy policy elucidates the manner in which tsgabrielle®, operated by Peach Phoenix, LLC. ("we," "us," or "our"), collects, utilizes, and safeguards your personal information when you access our website and engage with our services.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Information Collection</h2>
                        <p>
                            We may procure the following categories of information:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>Personal information furnished directly by you, such as your name, email address, billing address, and payment details.</li>
                            <li>Usage data gathered automatically, including your IP address, browser type, and interaction patterns.</li>
                            <li>Cookies and tracking technologies employed to comprehend your engagement.</li>
                            <li>Information acquired from third-party platforms and social media channels.</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Utilization of Data</h2>
                        <p>
                            The information collected is utilized to process transactions, transmit relevant communications, administer your account, and furnish concierge-level support. We also use data to enhance your experience and comply with legal mandates.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Cookies & Tracking</h2>
                        <p>
                            We employ cookies and analogous tracking technologies to optimize your browsing experience. You possess the ability to manage cookie preferences through your web browser settings. For comprehensive details, kindly consult our <Link href="/cookie-policy" className="text-white hover:text-[#a932bd] underline decoration-[#a932bd]/30 underline-offset-4 transition-colors">Cookie Policy</Link>.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. Information Disclosure</h2>
                        <p>
                            We affirm that we do not engage in the sale of your personal information. We may, however, share your information with trusted third-party service providers who assist us in the operation of our digital atelier, such as payment processors and logistics partners.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">05. Your Rights</h2>
                        <p>
                            Subject to your geographical location, you may be entitled to the right to access, rectify, or erase your personal information. To exercise any of these entitlements, please contact us via the digital concierge below.
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
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 pt-4">© 2026 TSGABRIELLE®. ALL IDENTITY RESERVED.</p>
                    </div>

                </div>
            </section>

            <ModernFooter />
        </main>
    );
}
