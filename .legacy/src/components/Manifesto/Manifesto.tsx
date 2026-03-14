"use client";

import React from 'react';
import styles from './Manifesto.module.css';

const Manifesto = () => {
    return (
        <section className={styles.section}>
            <div className={styles.background}>
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4DpBP0wnasUQftlbna_pZYz0I0JDORDiBM-L2qLImC6fvQOsUfR-GupwpQePbNfRjUX5WzaQJrbTbQdALNLzuI77cYNfGggfnpi20clHkOgtk8vUmsjDPRDiT999-Q6N_aRnheV_17bsgJ5Do7YJjPpmtKrUKLxA5uwJ_xOCs1oSrlv7XkU0yAxjHIevMX9yKLv2CSxlJiwH2MwTYGUH1Hg7X2eUOjKZ_hOOYyDtGOoiweeJ-xS0U1O16SuYR-6Z-BWxCzlAIxMWV"
                    alt="Background pattern"
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.heading}>JOIN THE WORLD OF<br />TSGABRIELLE®</h2>
                <p className={styles.text}>
                    Be the first to know about new collections, exclusive offers, and behind-the-scenes stories from the world of tsgabrielle®.
                </p>
                <div className="max-w-xs mx-auto mt-8">
                    <button className="btn-high-vis">
                        Sign Up
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Manifesto;
