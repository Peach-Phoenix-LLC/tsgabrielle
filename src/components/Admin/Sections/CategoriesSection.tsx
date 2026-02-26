"use client";

import React, { useState, useEffect } from 'react';

export default function CategoriesSection() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/crud?type=categories');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingItem.id ? 'update' : 'create';
        const body: any = { type: 'categories', action, data: { ...editingItem } };
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
            body: JSON.stringify({ type: 'categories', action: 'delete', id }),
        });
        fetchData();
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Department Categories</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Manage your high-level store taxonomy.</p>
                </div>
                <button
                    onClick={() => setEditingItem({ name: '', slug: '', description: '', image_url: '', sort_order: 0, seo_title: '', seo_desc: '', is_active: true, is_featured: false })}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 shadow-sm"
                >
                    Add Category
                </button>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <table className="w-full text-left">
                    <thead className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 border-b border-black/10 bg-neutral-50">
                        <tr>
                            <th className="px-8 py-6">Name</th>
                            <th className="px-8 py-6">Slug</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-[#1a1a1a]">
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-black/5 hover:bg-neutral-50 transition-colors">
                                <td className="px-8 py-6 font-medium">{item.name}</td>
                                <td className="px-8 py-6 font-mono text-[#1a1a1a]/40">{item.slug}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                        {item.is_active ? 'Active' : 'Hidden'}
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
                        <h3 className="text-xl font-light uppercase tracking-widest text-[#1a1a1a]">{editingItem.id ? 'Edit' : 'New'} Category</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Name</label>
                                    <input required type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Slug</label>
                                    <input required type="text" value={editingItem.slug} onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Description</label>
                                <textarea rows={2} value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Image URL</label>
                                    <input type="text" value={editingItem.image_url || ''} onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Sort Order</label>
                                    <input type="number" value={editingItem.sort_order || 0} onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                            </div>
                            <div className="bg-neutral-50 border border-black/5 p-4 rounded-xl space-y-4">
                                <h4 className="text-[9px] uppercase tracking-widest font-bold text-[#1a1a1a]">SEO Settings</h4>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">SEO Title</label>
                                    <input type="text" value={editingItem.seo_title || ''} onChange={(e) => setEditingItem({ ...editingItem, seo_title: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">SEO Description</label>
                                    <textarea rows={2} value={editingItem.seo_desc || ''} onChange={(e) => setEditingItem({ ...editingItem, seo_desc: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-8 py-4 px-6 bg-neutral-50 rounded-xl border border-black/5">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" checked={editingItem.is_active} onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })} className="accent-[#a932bd]" />
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Active Status</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" checked={editingItem.is_featured || false} onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })} className="accent-[#a932bd]" />
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Featured Category</label>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-grow py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 transition-all shadow-sm">Save Category</button>
                                <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-4 border border-black/10 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-50 transition-all">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
