"use client";

import React, { useState, useEffect } from 'react';
import RichTextEditor from '../Editor/RichTextEditor';

type ContentBlock = {

    id: string;
    type: 'text' | 'image' | 'dual_column';
    content: any;
};

export default function PagesSection() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/admin/crud?type=pages');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        if (editingItem && editingItem.body) {
            try {
                const parsed = JSON.parse(editingItem.body);
                if (Array.isArray(parsed)) {
                    setBlocks(parsed);
                } else {
                    // Fallback for legacy HTML content
                    setBlocks([{ id: '1', type: 'text', content: { text: editingItem.body } }]);
                }
            } catch (e) {
                setBlocks([{ id: '1', type: 'text', content: { text: editingItem.body } }]);
            }
        } else {
            setBlocks([]);
        }
    }, [editingItem]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingItem.id ? 'update' : 'create';
        const updatedItem = { ...editingItem, body: JSON.stringify(blocks) };
        const body: any = { type: 'pages', action, data: updatedItem };

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
            body: JSON.stringify({ type: 'pages', action: 'delete', id }),
        });
        fetchData();
    };

    const addBlock = (type: ContentBlock['type']) => {
        const newBlock: ContentBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: type === 'text' ? { text: '' } : type === 'image' ? { url: '', caption: '' } : { left: '', right: '' }
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id: string, content: any) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const newBlocks = [...blocks];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
        [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
        setBlocks(newBlocks);
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Maison Pages</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Design and curate bespoke digital experiences.</p>
                </div>
                <button
                    onClick={() => setEditingItem({ title: '', slug: '', body: '', is_visible: true, layout: 'standard' })}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 shadow-sm"
                >
                    Design New Page
                </button>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <table className="w-full text-left">
                    <thead className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 border-b border-black/10 bg-neutral-50">
                        <tr>
                            <th className="px-8 py-6">Identity</th>
                            <th className="px-8 py-6">Direct Link</th>
                            <th className="px-8 py-6 text-right">Orchestration</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-[#1a1a1a]">
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-black/5 hover:bg-neutral-50 transition-colors">
                                <td className="px-8 py-6 font-medium">{item.title}</td>
                                <td className="px-8 py-6 font-mono text-[#a932bd]">/{item.slug}</td>
                                <td className="px-8 py-6 text-right space-x-4">
                                    <button onClick={() => setEditingItem(item)} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Edit Design</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-[10px] uppercase tracking-widest text-red-600 opacity-40 hover:opacity-100 transition-opacity">Deconstruct</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-xl z-50 flex items-center justify-center p-6">
                    <div className="bg-white border border-black/10 w-full max-w-6xl h-[90vh] rounded-[3rem] p-12 flex flex-col gap-10 shadow-2xl ring-1 ring-black/10 overflow-hidden">
                        <div className="flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-2xl font-light uppercase tracking-widest text-[#1a1a1a]">{editingItem.id ? 'Refine' : 'Orchestrate'} Page</h3>
                                <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest mt-1">Design Studio v1.0</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setEditingItem(null)} className="px-6 py-3 border border-black/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-neutral-50 transition-all">Cancel</button>
                                <button onClick={handleSave} className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all shadow-lg">Synchronize Design</button>
                            </div>
                        </div>

                        <div className="flex gap-12 flex-grow overflow-hidden">
                            {/* Left: Settings */}
                            <div className="w-80 space-y-8 shrink-0 overflow-y-auto pr-4 custom-scrollbar">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Core Identity</h4>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Title</label>
                                        <input required type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Slug</label>
                                        <div className="flex items-center gap-2 bg-neutral-50 border border-black/10 rounded-xl px-4 py-3">
                                            <span className="text-xs opacity-20">/</span>
                                            <input required type="text" value={editingItem.slug} onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })} className="bg-transparent text-sm font-mono outline-none flex-grow" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Composition Layout</label>
                                        <select value={editingItem.layout || 'standard'} onChange={(e) => setEditingItem({ ...editingItem, layout: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#a932bd] appearance-none">
                                            <option value="standard">Classic Editorial</option>
                                            <option value="minimal">Minimal White</option>
                                            <option value="split">Visual Split</option>
                                            <option value="full">Full Cinematic</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-6 bg-neutral-50 border border-black/5 rounded-2xl space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Design Blocks</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button onClick={() => addBlock('text')} className="flex items-center justify-center gap-2 py-3 border border-black/5 bg-white rounded-xl text-[9px] uppercase tracking-widest hover:border-[#a932bd] hover:text-[#a932bd] transition-all">
                                            <span className="material-symbols-outlined text-sm">subject</span> Text Block
                                        </button>
                                        <button onClick={() => addBlock('image')} className="flex items-center justify-center gap-2 py-3 border border-black/5 bg-white rounded-xl text-[9px] uppercase tracking-widest hover:border-[#a932bd] hover:text-[#a932bd] transition-all">
                                            <span className="material-symbols-outlined text-sm">image</span> Image Block
                                        </button>
                                        <button onClick={() => addBlock('dual_column')} className="flex items-center justify-center gap-2 py-3 border border-black/5 bg-white rounded-xl text-[9px] uppercase tracking-widest hover:border-[#a932bd] hover:text-[#a932bd] transition-all">
                                            <span className="material-symbols-outlined text-sm">view_column</span> Dual Column
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-black/5">
                                    <div className="flex items-center gap-4">
                                        <input type="checkbox" checked={editingItem.is_visible} onChange={(e) => setEditingItem({ ...editingItem, is_visible: e.target.checked })} className="accent-[#a932bd]" />
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Manifest on Site</label>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Visual Builder */}
                            <div className="flex-grow bg-neutral-50 rounded-[2rem] border border-black/5 p-8 overflow-y-auto custom-scrollbar shadow-inner">
                                <div className="max-w-3xl mx-auto space-y-6">
                                    {blocks.length === 0 && (
                                        <div className="h-64 border-2 border-dashed border-black/5 rounded-3xl flex flex-col items-center justify-center text-[#1a1a1a]/20 gap-4">
                                            <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                            <p className="text-[10px] uppercase tracking-widest">Start curating blocks to design your page</p>
                                        </div>
                                    )}
                                    {blocks.map((block, index) => (
                                        <div key={block.id} className="group relative bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:ring-2 hover:ring-[#a932bd]/20 transition-all">
                                            <div className="absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => moveBlock(index, 'up')} className="size-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-[#a932bd] hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">expand_less</span>
                                                </button>
                                                <button onClick={() => moveBlock(index, 'down')} className="size-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-[#a932bd] hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                                </button>
                                                <button onClick={() => removeBlock(block.id)} className="size-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>

                                            {block.type === 'text' && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#a932bd]">Text Block</span>
                                                    </div>
                                                    <RichTextEditor
                                                        placeholder="Write your Maison's story..."
                                                        value={block.content.text}
                                                        onChange={(val) => updateBlock(block.id, { ...block.content, text: val })}
                                                    />
                                                </div>
                                            )}

                                            {block.type === 'image' && (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#a932bd]">Visual Block</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/40">Source URL</label>
                                                            <input
                                                                type="text"
                                                                value={block.content.url}
                                                                onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                                                                className="w-full bg-neutral-50 border border-black/5 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#a932bd]"
                                                                placeholder="https://..."
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/40">Caption</label>
                                                            <input
                                                                type="text"
                                                                value={block.content.caption}
                                                                onChange={(e) => updateBlock(block.id, { ...block.content, caption: e.target.value })}
                                                                className="w-full bg-neutral-50 border border-black/5 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-[#a932bd]"
                                                                placeholder="Descriptive text..."
                                                            />
                                                        </div>
                                                    </div>
                                                    {block.content.url && (
                                                        <div className="mt-4 rounded-xl overflow-hidden aspect-video bg-neutral-100 ring-1 ring-black/5">
                                                            <img src={block.content.url} className="w-full h-full object-cover" alt="Preview" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {block.type === 'dual_column' && (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#a932bd]">Dual Balance Block</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/40">Left Column</label>
                                                            <RichTextEditor
                                                                value={block.content.left}
                                                                onChange={(val) => updateBlock(block.id, { ...block.content, left: val })}
                                                                placeholder="Left content..."
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[8px] uppercase tracking-widest text-[#1a1a1a]/40">Right Column</label>
                                                            <RichTextEditor
                                                                value={block.content.right}
                                                                onChange={(val) => updateBlock(block.id, { ...block.content, right: val })}
                                                                placeholder="Right content..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
