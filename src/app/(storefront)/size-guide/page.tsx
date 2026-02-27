import React from 'react';

export default function SizeGuidePage() {
    return (
        <main className="min-h-screen bg-white text-white font-sans">
            

            <header className="pt-48 pb-20 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-bold mb-4">Le Guide des Tailles</p>
                    <h1 className="text-6xl font-serif tracking-tight mb-8">Perfect Fit</h1>
                    <p className="text-sm text-slate-400 font-light leading-relaxed uppercase tracking-[0.2em]">
                        Ensure your silhouette is perfectly complemented by our master-crafted pieces.
                    </p>
                </div>
            </header>

            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto space-y-32">

                    {/* International Conversions */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-serif">Womenswear Conversion</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                                        <th className="py-6 font-bold">tsgabrielle®</th>
                                        <th className="py-6 font-normal">France</th>
                                        <th className="py-6 font-normal">UK</th>
                                        <th className="py-6 font-normal">US</th>
                                        <th className="py-6 font-normal">IT</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-light text-slate-300">
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-6 font-bold text-white">0</td>
                                        <td className="py-6">34</td>
                                        <td className="py-6">6</td>
                                        <td className="py-6">2</td>
                                        <td className="py-6">38</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-6 font-bold text-white">1</td>
                                        <td className="py-6">36</td>
                                        <td className="py-6">8</td>
                                        <td className="py-6">4</td>
                                        <td className="py-6">40</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-6 font-bold text-white">2</td>
                                        <td className="py-6">38</td>
                                        <td className="py-6">10</td>
                                        <td className="py-6">6</td>
                                        <td className="py-6">42</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-6 font-bold text-white">3</td>
                                        <td className="py-6">40</td>
                                        <td className="py-6">12</td>
                                        <td className="py-6">8</td>
                                        <td className="py-6">44</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-6 font-bold text-white">4</td>
                                        <td className="py-6">42</td>
                                        <td className="py-6">14</td>
                                        <td className="py-6">10</td>
                                        <td className="py-6">46</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* How to Measure */}
                    <div className="space-y-16">
                        <h2 className="text-3xl font-serif">Measuring Guide</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div className="space-y-12">
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest font-bold">01. Chest</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Measure under your arms, around the fullest part of your chest.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest font-bold">02. Waist</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Measure around your natural waistline, keeping the tape slightly loose.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest font-bold">03. Hips</h4>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">Measure around the fullest part of your hips.</p>
                                </div>
                            </div>
                            <div className="aspect-[4/5] bg-white/5 rounded-sm border border-white/10 flex items-center justify-center relative overflow-hidden">
                                <span className="material-symbols-outlined text-9xl text-white/10">body_system</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050406]/50 to-transparent"></div>
                                <p className="absolute bottom-6 text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold">Reference Silhouette</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-12 bg-white/5 border border-white/5 rounded-sm text-center">
                        <p className="text-sm text-slate-400 font-light italic mb-8">Unsure about your size? Our stylists can assist you in finding the perfect fit.</p>
                        <a href="mailto:atelier@tsgabrielle.us" className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#a932bd] hover:brightness-125 transition-all">Request Style Advice</a>
                    </div>

                </div>
            </section>

            
        </main>
    );
}

