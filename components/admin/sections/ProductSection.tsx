"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Check, X, ArrowLeft } from "lucide-react";

export default function ProductSection() {
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const mockProducts = [
    { id: 1, title: "Pink Flamingo Noir Jacket", price: 29500, stock: 12, active: true },
    { id: 2, title: "Crystal Skies Silk Scarf", price: 8500, stock: 45, active: true },
  ];

  if (view === "edit") return <ProductEditor product={editingProduct} onBack={() => setView("list")} />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif">Catalog Management</h3>
        <button 
          onClick={() => { setEditingProduct(null); setView("edit"); }}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#a932bd] transition-all"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black/5 text-[10px] uppercase tracking-widest text-black/40">
              <th className="pb-4 font-bold">Product</th>
              <th className="pb-4 font-bold">Price</th>
              <th className="pb-4 font-bold">Stock</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {mockProducts.map((p) => (
              <tr key={p.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                <td className="py-4 font-medium">{p.title}</td>
                <td className="py-4">${(p.price / 100).toFixed(2)}</td>
                <td className="py-4">{p.stock}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-tighter ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {p.active ? "Active" : "Draft"}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setEditingProduct(p); setView("edit"); }} className="p-2 hover:text-[#a932bd]"><Edit size={14}/></button>
                    <button className="p-2 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductEditor({ product, onBack }: { product: any; onBack: () => void }) {
  const [formData, setFormData] = useState(product || {
    title: "", price: 0, description: "", ribbon: "", gifTitleUrl: ""
  });

  return (
    <div className="space-y-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 hover:text-black">
        <ArrowLeft size={14} /> Back to Catalog
      </button>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Product Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd]" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Description</label>
              <textarea rows={6} className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] resize-none" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold">Media</label>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-[3/4] border-2 border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center text-black/20 hover:border-[#a932bd] hover:text-[#a932bd] cursor-pointer transition-all">
                <ImageIcon size={24} />
                <span className="text-[8px] uppercase mt-2 font-bold">Upload Image</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <div className="p-6 bg-[#fdfcf5] rounded-xl border border-black/5 space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Configuration</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Price (Cents)</label>
                <input type="number" className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Ribbon</label>
                <select className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none">
                  <option value="">None</option>
                  <option value="NEW">New</option>
                  <option value="EXCLUSIVE">Exclusive</option>
                  <option value="SALE">Sale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">GIF Title Overlay URL</label>
                <input type="text" placeholder="https://..." className="w-full bg-white border border-black/5 px-4 py-2 text-xs outline-none" />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#a932bd] transition-all">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
