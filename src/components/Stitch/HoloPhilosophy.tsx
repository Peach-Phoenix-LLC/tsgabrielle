import React from 'react';
import Link from 'next/link';
import { philosophyData } from '@/data/mockData';

export default function HoloPhilosophy() {
    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto space-y-24 px-4 sm:px-6 lg:px-8">

                {/* Block 1 */}
                <div className="relative flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 h-[450px] md:h-[650px] relative z-0">
                        <img
                            alt="Editorial fashion"
                            className="w-full h-full object-cover grayscale-[0.1]"
                            src={philosophyData.heroImage}
                        />
                    </div>
                    <div className="w-full md:w-1/2 relative z-10 md:-ml-20 mt-[-4rem] md:mt-0 px-4 md:px-0">
                        <div className="relative bg-white border border-primary/10 rounded-sm shadow-sm max-w-xl mx-auto overflow-hidden">
                            <div className="bg-white h-full w-full relative z-10 p-10 md:p-16">
                                <h2 className="text-3xl md:text-4xl font-thin text-text-dark mb-6 leading-tight">
                                    Grow your <span className="text-primary italic">style confidence</span>
                                </h2>
                                <p className="text-text-dark/50 font-thin mb-8 leading-relaxed">
                                    Each piece in our collection is an opportunity to express your true self. Through fashion, we empower you to embrace your identity and build a wardrobe that speaks volumes without saying a word.
                                </p>
                                <Link
                                    href="/product"
                                    className="text-primary font-thin text-sm border-b border-primary pb-1 hover:text-primary-dark transition-colors"
                                >
                                    View dresses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Block 2 */}
                <div className="relative flex flex-col md:flex-row-reverse items-center">
                    <div className="w-full md:w-1/2 h-[450px] md:h-[650px] relative z-0">
                        <img
                            alt="Editorial coats"
                            className="w-full h-full object-cover grayscale-[0.1]"
                            src={philosophyData.secondaryImage}
                        />
                    </div>
                    <div className="w-full md:w-1/2 relative z-10 md:-mr-20 mt-[-4rem] md:mt-0 px-4 md:px-0">
                        <div className="relative bg-white border border-primary/10 rounded-sm shadow-sm max-w-xl mx-auto overflow-hidden">
                            <div className="bg-white h-full w-full relative z-10 p-10 md:p-16">
                                <h2 className="text-3xl md:text-4xl font-thin text-text-dark mb-6 leading-tight">
                                    Timeless pieces you can wear <span className="italic text-primary">forever</span>
                                </h2>
                                <p className="text-text-dark/50 font-thin mb-8 leading-relaxed">
                                    The French Trans Touch isn't just a tagline; it's a commitment to enduring style. Our coats are designed to be the staple of your winter wardrobe for years to come.
                                </p>
                                <Link
                                    href="/product"
                                    className="text-primary font-thin text-sm border-b border-primary pb-1 hover:text-primary-dark transition-colors"
                                >
                                    View coats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
