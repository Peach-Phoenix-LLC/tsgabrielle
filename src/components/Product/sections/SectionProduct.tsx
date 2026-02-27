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
        <section id="product" className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 bg-white">
            <div className="lg:col-span-8 space-y-24">
                <div>
                    <SectionHeader title="Design Philosophy" subtitle="The artisan's narrative" />
                    <p className="text-4xl font-extralight text-[#1a1a1a] leading-tight mb-12 tracking-tight">
                        {shortDesc}
                    </p>
                    <div className="text-[#1a1a1a]/60 font-serif italic text-xl leading-relaxed space-y-8 max-w-2xl whitespace-pre-line">
                        {longDesc}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {pillars.map((p, i) => (
                        <Card key={i} title={`Feature Focus — 0${i + 1}`}>
                            <h4 className="text-2xl font-extralight text-[#1a1a1a] mb-4 tracking-tight">{p.title}</h4>
                            <p className="text-base text-[#1a1a1a]/50 leading-relaxed font-light">{p.body}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className="sticky top-[250px] bg-[#a932bd]/5 border border-[#a932bd]/10 rounded-[2.5rem] p-12 overflow-hidden group shadow-sm">
                    <div className="absolute -top-20 -right-20 size-64 bg-[#a932bd]/10 blur-[100px] rounded-full group-hover:bg-[#a932bd]/20 transition-colors" />
                    <h3 className="text-2xl font-extralight text-[#1a1a1a] mb-6 tracking-tight">Atelier Quality</h3>
                    <p className="text-[#1a1a1a]/50 text-sm font-light leading-relaxed mb-10 uppercase tracking-widest">
                        Each piece from the tsgabrielle® collection undergoes a manual inspection at our dedicated fulfillment hub to ensure it meets our exacting standards.
                    </p>
                    <ul className="space-y-5">
                        {['Double-fired ceramic', 'Hand-finished edge', 'Cinematic gloss peak'].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/80">
                                <span className="size-1.5 rounded-full bg-[#a932bd]" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-[2.5rem] bg-neutral-50 border border-black/5 p-12 shadow-sm">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/20 mb-8">Origin Story</h3>
                    <p className="font-serif italic text-2xl text-[#1a1a1a]/70 leading-relaxed">"A marriage between Parisian soul and Arizona craftsmanship."</p>
                </div>
            </div>
        </section>
    );
};
