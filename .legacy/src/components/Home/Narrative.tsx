import React from 'react';

const Narrative = () => {
    return (
        <section id="narrative" className="py-32 px-8 bg-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="order-2 lg:order-1 relative group">
                    <div className="aspect-[3/4] overflow-hidden relative">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkmsUHksGPcOMd1Lfrpq-HrpDj-fsunxXzvduRcWo2ygdGuMtV_Y5O1dP-1nZklneeJuLMiumoqGoE7nKZg-h83pvzGUERrO1yF1sMBoHNjurfXmrQ6YkB2USUACtj4m953j4_vh8Sbzo_8U0GzdACYdP0beVUXIFLSmGUU39m3vFKew3_i8_G_UXqUUBHhavaKB0WOVGexdLjdbppQhL9rbm2RGBzOVwLgO9TRHQyLJcL1Jd9Wy7m2OprFOOknvke4rHFQyTArHOJ"
                            alt="Artistic fashion vision"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    {/* Minimalist Floating Badge */}
                    <div className="absolute -bottom-8 -right-8 bg-primary p-10 hidden md:block animate-fade-in [animation-delay:600ms]">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2">Heritage</p>
                        <p className="text-xl font-serif text-white tracking-widest">EST. 2023</p>
                        <div className="mt-6 w-8 h-[1px] bg-accent"></div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-4">Parisian Studio</p>
                    </div>
                </div>

                <div className="order-1 lg:order-2 flex flex-col gap-10">
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent">The Vision</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary tracking-tight leading-tight">
                            A Dialogue Between<br />
                            <span className="italic">Identity & Form</span>
                        </h2>
                    </div>

                    <div className="space-y-6 max-w-xl">
                        <p className="text-sm md:text-base text-primary/70 font-light leading-relaxed tracking-wide">
                            Gabrielle's vision goes beyond fabric and thread. It is a dialogue between identity and form.
                            Each piece is crafted to celebrate the fluidity of the human experience, offering silhouettes that
                            don't just fit the body, but empower the soul.
                        </p>
                        <p className="text-sm md:text-base text-primary/70 font-light leading-relaxed tracking-wide">
                            From the cobblestone streets of Paris to the digital frontier, tsgabrielle® stands as a beacon for those who
                            dare to define their own reality through the medium of high fashion.
                        </p>
                    </div>

                    <div className="pt-4">
                        <a href="/about" className="luxury-link text-[11px] uppercase tracking-[0.3em] font-medium text-primary inline-flex items-center group">
                            Read Our Story
                            <span className="ml-4 material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">north_east</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Narrative;
