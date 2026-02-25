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
        <section id="specs" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
            <SectionHeader title="Specifications & Care" subtitle="Technical composition and maintenance" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <Card title="Material Science">
                        <Row label="Primary Composition" value={composition} />
                        <Row label="Exterior Finish" value={finish} />
                        <Row label="Durability Index" value="High-Impact Culinary Grade" isLast />
                    </Card>

                    <div className="mt-12 space-y-8">
                        {metafields.map((mf, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="size-2 rounded-full bg-[#a932bd] mt-1.5" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-1">{mf.key}</p>
                                    <p className="text-white/80 font-light">{mf.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/2 rounded-3xl p-12 border border-white/10">
                    <h3 className="text-2xl font-light text-white mb-8">Maintenance Protocol</h3>
                    <div className="text-white/60 font-serif italic text-lg leading-loose mb-12">
                        {care}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: 'microwave', label: 'Microwave Safe', status: 'Certified' },
                            { icon: 'dishwasher_gen', label: 'Dishwasher Safe', status: 'Approved' },
                            { icon: 'eco', label: 'Lead-Free', status: 'Verified' },
                            { icon: 'health_and_safety', label: 'Food Grade', status: 'Compliance A+' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                <span className="material-symbols-outlined text-[#a932bd] font-light">{item.icon}</span>
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-white/30">{item.label}</p>
                                    <p className="text-[11px] font-bold text-white/70">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
