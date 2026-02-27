import React from 'react';
import { Row, SectionHeader, Card } from '../ui';

interface SectionDetailsProps {
    composition: string;
    finish: string;
    care: string;
    metafields: { key: string; value: string }[];
}

export const SectionDetails: React.FC<SectionDetailsProps> = ({ composition, finish, care, metafields }) => {
    return (
        <section id="specs" className="py-32 max-w-7xl mx-auto px-6 border-t border-black/5 bg-white">
            <SectionHeader title="Specifications & Care" subtitle="Technical composition and maintenance" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                    <Card title="Material Science">
                        <Row label="Primary Composition" value={composition} />
                        <Row label="Exterior Finish" value={finish} />
                        <Row label="Durability Index" value="High-Impact Culinary Grade" isLast />
                    </Card>

                    <div className="mt-16 space-y-10">
                        {metafields.map((mf, i) => (
                            <div key={i} className="flex gap-6">
                                <span className="size-1.5 rounded-full bg-[#a932bd] mt-2 shadow-lg shadow-[#a932bd]/50" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#1a1a1a]/40 mb-2">{mf.key}</p>
                                    <p className="text-[#1a1a1a] font-light tracking-widest text-sm uppercase">{mf.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-neutral-50 rounded-[2.5rem] p-12 border border-black/5 shadow-sm">
                    <h3 className="text-3xl font-extralight text-[#1a1a1a] tracking-tighter mb-10">Maintenance Protocol</h3>
                    <div className="text-[#1a1a1a]/60 font-serif italic text-xl leading-relaxed mb-16 whitespace-pre-line">
                        {care}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: 'microwave', label: 'Microwave Safe', status: 'Certified' },
                            { icon: 'dishwasher_gen', label: 'Dishwasher Safe', status: 'Approved' },
                            { icon: 'eco', label: 'Lead-Free', status: 'Verified' },
                            { icon: 'health_and_safety', label: 'Food Grade', status: 'Compliance A+' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-black/5 shadow-sm group hover:scale-105 transition-all duration-500">
                                <span className="material-symbols-outlined text-[#a932bd] text-2xl font-extralight group-hover:rotate-12 transition-transform">{item.icon}</span>
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/20 mb-1">{item.label}</p>
                                    <p className="text-[10px] font-bold text-[#1a1a1a]/70 uppercase tracking-widest">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
