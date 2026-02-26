"use client";

import React, { useEffect, useState } from 'react';
import styles from './ProductGrid.module.css';

interface Product {
    id: string | number;
    name?: string;
    title?: string;
    description?: string;
    short_description?: string;
    price: number;
    msrp_display?: string;
    category?: string;
    catalogue_category?: string;
    imageUrl?: string;
    media_primary_url?: string;
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Iridescent Mesh Bodysuit',
        description: 'A signature piece with holographic mesh.',
        price: 129.00,
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        category: 'Tops'
    },
    {
        id: '2',
        name: 'Holographic Vinyl Jacket',
        description: 'Weather-resistant vinyl with an iridescent finish.',
        price: 245.00,
        imageUrl: 'https://images.unsplash.com/photo-1539109132304-39155021aa2c?auto=format&fit=crop&q=80&w=800',
        category: 'Outerwear'
    },
    {
        id: '3',
        name: 'Cyberpunk Pleated Skirt',
        description: 'Techwear-inspired pleated skirt.',
        price: 89.00,
        imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
        category: 'Bottoms'
    },
    {
        id: '4',
        name: 'Neon Flux Mini Dress',
        description: 'Glow-in-the-dark flux patterns.',
        price: 185.00,
        imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebcb232811?auto=format&fit=crop&q=80&w=800',
        category: 'Dresses'
    }
];

import { useCart } from '@/context/CartContext';
const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            if (data && typeof data === 'object' && 'error' in data) {
                throw new Error(data.error);
            }

            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p style={{ textAlign: 'center', color: '#888' }}>Curating the collection...</p>
            </div>
        </section>
    );

    if (error) return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p style={{ textAlign: 'center', color: '#ff4d4d' }}>{error}</p>
            </div>
        </section>
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={`${styles.grid} entrance-stagger`}>
                    {products.map((product) => {
                        const title = product.title || product.name || 'Untitled';
                        const displayPrice = product.msrp_display || `$${(Number(product.price) || 0).toFixed(2)}`;
                        const image = product.media_primary_url || product.imageUrl || '/images/placeholder.jpg';

                        return (
                            <div key={product.id} className={`${styles.card} holographic-card`}>
                                <div className={styles.imageContainer}>
                                    <div className={styles.badge}>NEW ERA</div>
                                    <img src={image} alt={title} />
                                </div>
                                <div className={styles.content}>
                                    <p className={styles.price}>{displayPrice}</p>
                                    <h3 className={styles.title}>{title}</h3>
                                    <button className={styles.btn} onClick={() => addToCart(product)}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_bag</span>
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
