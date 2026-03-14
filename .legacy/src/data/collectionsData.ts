export interface Collection {
    title: string;
    count: string;
    image: string;
    description?: string;
    path?: string;
}

export const collections: Collection[] = [
    {
        title: 'Beauté Beauty',
        count: '14 products',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        description: 'Exquisite skincare and modern cosmetics for the inner glow.',
        path: '/collections/beaute-beauty'
    },
    {
        title: 'Peach Phoenix™',
        count: '12 pieces',
        image: '/images/collections/peach-phoenix.png',
        description: 'Rising from the embers in soft amethyst hues.',
        path: '/collections/peach-phoenix'
    },
    {
        title: 'Paris',
        count: '24 pieces',
        image: '/images/collections/paris.png',
        description: 'Chic, timeless elegance inspired by the streets of Paris.',
        path: '/collections/paris'
    },
    {
        title: 'Unicorn 🦄',
        count: '15 pieces',
        image: '/images/collections/unicorn.png',
        description: 'Iridescent fabrics and mythical aesthetics.',
        path: '/collections/unicorn'
    },
    {
        title: 'Arizona 🌵',
        count: '11 pieces',
        image: '/images/collections/arizona.png',
        description: 'Desert tones meet high-tech utility.',
        path: '/collections/arizona'
    },
    {
        title: 'Womanizer',
        count: '18 pieces',
        image: '/images/collections/womanizer.png',
        description: 'Bold, empowering silhouettes for the modern icon.',
        path: '/collections/womanizer'
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
        image: '/images/collections/flamant-rose.png',
        description: 'Vibrant pinks and lightweight summer layers.',
        path: '/collections/flamant-rose'
    },
    {
        title: '🌌✨ Édition Spatiale • Cosmic Edition',
        count: '20 pieces',
        image: '/images/collections/edition-spatiale.png',
        description: 'Out-of-this-world textures and astronomical detail.',
        path: '/collections/cosmic'
    },
    {
        title: 'Crystal Skies',
        count: '14 pieces',
        image: '/images/collections/crystal-skies.png',
        description: 'Transparent layers and icy, clear-cut aesthetics.',
        path: '/collections/crystal-skies'
    },
    {
        title: '❄️ Glow in Winter 26',
        count: '15 pieces',
        image: '/images/collections/glow-in-winter-26.png',
        description: 'Luminescent fabrics for the peak of winter.',
        path: '/collections/winter-26'
    }

];
