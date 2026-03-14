"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MobileCategories.module.css';
import { collections } from '@/data/collectionsData';

export const MobileCategories = () => {
    // Only pick a few key collections for the horizontal scroll
    const featuredCollections = collections.slice(0, 5);

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Explore</h2>
                <Link href="/collections" className={styles.viewAll}>View All</Link>
            </div>

            <div className={styles.scrollContainer}>
                {featuredCollections.map((collection: any) => (
                    <Link href={collection.path || '#'} key={collection.title} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={collection.image}
                                alt={collection.title}
                                fill
                                className={styles.image}
                            />
                            <div className={styles.overlay}></div>
                            <span className={styles.collectionName}>{collection.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
