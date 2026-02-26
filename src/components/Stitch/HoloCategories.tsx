"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    description: string | null;
}

interface HoloCategoriesProps {
    categories?: Category[];
}

export default function HoloCategories({ categories = [] }: HoloCategoriesProps) {
    // If no categories from prop, we could show nothing or have internal defaults
    if (!categories || categories.length === 0) return null;

    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-24 relative">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-primary/40 font-bold mb-4 block">Explore the Maison</span>
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter text-text-dark">
                        Shop by Category
                    </h2>
                    <div className="w-24 h-px bg-primary/20 mx-auto mt-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {categories.map((category, idx) => (
                        <div
                            key={category.id}
                            className={`group relative perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-700`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <Link href={`/categories/${category.slug}`} className="block">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(169,50,189,0.3)] ring-1 ring-black/5">
                                    {/* Image Container */}
                                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                                        <Image
                                            src={category.image_url || '/images/placeholder.png'}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Glassmorphism Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40 opacity-60 transition-opacity duration-700 group-hover:opacity-80"></div>

                                    {/* Discovery Button */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        <div className="w-full py-4 px-6 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-colors hover:bg-white">
                                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-dark">Discovery</span>
                                            <span className="material-symbols-outlined text-sm text-primary transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Title below card */}
                                <div className="mt-8 text-center space-y-1">
                                    <h3 className="text-2xl font-extralight tracking-tight text-text-dark transition-colors group-hover:text-primary">
                                        {category.name}
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-widest text-text-dark/40 font-bold opacity-0 transition-all duration-500 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                                        {category.description || 'View Collection'}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
