import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const socials = [
    { name: 'facebook', url: 'https://www.facebook.com/tsgabrielle3', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z' },
    { name: 'instagram', url: 'https://www.instagram.com/tsgabrielle3', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { name: 'x', url: 'https://x.com/tsgabrielle3', path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' },
    { name: 'youtube', url: 'https://www.youtube.com/@tsgabrielle3', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
    { name: 'tiktok', url: 'https://www.tiktok.com/@tsgabrielle3', path: 'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.17-2.33 0-4.6-1.25-5.91-3.17-.81-1.15-1.27-2.54-1.35-3.94-.03-2.91-.01-5.83-.02-8.75 2.13.01 4.26-.01 6.39 0V.02z' },
    { name: 'pinterest', url: 'https://www.pinterest.com/tsgabrielle3/', path: 'M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.991 3.992-.283 1.194.599 2.169 1.775 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.868-2.061-4.874-5.004-4.874-3.41 0-5.411 2.558-5.411 5.2 0 1.03.397 2.134.893 2.738.098.119.112.224.083.342l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.397 2.965 7.397 6.93 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.631-2.745-1.376l-.748 2.853c-.271 1.033-1.002 2.324-1.492 3.121 1.124.346 2.316.533 3.551.533 6.627 0 12-5.373 12-12s-5.373-12-12-12z' },
    { name: 'linkedin', url: 'https://www.linkedin.com/company/tsgabrielle/', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'snapchat', url: 'https://www.snapchat.com/@tsgabrielle3', path: 'M12 3c-.563 0-1.127.05-1.683.15-.402.072-.803.18-1.205.319-2 .699-2.583 3.13-2.583 3.13-.131.547-.456.848-.923 1.085-1 .517-2.298 1.114-2.298 2.112 0 .611.332 1.029.839 1.258.309.139.638.225.961.261.32.036.5.215.6.438.2.437-.2 1.758-.2 1.758-.109.827.606 1.488 1.341 1.76.183.067.373.111.564.131l.34.037c.121.014.225.08.19.197-.013.064-.025.107-.07.18-.323.548-1.123 1.314-.735 1.801.3.376 1.583.116 2.54-.103.16-.037.382.016.48.115.352.39.54 1.636.899 2.067.284.341.685.521 1.083.521s.799-.18 1.083-.521c.359-.431.547-1.677.899-2.067.098-.099.32-.152.48-.115.957.219 2.24.479 2.54.103.388-.487-.412-1.253-.735-1.801-.045-.073-.057-.116-.07-.18-.035-.117.069-.183.19-.197l.34-.037a1.942 1.942 0 0 0 .564-.131c.735-.272 1.45-.933 1.341-1.76 0 0-.4-1.321-.2-1.758.1-.223.28-.402.6-.438.323-.036.652-.122.961-.261.507-.229.839-.647.839-1.258 0-.998-1.298-1.595-2.298-2.112-.467-.237-.792-.538-.923-1.085 0 0-.583-2.431-2.583-3.13-.402-.139-.803-.247-1.205-.319A8.1 8.1 0 0 0 12 3z' }
];

interface ModernFooterProps {
    darkMode?: boolean;
}

const ModernFooter: React.FC<ModernFooterProps> = ({ darkMode = false }) => {
    const bgColor = darkMode ? 'bg-[#050406]' : 'bg-bg-light';
    const textColor = darkMode ? 'text-[#e7e7e7]' : 'text-text-dark';
    const borderColor = darkMode ? 'border-primary/20' : 'border-primary/10';
    const logoSrc = darkMode ? '/images/logo-white.png' : '/images/logo-purple.png';
    const iconFill = darkMode ? 'fill-[#e7e7e7]' : 'fill-text-dark';
    const iconOpacity = darkMode ? 'opacity-50' : 'opacity-40';

    return (
        <footer className={`${bgColor} ${textColor} pt-24 pb-12 border-t ${borderColor}`}>
            <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* 1. Logo */}
                <Link href="/">
                    <div className="relative w-48 h-12">
                        <Image
                            src={logoSrc}
                            alt="tsgabrielle logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* 2. Social Media Icons Row */}
                <div className="flex items-center gap-10">
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-all duration-300"
                            aria-label={social.name}
                        >
                            <svg
                                className={`w-5 h-5 ${iconFill} ${iconOpacity} group-hover:opacity-100 group-hover:fill-primary transition-all duration-300`}
                                viewBox="0 0 24 24"
                            >
                                <path d={social.path} />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* 3. Navigation Links Row */}
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-[12px] font-light opacity-60">
                    <Link href="/privacy" className="hover:text-primary transition-colors uppercase tracking-widest">Privacy priority</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/terms" className="hover:text-primary transition-colors uppercase tracking-widest">Usage terms</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/refund-policy" className="hover:text-primary transition-colors uppercase tracking-widest">Refund policy</Link>
                    <span className="opacity-20">•</span>
                    <Link href="/policies" className="hover:text-primary transition-colors uppercase tracking-widest">Legal Atelier</Link>
                </div>

                {/* 4. Copyright Text */}
                <div className="max-w-5xl text-center px-4">
                    <p className="text-[10px] opacity-30 font-light leading-relaxed">
                        2026© tsgabrielle® • Committed to Transparency in all our operations • The tsgabrielle logo and names and trademarks associated with tsgabrielle products are registered trademarks of Peach Phoenix, LLC. and/or its affiliates • All other trademarks are the property of their respective owners.
                        <Link href="/dashboard" className="opacity-20 hover:opacity-100 transition-opacity ml-1 inline-flex items-center justify-center min-w-[24px] min-h-[24px] relative" style={{ cursor: 'default' }}>
                            <span className="text-[10px]">Adm</span>
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default ModernFooter;
