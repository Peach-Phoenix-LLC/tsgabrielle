import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Accessibility Statement — tsgabrielle®',
    description: 'Our commitment to ensuring tsgabrielle.us is accessible to all users, including those with disabilities.',
};

export default function AccessibilityPage() {
    return (
        <main className="min-h-screen bg-[#050406] text-white font-sans">
            <ModernNavbar />

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Inclusive Design</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Accessibility</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Our commitment to making the tsgabrielle® experience available to everyone.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            tsgabrielle®, operated by Peach Phoenix, LLC., is committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Our Commitment</h2>
                        <p>
                            We believe that the internet should be available and accessible to anyone. We are committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Measures Taken</h2>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>Using semantic HTML to ensure proper document structure</li>
                            <li>Providing alternative text for images</li>
                            <li>Ensuring sufficient color contrast ratios</li>
                            <li>Making all functionality available via keyboard navigation</li>
                            <li>Using ARIA labels where appropriate</li>
                            <li>Testing with screen readers and assistive technologies</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Known Limitations</h2>
                        <p>
                            While we strive for the highest level of accessibility, some third-party content or features may not be fully accessible. We are continuously working to identify and resolve these issues.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. Feedback</h2>
                        <p>
                            We welcome your feedback on the accessibility of our website. If you encounter any barriers, please contact us and we will work to address the issue promptly.
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
