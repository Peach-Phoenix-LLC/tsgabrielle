import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Community Guidelines — tsgabrielle®',
    description: 'Standards and expectations for participating in the tsgabrielle® community across all platforms.',
};

export default function CommunityGuidelinesPage() {
    return (
        <main className="min-h-screen bg-[#050406] text-white font-sans">
            <ModernNavbar />

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Our Collective Standards</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Community Guidelines</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        The standards that shape our community and define how we engage with one another.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            These Community Guidelines apply to all tsgabrielle® platforms, including our website, social media pages, and any other forums or channels where community members may interact. By participating, you agree to abide by these guidelines.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Respect &amp; Civility</h2>
                        <p>
                            We expect everyone in the tsgabrielle® community to treat each other with respect and kindness. Harassment, hate speech, discrimination, bullying, and personal attacks of any kind will not be tolerated.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Authenticity</h2>
                        <p>
                            Be genuine. Do not impersonate other individuals, brands, or entities. Misrepresenting your identity or affiliation is a violation of these guidelines.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Intellectual Property</h2>
                        <p>
                            Respect the creative work of others. Do not post content that infringes on copyrights, trademarks, or other intellectual property rights. All tsgabrielle® content, including images, designs, and copy, is the exclusive property of Peach Phoenix, LLC. and must not be used without permission.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">04. No Spam or Self-Promotion</h2>
                        <p>
                            Unsolicited advertising, spam, and excessive self-promotion are prohibited. We welcome genuine recommendations and conversations, but not commercial exploitation of our platforms.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">05. Safety</h2>
                        <p>
                            Do not share personal information—yours or anyone else&apos;s—publicly in our community spaces. Do not post content that threatens the safety or security of any individual.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">06. Enforcement</h2>
                        <p>
                            Violations of these guidelines may result in content removal, temporary suspension, or permanent banning at our discretion. We reserve the right to take whatever action we deem appropriate to maintain a positive community environment.
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
