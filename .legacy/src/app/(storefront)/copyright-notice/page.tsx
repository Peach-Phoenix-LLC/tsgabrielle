import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Copyright Notice — tsgabrielle®',
    description: 'Copyright and intellectual property information for all content on tsgabrielle.us.',
};

export default function CopyrightNoticePage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            

            <header className="pt-48 pb-20 border-b border-black/10">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Proprietary Rights</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Copyright Notice</h1>
                    <p className="text-sm text-[#1a1a1a]/60 font-light leading-relaxed uppercase tracking-[0.2em]">
                        All rights reserved. The intellectual property of tsgabrielle® is protected by law.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-16 text-sm text-[#1a1a1a]/60 font-light leading-relaxed">

                    <div className="space-y-6">
                        <p className="text-[10px] text-[#1a1a1a]/40 italic">Last updated: February 2026</p>
                        <p>
                            All content on tsgabrielle.us, including text, graphics, logos, images, audio, video, software, and all other materials, is the exclusive property of Peach Phoenix, LLC. and is protected by United States and international copyright, trademark, and other intellectual property laws.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">01. Ownership</h2>
                        <p>
                            The tsgabrielle® name, logo, and all related marks, images, and designs are trademarks and/or registered trademarks of Peach Phoenix, LLC. The mark tsgabrielle® is registered with the United States Patent and Trademark Office under USPTO Reg. No. 7,924,799, Ser. No. 98-580,310.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">02. Permitted Use</h2>
                        <p>
                            You may view, download, and print content from tsgabrielle.us for your personal, non-commercial use only, provided that you do not modify the content and that you retain all copyright and proprietary notices.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">03. Prohibited Use</h2>
                        <p>
                            Without prior written permission from Peach Phoenix, LLC., you may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any content from tsgabrielle.us for any commercial purpose.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">04. Content Licensing</h2>
                        <p>
                            If you wish to use any content from tsgabrielle.us beyond the permitted uses outlined above, please contact us for licensing information. Unauthorized use may result in legal action.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-serif text-[#1a1a1a]">05. User-Generated Content</h2>
                        <p>
                            By submitting content (reviews, comments, photos) to tsgabrielle.us, you grant Peach Phoenix, LLC. a non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and display such content in connection with the tsgabrielle® brand.
                        </p>
                    </div>

                    <div className="pt-12 border-t border-black/10 space-y-4">
                        <p className="text-lg font-serif text-[#1a1a1a]">
                            © 2026 Peach Phoenix, LLC. All rights reserved.
                        </p>
                        <div className="bg-neutral-50 p-8 rounded-sm border border-black/10 space-y-2">
                            <p className="text-xs text-[#1a1a1a] font-bold">Peach Phoenix, LLC.</p>
                            <p className="text-xs">Trading Name: tsgabrielle®</p>
                            <p className="text-xs">Email: <Link href="mailto:contact@tsgabrielle.us" className="text-[#a932bd]">contact@tsgabrielle.us</Link></p>
                            <p className="text-xs">1801 East Camelback Road, Suite 102, Phoenix, AZ 85016, US</p>
                            <p className="text-xs">USPTO Reg. No. 7,924,799 | Ser. No. 98-580,310</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 pt-4">Last Updated: February 2026</p>
                    </div>

                </div>
            </section>

            
        </main>
    );
}

