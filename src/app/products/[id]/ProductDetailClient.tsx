"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PremiumGallery } from '@/components/Product/Premium/PremiumGallery';
import { GiftTitle } from '@/components/Product/Premium/GiftTitle';
import { ProductActions } from '@/components/Product/Premium/ProductActions';
import { PremiumTabs } from '@/components/Product/Premium/PremiumTabs';
import { SocialProof } from '@/components/Product/Premium/SocialProof';
import { TrustBadges } from '@/components/Product/Premium/TrustBadges';
import { ShareModal } from '@/components/Product/Premium/ShareModal';
import { StickyProductNav } from '@/components/Product/Premium/StickyProductNav';
import { ColorSwatches } from '@/components/Product/Premium/ColorSwatches';
import ModernNavbar from '@/components/Home/ModernNavbar';
import ModernFooter from '@/components/Home/ModernFooter';

interface ProductDetailClientProps {
    product: any;
    crossSells: any[];
}

export default function ProductDetailClient({ product, crossSells }: ProductDetailClientProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const galleryImages = (product.media_gallery_urls && product.media_gallery_urls.length > 0)
        ? product.media_gallery_urls
        : (product.media_primary_url ? [product.media_primary_url] : []);

    const productTabs = [
        { label: "Description", content: product.description || product.short_description },
        {
            label: "Details",
            content: (
                <ul className="space-y-4">
                    <li>• Composition: {product.composition || "Premium Materials"}</li>
                    <li>• Made in: {product.made_in || "Italy"}</li>
                    <li>• Style ID: {product.sku || "TS-7721"}</li>
                    <li>• Weight: Light to medium</li>
                    <li>• Fit: Standard luxury fit</li>
                </ul>
            )
        },
        { label: "Care", content: "Dry clean only. Handle with delicacy to preserve the holographic elements and fabric integrity." },
        { label: "Shipping", content: "Complimentary express shipping on orders over $250. 30-day global returns policy applies." }
    ];

    const colors = [
        { name: "Ivory Silk", hex: "#faf9f6" },
        { name: "Sovereign Gold", hex: "#c5a059" },
        { name: "Noir", hex: "#1a1a1a" },
        { name: "Royal Purple", hex: "#a932bd" }
    ];

    const variants = [
        { id: "v1", size_label: "XS", inventory: "5" },
        { id: "v2", size_label: "S", inventory: "12" },
        { id: "v3", size_label: "M", inventory: "8" },
        { id: "v4", size_label: "L", inventory: "Out of Stock" }
    ];

    return (
        <main className="min-h-screen bg-[#faf9f6] text-text-dark font-light pb-20">
            <ModernNavbar />
            <StickyProductNav
                productTitle={product.title}
                productPrice={product.msrp_display}
                cartCount={2} // Mock/Store
                onShare={() => setIsShareModalOpen(true)}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left Panel: Sticky Gallery */}
                    <div className="w-full lg:w-[55%]">
                        <div className="lg:sticky lg:top-32 h-fit">
                            <PremiumGallery
                                images={galleryImages}
                                gifBadge="https://tsgabrielle.us/images/exclusive_badge.gif"
                            />
                        </div>
                    </div>

                    {/* Right Panel: Content */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-12">
                        {/* Title & Brand Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="holographic-ribbon">New Collection</span>
                                {product.status === 'exclusive' && <span className="holographic-ribbon bg-black shadow-lg">✨ Exclusive</span>}
                            </div>

                            <GiftTitle
                                text={product.title}
                                gifUrl="https://tsgabrielle.us/images/gold_shimmer.gif"
                            />

                            <div className="flex items-center gap-6 pt-4">
                                <span className="text-3xl font-light text-text-dark">{product.msrp_display}</span>
                                <div className="h-6 w-px bg-zinc-200" />
                                <span className="text-[12px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Tax included</span>
                            </div>
                        </div>

                        {/* Social Proof */}
                        <SocialProof
                            rating={4.9}
                            reviewCount={124}
                            soldCount={18}
                            stockLevel="low"
                        />

                        {/* Customization */}
                        <ColorSwatches colors={colors} />

                        {/* Actions */}
                        <ProductActions
                            product={{
                                id: product.id.toString(),
                                name: product.title,
                                price: parseFloat(product.msrp_display?.replace(/[^0-9.]/g, '') || "0"),
                                image: galleryImages[0]
                            }}
                            variants={variants}
                            onShare={() => setIsShareModalOpen(true)}
                        />

                        {/* Tabs */}
                        <div className="mt-8">
                            <PremiumTabs tabs={productTabs} />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-8">
                            {['silk', 'handmade', 'evening', 'luxury', 'paris edition'].map((tag) => (
                                <button key={tag} className="px-5 py-2 rounded-full border border-zinc-200 text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:border-text-dark hover:text-text-dark transition-all">
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <TrustBadges />

                {/* Complete the Look Cross-Sells */}
                {crossSells.length > 0 && (
                    <section className="mt-32">
                        <div className="flex items-center justify-between mb-16">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Styling Guide</span>
                                <h2 className="text-3xl font-light tracking-tight">Complete the Look</h2>
                            </div>
                            <Link href="/shop" className="text-[11px] uppercase tracking-widest font-bold border-b border-zinc-200 pb-1 hover:border-[#a932bd] transition-all">Explore Entire Shop</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {crossSells.map((item) => (
                                <Link
                                    href={`/products/${item.peach_number}`}
                                    key={item.id}
                                    className="group space-y-4"
                                >
                                    <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white border border-zinc-100 relative">
                                        <img
                                            src={item.media_primary_url || item.media_gallery_urls?.[0]}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-[13px] font-bold text-text-dark tracking-tight">{item.title}</h3>
                                        <p className="text-[12px] text-zinc-400">{item.msrp_display}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <ModernFooter />

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                productUrl={typeof window !== 'undefined' ? window.location.href : ""}
                productTitle={product.title}
            />
        </main>
    );
}
