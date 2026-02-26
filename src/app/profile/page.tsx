'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { getUserOrdersAction } from '@/app/actions/user';
import { getWishlistItemsAction, toggleWishlistItemAction } from '@/app/actions/wishlist';
import './profile.css';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        if (status === 'authenticated' && session.user) {
            const fetchData = async () => {
                const userId = (session.user as any).id;
                if (!userId) {
                    setLoading(false);
                    return;
                }

                // Fetch actual order history from DB
                const actionResult = await getUserOrdersAction(userId);
                if (actionResult.success && actionResult.orders) {
                    setOrders(actionResult.orders);
                }

                // Fetch wishlist
                const wishlistResult = await getWishlistItemsAction(userId);
                if (wishlistResult.success && wishlistResult.items) {
                    setWishlist(wishlistResult.items);
                }

                setLoading(false);
            };

            fetchData();
        }
    }, [status, session, router]);

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-[#050406] flex items-center justify-center text-white">
                <div className="w-8 h-8 border-4 border-[#a932bd] border-t-transparent flex rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const handleRemoveFromWishlist = async (productId: string) => {
        if (!session?.user) return;
        const userId = (session.user as any).id;
        const result = await toggleWishlistItemAction(userId, productId);
        if (result.success) {
            setWishlist(prev => prev.filter(item => item.product_id !== productId));
        }
    };

    return (
        <div className="bg-[#050406] dark:bg-[#050406] text-neutral-200 min-h-screen font-sans">
            <main className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-12 gap-16">
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="glass-panel p-8 rounded-sm">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8">Personal Account</h3>
                                    <div className="mb-8 p-4 border border-white/5 rounded-sm bg-black/20 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                                            <span className="material-symbols-outlined text-3xl font-light text-white/50">person</span>
                                        </div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-white truncate px-2">{session?.user?.email}</p>
                                        <p className="text-[9px] text-[#a932bd] uppercase tracking-widest mt-2 font-bold">Gold Member</p>
                                    </div>

                                    <nav className="flex flex-col space-y-6">
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className={`flex items-center space-x-4 text-xs uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'sidebar-item-active' : 'text-neutral-500 hover:text-[#a932bd]'}`}
                                        >
                                            <span className="material-symbols-outlined text-lg font-light">inventory_2</span>
                                            <span>Order History</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('wishlist')}
                                            className={`flex items-center space-x-4 text-xs uppercase tracking-widest transition-colors ${activeTab === 'wishlist' ? 'sidebar-item-active' : 'text-neutral-500 hover:text-[#a932bd]'}`}
                                        >
                                            <span className="material-symbols-outlined text-lg font-light">favorite</span>
                                            <span>My Wishlist</span>
                                        </button>
                                        <Link className="flex items-center space-x-4 text-xs uppercase tracking-widest text-neutral-500 hover:text-[#a932bd] transition-colors" href="/profile">
                                            <span className="material-symbols-outlined text-lg font-light">location_on</span>
                                            <span>Saved Addresses</span>
                                        </Link>
                                        <Link className="flex items-center space-x-4 text-xs uppercase tracking-widest text-neutral-500 hover:text-[#a932bd] transition-colors" href="/profile">
                                            <span className="material-symbols-outlined text-lg font-light">settings</span>
                                            <span>Account Settings</span>
                                        </Link>
                                    </nav>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <nav className="flex flex-col space-y-6">
                                        <Link className="flex items-center space-x-4 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors" href="/contact">
                                            <span className="material-symbols-outlined text-lg font-light">help_outline</span>
                                            <span>Support Center</span>
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex w-full items-center space-x-4 text-xs uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg font-light">logout</span>
                                            <span>Sign Out</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <h1 className="text-4xl font-light tracking-tight text-white mb-3">
                                    {activeTab === 'orders' ? 'Order History' : 'My Wishlist'}
                                </h1>
                                <p className="text-sm text-neutral-400 font-light">
                                    {activeTab === 'orders'
                                        ? 'Manage your recent luxury acquisitions and track shipments.'
                                        : 'A curated selection of your most desired pieces.'}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input className="bg-white/5 border border-white/10 rounded text-xs px-4 py-3 w-64 text-white focus:outline-none focus:border-[#a932bd] placeholder:text-neutral-500 placeholder:uppercase placeholder:tracking-widest" placeholder={`Search ${activeTab}...`} type="text" />
                                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-neutral-400 text-lg font-light">search</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activeTab === 'orders' ? (
                                orders.length === 0 ? (
                                    <div className="glass-panel rounded-sm p-12 text-center border border-white/5">
                                        <div className="w-16 h-16 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-neutral-500">shopping_bag</span>
                                        </div>
                                        <h3 className="text-xl font-light text-white mb-2 tracking-tight">No Orders Yet</h3>
                                        <p className="text-xs text-neutral-500 max-w-sm mx-auto uppercase tracking-widest leading-relaxed">Your order history is currently empty. Explore our latest collection.</p>
                                        <Link href="/shop" className="inline-block mt-8 px-8 py-3 bg-[#a932bd] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all rounded-none">Shop Now</Link>
                                    </div>
                                ) : (
                                    orders.flatMap((order: any) =>
                                        order.items.map((item: any, index: number) => {
                                            const date = new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                            return (
                                                <div key={`${order.id}-${index}`} className="glass-panel rounded-sm p-8 transition-all hover:border-white/20">
                                                    <div className="flex flex-col xl:flex-row xl:items-center gap-8">
                                                        <div className="w-28 h-36 flex-shrink-0 bg-white/5 overflow-hidden rounded relative flex items-center justify-center">
                                                            <img alt={item.product?.name || "Product"} className="w-full h-full object-cover opacity-80" src={item.product?.image || "https://placehold.co/400"} />
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center space-x-4 mb-2">
                                                                <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] rounded-sm ${order.status === 'PAID' ? 'bg-[#a932bd] text-white' : 'bg-white/10 text-white'}`}>
                                                                    {order.status}
                                                                </span>
                                                                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Ref #{order.id.split('-')[0].toUpperCase()}</span>
                                                            </div>
                                                            <h4 className="text-xl font-light text-white tracking-tight">{item.product?.name || "Unavailable Product"}</h4>
                                                            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em]">Qty: {item.quantity}</p>
                                                            <p className="text-base font-normal text-white mt-4">${Number(item.price).toFixed(2)}</p>
                                                        </div>
                                                        <div className="flex items-center justify-between xl:flex-col xl:items-end xl:space-y-4 pt-6 xl:pt-0 border-t xl:border-none border-white/10 w-full xl:w-auto">
                                                            <div className="text-left xl:text-right">
                                                                <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-[0.2em] mb-1">Purchased</p>
                                                                <p className="text-xs text-neutral-300 uppercase tracking-widest">{date}</p>
                                                            </div>
                                                            <button className="px-8 py-3 border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:border-white transition-colors rounded-sm">
                                                                {order.status === 'PAID' ? 'Track' : 'Details'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )
                                )
                            ) : (
                                wishlist.length === 0 ? (
                                    <div className="glass-panel rounded-sm p-12 text-center border border-white/5">
                                        <div className="w-16 h-16 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl text-neutral-500">favorite</span>
                                        </div>
                                        <h3 className="text-xl font-light text-white mb-2 tracking-tight">Your Wishlist is Empty</h3>
                                        <p className="text-xs text-neutral-500 max-w-sm mx-auto uppercase tracking-widest leading-relaxed">Save the pieces you love for later.</p>
                                        <Link href="/shop" className="inline-block mt-8 px-8 py-3 bg-[#a932bd] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all rounded-none">Start Exploring</Link>
                                    </div>
                                ) : (
                                    wishlist.map((item: any) => (
                                        <div key={item.id} className="glass-panel rounded-sm p-8 transition-all hover:border-white/20">
                                            <div className="flex flex-col xl:flex-row xl:items-center gap-8">
                                                <Link href={`/products/${item.product.peach_number}`} className="w-28 h-36 flex-shrink-0 bg-white/5 overflow-hidden rounded relative flex items-center justify-center">
                                                    <img
                                                        alt={item.product?.name || "Product"}
                                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform"
                                                        src={item.product?.image_url || (item.product?.images && item.product.images[0]) || "https://placehold.co/400"}
                                                    />
                                                </Link>
                                                <div className="flex-1 space-y-2">
                                                    <h4 className="text-xl font-light text-white tracking-tight">{item.product?.name}</h4>
                                                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em]">{item.product?.category}</p>
                                                    <p className="text-base font-normal text-white mt-4">${Number(item.product?.price).toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between xl:flex-col xl:items-end xl:space-y-4 pt-6 xl:pt-0 border-t xl:border-none border-white/10 w-full xl:w-auto">
                                                    <Link
                                                        href={`/products/${item.product.peach_number}`}
                                                        className="px-8 py-3 bg-[#a932bd] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all rounded-sm text-center"
                                                    >
                                                        View Product
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(item.product.id)}
                                                        className="text-[10px] text-neutral-500 hover:text-red-500 uppercase tracking-widest transition-colors font-bold"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
