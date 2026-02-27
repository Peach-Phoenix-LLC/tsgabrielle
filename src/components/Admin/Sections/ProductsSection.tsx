"use client";

import React, { useState, useEffect } from 'react';
import ProductsTable from '../ProductsTable';
import ImagePicker from '../ImagePicker';

export default function ProductsSection() {
    const [items, setItems] = useState<any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/crud?type=products');
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Fetch items failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingItem.id ? 'update' : 'create';

        // Prepare data
        const dataToSave = { ...editingItem };
        const id = dataToSave.id;
        delete dataToSave.id;
        delete dataToSave.created_at;
        delete dataToSave.updated_at;
        delete dataToSave.gallery_slides;
        delete dataToSave.order_items;
        delete dataToSave.metafields;
        delete dataToSave.pillars;
        delete dataToSave.variants;
        delete dataToSave.wishlist_items;

        // Parse peach number
        if (dataToSave.peach_number) dataToSave.peach_number = parseInt(dataToSave.peach_number);

        const body: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ = { type: 'products', action, data: dataToSave };
        if (id) body.id = id;

        const res = await fetch('/api/admin/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            setEditingItem(null);
            fetchData();
        } else {
            const err = await res.json();
            alert(`Error: ${err.error || 'Operation failed'}`);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        await fetch('/api/admin/crud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'products', action: 'delete', id }),
        });
        fetchData();
    };

    const initNewProduct = () => {
        setEditingItem({
            "peach_number": "",
            "title": "",
            "subtitle": "",
            "tagline": "",
            "brand": "tsgabrielle®",
            "short_description": "",
            "long_description": "",
            "base_sku": "",
            "base_mpn": "",
            "base_gtin": "",
            "product_type": "",
            "catalogue_category": "",
            "catalogue_collection": "",
            "google_category_id": "",
            "google_category_name": "",
            "gs_condition": "New",
            "gs_availability": "In Stock",
            "gs_gender": "",
            "gs_age_group": "",
            "gs_size_system": "",
            "seo_meta_title": "",
            "seo_meta_description": "",
            "seo_tags": [],
            "hs_code_primary": "",
            "hs_code_alt": "",
            "shipping_tier": "",
            "lead_time": "",
            "warehouse_zone": "",
            "country_of_origin": "",
            "certifications": [],
            "traceability": "",
            "ethical_audit": "",
            "carbon_footprint": "",
            "msrp_display": "",
            "map_policy": "",
            "wholesale_price": "",
            "seasonality_code": "",
            "landed_cost_est": "",
            "url_amazon": "",
            "url_etsy": "",
            "url_tiktok": "",
            "composition": "",
            "finish": "",
            "care_instructions": "",
            "prop65_status": "",
            "trademark_notes": "",
            "safety_testing": "",
            "warranty_info": "",
            "contact_info": "",
            "media_primary_url": "",
            "media_primary_alt": "",
            "media_gallery_urls": [],
            "media_gallery_alts": [],
            "status": "active"
        });
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">PRODUCT DATA ARCHITECT <span className="text-xs align-top">(ELITE V5.0)</span></h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Enforce the 15-Section Technical Synthesis on all inventory. All fields mathematically accurate.</p>
                </div>
                <button
                    onClick={initNewProduct}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 shadow-sm"
                >
                    Create Product
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="size-8 border-2 border-black/5 border-t-[#a932bd] rounded-full animate-spin" />
                </div>
            ) : (
                <ProductsTable
                    products={items.map(i => ({
                        ...i,
                        image: i.media_primary_url || 'https://images.unsplash.com/photo-1549493527-134cca013146?w=200&h=200&fit=crop',
                        price: i.msrp_display,
                        stock: i.gs_availability,
                        collection: i.catalogue_collection,
                        category: i.catalogue_category,
                        name: i.title,
                        sku: i.peach_number || i.base_sku
                    }))}
                    onEdit={(id) => setEditingItem(items.find(i => i.id === id))}
                    onDelete={handleDelete}
                />
            )}

            {editingItem && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-md z-50 flex items-center justify-center p-6 pb-20 pt-10">
                    <div className="bg-white border border-black/10 w-full max-w-7xl h-full flex flex-col rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden">

                        <div className="flex justify-between items-center p-6 border-b border-black/5 bg-neutral-50 shrink-0">
                            <div>
                                <h3 className="text-xl font-light uppercase tracking-widest text-[#1a1a1a]">{editingItem.id ? 'Edit' : 'New'} Technical Data Sheet</h3>
                                <p className="text-[#1a1a1a]/40 text-[10px] uppercase mt-1">15-Section Architecture | Brand Standard: Lato Light</p>
                            </div>
                            <button onClick={() => setEditingItem(null)} className="text-[10px] uppercase opacity-40 hover:opacity-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">close</span> Close
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <form id="productForm" onSubmit={handleSave} className="space-y-12 max-w-5xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Core Info</h4></div><div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Peach Number</label>
                                    <input required={false} type="number" value={editingItem.peach_number || ''} onChange={(e) => setEditingItem({ ...editingItem, peach_number: e.target.value ? parseInt(e.target.value) : '' })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Title</label>
                                        <input required={false} type="text" value={editingItem.title || ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Subtitle</label>
                                        <input required={false} type="text" value={editingItem.subtitle || ''} onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Tagline</label>
                                        <input required={false} type="text" value={editingItem.tagline || ''} onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Brand</label>
                                        <input required={false} type="text" value={editingItem.brand || ''} onChange={(e) => setEditingItem({ ...editingItem, brand: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Product Type</label>
                                        <input required={false} type="text" value={editingItem.product_type || ''} onChange={(e) => setEditingItem({ ...editingItem, product_type: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Catalogue Category</label>
                                        <input required={false} type="text" value={editingItem.catalogue_category || ''} onChange={(e) => setEditingItem({ ...editingItem, catalogue_category: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Catalogue Collection</label>
                                        <input required={false} type="text" value={editingItem.catalogue_collection || ''} onChange={(e) => setEditingItem({ ...editingItem, catalogue_collection: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Base Sku</label>
                                        <input required={false} type="text" value={editingItem.base_sku || ''} onChange={(e) => setEditingItem({ ...editingItem, base_sku: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Msrp Display</label>
                                        <input required={false} type="text" value={editingItem.msrp_display || ''} onChange={(e) => setEditingItem({ ...editingItem, msrp_display: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mt-6 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Descriptions</h4></div><div className="col-span-1 md:col-span-2 lg:col-span-3"><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Short Description</label>
                                        <textarea rows={3} value={editingItem.short_description || ''} onChange={(e) => setEditingItem({ ...editingItem, short_description: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div></div><div className="col-span-1 md:col-span-2 lg:col-span-3"><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Long Description</label>
                                        <textarea rows={3} value={editingItem.long_description || ''} onChange={(e) => setEditingItem({ ...editingItem, long_description: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div></div><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mt-6 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Materials & Compliance</h4></div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Composition</label>
                                        <input required={false} type="text" value={editingItem.composition || ''} onChange={(e) => setEditingItem({ ...editingItem, composition: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Finish</label>
                                        <input required={false} type="text" value={editingItem.finish || ''} onChange={(e) => setEditingItem({ ...editingItem, finish: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Care Instructions</label>
                                        <input required={false} type="text" value={editingItem.care_instructions || ''} onChange={(e) => setEditingItem({ ...editingItem, care_instructions: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Country Of Origin</label>
                                        <input required={false} type="text" value={editingItem.country_of_origin || ''} onChange={(e) => setEditingItem({ ...editingItem, country_of_origin: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Prop65 Status</label>
                                        <input required={false} type="text" value={editingItem.prop65_status || ''} onChange={(e) => setEditingItem({ ...editingItem, prop65_status: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Safety Testing</label>
                                        <input required={false} type="text" value={editingItem.safety_testing || ''} onChange={(e) => setEditingItem({ ...editingItem, safety_testing: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Warranty Info</label>
                                        <input required={false} type="text" value={editingItem.warranty_info || ''} onChange={(e) => setEditingItem({ ...editingItem, warranty_info: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Contact Info</label>
                                        <input required={false} type="text" value={editingItem.contact_info || ''} onChange={(e) => setEditingItem({ ...editingItem, contact_info: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mt-6 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Google Shopping & SEO</h4></div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Google Category Id</label>
                                        <input required={false} type="text" value={editingItem.google_category_id || ''} onChange={(e) => setEditingItem({ ...editingItem, google_category_id: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Google Category Name</label>
                                        <input required={false} type="text" value={editingItem.google_category_name || ''} onChange={(e) => setEditingItem({ ...editingItem, google_category_name: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Base Mpn</label>
                                        <input required={false} type="text" value={editingItem.base_mpn || ''} onChange={(e) => setEditingItem({ ...editingItem, base_mpn: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Base Gtin</label>
                                        <input required={false} type="text" value={editingItem.base_gtin || ''} onChange={(e) => setEditingItem({ ...editingItem, base_gtin: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Gs Condition</label>
                                        <input required={false} type="text" value={editingItem.gs_condition || ''} onChange={(e) => setEditingItem({ ...editingItem, gs_condition: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Gs Availability</label>
                                        <input required={false} type="text" value={editingItem.gs_availability || ''} onChange={(e) => setEditingItem({ ...editingItem, gs_availability: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Gs Gender</label>
                                        <input required={false} type="text" value={editingItem.gs_gender || ''} onChange={(e) => setEditingItem({ ...editingItem, gs_gender: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Gs Age Group</label>
                                        <input required={false} type="text" value={editingItem.gs_age_group || ''} onChange={(e) => setEditingItem({ ...editingItem, gs_age_group: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Gs Size System</label>
                                        <input required={false} type="text" value={editingItem.gs_size_system || ''} onChange={(e) => setEditingItem({ ...editingItem, gs_size_system: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Seo Meta Title</label>
                                        <input required={false} type="text" value={editingItem.seo_meta_title || ''} onChange={(e) => setEditingItem({ ...editingItem, seo_meta_title: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="col-span-1 md:col-span-2"><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Seo Meta Description</label>
                                        <textarea rows={3} value={editingItem.seo_meta_description || ''} onChange={(e) => setEditingItem({ ...editingItem, seo_meta_description: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-xs resize-none focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div></div><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mt-6 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Logistics & Supply</h4></div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Hs Code Primary</label>
                                        <input required={false} type="text" value={editingItem.hs_code_primary || ''} onChange={(e) => setEditingItem({ ...editingItem, hs_code_primary: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Hs Code Alt</label>
                                        <input required={false} type="text" value={editingItem.hs_code_alt || ''} onChange={(e) => setEditingItem({ ...editingItem, hs_code_alt: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Shipping Tier</label>
                                        <input required={false} type="text" value={editingItem.shipping_tier || ''} onChange={(e) => setEditingItem({ ...editingItem, shipping_tier: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Lead Time</label>
                                        <input required={false} type="text" value={editingItem.lead_time || ''} onChange={(e) => setEditingItem({ ...editingItem, lead_time: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Warehouse Zone</label>
                                        <input required={false} type="text" value={editingItem.warehouse_zone || ''} onChange={(e) => setEditingItem({ ...editingItem, warehouse_zone: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Traceability</label>
                                        <input required={false} type="text" value={editingItem.traceability || ''} onChange={(e) => setEditingItem({ ...editingItem, traceability: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Ethical Audit</label>
                                        <input required={false} type="text" value={editingItem.ethical_audit || ''} onChange={(e) => setEditingItem({ ...editingItem, ethical_audit: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Carbon Footprint</label>
                                        <input required={false} type="text" value={editingItem.carbon_footprint || ''} onChange={(e) => setEditingItem({ ...editingItem, carbon_footprint: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-2 mt-6 border-b border-black/10 pb-4 mb-4"><h4 className="text-xs uppercase tracking-widest font-bold">Commercial</h4></div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Map Policy</label>
                                        <input required={false} type="text" value={editingItem.map_policy || ''} onChange={(e) => setEditingItem({ ...editingItem, map_policy: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Wholesale Price</label>
                                        <input required={false} type="text" value={editingItem.wholesale_price || ''} onChange={(e) => setEditingItem({ ...editingItem, wholesale_price: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Seasonality Code</label>
                                        <input required={false} type="text" value={editingItem.seasonality_code || ''} onChange={(e) => setEditingItem({ ...editingItem, seasonality_code: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Landed Cost Est</label>
                                        <input required={false} type="text" value={editingItem.landed_cost_est || ''} onChange={(e) => setEditingItem({ ...editingItem, landed_cost_est: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Url Amazon</label>
                                        <input required={false} type="text" value={editingItem.url_amazon || ''} onChange={(e) => setEditingItem({ ...editingItem, url_amazon: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Url Etsy</label>
                                        <input required={false} type="text" value={editingItem.url_etsy || ''} onChange={(e) => setEditingItem({ ...editingItem, url_etsy: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Url Tiktok</label>
                                        <input required={false} type="text" value={editingItem.url_tiktok || ''} onChange={(e) => setEditingItem({ ...editingItem, url_tiktok: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div><div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Status</label>
                                        <input required={false} type="text" value={editingItem.status || ''} onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a]" />
                                    </div></div>

                                <div className="space-y-8 mt-12 pt-12 border-t border-black/10">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]">Primary Visual Architecture</h4>
                                    <ImagePicker
                                        label="Master Image"
                                        value={editingItem.media_primary_url || ''}
                                        altValue={editingItem.media_primary_alt || ''}
                                        onChange={(url) => setEditingItem({ ...editingItem, media_primary_url: url })}
                                        onAltChange={(alt) => setEditingItem({ ...editingItem, media_primary_alt: alt })}
                                    />
                                    <p className="text-[10px] mt-2 opacity-50">Note: Gallery media array management will be added in a separate sprint.</p>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-black/5 bg-neutral-50 flex justify-end gap-4 shrink-0">
                            <button type="button" onClick={() => setEditingItem(null)} className="px-12 py-4 border border-black/10 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-white transition-all">Discard</button>
                            <button form="productForm" type="submit" className="px-12 py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 transition-all shadow-xl shadow-purple-500/10">Synchronize Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}