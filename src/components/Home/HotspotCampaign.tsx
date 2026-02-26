"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Hotspot {
    id: string;
    x: number; // percentage
    y: number; // percentage
    productId: string;
    productName: string;
    price: string;
}

const hotspots: Hotspot[] = [
    {
        id: 'hp1',
        x: 45,
        y: 35,
        productId: '1',
        productName: 'Eiffel Tower Black Glossy Mug',
        price: '$21.99'
    },
    {
        id: 'hp2',
        x: 65,
        y: 60,
        productId: '3',
        productName: 'Cyberpunk Pleated Skirt',
        price: '$89.00'
    }
];

const HotspotCampaign = () => {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

    return (
        <section className="py-32 px-8 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-medium">Interactive Experience</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tight">Discover the Look</h2>
                    <p className="text-sm font-light text-primary/60 max-w-md leading-relaxed tracking-wide">
                        Explore segments of our meticulously crafted silhouettes. Tap to view details.
                    </p>
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury campaign"
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
                    />

                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                            <div className="relative group/hotspot">
                                <div
                                    className="absolute -inset-6 z-10 cursor-pointer"
                                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                                />
                                <button
                                    className={`w-3 h-3 rounded-full bg-accent border border-white/50 transition-all duration-500 gold-glow ${activeHotspot === spot.id ? 'scale-150 bg-white' : 'scale-100'}`}
                                />
                            </div>

                            {activeHotspot === spot.id && (
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 animate-fade-in">
                                    <div className="bg-white p-6 min-w-[240px] border border-black/5 shadow-2xl relative">
                                        <p className="text-[9px] uppercase tracking-[0.3em] text-accent mb-3">Signature Piece</p>
                                        <h3 className="text-base font-serif text-primary mb-1">{spot.productName}</h3>
                                        <p className="text-[11px] font-light text-primary/60 tracking-wider mb-6">{spot.price}</p>
                                        <Link
                                            href={`/products/${spot.productId}`}
                                            className="luxury-link text-[10px] uppercase tracking-[0.2em] font-medium text-primary inline-flex items-center group/btn"
                                        >
                                            View Details
                                            <span className="ml-2 material-symbols-outlined text-[14px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotspotCampaign;
