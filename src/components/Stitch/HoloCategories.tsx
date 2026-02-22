import React from 'react';

export default function HoloCategories() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-thin mb-4 text-text-dark">
                        Shop by category
                    </h2>
                    <div className="w-16 h-px bg-primary mx-auto mb-6"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                    {/* Category 1 */}
                    <div className="flex flex-col items-center p-6 group cursor-pointer transition-transform duration-300">
                        <div className="mb-6 relative">
                            <span className="material-symbols-outlined text-6xl text-primary font-thin relative z-10">diamond</span>
                        </div>
                        <h3 className="text-2xl font-thin text-text-dark mb-4">
                            Luxury quality
                        </h3>
                        <p className="text-text-dark/50 font-thin leading-relaxed max-w-xs mx-auto">
                            We source the finest materials to ensure every piece embodies the premium standard of tsgabrielle®.
                        </p>
                    </div>

                    {/* Category 2 */}
                    <div className="flex flex-col items-center p-6 group cursor-pointer transition-transform duration-300">
                        <div className="mb-6 relative">
                            <span className="material-symbols-outlined text-6xl text-primary font-thin relative z-10">auto_awesome</span>
                        </div>
                        <h3 className="text-2xl font-thin text-text-dark mb-4">
                            Unique style
                        </h3>
                        <p className="text-text-dark/50 font-thin leading-relaxed max-w-xs mx-auto">
                            Our designs are curated to celebrate individuality with that special French Trans Touch.
                        </p>
                    </div>

                    {/* Category 3 */}
                    <div className="flex flex-col items-center p-6 group cursor-pointer transition-transform duration-300">
                        <div className="mb-6 relative">
                            <span className="material-symbols-outlined text-6xl text-primary font-thin relative z-10">local_shipping</span>
                        </div>
                        <h3 className="text-2xl font-thin text-text-dark mb-4">
                            Global delivery
                        </h3>
                        <p className="text-text-dark/50 font-thin leading-relaxed max-w-xs mx-auto">
                            From Paris to the world, we ensure your fashion arrives safely and swiftly at your doorstep.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
