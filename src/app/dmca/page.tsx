import React from 'react';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const metadata = {
    title: 'DMCA Policy — tsgabrielle®',
    description: 'Digital Millennium Copyright Act (DMCA) policy and takedown procedures for tsgabrielle®.',
};

export default function DMCAPage() {
    return (
        <main className="min-h-screen bg-[#050406] text-white font-sans">
            <ModernNavbar />

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Intellectual Property</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">DMCA Policy</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Our commitment to respecting intellectual property rights and the DMCA takedown process.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-slate-400 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-slate-500 italic">Last updated: February 2026</p>
                        <p>
                            tsgabrielle®, operated by Peach Phoenix, LLC., respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;), we will respond promptly to claims of copyright infringement committed using our website.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">01. Filing a DMCA Notice</h2>
                        <p>
                            If you believe that content available on tsgabrielle.us infringes upon your copyright, you may submit a written DMCA takedown notice to our designated copyright agent. Your notice must include:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                            <li>Identification of the copyrighted work claimed to have been infringed</li>
                            <li>Identification of the material that is claimed to be infringing, with sufficient detail to locate it</li>
                            <li>Your contact information, including address, telephone number, and email</li>
                            <li>A statement that you have a good faith belief that the disputed use is not authorized</li>
                            <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">02. Counter-Notification</h2>
                        <p>
                            If you believe that your content was removed or disabled by mistake or misidentification, you may file a counter-notification with the required information as specified by the DMCA. Upon receipt of a valid counter-notification, we may restore the removed content.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-white">03. Repeat Infringers</h2>
                        <p>
                            In accordance with the DMCA, we have adopted a policy of terminating the accounts or access of users who are deemed to be repeat infringers.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-white/5 space-y-4">
                        <h2 className="text-xl font-serif text-white">Designated Copyright Agent</h2>
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
