"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CollectionsGrid.module.css';
import { collections } from '@/data/collectionsData';

const CATEGORIES = ["All", "Outerwear", "Dresses", "Accessories", "Tops", "Bottoms"];

const CollectionsGrid = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Filter logic
    const filteredCollections = collections.filter(collection => {
        // First match search term against title
        const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Match category (mocking category by parsing title since no category in object yet, but realistically "All" works for now)
        const matchesCategory = activeCategory === "All" || collection.title.includes(activeCategory);

        return matchesSearch && matchesCategory;
    });

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>curated collections</h2>
                <div className={styles.divider}></div>

                {/* --- Search & Filters --- */}
                <div className={styles.filterContainer}>
                    <div className={styles.searchBox}>
                        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                        <input
                            type="text"
                            placeholder="Search collections..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.pillRow}>
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                className={`${styles.pill} ${activeCategory === category ? styles.pillActive : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredCollections.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-gray-400">
                        No collections match your criteria. Please refine your search.
                    </motion.div>
                )}

                <motion.div layout className={`${styles.grid} entrance-stagger`}>
                    <AnimatePresence>
                        {filteredCollections.map((collection, index) => {
                            const content = (
                                <motion.div
                                    layout
                                    className={`${styles.card} holographic-card`}
                                >
                                    <div className={styles.imageContainer}>
                                        <div className={styles.innerImage}>
                                            <img src={collection.image} alt={collection.title} />
                                        </div>
                                    </div>
                                    <h3 className={styles.cardTitle}>{collection.title}</h3>
                                    <p className={styles.cardMeta}>{collection.count}</p>
                                </motion.div>
                            );

                            return collection.path ? (
                                <Link key={collection.title} href={collection.path} style={{ textDecoration: 'none' }}>
                                    {content}
                                </Link>
                            ) : (
                                <div key={collection.title}>
                                    {content}
                                </div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CollectionsGrid;
