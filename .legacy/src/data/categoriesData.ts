export interface Category {
    id: string;
    title: string;
    icon?: string;
    image: string;
    description: string;
}

export const categories: Category[] = [
    {
        id: 'accessories',
        title: 'Accessories',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
        description: 'Finishing touches for the futuristic wardrobe.'
    },
    {
        id: 'hats',
        title: 'Hats',
        image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800',
        description: 'Headwear designed for digital silhouettes.'
    },
    {
        id: 'home-decor',
        title: '🏡 Home & Décor',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
        description: 'Atmospheric elements for the visionary space.'
    },
    {
        id: 'for-him',
        title: 'For Him 👔',
        image: 'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?auto=format&fit=crop&q=80&w=800',
        description: 'Controlled essentials for the masculine identity.'
    },
    {
        id: 'for-her',
        title: 'For Her 👗',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
        description: 'Fluid elegance and high-tech femininity.'
    },
    {
        id: 'exclusive',
        title: 'Exclusive 💎 New',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        description: 'Limited edition drops from the inner circle.'
    },
    {
        id: 'sale',
        title: '✨SALE',
        image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&q=80&w=800',
        description: 'Identity-driven pieces at exceptional value.'
    }
];
