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

                const actionResult = await getUserOrdersAction(userId);
                if (actionResult.success && actionResult.orders) {
                    setOrders(actionResult.orders);
                }

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
            <div className="min-h-screen bg-white flex items-center justify-center text-primary">
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
        <div className="bg-white text-[#1a1a1a] min-h-screen font-sans">
            <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">
                <div className="grid grid-cols-12 gap-16">
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="bg-neutral-50 border border-black/5 p-8 rounded-3xl">
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/40 mb-8">Personal Account</h3>
                                    <div className="mb-8 p-6 border border-black/5 rounded-2xl bg-white text-center shadow-sm">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden border border-black/5">
                                            <span className="material-symbols-outlined text-4xl font-extralight text-[#1a1a1a]/20">person</span>
                                        </div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] truncate px-2">{session?.user?.email}</p>
                                        <p className="text-[9px] text-[#a932bd] uppercase tracking-[0.3em] mt-2 font-bold">Maison Member</p>
                                    </div>

                                    <nav className="flex flex-col space-y-4">
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className={`flex items-center space-x-4 py-3 px-4 rounded-xl text-[10px] uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-white shadow-lg' : 'text-[#1a1a1a]/40 hover:bg-neutral-100 hover:text-[#1a1a1a]'}`}
                                        >
                                            <span className="material-symbols-outlined text-lg">inventory_2</span>
                                            <span>Order History</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('wishlist')}
                                            className={`flex items-center space-x-4 py-3 px-4 rounded-xl text-[10px] uppercase tracking-widest transition-all ${activeTab === 'wishlist' ? 'bg-white text-white shadow-lg' : 'text-[#1a1a1a]/40 hover:bg-neutral-100 hover:text-[#1a1a1a]'}`}
                                        >
                                            <span className="material-symbols-outlined text-lg">favorite</span>
                                            <span>My Wishlist</span>
                                        </button>
                                        <Link className="flex items-center space-x-4 py-3 px-4 rounded-xl text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 hover:bg-neutral-100 hover:text-[#1a1a1a] transition-all" href="/profile">
                                            <span className="material-symbols-outlined text-lg">location_on</span>
                                            <span>Addresses</span>
                                        </Link>
                                        <Link className="flex items-center space-x-4 py-3 px-4 rounded-xl text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 hover:bg-neutral-100 hover:text-[#1a1a1a] transition-all" href="/profile">
                                            <span className="material-symbols-outlined text-lg">settings</span>
                                            <span>Settings</span>
                                        </Link>
                                    </nav>
                                </div>

                                <div className="pt-8 border-t border-black/5">
                                    <nav className="flex flex-col space-y-4">
                                        <Link className="flex items-center space-x-4 py-3 px-4 text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors" href="/contact">
                                            <span className="material-symbols-outlined text-lg">help_outline</span>
                                            <span>Support</span>
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex w-full items-center space-x-4 py-3 px-4 text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 hover:text-red-600 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">logout</span>
                                            <span>Sign Out</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold">Maison Profil</span>
                                <h1 className="text-5xl font-extralight tracking-tighter text-[#1a1a1a]">
                                    {activeTab === 'orders' ? 'Acquisitions' : 'Le Wishlist'}
                                </h1>
                                <p className="text-sm text-[#1a1a1a]/40 font-light max-w-md">
                                    {activeTab === 'orders'
                                        ? 'Review your curated collection of tsgabrielle® acquisitions.'
                                        : 'A private curation of your next potential acquisitions.'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {activeTab === 'orders' ? (
                                orders.length === 0 ? (
                                    <div className="bg-neutral-50 rounded-[2rem] p-20 text-center border border-black/5">
                                        <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-3xl text-[#1a1a1a]/20">shopping_bag</span>
                                        </div>
                                        <h3 className="text-2xl font-light text-[#1a1a1a] mb-3">No Acquisitions Found</h3>
                                        <p className="text-[10px] text-[#1a1a1a]/40 max-w-xs mx-auto uppercase tracking-widest leading-relaxed font-bold">Your wardrobe is ready for its first tsgabrielle® masterpiece.</p>
                                        <Link href="/shop" className="inline-block mt-10 px-12 py-4 bg-white text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all rounded-full shadow-lg">Begin Exploring</Link>
                                    </div>
                                ) : (
                                    orders.flatMap((order: any) =>
                                        order.items.map((item: any, index: number) => {
                                            const date = new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                                            return (
                                                <div key={`${order.id}-${index}`} className="bg-white border border-black/5 rounded-[2rem] p-8 transition-all hover:shadow-xl hover:border-transparent group">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-10">
                                                        <div className="w-32 h-44 flex-shrink-0 bg-neutral-50 overflow-hidden rounded-2xl relative border border-black/5">
                                                            <img alt={item.product?.name || "Product"} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" src={item.product?.image || item.product?.image_url || "https://placehold.co/400"} />
                                                        </div>
                                                        <div className="flex-1 space-y-4">
                                                            <div className="flex items-center gap-4">
                                                                <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full ${order.status === 'PAID' ? 'bg-white/10 text-[#a932bd]' : 'bg-neutral-100 text-[#1a1a1a]/40'}`}>
                                                                    {order.status}
                                                                </span>
                                                                <span className="text-[10px] text-[#1a1a1a]/20 uppercase tracking-widest font-mono">#{order.id.split('-')[0].toUpperCase()}</span>
                                                            </div>
                                                            <h4 className="text-2xl font-extralight text-[#1a1a1a] tracking-tight">{item.product?.name || "Maison Piece"}</h4>
                                                            <div className="flex items-center gap-6">
                                                                <div>
                                                                    <p className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/30 font-bold mb-1">Acquired on</p>
                                                                    <p className="text-xs text-[#1a1a1a] font-medium">{date}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/30 font-bold mb-1">Quantity</p>
                                                                    <p className="text-xs text-[#1a1a1a] font-medium">{item.quantity}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/30 font-bold mb-1">Investment</p>
                                                                    <p className="text-xs text-[#1a1a1a] font-medium">${Number(item.price).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row md:flex-col gap-4">
                                                            <button className="flex-grow px-8 py-4 bg-neutral-50 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-white transition-all rounded-xl border border-black/5">Details</button>
                                                            <button className="flex-grow px-8 py-4 border border-black/10 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all rounded-xl">Invoices</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )
                                )
                            ) : (
                                wishlist.length === 0 ? (
                                    <div className="bg-neutral-50 rounded-[2rem] p-20 text-center border border-black/5">
                                        <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-3xl text-[#1a1a1a]/20">heart_plus</span>
                                        </div>
                                        <h3 className="text-2xl font-light text-[#1a1a1a] mb-3">La Curated Wishlist is Empty</h3>
                                        <p className="text-[10px] text-[#1a1a1a]/40 max-w-xs mx-auto uppercase tracking-widest leading-relaxed font-bold">Capture the essence of pieces you desire for your Maison collection.</p>
                                        <Link href="/shop" className="inline-block mt-10 px-12 py-4 bg-white text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all rounded-full shadow-lg">Discover Collection</Link>
                                    </div>
                                ) : (
                                    wishlist.map((item: any) => (
                                        <div key={item.id} className="bg-white border border-black/5 rounded-[2rem] p-8 transition-all hover:shadow-xl hover:border-transparent group">
                                            <div className="flex flex-col md:flex-row md:items-center gap-10">
                                                <Link href={`/${item.product.peach_number}`} className="w-32 h-44 flex-shrink-0 bg-neutral-50 overflow-hidden rounded-2xl relative border border-black/5">
                                                    <img
                                                        alt={item.product?.name || "Product"}
                                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
                                                        src={item.product?.image_url || (item.product?.images && item.product.images[0]) || "https://placehold.co/400"}
                                                    />
                                                </Link>
                                                <div className="flex-1 space-y-3">
                                                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#a932bd] font-bold">{item.product?.category || 'Collection'}</span>
                                                    <h4 className="text-3xl font-extralight text-[#1a1a1a] tracking-tight">{item.product?.name}</h4>
                                                    <p className="text-lg font-medium text-[#1a1a1a]">${Number(item.product?.price).toFixed(2)}</p>
                                                </div>
                                                <div className="flex flex-row md:flex-col gap-4">
                                                    <Link
                                                        href={`/${item.product.peach_number}`}
                                                        className="flex-grow px-10 py-4 bg-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xl text-center shadow-lg"
                                                    >
                                                        Acquire Now
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(item.product.id)}
                                                        className="flex-grow px-10 py-4 border border-black/10 text-[10px] text-[#1a1a1a]/40 hover:text-red-600 uppercase tracking-widest transition-all font-bold rounded-xl"
                                                    >
                                                        Retirer
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

