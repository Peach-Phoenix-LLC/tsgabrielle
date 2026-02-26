"use client";

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from './Footer.module.css';

const Footer = () => {
    const { data: session } = useSession();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2 className={styles.logoText}>tsgabrielle.net</h2>
                    <div className={styles.dividerShort}></div>
                    <div className={styles.glow}></div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h4>tsgabrielle® Academy</h4>
                        <p>123 Fashion Street</p>
                        <p>Paris, FR 75001</p>
                        <p style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            Made with Love & Style
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4>Info</h4>
                        <ul>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><a href="https://www.instagram.com/tsgabrielle3/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Discover</h4>
                        <ul>
                            <li><Link href="/collections/new-arrivals">New Arrivals</Link></li>
                            <li><Link href="/shop">Best Sellers</Link></li>
                            <li><Link href="/collections">Collections</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.payment}>
                            <h5 style={{ fontSize: '0.625rem', textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.8, letterSpacing: '0.1em' }}>
                                We Accept
                            </h5>
                            <div className={styles.paymentGrid}>
                                <span>credit_card</span>
                                <span>payments</span>
                                <span>account_balance_wallet</span>
                                <span>account_balance</span>
                                <span>phone_iphone</span>
                                <span>language</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.socials}>
                        <a href="https://www.instagram.com/tsgabrielle3/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>IG</a>
                        <a href="https://www.facebook.com/tsgabrielle/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>FB</a>
                    </div>
                    <div>
                        <p>© 2023 tsgabrielle®. Designed in France with Love.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                            <Link href="/privacy" style={{ color: 'white' }}>Privacy</Link>
                            <Link href="/terms" style={{ color: 'white' }}>Terms</Link>
                            {session?.user?.email === 'yridoutt@gmail.com' && (
                                <Link
                                    href="/dashboard"
                                    className="opacity-0 hover:opacity-10 transition-opacity ml-auto"
                                    style={{ cursor: 'default', fontSize: '8px', position: 'absolute', bottom: '10px', right: '10px' }}
                                >
                                    Adm
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
