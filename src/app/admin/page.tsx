"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.css';

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

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'orders', label: 'Orders', icon: '🛍' },
    { id: 'products', label: 'Products', icon: '👗' },
    { id: 'collections', label: 'Collections', icon: '📁' },
    { id: 'customers', label: 'Customers', icon: '👤' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
];

const STATUS_BADGE: Record<string, string> = {
    Processing: styles.badgeProcessing,
    Shipped: styles.badgeShipped,
    Delivered: styles.badgeDelivered,
    Pending: styles.badgePending,
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [customers, setCustomers] = useState<any[]>([]);

    // --- NEW STATES FOR CRUD ---
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState<Partial<Product>>({
        name: '',
        category: '',
        price: 0,
        variants: []
    });

    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

    const fetchData = async () => {
        if (activeTab === 'dashboard') {
            fetch('/api/analytics')
                .then(r => r.json())
                .then(data => setStats(data))
                .catch(err => console.error(err));
        }
        if (activeTab === 'products') {
            setLoadingProducts(true);
            fetch('/api/products')
                .then(r => r.json())
                .then(data => { setProducts(data); setLoadingProducts(false); })
                .catch(() => setLoadingProducts(false));
        }
        if (activeTab === 'orders') {
            fetch('/api/orders')
                .then(r => r.json())
                .then(data => setOrders(data))
                .catch(err => console.error(err));
        }
        if (activeTab === 'customers') {
            fetch('/api/customers')
                .then(r => r.json())
                .then(data => setCustomers(data))
                .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingProduct ? 'PATCH' : 'POST';
        const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productForm)
            });
            if (res.ok) {
                setIsProductModalOpen(false);
                setEditingProduct(null);
                fetchData();
            }
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            setUpdatingStatusId(orderId);
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchData();
        } catch (err) {
            console.error("Status update error:", err);
        } finally {
            setUpdatingStatusId(null);
        }
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setProductForm(product);
        setIsProductModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setProductForm({ name: '', category: 'Dress', price: 0, variants: [{ sku: '', stock: 0 }] });
        setIsProductModalOpen(true);
    };

    if (status === 'loading') {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loadingSpinner} />
                <p>Verifying credentials...</p>
            </div>
        );
    }

    if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
        router.push('/');
        return null;
    }

    const userName = session.user?.name ?? 'Admin';
    const userInitials = userName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className={styles.shell}>

            {/* ── SIDEBAR ─────────────────────────── */}
            <aside className={styles.sidebar}>
                {/* Logo */}
                <div className={styles.sidebarLogo}>
                    <div className={styles.logoIcon}>◆</div>
                    <span className={styles.logoText}>tsgabrielle<sup>®</sup></span>
                </div>

                {/* Nav */}
                <nav className={styles.sidebarNav}>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* User */}
                <div className={styles.sidebarUser}>
                    <div className={styles.userAvatar}>
                        {session.user?.image
                            ? <img src={session.user.image} alt="" />
                            : <span>{userInitials}</span>
                        }
                        <span className={styles.onlineDot} />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{userName.split(' ')[0]} {userName.split(' ')[1]?.[0]}.</span>
                        <span className={styles.userRole}>Admin</span>
                    </div>
                </div>

                {/* Maintenance Mode Toggle */}
                <div className={styles.maintenanceToggle}>
                    <label className={styles.toggleLabel}>
                        <input
                            type="checkbox"
                            onChange={(e) => {
                                fetch('/api/settings', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ enabled: e.target.checked })
                                });
                            }}
                        />
                        <span className={styles.toggleText}>Maintenance Mode</span>
                    </label>
                </div>
            </aside>

            {/* ── MAIN CONTENT ─────────────────────── */}
            <div className={styles.mainArea}>

                {/* ── DASHBOARD ────────────────────── */}
                {activeTab === 'dashboard' && (
                    <>
                        {/* Top header */}
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}>
                                <h1>Business Overview</h1>
                                <p>Welcome back, here&apos;s what&apos;s happening today.</p>
                            </div>
                            <div className={styles.headerRight}>
                                <div className={styles.searchBox}>
                                    <span className={styles.searchIcon}>🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>
                                <button className={styles.notifBtn}>🔔<span className={styles.notifDot} /></button>
                            </div>
                        </header>

                        <div className={styles.dashboardLayout}>
                            <div className={styles.dashboardMain}>

                                {/* KPI Cards */}
                                <div className={styles.kpiRow}>
                                    <div className={styles.kpiCard}>
                                        <div className={styles.kpiTopRow}>
                                            <div className={`${styles.kpiIconBox} ${styles.kpiIconPurple}`}>💳</div>
                                            <span className={styles.kpiDelta}>+{stats?.growth || 0}%</span>
                                        </div>
                                        <div className={styles.kpiLabel}>Total Sales</div>
                                        <div className={`${styles.kpiValue} ${styles.kpiValuePurple}`}>${stats?.totalSales?.toLocaleString() || '0'}</div>
                                    </div>
                                    <div className={styles.kpiCard}>
                                        <div className={styles.kpiTopRow}>
                                            <div className={`${styles.kpiIconBox} ${styles.kpiIconBlue}`}>👥</div>
                                            <span className={styles.kpiDelta}>Live</span>
                                        </div>
                                        <div className={styles.kpiLabel}>Total Customers</div>
                                        <div className={styles.kpiValue}>{stats?.totalCustomers || '0'}</div>
                                    </div>
                                    <div className={styles.kpiCard}>
                                        <div className={styles.kpiTopRow}>
                                            <div className={`${styles.kpiIconBox} ${styles.kpiIconGreen}`}>📦</div>
                                            <span className={styles.kpiDelta}>Live</span>
                                        </div>
                                        <div className={styles.kpiLabel}>Total Orders</div>
                                        <div className={styles.kpiValue}>{stats?.totalOrders || '0'}</div>
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className={styles.panel}>
                                    <div className={styles.panelHeader}>
                                        <h3>Recent Orders</h3>
                                        <button className={styles.viewAllBtn} onClick={() => setActiveTab('orders')}>View All</button>
                                    </div>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>ORDER ID</th>
                                                <th>CUSTOMER</th>
                                                <th>PRODUCT</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>STATUS</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 5).map(order => (
                                                <tr key={order.id} className={updatingStatusId === order.id ? styles.updating : ''}>
                                                    <td className={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</td>
                                                    <td>
                                                        <div className={styles.customerCell}>
                                                            <span className={styles.miniAvatar}>{(order.firstName?.[0] || order.guestEmail?.[0] || '?').toUpperCase()}</span>
                                                            {order.firstName ? `${order.firstName} ${order.lastName || ''}` : (order.guestEmail || 'Guest')}
                                                        </div>
                                                    </td>
                                                    <td>{order.mainProductName}</td>
                                                    <td className={styles.dateCell}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className={styles.totalCell}>${order.total.toFixed(2)}</td>
                                                    <td>
                                                        <select
                                                            className={`${styles.badge} ${STATUS_BADGE[order.status] ?? ''}`}
                                                            value={order.status}
                                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                            disabled={updatingStatusId === order.id}
                                                        >
                                                            <option value="PENDING">Pending</option>
                                                            <option value="PAID">Paid</option>
                                                            <option value="SHIPPED">Shipped</option>
                                                            <option value="DELIVERED">Delivered</option>
                                                            <option value="CANCELLED">Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td><button className={styles.menuBtn}>⋮</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ── RIGHT PANEL ──────────────────── */}
                            <aside className={styles.rightPanel}>
                                {/* Quick Actions */}
                                <div className={styles.quickActions}>
                                    <h4>Quick Actions</h4>
                                    <button className={styles.addProductBtn} onClick={() => setActiveTab('products')}>
                                        <span>+</span> Add New Product
                                    </button>
                                    <button className={styles.exportBtn}>
                                        <span>↓</span> Export Report
                                    </button>
                                </div>

                                {/* Trending */}
                                <div className={styles.trendingCard}>
                                    <div className={styles.trendingHeader}>
                                        <span className={styles.trendingLabel}>TRENDING NOW</span>
                                        <span className={styles.trendingArrow}>↗</span>
                                    </div>
                                    <div className={styles.trendingImg}>
                                        <div className={styles.trendingOverlay}>
                                            <p className={styles.trendingTitle}>Summer Collection &apos;24</p>
                                            <p className={styles.trendingSub}>245 Sold this week</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                )}

                {/* ── ORDERS TAB ─────────────────────── */}
                {activeTab === 'orders' && (
                    <div className={styles.tabContent}>
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}><h1>Orders</h1><p>Manage all customer orders.</p></div>
                        </header>
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}><h3>All Orders</h3></div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ORDER ID</th><th>CUSTOMER</th><th>TOTAL</th>
                                        <th>DATE</th><th>STATUS</th><th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order.id}>
                                            <td className={styles.orderId}>#{order.id.slice(-6).toUpperCase()}</td>
                                            <td>
                                                <div className={styles.customerCell}>
                                                    <span className={styles.miniAvatar}>{(order.firstName?.[0] || order.guestEmail?.[0] || '?').toUpperCase()}</span>
                                                    {order.firstName ? `${order.firstName} ${order.lastName}` : (order.guestEmail || 'Guest')}
                                                </div>
                                            </td>
                                            <td className={styles.totalCell}>${order.total.toFixed(2)}</td>
                                            <td className={styles.dateCell}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td><span className={`${styles.badge} ${STATUS_BADGE[order.status] ?? ''}`}>{order.status}</span></td>
                                            <td><button className={styles.menuBtn}>⋮</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── PRODUCTS TAB ─────────────────────── */}
                {activeTab === 'products' && (
                    <div className={styles.tabContent}>
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}><h1>Products</h1><p>Manage your product catalog.</p></div>
                            <button className={styles.addProductBtn} onClick={openCreateModal}>+ Add New Product</button>
                        </header>
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}><h3>All Products <span className={styles.count}>{products.length}</span></h3></div>
                            {loadingProducts ? (
                                <div className={styles.tableLoading}>Loading from Cloud SQL...</div>
                            ) : (
                                <table className={styles.table}>
                                    <thead>
                                        <tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>VARIANTS</th><th></th></tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => {
                                            const totalStock = p.variants.reduce((a, v) => a + v.stock, 0);
                                            return (
                                                <tr key={p.id}>
                                                    <td className={styles.productName}>{p.name}</td>
                                                    <td><span className={styles.categoryTag}>{p.category}</span></td>
                                                    <td>${p.price.toFixed(2)}</td>
                                                    <td><span className={totalStock < 30 ? styles.stockLow : styles.stockOk}>{totalStock}</span></td>
                                                    <td>{p.variants.length}</td>
                                                    <td>
                                                        <button className={styles.editBtn} onClick={() => openEditModal(p)}>Edit</button>
                                                        <button className={styles.deleteBtnSecondary} onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'customers' && (
                    <div className={styles.tabContent}>
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}><h1>Customers</h1><p>Manage your user base.</p></div>
                        </header>
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}><h3>All Customers <span className={styles.count}>{customers.length}</span></h3></div>
                            <table className={styles.table}>
                                <thead>
                                    <tr><th>NAME</th><th>EMAIL</th><th>LAST ACTIVE</th><th>ACTIONS</th></tr>
                                </thead>
                                <tbody>
                                    {customers.map(c => (
                                        <tr key={c.id}>
                                            <td>
                                                <div className={styles.customerCell}>
                                                    <span className={styles.miniAvatar}>{c.name[0]}</span>
                                                    {c.name}
                                                </div>
                                            </td>
                                            <td>{c.email}</td>
                                            <td className={styles.dateCell}>{new Date(c.lastOrder).toLocaleDateString()}</td>
                                            <td><button className={styles.editBtn}>View Profile</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className={styles.tabContent}>
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}><h1>Analytics</h1><p>Performance insights from Cloud SQL.</p></div>
                        </header>
                        <div className={styles.dashboardLayout}>
                            <div className={styles.panel}>
                                <div className={styles.panelHeader}><h3>Sales Performance</h3></div>
                                <div className={styles.kpiRow}>
                                    <div className={styles.kpiCard}>
                                        <div className={styles.kpiLabel}>Recent Sales (30d)</div>
                                        <div className={styles.kpiValue}>${stats?.recentSales?.toLocaleString() || '0'}</div>
                                    </div>
                                    <div className={styles.kpiCard}>
                                        <div className={styles.kpiLabel}>Avg. Order Value</div>
                                        <div className={styles.kpiValue}>${stats?.totalOrders ? (stats.totalSales / stats.totalOrders).toFixed(2) : '0'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {['collections'].includes(activeTab) && (
                    <div className={styles.tabContent}>
                        <header className={styles.pageHeader}>
                            <div className={styles.pageTitle}>
                                <h1>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h1>
                                <p>Coming soon — live data synced from the database.</p>
                            </div>
                        </header>
                        <div className={styles.panel}>
                            <div className={styles.emptyState}>
                                <span>{NAV_ITEMS.find(n => n.id === activeTab)?.icon}</span>
                                <p>This section is ready for data.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── PRODUCT MODAL ───────────────────────── */}
            {isProductModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <header className={styles.modalHeader}>
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button className={styles.closeBtn} onClick={() => setIsProductModalOpen(false)}>×</button>
                        </header>
                        <form onSubmit={handleSaveProduct} className={styles.modalBody}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Product Name</label>
                                    <input
                                        className={styles.input}
                                        value={productForm.name}
                                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Category</label>
                                    <select
                                        className={styles.select}
                                        value={productForm.category}
                                        onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                    >
                                        <option value="Dress">Dress</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Footwear">Footwear</option>
                                        <option value="Outerwear">Outerwear</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={productForm.price}
                                        onChange={e => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Base Image URL</label>
                                    <input
                                        className={styles.input}
                                        value={productForm.imageUrl}
                                        onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                    />
                                </div>
                                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                    <label>Variants (SKU - Stock)</label>
                                    <div className={styles.variantSection}>
                                        {productForm.variants?.map((v, i) => (
                                            <div key={i} className={styles.variantRow}>
                                                <input
                                                    placeholder="SKU"
                                                    className={styles.input}
                                                    value={v.sku}
                                                    onChange={e => {
                                                        const newVar = [...(productForm.variants || [])];
                                                        newVar[i].sku = e.target.value;
                                                        setProductForm({ ...productForm, variants: newVar });
                                                    }}
                                                />
                                                <input
                                                    placeholder="Stock"
                                                    type="number"
                                                    className={styles.input}
                                                    value={v.stock}
                                                    onChange={e => {
                                                        const newVar = [...(productForm.variants || [])];
                                                        newVar[i].stock = parseInt(e.target.value);
                                                        setProductForm({ ...productForm, variants: newVar });
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className={styles.removeVariantBtn}
                                                    onClick={() => {
                                                        const newVar = productForm.variants?.filter((_, index) => index !== i);
                                                        setProductForm({ ...productForm, variants: newVar });
                                                    }}
                                                >×</button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className={styles.addVariantBtn}
                                            onClick={() => setProductForm({ ...productForm, variants: [...(productForm.variants || []), { sku: '', stock: 0 }] })}
                                        >+ Add Variant</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsProductModalOpen(false)}>Cancel</button>
                                <button type="submit" className={styles.saveBtn}>Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}
