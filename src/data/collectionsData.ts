export interface Collection {
    title: string;
    count: string;
    image: string;
    description?: string;
    path?: string;
}

export const collections: Collection[] = [
    {
        title: 'Peach Phoenix™',
        count: '12 pieces',
        image: '/images/collection-peach-phoenix.jpg',
        description: 'Rising from the embers in soft amethyst hues.',
        path: '/collections/peach-phoenix'
    },
    {
        title: 'Paris',
        count: '24 pieces',
        image: '/images/collection-paris.png',
        description: 'Chic, timeless elegance inspired by the streets of Paris.',
        path: '/collections/paris'
    },
    {
        title: 'Unicorn 🦄',
        count: '15 pieces',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
        description: 'Iridescent fabrics and mythical aesthetics.',
        path: '/collections/unicorn'
    },
    {
        title: 'Arizona 🌵',
        count: '11 pieces',
        image: '/images/arizona-collection.png',
        description: 'Desert tones meet high-tech utility.',
        path: '/collections/arizona'
    },
    {
        title: 'Womanizer',
        count: '18 pieces',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
        description: 'Bold, empowering silhouettes for the modern icon.',
        path: '/collections/womanizer'
    },
    {
        title: 'TransLove',
        count: '34 pieces',
        image: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82b?auto=format&fit=crop&q=80&w=800',
        description: 'Celebrating the boundless spectrum of love.',
        path: '/collections/translove'
    },
    {
        title: 'TransFLOWer',
        count: '25 pieces',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
        description: 'Organic growth and fluid geometry in bloom.',
        path: '/collections/transflower'
    },
    {
        title: 'Flamant 🦩 Rose',
        count: '16 pieces',
        image: 'https://images.unsplash.com/photo-1516589174184-c685ca30d274?auto=format&fit=crop&q=80&w=800',
        description: 'Vibrant pinks and lightweight summer layers.',
        path: '/collections/flamant-rose'
    },
    {
        title: '🌌✨ Édition Spatiale • Cosmic Edition',
        count: '20 pieces',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        description: 'Out-of-this-world textures and astronomical detail.',
        path: '/collections/cosmic'
    },
    {
        title: 'Crystal Skies',
        count: '14 pieces',
        image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=800',
        description: 'Transparent layers and icy, clear-cut aesthetics.',
        path: '/collections/crystal-skies'
    },
    {
        title: '🌈Pride 25',
        count: '30 pieces',
        image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=800',
        description: 'Vibrant, inclusive designs celebrating diversity.',
        path: '/collections/pride-25'
    },
    {
        title: 'Good Vibes Only',
        count: '12 pieces',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
        description: 'Sunny textiles and optimistic silhouettes.',
        path: '/collections/good-vibes'
    },
    {
        title: 'Made In USA',
        count: '40 pieces',
        image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800',
        description: 'Rugged American craftsmanship and heritage.',
        path: '/collections/made-in-usa'
    },
    {
        title: '❄️ Glow in Winter 26',
        count: '15 pieces',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800',
        description: 'Luminescent fabrics for the peak of winter.',
        path: '/collections/winter-26'
    }
];
