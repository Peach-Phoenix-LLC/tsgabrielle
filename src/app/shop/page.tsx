import React from 'react';
import { prisma } from '@/lib/prisma';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { created_at: 'desc' }
    });

    return (
        <main className="min-h-screen bg-bg-light text-text-dark font-light">
            <ModernNavbar />

            {/* Page Header */}
            <header className="pt-40 pb-20 border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-8">
                    <nav className="flex items-center gap-2 text-[12px] text-text-dark/50 mb-8 font-light">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-text-dark">Shop all</span>
                    </nav>
                    <h1 className="text-6xl font-light tracking-tight mb-4">The atelier</h1>
                    <p className="text-sm text-text-dark/50 font-light max-w-xl leading-relaxed">
                        A curated collection of Parisian luxury, redefined for the modern identity.
                    </p>
                </div>
            </header>

            {/* Filter Bar Placeholder */}
            <div className="sticky top-20 z-40 bg-bg-light/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex gap-12">
                        <button className="text-[13px] font-light text-text-dark border-b border-primary pb-1">All pieces</button>
                        <button className="text-[13px] font-light text-text-dark/50 hover:text-primary transition-colors">Dresses</button>
                        <button className="text-[13px] font-light text-text-dark/50 hover:text-primary transition-colors">Accessories</button>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-text-dark/50 font-light">
                        <span>Sort by:</span>
                        <select className="bg-transparent text-text-dark font-light outline-none cursor-pointer">
                            <option>Featured</option>
                            <option>Newest</option>
                            <option>Price low-high</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product: any) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                            <div className="aspect-[3/4] overflow-hidden bg-white/50 rounded-sm mb-6 relative border border-primary/5">
                                <img
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                                    src={product.media_primary_url || (product.media_gallery_urls && product.media_gallery_urls[0]) || "https://placehold.co/600x800"}
                                />
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-text-dark text-xl font-light">favorite</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-light text-primary">tsgabrielle®</p>
                                <h3 className="text-sm text-text-dark font-light transition-colors group-hover:text-primary">
                                    {product.title}
                                </h3>
                                <p className="text-[12px] text-text-dark/50 font-light">
                                    {product.msrp_display}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="text-text-dark/30 font-light">No products found in the atelier.</p>
                    </div>
                )}
            </section>

            <ModernFooter />
        </main>
    );
}
