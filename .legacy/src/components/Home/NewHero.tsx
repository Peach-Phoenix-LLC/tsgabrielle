import React from 'react';

const NewHero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="relative z-10 text-center px-8 max-w-6xl mx-auto flex flex-col items-center gap-10">
                <div className="space-y-4 animate-fade-in">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-medium">Paris — New York — Worldwide</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary tracking-tight leading-[1.1]">
                        The Art of<br />
                        <span className="italic font-light">Refined Expression</span>
                    </h1>
                </div>
                
                <p className="text-sm md:text-base font-light text-primary/60 max-w-xl leading-relaxed tracking-wide animate-fade-in [animation-delay:200ms]">
                    Fashion that transcends boundaries. Discover our signature collections designed for the confident, the artistic, and the international.
                </p>

                <div className="pt-6 animate-fade-in [animation-delay:400ms]">
                    <a
                        href="/collections"
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-medium text-white bg-primary transition-all duration-500 hover:bg-primary/90"
                    >
                        Explore Collection
                        <span className="ml-4 material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
                    </a>
                </div>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,245,240,0.2)_100%)]"></div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-left translate-x-1 translate-y-4">Scroll</span>
                <div className="w-[1px] h-12 bg-primary"></div>
            </div>
        </section>
    );
};

export default NewHero;
