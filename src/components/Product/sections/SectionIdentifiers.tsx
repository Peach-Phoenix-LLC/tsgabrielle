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
        <section id="identifiers" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
            <SectionHeader title="Identifiers & Architecture" subtitle="Registry and dimensional data" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#a932bd] mb-8">Base Registry</h3>
                        <Row label="Global Base SKU" value={baseSku} />
                        <Row label="Manufacturer Part Number" value={baseMpn} />
                        <Row label="Product Classification" value={productType} isLast />
                    </div>

                    <div className="p-8 bg-white/2 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-white/30 leading-relaxed italic">
                            The base SKU represents the master design pattern. Unique serials are generated per production run to ensure traceability across the tsgabrielle® network.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Active Variants</h3>
                    {variants.map((v, i) => (
                        <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 group hover:border-[#a932bd]/30 transition-all duration-500">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Configuration {i + 1}</p>
                                    <h4 className="text-xl font-light">{v.size_label}</h4>
                                </div>
                                <span className="text-2xl font-light">{v.msrp}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-8 text-[11px] font-light text-white/60">
                                <div>
                                    <p className="text-white/20 mb-1 uppercase tracking-tighter">Color</p>
                                    <p>{v.color}</p>
                                </div>
                                <div>
                                    <p className="text-white/20 mb-1 uppercase tracking-tighter">SKU</p>
                                    <p>{v.variant_sku}</p>
                                </div>
                                <div>
                                    <p className="text-white/20 mb-1 uppercase tracking-tighter">Height</p>
                                    <p>{v.height}</p>
                                </div>
                                <div>
                                    <p className="text-white/20 mb-1 uppercase tracking-tighter">Diameter</p>
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
