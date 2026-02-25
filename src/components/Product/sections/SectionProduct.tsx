import React from 'react';
import { Card, SectionHeader } from '../ui';

interface Pillar {
    title: string;
    body: string;
}

interface SectionProductProps {
    shortDesc: string;
    longDesc: string;
    pillars: Pillar[];
}

export const SectionProduct: React.FC<SectionProductProps> = ({ shortDesc, longDesc, pillars }) => {
    return (
        <section id="product" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-20">
                <div>
                    <SectionHeader title="Design Philosophy" subtitle="The artisan's narrative" />
                    <p className="text-3xl font-light text-white/90 leading-relaxed mb-12">
                        {shortDesc}
                    </p>
                    <div className="text-white/60 font-serif italic text-lg leading-loose space-y-6 max-w-2xl whitespace-pre-line">
                        {longDesc}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pillars.map((p, i) => (
                        <Card key={i} title={`Feature Focus — 0${i + 1}`}>
                            <h4 className="text-xl font-light text-white mb-4">{p.title}</h4>
                            <p className="text-sm text-white/50 leading-relaxed">{p.body}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className="sticky top-56 bg-[#a932bd]/5 border border-[#a932bd]/20 rounded-3xl p-10 overflow-hidden group">
                    <div className="absolute -top-20 -right-20 size-64 bg-[#a932bd]/20 blur-[100px] rounded-full group-hover:bg-[#a932bd]/30 transition-colors" />
                    <h3 className="text-2xl font-light text-white mb-6">Atelier Quality</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-8">
                        Each item from the Paris Collection undergoes rigorous manual inspection at our Phoenix fulfillment hub to ensure the obsidian glaze meets the tsgabrielle® standard.
                    </p>
                    <ul className="space-y-4">
                        {['Double-fired ceramic', 'Hand-finished edge', 'Cinematic gloss peak'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">
                                <span className="size-1 rounded-full bg-[#a932bd]" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-3xl bg-white/5 border border-white/10 p-10">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-6">Origin Story</h3>
                    <p className="font-serif italic text-lg text-white/70">"A marriage between Parisian soul and Arizona craftsmanship."</p>
                </div>
            </div>
        </section>
    );
};
