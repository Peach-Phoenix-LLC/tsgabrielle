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
import { motion } from 'framer-motion';

interface ProductDetailClientProps {
    product: any;
    crossSells: any[];
}

export default function ProductDetailClient({ product, crossSells }: ProductDetailClientProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const galleryImages = (product.media_gallery_urls && product.media_gallery_urls.length > 0)
        ? product.media_gallery_urls
        : (product.media_primary_url ? [product.media_primary_url] : [
            "https://tsgabrielle.us/images/placeholder.jpg"
        ]);

    const productTabs = [
        { label: "Description", content: product.description || product.short_description },
        {
            label: "Details",
            content: (
                <ul className="space-y-4">
                    <li>• Composition: {product.composition || "Premium Silk Blend"}</li>
                    <li>• Made in: {product.made_in || "High-End Atelier"}</li>
                    <li>• Style ID: {product.sku || `TS-${product.peach_number}`}</li>
                    <li>• Signature holographic detailing</li>
                    <li>• Hand-finished internal seams</li>
                </ul>
            )
        },
        { label: "Care", content: "Preserve the craftsmanship. Professional dry clean only. Store in a cool, dark environment to maintain the luminosity of the fabrics." },
        { label: "Shipping", content: "Complimentary worldwide express shipping on all curated orders. Securely packaged in our signature tsgabrielle® box." }
    ];

    const colors = [
        { name: "Ivory", hex: "#faf9f6" },
        { name: "Gold", hex: "#c5a059" },
        { name: "Noir", hex: "#111" },
        { name: "Signature Purple", hex: "#a932bd" }
    ];

    const variants = [
        { id: "v1", size_label: "XS", inventory: "5" },
        { id: "v2", size_label: "S", inventory: "12" },
        { id: "v3", size_label: "M", inventory: "8" },
        { id: "v4", size_label: "L", inventory: "Out of Stock" }
    ];

    return (
        <main className="bg-[#faf9f6] text-text-dark font-light overflow-x-hidden">
            <StickyProductNav
                productTitle={product.title}
                productPrice={product.msrp_display}
                cartCount={0}
                onShare={() => setIsShareModalOpen(true)}
            />

            {/* FULL SCREEN DYNAMIC LAYOUT */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* 🖼 LEFT SIDE: FULL SCREEN SLIDER (Sticky) */}
                <div className="w-full lg:w-1/2 h-screen lg:sticky lg:top-0 z-10 border-r border-black/5">
                    <PremiumGallery
                        images={galleryImages}
                        gifBadge="https://tsgabrielle.us/images/gold_seal.gif"
                    />
                </div>

                {/* 🛍 RIGHT SIDE: PRODUCT INFORMATION (Scrollable) */}
                <div className="w-full lg:w-1/2 p-10 lg:p-24 space-y-20 relative z-20">

                    {/* Brand & Identity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="holographic-ribbon">New Exclusive</span>
                            <span className="holographic-ribbon bg-zinc-900 border-none shadow-xl">✨ LIMITED 1/50</span>
                        </div>

                        <div className="space-y-4">
                            <Link href="/shop" className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 hover:text-[#a932bd] transition-colors">
                                Return to Atelier Shop
                            </Link>
                            <GiftTitle
                                text={product.title}
                                gifUrl="https://tsgabrielle.us/images/ivory_gold_shimmer.gif"
                            />
                        </div>

                        <div className="flex items-center gap-10">
                            <span className="text-4xl font-light tracking-tight">{product.msrp_display}</span>
                            <div className="h-4 w-px bg-zinc-200" />
                            <span className="text-[11px] uppercase tracking-[0.3em] text-[#a932bd] font-black">Available for Acquisition</span>
                        </div>
                    </motion.div>

                    {/* Social Verification */}
                    <SocialProof
                        rating={5.0}
                        reviewCount={78}
                        soldCount={42}
                        stockLevel="low"
                    />

                    {/* Customization */}
                    <div className="space-y-12 py-10 border-y border-zinc-100">
                        <ColorSwatches colors={colors} />
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
                    </div>

                    {/* Tabs & Content */}
                    <PremiumTabs tabs={productTabs} />

                    {/* Narrative Tags */}
                    <div className="flex flex-wrap gap-3">
                        {['exclusive', 'parisian-design', 'handmade', 'silk-collection', 'limited-edition'].map((tag) => (
                            <button key={tag} className="px-6 py-2 border border-zinc-200 rounded-full text-[9px] uppercase tracking-[0.4em] font-black text-zinc-400 hover:border-text-dark hover:text-text-dark transition-all">
                                #{tag}
                            </button>
                        ))}
                    </div>

                    {/* Trust Architecture */}
                    <TrustBadges />
                </div>
            </div>

            {/* CURATED RECOMMENDATIONS (FULL WIDTH) */}
            {crossSells.length > 0 && (
                <section className="bg-white py-40 px-6 lg:px-24">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                            <div className="space-y-4">
                                <span className="text-[11px] uppercase tracking-[0.8em] text-[#a932bd] font-black">Complete the Ensemble</span>
                                <h2 className="text-6xl font-light tracking-tighter leading-none">Elevated <span className="italic font-serif">Pairings</span></h2>
                            </div>
                            <Link href="/shop" className="group flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-black">
                                Explore Entire Collection
                                <div className="w-12 h-px bg-black group-hover:w-20 transition-all" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {crossSells.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link href={`/${item.peach_number}`} className="group space-y-6">
                                        <div className="aspect-[3/4] overflow-hidden rounded-sm relative bg-zinc-50 border border-zinc-100">
                                            <img
                                                src={item.media_primary_url || item.media_gallery_urls?.[0]}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-[14px] font-black tracking-tighter text-text-dark">{item.title}</h3>
                                                <span className="text-[12px] opacity-40 font-light">{item.msrp_display}</span>
                                            </div>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#a932bd]">New Selection</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}


            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                productUrl={typeof window !== 'undefined' ? window.location.href : ""}
                productTitle={product.title}
            />
        </main>
    );
}
