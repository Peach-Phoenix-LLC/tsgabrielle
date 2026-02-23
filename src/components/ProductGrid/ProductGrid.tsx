"use client";

import React, { useEffect, useState } from 'react';
import styles from './ProductGrid.module.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
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
                {products.map((product) => (
                    <div key={product.id} className={`${styles.card} holographic-card`}>
                        <div className={styles.imageContainer}>
                            <div className={styles.badge}>NEW ERA</div>
                            <img src={product.imageUrl || '/images/placeholder.jpg'} alt={product.name} />
                        </div>
                        <div className={styles.content}>
                            <p className={styles.price}>${product.price.toFixed(2)}</p>
                            <h3 className={styles.title}>{product.name}</h3>
                            <button className={styles.btn} onClick={() => addToCart(product)}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_bag</span>
                                Add to Bag
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};

export default ProductGrid;
