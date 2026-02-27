import React from 'react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-white/10 selection:text-black">
            {/* Hero Section - Immersive Image & Text */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                        alt="Parisian Atelier"
                        className="w-full h-full object-cover opacity-10 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
                </div>

                <div className="relative z-10 text-center px-8">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold mb-8">L'Atelier des Rêves</p>
                    <h1 className="text-8xl md:text-[10rem] font-extralight tracking-tighter mb-10 text-[#1a1a1a] leading-none">Our Story</h1>
                    <p className="text-sm text-[#1a1a1a]/40 font-light max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.4em]">
                        Founded in the heart of Paris, tsgabrielle® is a celebration of identity,
                        where traditional craftsmanship meets the visionary spirit of high-end avant-garde.
                    </p>
                </div>

                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <span className="material-symbols-outlined text-4xl font-extralight text-black">expand_more</span>
                </div>
            </section>

            {/* Content Section 1 - The Vision */}
            <section className="py-60 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-16">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold">The Vision</span>
                            <h2 className="text-6xl font-extralight tracking-tighter leading-tight text-[#1a1a1a]">A Dialogue <br />Between <span className="text-[#a932bd]">Art</span> & Soul</h2>
                            <div className="space-y-10 text-[#1a1a1a]/60 font-serif italic leading-relaxed text-2xl">
                                <p>
                                    At tsgabrielle®, we believe that what you wear is the ultimate form of self-expression.
                                    Our journey began with a simple yet profound question:
                                    <i> How can we weave the complexity of the human spirit into the fabric of luxury?</i>
                                </p>
                                <p>
                                    Every piece we create is more than just a garment; it is a canvas.
                                    We source only the finest sustainable materials, ensuring that our commitment
                                    to the planet is as strong as our commitment to aesthetic excellence.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] group shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
                                alt="Craftsmanship"
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 border border-black/5 m-8 rounded-[2rem] pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="bg-neutral-50 py-40 border-y border-black/5">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        <div className="space-y-8">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Identity</h3>
                            <p className="text-2xl font-extralight text-[#1a1a1a] leading-relaxed tracking-tight">
                                We celebrate the multifaceted nature of the modern individual. Our designs are gender-fluid, identity-affirming, and unapologetically bold.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Provenance</h3>
                            <p className="text-2xl font-extralight text-[#1a1a1a] leading-relaxed tracking-tight">
                                Designed in Paris, inspired by global culture. We maintain deep personal relationships with our artisans to ensure ethical production.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold">Sustainability</h3>
                            <p className="text-2xl font-extralight text-[#1a1a1a] leading-relaxed tracking-tight">
                                Zero-waste patterns, recycled luxury fabrics, and timeless silhouettes meant to last a lifetime, not a season.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-80 px-8 text-center bg-white">
                <div className="max-w-4xl mx-auto">
                    <span className="material-symbols-outlined text-7xl text-[#a932bd] mb-16 opacity-20">format_quote</span>
                    <h2 className="text-5xl md:text-7xl font-serif italic leading-tight mb-16 text-[#1a1a1a] tracking-tight">
                        "Luxury is not about consumption. It is about the resonance between an object and the person who chooses it."
                    </h2>
                    <p className="text-[11px] uppercase tracking-[1em] text-[#1a1a1a]/30 font-bold">— tsgabrielle® Creative Direction</p>
                </div>
            </section>
        </main>
    );
}

