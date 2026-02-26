"use client";

import React, { useState, useEffect } from 'react';

export default function CollectionsSection() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/crud?type=collections');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingItem.id ? 'update' : 'create';
        const body: any = { type: 'collections', action, data: { ...editingItem } };
        if (editingItem.id) {
            body.id = editingItem.id;
            delete body.data.id;
            delete body.data.created_at;
            delete body.data.updated_at;
        }

        const res = await fetch('/api/admin/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            setEditingItem(null);
            fetchData();
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        await fetch('/api/admin/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'collections', action: 'delete', id }),
        });
        fetchData();
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Curated Collections</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage thematic groupings and seasonal releases.</p>
                </div>
                <button
                    onClick={() => setEditingItem({ name: '', slug: '', description: '', badge: '', is_active: true, is_featured: false })}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 shadow-sm"
                >
                    Add Collection
                </button>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <table className="w-full text-left">
                    <thead className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 border-b border-black/10 bg-neutral-50">
                        <tr>
                            <th className="px-8 py-6">Name</th>
                            <th className="px-8 py-6">Badge</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-[#1a1a1a]">
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-black/5 hover:bg-neutral-50 transition-colors">
                                <td className="px-8 py-6 font-medium">{item.name}</td>
                                <td className="px-8 py-6">
                                    {item.badge ? <span className="px-2 py-0.5 border border-[#d4af37] text-[#d4af37] text-[8px] uppercase tracking-widest rounded-sm">{item.badge}</span> : <span className="opacity-20">—</span>}
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest ${item.is_active ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                        {item.is_active ? 'Active' : 'Archived'}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right space-x-4">
                                    <button onClick={() => setEditingItem(item)} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-[10px] uppercase tracking-widest text-red-600 opacity-40 hover:opacity-100 transition-opacity">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-white border border-black/10 w-full max-w-xl rounded-3xl p-10 space-y-8 shadow-2xl ring-1 ring-black/5">
                        <h3 className="text-xl font-light uppercase tracking-widest text-[#1a1a1a] font-light">{editingItem.id ? 'Edit' : 'New'} Collection</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Name</label>
                                    <input required type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Slug</label>
                                    <input required type="text" value={editingItem.slug} onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Badge (optional)</label>
                                    <input type="text" value={editingItem.badge || ''} onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })} placeholder="e.g. LIMITED" className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#a932bd] text-[#1a1a1a] placeholder:opacity-30" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Status</label>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setEditingItem({ ...editingItem, is_active: !editingItem.is_active })} className={`flex-grow py-3 rounded-xl border text-[9px] uppercase tracking-widest transition-all ${editingItem.is_active ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-neutral-50 border-black/5 text-[#1a1a1a]/40'}`}>
                                            {editingItem.is_active ? 'Active' : 'Archived'}
                                        </button>
                                        <button type="button" onClick={() => setEditingItem({ ...editingItem, is_featured: !editingItem.is_featured })} className={`flex-grow py-3 rounded-xl border text-[9px] uppercase tracking-widest transition-all ${editingItem.is_featured ? 'bg-amber-100 border-amber-200 text-amber-700 font-bold' : 'bg-neutral-50 border-black/5 text-[#1a1a1a]/40'}`}>
                                            Featured
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-grow py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 shadow-sm transition-all">Save Collection</button>
                                <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-4 border border-black/10 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-50 transition-all">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
