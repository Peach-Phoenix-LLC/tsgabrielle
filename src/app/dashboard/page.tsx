"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import KpiCard from '@/components/Admin/KpiCard';
import OrdersTable from '@/components/Admin/OrdersTable';
import ProductsTable from '@/components/Admin/ProductsTable';
import CustomersTable from '@/components/Admin/CustomersTable';
import CustomerProfile from '@/components/Admin/CustomerProfile';

// --- TYPES ---
interface ProductVariant {
    sku: string;
    color?: string;
    size?: string;
    stock: number;
}

interface Product {
    id: string | number;
    title: string;
    catalogue_category: string;
    msrp_display: string;
    media_primary_url?: string;
    variants: any[];
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');

    // Data States
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Detail Views
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    // --- FETCH DATA ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [analyticsRes, productsRes, ordersRes, customersRes] = await Promise.all([
                fetch('/api/analytics').then(r => r.json()),
                fetch('/api/products').then(r => r.json()),
                fetch('/api/orders').then(r => r.json()),
                fetch('/api/customers').then(r => r.json()),
            ]);

            setStats(analyticsRes);
            setProducts(productsRes);
            setOrders(ordersRes);
            setCustomers(customersRes);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading || status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <div className="size-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                <p className="text-white font-bold uppercase tracking-widest text-xs opacity-40">Decrypting Vault...</p>
            </div>
        );
    }

    const getTabTitle = () => {
        const tabs: Record<string, { title: string; desc: string }> = {
            dashboard: { title: 'Business Overview', desc: "Welcome back, here's what's happening today." },
            orders: { title: 'Order Management', desc: 'Track and manage your luxury shipments.' },
            products: { title: 'Product Inventory', desc: 'Manage your high-end fashion catalog.' },
            collections: { title: 'Collections', desc: 'Curate your seasonal fashion lines.' },
            customers: { title: 'Customer Base', desc: 'Manage and analyze your elite clientele.' },
            analytics: { title: 'Performance Insights', desc: 'Data-driven results for your brand.' },
        };
        return tabs[activeTab] || { title: activeTab, desc: '' };
    };

    return (
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">
            <div>
                <h1 className="text-4xl font-light tracking-tight">{getTabTitle().title}</h1>
                <p className="text-white/40 font-serif italic mt-2">{getTabTitle().desc}</p>
            </div>

            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <KpiCard
                                label="Total Sales"
                                value={`$${stats?.totalSales?.toLocaleString() || '0'}`}
                                delta={`+${stats?.growth || 0}%`}
                                icon="payments"
                                variant="purple"
                            />
                            <KpiCard
                                label="Elite Customers"
                                value={stats?.totalCustomers?.toString() || '0'}
                                delta="Live"
                                icon="person_add"
                                variant="blue"
                            />
                            <KpiCard
                                label="Pending Orders"
                                value={stats?.totalOrders?.toString() || '0'}
                                delta="Active"
                                icon="local_shipping"
                                variant="green"
                            />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-sm uppercase tracking-widest font-medium">Recent Activity</h2>
                                <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">View All</button>
                            </div>
                            <div className="p-6">
                                <OrdersTable
                                    orders={orders.slice(0, 5).map(o => ({
                                        id: o.id,
                                        customer: { name: o.firstName ? `${o.firstName} ${o.lastName || ''}` : (o.guestEmail || 'Guest') },
                                        product: o.mainProductName,
                                        date: new Date(o.createdAt).toLocaleDateString(),
                                        total: `$${o.total.toFixed(2)}`,
                                        status: o.status === 'PENDING' ? 'Pending' : o.status === 'PAID' ? 'Processing' : o.status === 'SHIPPED' ? 'Shipped' : 'Delivered'
                                    }))}
                                    onViewAll={() => setActiveTab('orders')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Quick Tools</h3>
                            <button
                                onClick={() => setActiveTab('products')}
                                className="w-full py-4 bg-white text-black text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-200 transition-colors mb-4"
                            >
                                Add New Product
                            </button>
                            <button className="w-full py-4 border border-white/10 text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-white/5 transition-colors">
                                Financial Report
                            </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] relative group">
                            <img
                                src="/images/collections/peach-phoenix.png"
                                alt="Trending"
                                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Seasonal Spotlight</p>
                                <h4 className="text-xl font-light">Peach Phoenix™</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <h2 className="text-2xl font-light">Product Collection</h2>
                        <button className="px-8 py-3 bg-white text-black text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-200 transition-colors">
                            Initialize New Piece
                        </button>
                    </div>
                    <ProductsTable
                        products={products.map(p => {
                            return {
                                id: p.id,
                                image: p.media_primary_url || '/images/placeholder-product.png',
                                name: p.title,
                                collection: 'Atelier',
                                sku: p.variants[0]?.variant_sku || 'N/A',
                                category: p.catalogue_category,
                                price: p.msrp_display,
                                stock: p.variants.length, // approximation
                                status: p.variants.length > 0 ? 'Active' : 'Draft'
                            };
                        })}
                        onEdit={(id) => console.log('Edit', id)}
                        onDelete={(id) => console.log('Delete', id)}
                    />
                </div>
            )}

            {activeTab === 'customers' && (
                <div className="space-y-8">
                    {!selectedCustomerId ? (
                        <CustomersTable
                            customers={customers.map(c => ({
                                id: c.id,
                                name: c.name,
                                email: c.email,
                                lastActive: new Date(c.lastOrder).toLocaleDateString(),
                                tier: c.ltv > 5000 ? 'Platinum' : c.ltv > 2000 ? 'Gold' : 'Silver'
                            }))}
                            onViewProfile={(id) => setSelectedCustomerId(id)}
                        />
                    ) : (
                        <CustomerProfile
                            customer={{
                                id: selectedCustomerId,
                                name: 'Dominique Chen',
                                email: 'dominique@paris.luxury',
                                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT9vy-FMmgpcTQoIuMPxR-IUhY_Luk0_jDP-ieCyHh3svX0pw4oaGSCiOlzMTADN3OjpKfwg-K9vIAveqk1UdLjjIO6sPjvR5bueLuh5V_7QAcN1p48HljkvJwD-AuNDtm8DlDZXiaYf2UlnVpEeFT7eWO7I_Tn_gfAXmjq50Rgt_haVCYzWYX994mgo9UlkBeBK6QMxPciQnJ1Ry-Umzv6No9zzKdR06xhuWRgGVfkQ9qUwtAx1zfw5gsSgomc-E3UJMwtnFf-4-0',
                                tier: 'ELITE',
                                ltv: '$124,500.00',
                                aov: '$8,420.00',
                                orders: 142,
                                joinedDate: 'Jan 12, 2022',
                                bio: 'High-net-worth fashion enthusiast focused on limited edition silk gowns and bespoke accessories.'
                            }}
                            onBack={() => setSelectedCustomerId(null)}
                        />
                    )}
                </div>
            )}

            {['collections', 'orders', 'analytics'].includes(activeTab) && activeTab !== 'dashboard' && (
                <div className="py-20 text-center space-y-4">
                    <p className="text-[40px] opacity-10 font-serif italic">Coming Soon</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-30">This section is currently under curatorial review</p>
                    <button onClick={() => setActiveTab('dashboard')} className="mt-8 text-[10px] uppercase tracking-widest border-b border-white/20 pb-1">Return to Overview</button>
                </div>
            )}
        </div>
    );
}
