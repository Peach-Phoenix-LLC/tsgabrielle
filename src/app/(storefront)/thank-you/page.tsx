"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './ThankYou.module.css';
import confetti from 'canvas-confetti';

export default function ThankYouPage() {
    useEffect(() => {
        // Trigger celebration confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // multiple origins
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.successCard}>
                    <div className={styles.checkIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </div>

                    <h1 className={styles.title}>Order Confirmed!</h1>
                    <p className={styles.message}>
                        Thank you for shopping with tsgabrielle®. Your order #9942 is being processed.
                    </p>

                    <div className={styles.details}>
                        <p>Expected Delivery</p>
                        <p className={styles.date}>Mon, Feb 24</p>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/" className={styles.primaryBtn}>
                            Continue Shopping
                        </Link>
                        <button className={styles.secondaryBtn}>
                            Track Order
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

