"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, Save, X } from "lucide-react";

export default function CategorySection() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setItems(data);
    } catch (e) {} finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...formData, id: editingItem.id } : formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditingItem(null);
      setFormData({ name: "", slug: "", description: "" });
      fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    try {
      await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch (e) {}
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#a932bd]" /></div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h3 className="text-xl font-light">Store Categories</h3>
        {!editingItem && (
          <button 
            onClick={() => { setEditingItem({ new: true }); setFormData({ name: "", slug: "", description: "" }); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-black transition-all"
          >
            <Plus size={14} /> New Category
          </button>
        )}
      </header>

      {editingItem && (
        <form onSubmit={handleSubmit} className="bg-[#fdfcf5] p-8 rounded-2xl border border-black/5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold">Name</label>
              <input 
                required
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white border border-black/10 px-3 py-2 text-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold">Slug</label>
              <input 
                required
                value={formData.slug} 
                onChange={e => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-white border border-black/10 px-3 py-2 text-xs outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold">Description</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white border border-black/10 px-3 py-2 text-xs outline-none resize-none"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-black text-white text-[10px] uppercase font-bold hover:bg-[#a932bd] transition-all">
              <Save size={12} /> Save
            </button>
            <button type="button" onClick={() => setEditingItem(null)} className="flex items-center gap-2 px-6 py-2 border border-black/10 text-[10px] uppercase font-bold hover:bg-gray-100 transition-all">
              <X size={12} /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-6 bg-white border border-black/5 rounded-xl hover:shadow-sm transition-all group">
            <div>
              <p className="font-medium text-[#111]">{item.name}</p>
              <p className="text-[8px] text-black/40 uppercase tracking-widest mt-1">Slug: {item.slug}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { setEditingItem(item); setFormData({ name: item.name, slug: item.slug, description: item.description || "" }); }}
                className="p-2 hover:text-[#a932bd] bg-gray-50 rounded"
              >
                <Edit size={12} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 hover:text-red-500 bg-gray-50 rounded">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
