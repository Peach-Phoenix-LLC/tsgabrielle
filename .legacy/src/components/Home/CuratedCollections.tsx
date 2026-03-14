import React from 'react';

const collections = [
    {
        title: 'Dresses',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCYOP12PEsUmMXn_NEkx3jJ1syX5BbuuQLH7axTuZ4DpjfaB791t0zOkFWC3H381orb166qJTI_aVhrJcQ9xdMpUlXstLPQyIuU2jhscNNpUXzfngPOsah9vKRub7423GqnOR9Vj466tcqXQm2OkxTy4en97Sdlm5HzwG8q9BeJILTrqIGw5c5fhQDiX2UeUscarqejrArIiQoIkHYMt6WHSgjUxAIZOPJq4KZhtLjQd99fALLFKloc1usBk1OKIIrZniljJPSCPWT'
    },
    {
        title: 'Accessories',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJVnNWN6tuHxIfeXEuPsIqoZUubkPstN-wRA7YLzW6jzhAgt_Y3-GKrb65SCyb4IrJ2PiwsUFowa-IMtGZxPrkZ707d_9onqpxL7D775ONsZXlbv7er5mF8X_c-nux-7wGyBpKAe1Mfw1Rj5XDj9TBmrR4OryezV8Xpk_EFJm-2YZKzZhH37e00tgYPUvgGOiuWvpVaszKNu6K74TY296We4kqfmHMbcClezLD0z8xNcQgyKX_6oxUl9htYjFmH1716yzEcZ2R2WPF'
    },
    {
        title: 'New Arrivals',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBJvaDay6hJiruNfcYwtgoheFXDSFfwhC1C7r16CIjgwnJtIbExdcxZxsbtBk97qGATvjXfrSDbFSd5eeuscVNiDT42QsMZbLbhIEokW0uWZn0Db5nKVJ8QoNf7n2bQCw-hwkPC4rwPqC_kznHJ9OV3_OSAvHuz54bM-cszqoSswMysI2JWlfJvERfirHychkf9XaadHYv6MSRfTzicWoi876TekSU4MuuZJM6RsqZGp9WTdffoiTpzMJuYsIMvDOpTJ5vWUuo0FF7'
    },
    {
        title: 'Best Sellers',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsqLCLG5N0f5IqMmX9YNX6EQ7Q9rZmk1vf-0vuRnPiWy6W7TQTMn182oXzszswYr4c8-kg-Q4xQHjyzoqQI-ouuQslbElBBxj-J7YzbvlmPx5hDhRO7RDik6b6DuE3TUB73IVtc3oP6s-NF8h6GqKqsr9VUMeOUpbdhsU7cA5zrHCKSf09AtrlhMd7Zp9lWOUFPRJqNx3qI4a25j9jvuYC2xIdHkh4-WNVCcSlYUJFHDL8WGQtBVR1XXfTicVbNCUbck1E_TbjwmbB'
    }
];

const CuratedCollections = () => {
    return (
        <section className="py-32 px-8 bg-[#FDFCF8]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-medium">Seasonal Curation</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tight">Curated Collections</h2>
                        <p className="text-sm font-light text-primary/60 max-w-md leading-relaxed tracking-wide">
                            Discover the architectural pieces that define our current season of expression.
                        </p>
                    </div>
                    <a href="/collections" className="luxury-link text-[10px] uppercase tracking-[0.3em] font-medium text-primary inline-flex items-center group">
                        View All Collections
                        <span className="ml-4 material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {collections.map((item, index) => (
                        <a key={index} href={`/collections/${item.title.toLowerCase()}`} className="group relative aspect-[3/4] overflow-hidden bg-white">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/5 transition-opacity duration-700 group-hover:opacity-0"></div>

                            <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                <h3 className="text-xl font-serif text-white tracking-widest drop-shadow-lg">{item.title}</h3>
                                <div className="mt-4 w-0 group-hover:w-full h-[1px] bg-white transition-all duration-700 origin-left"></div>
                                <span className="text-[9px] uppercase tracking-[0.4em] text-white/70 mt-4 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">Shop Now</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuratedCollections;
