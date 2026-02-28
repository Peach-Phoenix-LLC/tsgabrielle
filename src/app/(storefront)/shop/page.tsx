import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/Update/ProductCard';
import OrganicDivider from '@/components/Update/OrganicDivider';

// Force dynamic since we are fetching from DB
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    // Fetch products from Prisma
    const products = await prisma.product.findMany({
        where: { status: 'active' },
        orderBy: { created_at: 'desc' }
    });

    return (
        <main className="min-h-screen bg-white pt-24">
            {/* Organic Background Blobs */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -left-20 w-[600px] h-[600px] fill-[#a932bd] blur-3xl">
                    <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5Z" />
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-20 -right-20 w-[800px] h-[800px] fill-[#a932bd] blur-3xl">
                    <path d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.4,-0.5Z" transform="rotate(180 100 100)" />
                </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                {/* Visual Header */}
                <div className="flex flex-col items-center py-32 text-center">
                    <span className="text-[12px] font-light text-[#a932bd] uppercase tracking-[0.5em] mb-6 block">
                        Surface the Future
                    </span>
                    <h1 className="text-[clamp(42px,8vw,86px)] font-light text-[#1a1a1a] uppercase tracking-[0.15em] leading-tight">
                        The<br /><span className="text-[#a932bd]">Collection</span>
                    </h1>
                </div>

                {/* Filter Pill Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-24">
                    {['All Pieces', 'Prism Essentials', 'Shift Outerwear', 'Refraction Accessories', 'Limited Drops'].map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-10 py-4 rounded-full text-[11px] font-light uppercase tracking-[0.2em] transition-all duration-500 border ${i === 0
                                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                    : 'bg-white text-[#1a1a1a] border-[#e7e7e7] hover:border-[#a932bd] hover:text-[#a932bd]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <OrganicDivider />

                <div className="py-24 flex flex-col items-center">
                    {/* Toolbar / Sort */}
                    <div className="w-full flex justify-between items-center mb-16 px-4">
                        <span className="text-[11px] font-light text-[#888888] uppercase tracking-[0.2em]">
                            Showing {products.length} Results
                        </span>
                        <div className="flex items-center gap-4 border-b border-[#e7e7e7] pb-2 cursor-pointer group">
                            <span className="text-[11px] font-light text-[#888888] uppercase tracking-[0.2em] group-hover:text-[#a932bd] transition-colors">Sort by</span>
                            <span className="text-[11px] font-light text-[#1a1a1a] uppercase tracking-[0.1em]">Newest First</span>
                        </div>
                    </div>

                    <Suspense fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 w-full">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="aspect-[3/4] bg-neutral-50 animate-pulse rounded-[32px]" />
                            ))}
                        </div>
                    }>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 w-full">
                            {products.map((product: any) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </Suspense>

                    {products.length === 0 && (
                        <div className="py-40 text-center space-y-8">
                            <div className="text-[#a932bd] opacity-20">
                                <span className="material-symbols-outlined text-[82px] font-light">auto_awesome</span>
                            </div>
                            <p className="max-w-[320px] mx-auto text-[14px] font-light text-[#888888] uppercase tracking-[0.25em] leading-relaxed">
                                The collection is currently evolving. New drops arriving shortly.
                            </p>
                            <button className="px-12 py-4 border border-[#a932bd] text-[#a932bd] rounded-full text-[11px] font-light tracking-[0.2em] uppercase hover:bg-[#a932bd] hover:text-white transition-all">
                                Notify Me
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
