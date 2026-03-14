"use client";

import React from 'react';
import styles from './CategoriesGrid.module.css';
import { categories } from '@/data/categoriesData';
import Link from 'next/link';

const CategoriesGrid = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>EXPLORE CATEGORIES</h2>
                    <div className={styles.line}></div>
                </div>

                <div className={`${styles.grid} entrance-stagger`}>
                    {categories.map((category) => (
                        <Link
                            href={`/api/products?category=${category.title}`}
                            key={category.id}
                            className={`${styles.card} holographic-card`}
                            data-id={category.id}
                        >
                            <div className={styles.imageOverlay}>
                                <img src={category.image} alt={category.title} className={styles.image} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                                <p className={styles.description}>{category.description}</p>
                                <span className={styles.cta}>VIEW PRODUCTS →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesGrid;
