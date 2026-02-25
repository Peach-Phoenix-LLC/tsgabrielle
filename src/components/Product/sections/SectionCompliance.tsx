import React from 'react';
import { Row, SectionHeader, Card } from '../ui';

interface SectionComplianceProps {
    prop65: string;
    warranty: string;
    trademark: string;
    contact: string;
    safety: string;
}

export const SectionCompliance: React.FC<SectionComplianceProps> = ({ prop65, warranty, trademark, contact, safety }) => {
    return (
        <section id="legal" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
            <SectionHeader title="Compliance & Legal" subtitle="Regulatory disclosures and brand protection" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 lg:sticky lg:top-56 h-fit space-y-8">
                    <Card title="Brand Authority">
                        <div className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-light">
                            {trademark}
                        </div>
                    </Card>
                    <div className="p-10 rounded-3xl bg-[#a932bd] text-white">
                        <h4 className="text-xl font-light mb-4">Support Direct</h4>
                        <p className="text-sm opacity-80 leading-relaxed mb-8">For inquiries regarding bulk acquisition or commercial placement, contact our Arizona flagship.</p>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">{contact}</p>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-12">
                    <div className="space-y-6">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Safety & Testing</h3>
                        <p className="text-xl font-light text-white/80 leading-relaxed max-w-2xl">{safety}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a932bd] mb-6">Health Disclosures</h4>
                            <p className="text-sm font-light text-white/60 mb-8">{prop65}</p>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500 font-light text-lg">verified_user</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Compliance Verified</span>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-6">Consumer Protection</h4>
                            <p className="text-sm font-light text-white/60 mb-8">{warranty}</p>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#a932bd] font-light text-lg">gavel</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Active Protection</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 border-t border-white/5 text-center">
                        <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">tsgabrielle® — Intellectual Property Division</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
