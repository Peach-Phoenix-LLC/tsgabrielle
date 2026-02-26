import React from 'react';
import Link from 'next/link';

const recommendations = [
    {
        id: '1',
        name: 'Iridescent Mesh Bodysuit',
        price: '$129.00',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        name: 'Cyberpunk Pleated Skirt',
        price: '$89.00',
        imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '4',
        name: 'Neon Flux Mini Dress',
        price: '$185.00',
        imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebcb232811?auto=format&fit=crop&q=80&w=800'
    }
];

const Recommendations = () => {
    return (
        <section className="py-16 border-t border-slate-100 mt-16 px-6">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    Complete the Look
                </h2>

                <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
                    {recommendations.map((item) => (
                        <Link
                            key={item.id}
                            href={`/products/${item.id}`}
                            className="min-w-[200px] md:min-w-[280px] group snap-start"
                        >
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">{item.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
