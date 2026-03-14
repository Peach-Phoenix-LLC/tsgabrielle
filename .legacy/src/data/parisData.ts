"use client";

export interface ProductVariant {
    id: string;
    color: string;
    image: string;
    label: string;
    sku: string;
    inventory: string;
}

export interface Product {
    id: string;
    peach_number: string;
    title: string;
    subtitle: string;
    price_display: string;
    price_numeric: number;
    badge?: 'Bestseller' | 'New' | 'Limited' | 'Sold Out';
    main_image: string;
    hover_image: string;
    category: string;
    material: string;
    tags: string[];
    variants: ProductVariant[];
    is_sold_out: boolean;
}

export const PARIS_PRODUCTS: Product[] = [
    {
        id: '1',
        peach_number: '1',
        title: 'Eiffel Tower Black Glossy Mug',
        subtitle: 'Collection Paris',
        price_display: '$18.99',
        price_numeric: 18.99,
        badge: 'Bestseller',
        main_image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
        hover_image: 'https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=800&auto=format&fit=crop',
        category: 'Accessories',
        material: 'Ceramic',
        tags: ['Iconic', 'Gift'],
        is_sold_out: false,
        variants: [
            { id: 'v1', color: '#000000', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop', label: 'Black Glossy', sku: 'MUG-BLK-11', inventory: 'In Stock' },
            { id: 'v2', color: '#ffffff', image: 'https://images.unsplash.com/photo-1577937582968-e7174b1e564d?q=80&w=800&auto=format&fit=crop', label: 'White Matte', sku: 'MUG-WHT-11', inventory: 'In Stock' }
        ]
    },
    {
        id: '2',
        peach_number: '2',
        title: 'Champs-Élysées Silk Scarf',
        subtitle: 'Collection Paris',
        price_display: '$245.00',
        price_numeric: 245.00,
        badge: 'New',
        main_image: 'https://images.unsplash.com/photo-1606760227131-7e8220f8c3ca?q=80&w=800&auto=format&fit=crop',
        hover_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
        category: 'Accessories',
        material: 'Silk',
        tags: ['Luxury', 'Handmade'],
        is_sold_out: false,
        variants: [
            { id: 'v3', color: '#a932bd', image: 'https://images.unsplash.com/photo-1606760227131-7e8220f8c3ca?q=80&w=800&auto=format&fit=crop', label: 'Royal Purple', sku: 'SCF-PUR-SLK', inventory: 'In Stock' },
            { id: 'v4', color: '#1a1a1a', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop', label: 'Midnight Black', sku: 'SCF-BLK-SLK', inventory: 'In Stock' }
        ]
    },
    {
        id: '3',
        peach_number: '3',
        title: 'Rive Gauche Leather Tote',
        subtitle: 'Collection Paris',
        price_display: '$850.00',
        price_numeric: 850.00,
        badge: 'Limited',
        main_image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        hover_image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
        category: 'Bags',
        material: 'Leather',
        tags: ['Premium', 'Workwear'],
        is_sold_out: false,
        variants: [
            { id: 'v5', color: '#3d251e', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', label: 'Cognac', sku: 'BAG-TTE-COG', inventory: 'In Stock' }
        ]
    }
];

export const PARIS_STORY = {
    hero: {
        title: "L'Éclat de Paris",
        subtitle: "2026 Collection",
        description: "Inspired by the cobblestone streets and the blue-gray roofs of the City of Light.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop",
    },
    narrative: {
        heading: "Between Cobblestones & Cosmic Skies.",
        subheading: "Genesis",
        content: "The Paris 2026 Collection is an editorial dialogue between the timeless elegance of the Rive Gauche and the futuristic energy of the Phoenix.",
        image: "https://images.unsplash.com/photo-1549493527-134cca013146?q=80&w=1200&auto=format&fit=crop"
    },
    quote: {
        text: "\"To breathe Paris is to preserve one's soul.\"",
        author: "Victor Hugo",
        image: "https://images.unsplash.com/photo-1493134795711-470dd148c41d?q=80&w=2000&auto=format&fit=crop"
    }
};
