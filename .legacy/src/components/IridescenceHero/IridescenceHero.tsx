"use client";

import React from 'react';
import Link from 'next/link';
import styles from './IridescenceHero.module.css';

const IridescenceHero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.grain}></div>
                <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"
                    alt="Iridescence Collection Model"
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.glassCard}>
                    <p className={styles.eyebrow}>THE NEW ERA</p>
                    <h1 className={styles.title}>
                        IRIDESCENCE<br />
                        <span className={styles.italic}>COLLECTION</span>
                    </h1>
                    <p className={styles.description}>
                        A fusion of light and high-tech fabrics. Reflective mesh meets liquid vinyl in a symphony of holographic elegance.
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="/collections/iridescence" className={styles.primaryBtn}>Shop the Drop</Link>
                        <button className={styles.secondaryBtn}>View Lookbook</button>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.line}></div>
                <span>SCROLL</span>
            </div>
        </section>
    );
};

export default IridescenceHero;
