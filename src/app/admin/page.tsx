"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
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
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl?: string;
    variants: ProductVariant[];
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

    // --- AUTH CHECK ---
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#f7f6f8] gap-4">
                <div className="size-12 border-4 border-[#a932bd]/10 border-t-[#a932bd] rounded-full animate-spin" />
                <p className="text-[#a932bd] font-bold uppercase tracking-widest text-xs">Accessing Vault...</p>
            </div>
        );
    }

    if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
        router.push('/');
        return null;
    }

    // --- HELPERS ---
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

    // --- RENDERERS ---
    return (
        <div className="flex h-screen w-full bg-[#f7f6f8] text-slate-900 overflow-hidden font-sans antialiased">
            <AdminSidebar activeTab={activeTab} setActiveTab={(tab) => {
                setActiveTab(tab);
                setSelectedCustomerId(null);
            }} />

            <main className="flex-1 overflow-y-auto relative z-10 flex flex-col">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#a932bd]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <div className="p-8 lg:p-12 max-w-[1600px] mx-auto w-full flex flex-col gap-8">
                    <AdminHeader
                        title={getTabTitle().title}
                        description={getTabTitle().desc}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 flex flex-col gap-8">
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

                            <aside className="w-full lg:w-80 flex flex-col gap-6">
                                <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-2xl shadow-purple-500/5">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">Quick Actions</h3>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => setActiveTab('products')}
                                            className="w-full py-4 bg-[#a932bd] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Add New Product
                                        </button>
                                        <button className="w-full py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-[#a932bd] hover:text-[#a932bd] transition-all">
                                            Export Financials
                                        </button>
                                    </div>
                                </div>

                                <div className="relative group bg-slate-900 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                                    <img
                                        src="/images/collections/peach-phoenix.png"
                                        alt="Trending Collection"
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a932bd] mb-2">Trending Now</span>
                                        <h4 className="text-white text-xl font-bold mb-1">Peach Phoenix™</h4>
                                        <p className="text-white/60 text-xs">245 Units Sold This Week</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Inventory</h3>
                                <div className="flex gap-3">
                                    <button className="px-6 py-3 bg-[#a932bd] text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-purple-500/20 hover:translate-y-[-2px] transition-all">
                                        + New Piece
                                    </button>
                                </div>
                            </div>
                            <ProductsTable
                                products={products.map(p => {
                                    const totalStock = p.variants.reduce((a, v) => a + v.stock, 0);
                                    return {
                                        id: p.id,
                                        image: p.imageUrl || '/images/placeholder-product.png',
                                        name: p.name,
                                        collection: 'Main Collection',
                                        sku: p.variants[0]?.sku || 'N/A',
                                        category: p.category,
                                        price: `$${p.price.toFixed(2)}`,
                                        stock: totalStock,
                                        status: totalStock > 20 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock'
                                    };
                                })}
                                onEdit={(id) => console.log('Edit', id)}
                                onDelete={(id) => console.log('Delete', id)}
                            />
                        </div>
                    )}

                    {/* Customers Tab */}
                    {activeTab === 'customers' && (
                        <div className="flex flex-col gap-6">
                            {!selectedCustomerId ? (
                                <>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Elite Members</h3>
                                    </div>
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
                                </>
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

                    {/* Coming Soon Tabs */}
                    {['collections', 'orders', 'analytics'].includes(activeTab) && activeTab !== 'dashboard' && (
                        <div className="flex flex-col items-center justify-center py-40 gap-6">
                            <span className="material-symbols-outlined text-[100px] text-[#a932bd]/20">construction</span>
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Vault Detail in Production</h3>
                                <p className="text-slate-500 mt-2">The high-fidelty data sync for this module is currently being finalized.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
