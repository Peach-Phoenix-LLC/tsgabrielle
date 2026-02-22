"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARIZONA_COLLECTION_DATA } from '@/data/arizonaData';

export default function ArizonaPage() {
    const { hero, hotspots, infoPanel } = ARIZONA_COLLECTION_DATA;

    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden font-light" style={{ fontFamily: 'Lato, sans-serif' }}>

            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={hero.mainImage}
                        alt={hero.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* subtle dark overlay so text is legible */}
                    <div className="absolute inset-0 bg-black/25" />
                    {/* bottom fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 text-center px-6 max-w-5xl">
                    <h1 className="text-7xl md:text-9xl font-light tracking-[0.2em] mb-4 text-white">
                        Arizona
                    </h1>
                    <p className="text-lg md:text-xl font-light tracking-[0.5em] mb-12 text-white/80">
                        a desert dream • 2026
                    </p>
                    <Link href="/cart">
                        <button className="px-12 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white tracking-widest text-xs hover:bg-white hover:text-[#1a1a1a] transition-all duration-700">
                            explore the collection
                        </button>
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-50">
                    <span className="text-[10px] tracking-[0.5em] text-white">scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-bounce" />
                </div>
            </section>

            {/* Narrative Content */}
            <section className="relative py-32 px-6">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="flex-1 space-y-24">
                        {infoPanel.sections.map((section, idx) => (
                            <div key={idx} className="group">
                                <span className="text-[#c07e60]/60 font-light text-sm mb-4 block">0{idx + 1}</span>
                                <h2 className="text-4xl md:text-5xl font-light mb-8 group-hover:text-[#a932bd] transition-colors duration-500">{section.heading}</h2>
                                <p className="text-xl text-[#1a1a1a]/50 leading-loose font-light max-w-2xl">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        {/* Fabric Features */}
                        <div className="space-y-12">
                            {hotspots.map((spot) => (
                                <div key={spot.id} className="border-l-2 border-[#a932bd]/20 pl-8">
                                    <h4 className="text-[#a932bd] font-light text-sm tracking-widest mb-2">{spot.title}</h4>
                                    <p className="text-[#1a1a1a]/60 font-light leading-relaxed">{spot.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <aside className="lg:w-80 lg:sticky lg:top-32 h-fit">
                        <div className="p-8 border border-[#1a1a1a]/5 bg-[#f9f7f9]">
                            <h3 className="text-2xl font-light mb-2">{infoPanel.title}</h3>
                            <p className="text-[#1a1a1a]/40 text-sm mb-8">{infoPanel.footer}</p>
                            <Link href="/cart">
                                <button className="w-full py-4 bg-[#a932bd] text-white text-xs tracking-widest hover:bg-[#8a24a1] transition-colors duration-300">
                                    pre-order
                                </button>
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
