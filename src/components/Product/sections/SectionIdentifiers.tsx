import React from 'react';
import { Row, SectionHeader } from '../ui';

interface Variant {
    size_label: string;
    color: string;
    variant_sku: string;
    height: string;
    diameter: string;
    msrp: string;
}

interface SectionIdentifiersProps {
    baseSku: string;
    baseMpn: string;
    productType: string;
    variants: Variant[];
}

export const SectionIdentifiers: React.FC<SectionIdentifiersProps> = ({ baseSku, baseMpn, productType, variants }) => {
    return (
        <section id="identifiers" className="py-32 max-w-7xl mx-auto px-6 border-t border-black/5 bg-white">
            <SectionHeader title="Technical DNA" subtitle="Registry and dimensional architecture" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div className="space-y-16">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#a932bd] mb-8">Registry Protocol</h3>
                        <Row label="Global Base SKU" value={baseSku} />
                        <Row label="Manufacturer ID" value={baseMpn} />
                        <Row label="Maison Classification" value={productType} isLast />
                    </div>

                    <div className="p-10 bg-neutral-50 rounded-[2rem] border border-black/5">
                        <p className="text-[11px] text-[#1a1a1a]/40 leading-relaxed font-light uppercase tracking-widest italic">
                            The base SKU represents the master design pattern. Unique serials are generated per production run to ensure absolute traceability across our worldwide ateliers.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/30 mb-8">Active Variants</h3>
                    {variants.map((v, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-10 border border-black/5 group hover:border-[#a932bd]/30 hover:shadow-2xl transition-all duration-700">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-[#1a1a1a]/40 mb-2 font-bold">Maison Configuration 0{i + 1}</p>
                                    <h4 className="text-3xl font-extralight tracking-tighter text-[#1a1a1a]">{v.size_label}</h4>
                                </div>
                                <span className="text-3xl font-extralight tracking-tighter text-[#1a1a1a]">{v.msrp}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-10 text-[11px] font-medium text-[#1a1a1a]/70 uppercase tracking-widest">
                                <div>
                                    <p className="text-[#1a1a1a]/20 mb-2 font-bold text-[8px] tracking-[0.3em]">Signature Color</p>
                                    <p>{v.color}</p>
                                </div>
                                <div>
                                    <p className="text-[#1a1a1a]/20 mb-2 font-bold text-[8px] tracking-[0.3em]">Unique SKU</p>
                                    <p className="font-mono text-[10px]">{v.variant_sku}</p>
                                </div>
                                <div>
                                    <p className="text-[#1a1a1a]/20 mb-2 font-bold text-[8px] tracking-[0.3em]">Dimensional Height</p>
                                    <p>{v.height}</p>
                                </div>
                                <div>
                                    <p className="text-[#1a1a1a]/20 mb-2 font-bold text-[8px] tracking-[0.3em]">Outer Diameter</p>
                                    <p>{v.diameter}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
