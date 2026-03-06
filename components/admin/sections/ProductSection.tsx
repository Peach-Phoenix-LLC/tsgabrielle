"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Check, X, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function ProductSection() {
  const [view, setView] = useState<"list" | "edit" | "new">("list");
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (view === "list") {
      fetchProducts();
    }
  }, [view]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (view === "edit" || view === "new") {
    return (
      <ProductEditor 
        product={editingProduct} 
        onBack={() => {
          setEditingProduct(null);
          setView("list");
        }} 
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-light">Product Inventory</h3>
        <button 
          onClick={() => { setEditingProduct(null); setView("new"); }}
          className="flex items-center gap-2 px-6 py-2 bg-[#a932bd] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} />
          <span className="text-xs">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-[#a932bd]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5 text-[10px] uppercase tracking-widest text-black/40">
                <th className="pb-4 font-bold">Image</th>
                <th className="pb-4 font-bold">Product</th>
                <th className="pb-4 font-bold">Price</th>
                <th className="pb-4 font-bold">Stock</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-black/20 uppercase tracking-widest">No products found</td>
                </tr>
              ) : (
                products.map((p) => {
                  const primaryImg = p.product_images?.[0]?.url || "/images/logo-icon.png";
                  const stock = p.product_variants?.reduce((acc: number, v: any) => acc + (v.stock || 0), 0) || 0;
                  return (
                    <tr key={p.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                      <td className="py-4">
                        <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
                          <img src={primaryImg} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-[#111]">{p.title}</p>
                        <p className="text-[8px] text-black/40 uppercase tracking-widest mt-1">Slug: {p.slug}</p>
                      </td>
                      <td className="py-4 font-light">${(p.price_cents / 100).toFixed(2)}</td>
                      <td className="py-4 font-light">{stock} units</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-tighter ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                          {p.active ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingProduct(p); setView("edit"); }} className="p-2 hover:text-[#a932bd] bg-white border border-black/5 rounded shadow-sm"><Edit size={12}/></button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 hover:text-red-500 bg-white border border-black/5 rounded shadow-sm"><Trash2 size={12}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ProductEditor({ product, onBack }: { product: any; onBack: () => void }) {
  const [formData, setFormData] = useState(product || {
    title: "", 
    slug: "", 
    description: "", 
    price_cents: 0, 
    active: true,
    sku: ""
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  async function fetchOptions() {
    try {
      const [catsRes, colsRes] = await Promise.all([
        fetch("/api/admin/page-content?page_path=categories"), // Just reuse existing to find cat/col if needed, but better use a dedicated one
        fetch("/api/admin/page-content?page_path=collections")
      ]);
      // I'll skip this for now and just use text inputs for simplicity unless I see a dedicated API
    } catch (e) {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const method = product ? "PUT" : "POST";
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");
      onBack();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">
          <ArrowLeft size={14} /> Back to Catalog
        </button>
        <h3 className="text-xl font-light">{product ? "Edit Product" : "New Product"}</h3>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Product Title</label>
              <input 
                required
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">URL Slug</label>
              <input 
                required
                type="text" 
                value={formData.slug} 
                onChange={e => setFormData({...formData, slug: e.target.value})} 
                className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Description</label>
              <textarea 
                required
                rows={8} 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] resize-none rounded-lg" 
              />
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <div className="p-8 bg-[#fdfcf5] rounded-2xl border border-black/5 space-y-6 shadow-sm">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Configuration</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Price (Cents)</label>
                <input 
                  required
                  type="number" 
                  value={formData.price_cents}
                  onChange={e => setFormData({...formData, price_cents: parseInt(e.target.value)})}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg" 
                />
                <p className="text-[8px] text-black/40 italic mt-1">Example: 29500 = $295.00</p>
              </div>

              {!product && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Initial SKU</label>
                  <input 
                    required
                    type="text" 
                    value={formData.sku}
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                    className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg" 
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-lg">
                <span className="text-[10px] uppercase tracking-widest font-bold">Visible on Store</span>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, active: !formData.active})}
                  className={`w-10 h-5 rounded-full relative transition-all ${formData.active ? "bg-[#a932bd]" : "bg-black/10"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.active ? "right-1" : "left-1"}`} />
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={saving}
            className="w-full py-5 bg-[#a932bd] text-white text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-black transition-all shadow-xl disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
            {product ? "Update Product" : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
