import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';
import AddToCartButton from '@/components/Product/AddToCartButton';
import WishlistButton from '@/components/Product/WishlistButton';
import './pdp.css';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = parseInt(id);
    if (isNaN(productId)) {
        notFound();
    }

    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        notFound();
    }

    const crossSellsData = await prisma.product.findMany({
        where: {
            NOT: { id: product.id }
        },
        take: 4
    });

    const p = product as any;
    const galleryImages = (p.media_gallery_urls && p.media_gallery_urls.length > 0)
        ? p.media_gallery_urls
        : (p.media_primary_url ? [p.media_primary_url] : [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAlcy-ObziwhUk21hAeBp7qwb4LDDHzBTgAV1TJYFocUudHKPBpDTQadWGtZfSk0dvi5XBYQCefBLH3GJHoOTReNiKvzmbcacs25pfaQwWAtt9SGDPw3bRYLcJ2g_Fxx-y5TeAL168rQbgiiyLiHUTIUOKKNSBCCmLb6l9y4-lR9rnOCm1mRor8QJHOBA0kephN5zEVn7fLg_EZSQKcMMSlsA_atVC_BPkWTH6ySitjvBQP1eD1uSrcfx7i7LQrcP_Rr4ib2mYaDoDS"
        ]);

    return (
        <main className="min-h-screen bg-bg-light text-text-dark font-light">
            <ModernNavbar />

            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Sticky Image Gallery */}
                    <div className="w-full lg:w-[62%] flex flex-col gap-6 custom-gallery-scroll">
                        {galleryImages.map((img: string, i: number) => (
                            <div key={i} className={`overflow-hidden bg-white border border-primary/10 rounded-sm ${i > 1 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                                <img
                                    alt={`${product.title} View ${i + 1}`}
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                    src={img}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right: Product Details Sidebar */}
                    <div className="w-full lg:w-[38%] relative">
                        <div className="sticky top-32 flex flex-col gap-10">
                            <div className="space-y-4">
                                <nav className="flex items-center gap-2 text-[12px] font-light text-text-dark/50">
                                    <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                                    <span className="opacity-30">/</span>
                                    <Link className="hover:text-primary transition-colors" href="/shop">{product.catalogue_category}</Link>
                                    <span className="opacity-30">/</span>
                                    <span className="text-text-dark truncate max-w-[120px]">{product.title}</span>
                                </nav>
                                <div>
                                    <p className="text-[12px] font-light text-primary mb-2">Exclusive</p>
                                    <h1 className="text-4xl font-light tracking-tight text-text-dark leading-tight">{product.title}</h1>
                                    <div className="flex items-center gap-4 mt-6">
                                        <p className="text-xl font-light text-text-dark opacity-80">{product.msrp_display}</p>
                                        <div className="h-4 w-px bg-primary/10"></div>
                                        <p className="text-[11px] font-light text-primary">
                                            Curated piece
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-light text-text-dark">Color: midnight</span>
                                </div>
                                <div className="flex gap-4">
                                    <button className="w-6 h-6 rounded-full bg-[#11112d] ring-1 ring-primary ring-offset-4 ring-offset-bg-light"></button>
                                    <button className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-primary/10"></button>
                                    <button className="w-6 h-6 rounded-full bg-[#d2b48c] border border-primary/10"></button>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-light text-text-dark">Select size</span>
                                    <Link className="text-[12px] font-light text-text-dark/50 underline underline-offset-4 hover:text-primary transition-colors" href="/size-guide">Size guide</Link>
                                </div>
                                <div className="grid grid-cols-5 gap-0 border-l border-t border-primary/10 rounded-sm overflow-hidden">
                                    <button className="h-12 border-r border-b border-primary/10 text-[12px] text-text-dark font-light hover:bg-white transition-colors">xs</button>
                                    <button className="h-12 border-r border-b border-primary/10 text-[12px] bg-primary text-white font-light">s</button>
                                    <button className="h-12 border-r border-b border-primary/10 text-[12px] text-text-dark font-light hover:bg-white transition-colors">m</button>
                                    <button className="h-12 border-r border-b border-primary/10 text-[12px] text-text-dark font-light hover:bg-white transition-colors">l</button>
                                    <button className="h-12 border-r border-b border-primary/10 text-[12px] text-text-dark/30 font-light cursor-not-allowed">xl</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <AddToCartButton product={{
                                    id: product.id.toString(),
                                    name: product.title,
                                    price: parseFloat(product.msrp_display.replace(/[^0-9.]/g, '')) || 0,
                                    image: galleryImages[0] || ""
                                }} />
                                <WishlistButton productId={product.id.toString()} />

                                <div className="grid grid-cols-3 gap-1 pt-4 border-t border-primary/5">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="material-symbols-outlined text-primary font-light text-xl">verified</span>
                                        <p className="text-[9px] font-light text-text-dark/40">Authentic</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="material-symbols-outlined text-primary font-light text-xl">public</span>
                                        <p className="text-[9px] font-light text-text-dark/40">Global</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="material-symbols-outlined text-primary font-light text-xl">eco</span>
                                        <p className="text-[9px] font-light text-text-dark/40">Conscious</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-primary/10 mt-4">
                                <details className="group py-5 border-b border-primary/10" open>
                                    <summary className="flex items-center justify-between cursor-pointer list-none outline-none text-[13px] font-light text-text-dark">
                                        Details & fit
                                        <span className="material-symbols-outlined text-sm font-light text-text-dark group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <div className="mt-6 text-[14px] leading-relaxed text-text-dark/60 space-y-4 font-light">
                                        <p>{product.short_description}</p>
                                        <ul className="space-y-2 border-l border-primary/30 pl-4">
                                            {product.composition && <li>Composition: {product.composition}</li>}
                                        </ul>
                                    </div>
                                </details>


                                <details className="group py-5 border-b border-primary/10">
                                    <summary className="flex items-center justify-between cursor-pointer list-none outline-none text-[13px] font-light text-text-dark">
                                        Shipping & returns
                                        <span className="material-symbols-outlined text-sm font-light text-text-dark group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <div className="mt-6 text-[14px] leading-relaxed text-text-dark/60 font-light">
                                        <p>Complimentary express shipping on all orders over $500. Free returns within 30 days of purchase.</p>
                                    </div>
                                </details>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Cross-Sells Section */}
                {crossSellsData.length > 0 && (
                    <section className="mt-40 border-t border-primary/10 pt-16">
                        <div className="flex items-center justify-between mb-16">
                            <h2 className="text-[14px] font-light text-text-dark">Complete the look</h2>
                            <div className="h-px flex-grow mx-8 bg-primary/10"></div>
                            <Link className="text-[12px] font-light text-primary hover:opacity-80 transition-opacity" href="/shop">Shop all</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {crossSellsData.map((item: any) => {
                                const crossImage = item.media_primary_url || ((item.media_gallery_urls && item.media_gallery_urls.length > 0) ? item.media_gallery_urls[0] : '');
                                return (
                                    <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer">
                                        <div className="aspect-[3/4] overflow-hidden mb-6 bg-white border border-primary/10 rounded-sm">
                                            {crossImage ? (
                                                <img
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    src={crossImage}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-text-dark/20 text-4xl font-light">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[11px] font-light text-primary">tsgabrielle®</p>
                                        <h3 className="text-[13px] text-text-dark font-light mt-2 tracking-wide truncate group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-[12px] text-text-dark/50 font-light mt-2">{item.msrp_display}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>

            <ModernFooter />
        </main>
    );
}
