"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import styles from './Navbar.module.css';

const Navbar = () => {
    const { data: session } = useSession();
    const { totalItems } = useCart();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logoContainer}>
                        <Link href="/">
                            <div className={styles.logoWrapper}>
                                <Image
                                    src="/images/logo-white.png"
                                    alt="tsgabrielle® white logo"
                                    width={180}
                                    height={45}
                                    className={styles.logoWhite}
                                    priority
                                />
                                <Image
                                    src="/images/logo-purple.png"
                                    alt="tsgabrielle® purple logo"
                                    width={180}
                                    height={45}
                                    className={styles.logoPurple}
                                    priority
                                />
                                {/* Premium text fallback */}
                                <span className={styles.logoTextFallback}>tsgabrielle®</span>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.links}>
                        <Link href="/shop" className={styles.link}>Shop</Link>
                        <Link href="/collections" className={styles.link}>Collections</Link>
                        <Link href="/exclusive" className={styles.link}>Exclusive</Link>
                        <Link href="/sale" className={styles.link}>✨SALE</Link>
                    </div>

                    <div className={styles.actions}>
                        <span className={`material-symbols-outlined ${styles.icon}`}>search</span>
                        <span className={`material-symbols-outlined ${styles.icon}`}>favorite</span>
                        <Link href="/cart" className={styles.cartBtn}>
                            <span className={`material-symbols-outlined ${styles.icon}`}>shopping_bag</span>
                            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                        </Link>
                        {session ? (
                            <button className={styles.iconBtn} onClick={() => signOut()}>
                                <span className={`material-symbols-outlined ${styles.icon}`}>logout</span>
                            </button>
                        ) : (
                            <button className={styles.iconBtn} onClick={() => signIn('google')}>
                                <span className={`material-symbols-outlined ${styles.icon}`}>person</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
