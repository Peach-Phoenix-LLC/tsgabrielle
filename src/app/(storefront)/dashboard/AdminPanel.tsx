"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Sections
import DashboardSection from '@/components/Admin/Sections/DashboardSection';
import SiteSettingsSection from '@/components/Admin/Sections/SiteSettingsSection';
import HeroBannerSection from '@/components/Admin/Sections/HeroBannerSection';
import AboutPageSection from '@/components/Admin/Sections/AboutPageSection';
import NavigationSection from '@/components/Admin/Sections/NavigationSection';
import FooterSection from '@/components/Admin/Sections/FooterSection';
import CategoriesSection from '@/components/Admin/Sections/CategoriesSection';
import CollectionsSection from '@/components/Admin/Sections/CollectionsSection';
import PagesSection from '@/components/Admin/Sections/PagesSection';
import ThemeDesignSection from '@/components/Admin/Sections/ThemeDesignSection';
import CheckoutSection from '@/components/Admin/Sections/CheckoutSection';
import SeoAnalyticsSection from '@/components/Admin/Sections/SeoAnalyticsSection';
import NotificationsSection from '@/components/Admin/Sections/NotificationsSection';
import ConnectionsSection from '@/components/Admin/Sections/ConnectionsSection';
import ProductsSection from '@/components/Admin/Sections/ProductsSection';
import MediaLibrarySection from '@/components/Admin/Sections/MediaLibrarySection';
import ReviewsSection from '@/components/Admin/Sections/ReviewsSection';
import PeachesAdminSection from '@/components/Admin/Sections/PeachesAdminSection';
import OrdersSection from '@/components/Admin/Sections/OrdersSection';
import AnalyticsSection from '@/components/Admin/Sections/AnalyticsSection';

const SECTIONS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics Intelligence', icon: 'analytics' },
    { id: 'orders', label: 'Orders', icon: 'local_shipping' },
    { id: 'connections', label: 'Connections', icon: 'hub' },
    { id: 'media', label: 'Media Library', icon: 'perm_media' },
    { id: 'products', label: 'Products', icon: 'inventory_2' },
    { id: 'reviews', label: 'Reviews', icon: 'star_rate' },
    { id: 'settings', label: 'Site Settings', icon: 'settings' },
    { id: 'hero', label: 'Hero Banner', icon: 'view_headline' },
    { id: 'about', label: 'About Page', icon: 'person' },
    { id: 'navigation', label: 'Navigation', icon: 'menu' },
    { id: 'footer', label: 'Footer', icon: 'bottom_panel_open' },
    { id: 'categories', label: 'Categories', icon: 'category' },
    { id: 'collections', label: 'Collections', icon: 'collections' },
    { id: 'pages', label: 'Pages', icon: 'description' },
    { id: 'theme', label: 'Theme & Design', icon: 'palette' },
    { id: 'checkout', label: 'Checkout', icon: 'shopping_cart' },
    { id: 'seo', label: 'SEO & Analytics', icon: 'query_stats' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'peaches', label: 'Peaches Management', icon: 'payments' },
];

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            fetchConfig();
            return;
        }
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            fetchConfig();
        }
    }, [status]);

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/admin/config');
            const data = await res.json();
            setConfig(data);
        } catch (err) {
            console.error("Failed to fetch config", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (sectionId: string, sectionData: any) => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [sectionId]: sectionData }),
            });
            if (res.ok) {
                const updatedConfig = await res.json();
                setConfig(updatedConfig);
                alert('Changes saved successfully.');
            }
        } catch (err) {
            console.error("Save error:", err);
            alert('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    if (loading || status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white">
                <div className="size-12 border-4 border-[#1a1a1a]/10 border-t-[#a932bd] rounded-full animate-spin" />
                <p className="text-[#1a1a1a]/40 uppercase tracking-widest text-[10px]">Initializing Maison Dashboard...</p>
            </div>
        );
    }

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard': return <DashboardSection stats={config?.dashboard_stats} />;
            case 'analytics': return <AnalyticsSection />;
            case 'orders': return <OrdersSection />;
            case 'connections': return <ConnectionsSection />;
            case 'media': return <MediaLibrarySection />;
            case 'products': return <ProductsSection />;
            case 'reviews': return <ReviewsSection />;
            case 'settings': return <SiteSettingsSection data={config?.site_settings} onSave={(d: any) => handleSave('site_settings', d)} saving={saving} />;
            case 'hero': return <HeroBannerSection data={config?.hero_banner} onSave={(d: any) => handleSave('hero_banner', d)} saving={saving} />;
            case 'about': return <AboutPageSection data={config?.about_page} onSave={(d: any) => handleSave('about_page', d)} saving={saving} />;
            case 'navigation': return <NavigationSection data={config?.navigation} onSave={(d: any) => handleSave('navigation', d)} saving={saving} />;
            case 'footer': return <FooterSection data={config?.footer} onSave={(d: any) => handleSave('footer', d)} saving={saving} />;
            case 'categories': return <CategoriesSection />;
            case 'collections': return <CollectionsSection />;
            case 'pages': return <PagesSection />;
            case 'theme': return <ThemeDesignSection data={config?.theme_design} onSave={(d: any) => handleSave('theme_design', d)} saving={saving} />;
            case 'checkout': return <CheckoutSection data={config?.checkout_logic} onSave={(d: any) => handleSave('checkout_logic', d)} saving={saving} />;
            case 'seo': return <SeoAnalyticsSection data={config?.seo_analytics} onSave={(d: any) => handleSave('seo_analytics', d)} saving={saving} />;
            case 'notifications': return <NotificationsSection data={config?.notifications} onSave={(d: any) => handleSave('notifications', d)} saving={saving} />;
            case 'peaches': return <PeachesAdminSection />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-white text-[#1a1a1a]">
            {/* Sidebar */}
            <aside className="w-80 border-r border-black/5 flex flex-col pt-24 pb-12 sticky top-0 h-screen overflow-y-auto bg-neutral-50/50 backdrop-blur-xl">
                <div className="px-10 mb-12">
                    <h2 className="text-xl font-light tracking-widest uppercase text-[#1a1a1a]">Admin Panel</h2>
                    <p className="text-[10px] text-[#1a1a1a]/30 tracking-[0.2em] mt-2 font-light">Maison Orchestration v3.0</p>
                </div>

                <nav className="flex-grow space-y-1 px-4">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeSection === section.id
                                ? 'bg-white shadow-sm ring-1 ring-black/5 text-[#a932bd] font-medium'
                                : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 hover:bg-black/5'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{section.icon}</span>
                            <span className="text-[11px] uppercase tracking-widest">{section.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="px-10 pt-12 border-t border-black/5 mt-12">
                    <div className="flex items-center gap-4">
                        <div className="size-8 rounded-full bg-gradient-to-tr from-[#a932bd] to-[#d4af37]" />
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold">Owner Access</p>
                            <p className="text-[10px] text-[#1a1a1a]/40">{session?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-8 text-[10px] uppercase tracking-widest text-[#a932bd] hover:opacity-70 transition-opacity"
                    >
                        Exit to Storefront
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow pt-24 px-16 pb-32 bg-white">
                <div className="max-w-4xl mx-auto">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
}
