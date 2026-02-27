import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { created_at: 'desc' }
    });

    return (
        <main className="min-h-screen bg-white">
            {/* Page Header */}
            <header className="pt-40 pb-20 border-b border-black/5">
                <div className="max-w-7xl mx-auto px-8">
                    <nav className="flex items-center gap-2 text-[12px] text-[#1a1a1a]/50 mb-8 font-light uppercase tracking-widest">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#1a1a1a]">Shop all</span>
                    </nav>
                    <h1 className="text-7xl font-extralight tracking-tighter mb-4 text-[#1a1a1a]">The Atelier</h1>
                    <p className="text-sm text-[#1a1a1a]/40 font-light max-w-xl leading-relaxed uppercase tracking-widest">
                        A curated collection of Parisian luxury, redefined for the modern identity.
                    </p>
                </div>
            </header>

            {/* Filter Bar Placeholder */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex gap-12">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a] border-b-2 border-[#a932bd] pb-1">All pieces</button>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 hover:text-black transition-colors">Dresses</button>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 hover:text-black transition-colors">Accessories</button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product: any) => (
                        <Link href={`/${product.peach_number}`} key={product.id} className="group flex flex-col">
                            <div className="aspect-[3/4] overflow-hidden bg-neutral-50 rounded-2xl mb-6 relative border border-black/5">
                                <img
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                    src={product.media_primary_url || (product.media_gallery_urls && product.media_gallery_urls[0]) || "https://placehold.co/600x800"}
                                />
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-[#1a1a1a] text-xl font-light scale-90">favorite</span>
                                </div>
                                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="bg-white/90 backdrop-blur-xl text-[8px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-black/5 shadow-xl">Discovery</span>
                                </div>
                            </div>
                            <div className="space-y-2 px-2">
                                <p className="text-[9px] font-bold text-[#a932bd] uppercase tracking-[0.3em]">Maison Release</p>
                                <h3 className="text-xl font-extralight text-[#1a1a1a] tracking-tight group-hover:tracking-tighter transition-all duration-500">
                                    {product.title}
                                </h3>
                                <p className="text-base font-medium text-[#1a1a1a]">
                                    {product.msrp_display}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="text-[#1a1a1a]/30 font-light uppercase tracking-widest">No products found in the atelier.</p>
                    </div>
                )}
            </section>
        </main>
    );
}

