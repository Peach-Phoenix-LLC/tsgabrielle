"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ModernFooterProps {
    config?: any;
    siteSettings?: any;
}

const defaultSocials = [
    { name: 'facebook', url: 'https://www.facebook.com/tsgabrielle3' },
    { name: 'instagram', url: 'https://www.instagram.com/tsgabrielle3' },
    { name: 'tiktok', url: 'https://www.tiktok.com/@tsgabrielle3' },
    { name: 'pinterest', url: 'https://www.pinterest.com/tsgabrielle3/' }
];

const ModernFooter: React.FC<ModernFooterProps> = ({ config = {}, siteSettings = {} }) => {
    const bgColor = 'bg-[#a932bd]';
    const textColor = 'text-white';

    // Logo from settings or default
    const logoSrc = siteSettings.logo_url || '/images/logo-white.png';

    // Socials from settings or default
    const socialLinks = config.socials || defaultSocials;

    // Links Columns
    const linkColumns = config.links_columns || [
        {
            title: 'Atelier',
            links: [
                { label: 'Privacy Priority', url: '/privacy' },
                { label: 'Terms of Usage', url: '/terms' },
                { label: 'Return Policy', url: '/refund-policy' }
            ]
        }
    ];

    return (
        <footer className={`${textColor} flex flex-col w-full bg-white`}>
            {/* Background Transition Image */}
            <div className="w-full bg-white relative min-h-[200px] overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-[200px] md:h-[300px]"
                >
                    <Image
                        src="/images/tsgabrielle-footer.png"
                        alt="Maison transition"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#a932bd]/20 to-transparent pointer-events-none" />
            </div>

            <div className={`${bgColor} flex flex-col items-center w-full relative z-10 -mt-[1px]`}>
                <div className="max-w-7xl mx-auto px-8 pt-20 pb-12 flex flex-col items-center gap-16 w-full">
                    {/* 1. Logo */}
                    <Link href="/">
                        <div className="relative w-56 h-16">
                            <Image
                                src={logoSrc}
                                alt={siteSettings.brand_name || "tsgabrielle"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* 2. Grid for Columns and Newsletter if enabled */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center md:text-left border-y border-white/10 py-16">
                        {linkColumns.map((col: any, idx: number) => (
                            <div key={idx} className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">{col.title}</h4>
                                <ul className="space-y-4">
                                    {col.links?.map((link: any, lIdx: number) => (
                                        <li key={lIdx}>
                                            <Link href={link.url} className="text-sm font-light hover:opacity-100 transition-opacity opacity-70 tracking-widest uppercase">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {config.newsletter?.enabled && (
                            <div className="md:col-span-1 space-y-6">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Newsletter</h4>
                                <p className="text-sm font-light opacity-60 leading-relaxed uppercase tracking-wider">
                                    {config.newsletter.text || 'Join the Maison tsgabrielle® inner circle.'}
                                </p>
                                <div className="flex border-b border-white/30 pb-2">
                                    <input
                                        type="email"
                                        placeholder="VOTRE EMAIL"
                                        className="bg-transparent border-none outline-none text-xs flex-grow placeholder:text-white/30 tracking-widest"
                                    />
                                    <button className="text-[10px] uppercase tracking-widest font-bold">Inscrire</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. Social Media Icons Row */}
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-4xl">
                        {Object.entries(config.socials || {}).map(([name, url]: [string, any]) => (
                            url ? (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    {name}
                                </a>
                            ) : null
                        ))}
                    </div>

                    {/* 4. Copyright Text */}
                    <div className="max-w-5xl text-center px-4">
                        <p className="text-[10px] opacity-40 font-light leading-relaxed uppercase tracking-[0.2em]">
                            {config.copyright || `2026© ${siteSettings.brand_name || 'tsgabrielle®'} • Committed to Transparency • Peach Phoenix, LLC.`}
                            <Link href="/dashboard" className="opacity-5 hover:opacity-100 transition-opacity ml-4 inline-flex items-center justify-center min-w-[24px] min-h-[24px]" style={{ cursor: 'default' }}>
                                <span>Adm</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ModernFooter;
