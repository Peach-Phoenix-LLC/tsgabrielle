"use client";

import React, { useState, useEffect } from 'react';

export default function ProductReviews({ productId }: { productId: number }) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, average: '0.0' });
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    // Check local storage so they don't spam reviews easily
    const [submitted, setSubmitted] = useState(false);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?product_id=${productId}`);
            const data = await res.json();
            if (data.reviews) {
                setReviews(data.reviews);
                setStats(data.stats);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        if (localStorage.getItem(`reviewed_${productId}`)) {
            setSubmitted(true);
        }
    }, [productId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', `review-${productId}-${Date.now()}`);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                setImageUrl(data.url);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (e) {
            console.error(e);
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !content) return;

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: productId,
                    rating,
                    title,
                    content,
                    image_url: imageUrl
                })
            });

            if (res.ok) {
                setSubmitted(true);
                setShowForm(false);
                localStorage.setItem(`reviewed_${productId}`, 'true');
                alert('Thank you! Your review has been submitted and is pending approval.');
            }
        } catch (e) {
            console.error(e);
            alert('Failed to submit review');
        }
    };

    const renderStars = (count: number) => {
        return (
            <div className="flex text-[#d4af37]">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">
                        {i < count ? 'star' : 'star_border'}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <section className="py-24 border-t border-black/5 bg-white text-[#1a1a1a]" id="reviews">
            <div className="max-w-5xl mx-auto px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-light tracking-tight">Client Testimonials</h2>
                        <div className="flex items-center gap-4 mt-4">
                            {renderStars(Math.round(parseFloat(stats.average)))}
                            <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold">
                                {stats.average} Average • {stats.total} Reviews
                            </p>
                        </div>
                    </div>
                    {!submitted && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-10 py-4 border border-[#a932bd] text-[#a932bd] text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-[#a932bd] hover:text-white transition-all shadow-sm"
                        >
                            {showForm ? 'Cancel Review' : 'Write a Review'}
                        </button>
                    )}
                </div>

                {showForm && !submitted && (
                    <form onSubmit={handleSubmit} className="mb-20 p-10 bg-neutral-50 rounded-3xl border border-black/5 space-y-8 shadow-sm">
                        <h3 className="text-xl font-serif">Share Your Experience</h3>

                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Overall Rating</label>
                            <div className="flex gap-2 text-[#d4af37]">
                                {[1, 2, 3, 4, 5].map(v => (
                                    <button key={v} type="button" onClick={() => setRating(v)} className="material-symbols-outlined text-3xl hover:scale-110 transition-transform">
                                        {v <= rating ? 'star' : 'star_border'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Review Title</label>
                            <input
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-6 py-4 bg-white border border-black/10 rounded-xl focus:border-[#a932bd] outline-none text-sm shadow-sm"
                                placeholder="Summarize your thoughts..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Your Review</label>
                            <textarea
                                required
                                rows={4}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="w-full px-6 py-4 bg-white border border-black/10 rounded-xl focus:border-[#a932bd] outline-none text-sm resize-none shadow-sm"
                                placeholder="Tell us about the quality, fit, and elegance..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Attach Photo (Optional)</label>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer px-6 py-3 border border-black/10 text-xs font-bold rounded-full hover:bg-neutral-100 transition-colors shadow-sm">
                                    {uploading ? 'Uploading...' : 'Choose Image'}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                                </label>
                                {imageUrl && <img src={imageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-black/10 shadow-sm" />}
                            </div>
                        </div>

                        <button type="submit" className="w-full py-4 bg-[#a932bd] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-[#8b1a9b] transition-colors shadow-md hover:shadow-lg">
                            Submit for Approval
                        </button>
                    </form>
                )}

                {loading ? (
                    <div className="flex justify-center py-10 opacity-50">
                        <div className="size-6 border-2 border-[#1a1a1a]/20 border-t-[#a932bd] rounded-full animate-spin" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-black/5 shadow-sm">
                        <span className="material-symbols-outlined text-4xl text-[#1a1a1a]/20 mb-4">rate_review</span>
                        <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Be the first to leave a review</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.map(rw => (
                            <div key={rw.id} className="p-8 bg-neutral-50 rounded-3xl border border-black/5 hover:border-[#a932bd]/30 transition-colors shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 bg-gradient-to-tr from-[#a932bd] to-[#d4af37] rounded-full flex items-center justify-center text-white font-serif text-lg shadow-inner">
                                            {(rw.profile?.full_name || 'V')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest">{rw.profile?.full_name || 'Verified Customer'}</p>
                                            <p className="text-[10px] text-[#1a1a1a]/40">{new Date(rw.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    {renderStars(rw.rating)}
                                </div>
                                <h4 className="font-serif font-bold text-lg mb-4">{rw.title}</h4>
                                <p className="text-sm font-light leading-relaxed text-[#1a1a1a]/70 whitespace-pre-wrap">{rw.body}</p>

                                {rw.image_url && (
                                    <div className="mt-6">
                                        <img src={rw.image_url} alt="Review attachment" className="rounded-xl w-32 h-32 object-cover border border-black/10 shadow-sm hover:scale-105 transition-transform" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
