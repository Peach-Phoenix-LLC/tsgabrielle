"use client";

import React from 'react';

interface Product {
    id: string | number;
    image: string;
    name: string;
    collection: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: string;
}

interface ProductsTableProps {
    products: Product[];
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-xl shadow-purple-500/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200/60 bg-white/40">
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Level</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Social Feed</th>
                            <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {products.map((p: any) => (
                            <tr key={p.id} className="hover:bg-purple-500/5 transition-colors group">
                                <td className="p-4 pl-5">
                                    <div className="p-[2px] bg-gradient-to-tr from-[#a932bd] to-[#00d4ff] rounded-full w-12 h-12">
                                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                                            <img alt={p.name} className="w-full h-full object-cover" src={p.image} />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-slate-800">{p.name}</p>
                                    <span className="block text-xs font-normal text-slate-500 mt-0.5">{p.collection}</span>
                                </td>
                                <td className="p-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                                <td className="p-4">
                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                                        {p.category}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-slate-800">{p.price}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${p.status === 'In Stock' || p.status === 'Active' ? 'bg-[#a932bd] animate-pulse' :
                                            p.status === 'Low Stock' ? 'bg-amber-400' : 'bg-slate-300'
                                            }`}></span>
                                        <span className={`font-bold ${p.status === 'In Stock' || p.status === 'Active' ? 'text-[#a932bd]' :
                                            p.status === 'Low Stock' ? 'text-amber-600' : 'text-slate-400'
                                            }`}>
                                            {p.status}
                                        </span>
                                        {p.stock > 0 && <span className="text-slate-400 text-xs ml-1">({p.stock})</span>}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {p.social_posts && p.social_posts[0] ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-[10px] font-bold uppercase ${p.social_posts[0].status === 'SUCCESS' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {p.social_posts[0].status === 'SUCCESS' ? 'Posted ✓' : 'Failed ✗'}
                                                </span>
                                                <span className="text-[9px] text-slate-400">{new Date(p.social_posts[0].created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-[9px] uppercase tracking-tighter text-slate-500 font-medium truncate max-w-[80px]">via {p.social_posts[0].platform}</p>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest italic">Not Broadcast</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(p.id)}
                                            className="p-2 text-slate-800 hover:bg-white hover:text-[#a932bd] rounded-lg transition-all shadow-sm hover:shadow-md"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(p.id)}
                                            className="p-2 text-slate-800 hover:bg-white hover:text-red-500 rounded-lg transition-all shadow-sm hover:shadow-md"
                                            title="Delete"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-slate-200/50 bg-white/30 flex items-center justify-between">
                <span className="text-xs text-slate-500">Showing 1-{products.length} of 124 products</span>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-400 hover:text-[#a932bd] disabled:opacity-50">
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#a932bd] text-white shadow-md shadow-purple-500/30 text-xs font-bold">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#a932bd] text-xs font-medium transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-[#a932bd] transition-colors">
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
