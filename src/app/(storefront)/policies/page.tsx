import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Legal Atelier — tsgabrielle®',
    description: 'The central hub for all legal policies, terms, and transparency information for tsgabrielle®.',
};

const policyGroups = [
    {
        title: 'Core Agreements',
        policies: [
            { name: 'Privacy Priority', href: '/privacy', desc: 'How we protect your digital identity.' },
            { name: 'Usage Terms', href: '/terms', desc: 'The legal framework of our digital atelier.' },
            { name: 'Refund Policy', href: '/refund-policy', desc: 'Our commitment to your satisfaction.' },
        ]
    },
    {
        title: 'Transparency',
        policies: [
            { name: 'Affiliate Disclosure', href: '/affiliate-disclosure', desc: 'Our transparent relationship with partners.' },
            { name: 'Cookie Policy', href: '/cookie-policy', desc: 'Understanding our tracking technologies.' },
            { name: 'Disclaimer', href: '/disclaimer', desc: 'Important notices regarding our content.' },
        ]
    },
    {
        title: 'Rights & Standards',
        policies: [
            { name: 'Copyright Notice', href: '/copyright-notice', desc: 'Protecting our intellectual property.' },
            { name: 'DMCA Policy', href: '/dmca', desc: 'Digital rights and takedown procedures.' },
            { name: 'Accessibility', href: '/accessibility', desc: 'Our commitment to inclusive design.' },
        ]
    },
    {
        title: 'Community & Logistics',
        policies: [
            { name: 'Community Guidelines', href: '/community-guidelines', desc: 'Standards for our collective behavior.' },
            { name: 'Shipping & Returns', href: '/shipping-returns', desc: 'Precision handling from atelier to door.' },
        ]
    }
];

export default function PoliciesHubPage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Legal Atelier</p>
                    <h1 className="text-7xl font-serif tracking-tight mb-8">Policies Hub</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em] max-w-2xl">
                        Transparency and trust are at the heart of our commitment. Explore the legal framework that governs the tsgabrielle® experience.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {policyGroups.map((group, groupIdx) => (
                            <div key={groupIdx} className="space-y-8">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 border-b border-white/5 pb-4">
                                    {group.title}
                                </h2>
                                <div className="space-y-6">
                                    {group.policies.map((policy, policyIdx) => (
                                        <Link
                                            key={policyIdx}
                                            href={policy.href}
                                            className="block group"
                                        >
                                            <h3 className="text-xl font-serif mb-2 group-hover:text-[#a932bd] transition-colors">
                                                {policy.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-light leading-relaxed">
                                                {policy.desc}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="bg-white/5 p-12 rounded-sm border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <h2 className="text-2xl font-serif mb-2">Need dedicated assistance?</h2>
                            <p className="text-sm text-slate-400 font-light">Our digital concierge is available for any legal or policy inquiries.</p>
                        </div>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-white transition-all duration-500"
                        >
                            Contact Concierge
                        </Link>
                    </div>
                </div>
            </section>

            
        </main>
    );
}

