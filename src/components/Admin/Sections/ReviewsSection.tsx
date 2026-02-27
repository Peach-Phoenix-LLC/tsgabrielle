"use client";

import React, { useState, useEffect } from 'react';

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/reviews');
            const data = await res.json();
            if (Array.isArray(data)) setReviews(data);
        } catch (e) {
            console.error("Failed to load reviews", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch('/api/admin/reviews', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) fetchReviews();
        } catch (e) {
            console.error(e);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently delete this review?')) return;
        try {
            const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchReviews();
        } catch (e) {
            console.error(e);
            alert('Failed to delete review');
        }
    };

    // Calculate stars component
    const renderStars = (rating: number) => {
        return (
            <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">
                        {i < rating ? 'star' : 'star_border'}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-12 bg-white text-[#1a1a1a]">
            <div>
                <h2 className="text-3xl font-light tracking-tight">Customer Reviews</h2>
                <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage public testimonials, UGC, and rating content.</p>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="size-8 border-2 border-black/10 border-t-[#a932bd] rounded-full animate-spin" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="p-20 border border-black/10 rounded-2xl bg-neutral-50 text-center space-y-4">
                    <span className="material-symbols-outlined text-4xl text-[#1a1a1a]/20">forum</span>
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">No Reviews Yet</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((rw) => (
                        <div key={rw.id} className="p-8 bg-neutral-50 border border-black/10 rounded-2xl flex gap-8">

                            {/* Product Info Col */}
                            <div className="w-1/4 space-y-4 border-r border-black/5 pr-8">
                                <div className="aspect-square bg-white rounded-xl border border-black/5 overflow-hidden">
                                    <img src={rw.product?.media_primary_url || '/placeholder.png'} alt={rw.product?.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold truncate uppercase tracking-widest">{rw.product?.title}</p>
                                    <p className="text-[10px] text-black/40 mt-1">ID: {rw.product?.id}</p>
                                </div>
                            </div>

                            {/* Review Content Col */}
                            <div className="w-1/2 space-y-4">
                                <div className="flex justify-between items-start">
                                    {renderStars(rw.rating)}
                                    <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${rw.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                            rw.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                'bg-amber-100 text-amber-700'
                                        }`}>
                                        {rw.status}
                                    </span>
                                </div>

                                {rw.title && <h4 className="font-serif font-bold text-lg">{rw.title}</h4>}
                                <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">{rw.body}</p>

                                {rw.image_url && (
                                    <div className="pt-4">
                                        <p className="text-[10px] uppercase text-black/40 mb-2">Attached Image</p>
                                        <a href={rw.image_url} target="_blank" rel="noreferrer">
                                            <img src={rw.image_url} alt="User submission" className="w-24 h-24 object-cover rounded-lg border border-black/10 hover:opacity-80 transition-opacity" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Actions & Meta Col */}
                            <div className="w-1/4 pl-8 border-l border-black/5 space-y-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Reviewer</p>
                                        <p className="text-xs truncate">{rw.profile?.full_name || 'Verified Buyer'}</p>
                                        <p className="text-[10px] text-black/40 truncate">{rw.profile?.email || 'Guest'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Metadata</p>
                                        <p className="text-[10px] text-black/40 mt-1">Date: {new Date(rw.created_at).toLocaleDateString()}</p>
                                        <p className="text-[10px] text-black/40 truncate">Order: {rw.order?.id || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {rw.status !== 'APPROVED' && (
                                        <button onClick={() => handleUpdateStatus(rw.id, 'APPROVED')} className="w-full py-3 bg-[#a932bd] text-white text-[9px] uppercase font-bold tracking-widest rounded-full hover:bg-[#8b1a9b] transition-all">
                                            Approve
                                        </button>
                                    )}
                                    {rw.status !== 'REJECTED' && (
                                        <button onClick={() => handleUpdateStatus(rw.id, 'REJECTED')} className="w-full py-3 border border-black/10 text-black text-[9px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-100 transition-all">
                                            Reject
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(rw.id)} className="w-full py-3 text-red-600 text-[9px] uppercase font-bold tracking-widest hover:bg-red-50 rounded-full transition-all">
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
