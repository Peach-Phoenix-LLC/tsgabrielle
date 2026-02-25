import React from 'react';
import { Row, SectionHeader, Badge } from '../ui';

interface SectionLogisticsProps {
    shippingTier: string;
    leadTime: string;
    warehouse: string;
    origin: string;
    hsCode: string;
}

export const SectionLogistics: React.FC<SectionLogisticsProps> = ({ shippingTier, leadTime, warehouse, origin, hsCode }) => {
    return (
        <section id="logistics" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5">
            <SectionHeader title="Logistics & Global Path" subtitle="Fulfillment and supply chain transparency" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-10">Delivery Velocity</h3>
                        <p className="text-4xl font-light mb-4">{leadTime.split('(')[0]}</p>
                        <p className="text-xs text-white/30 tracking-wide uppercase italic">Est. Production Window</p>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <Badge variant="outline">Global Express Available</Badge>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl bg-white/2 border border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a932bd] mb-6">Cargo Profiling</h4>
                            <Row label="Shipping Tier" value={shippingTier} />
                            <Row label="HS Code (Primary)" value={hsCode} isLast />
                        </div>
                        <div className="p-8 rounded-2xl bg-white/2 border border-white/5">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-6">Distribution Hub</h4>
                            <Row label="Country of Origin" value={origin} />
                            <Row label="Warehouse Zone" value={warehouse} isLast />
                        </div>
                    </div>

                    <div className="bg-[#a932bd]/5 rounded-2xl p-8 flex gap-8 items-center border border-[#a932bd]/10">
                        <div className="size-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <span className="material-symbols-outlined text-3xl font-light">public</span>
                        </div>
                        <div>
                            <p className="text-sm text-white/80 font-light leading-relaxed">
                                Our logistics network utilizes intelligent routing to fulfill orders from the hub geographically closest to your delivery address, significantly reducing your carbon footprint.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
