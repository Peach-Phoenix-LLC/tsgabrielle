"use client";

import React, { useState, useEffect } from "react";
import ProductsTable from "../ProductsTable";
import ImagePicker from "../ImagePicker";
import ProductGalleryManager from "../ProductGalleryManager";
import ProductVariantManager from "../ProductVariantManager";
import SocialPostingManager from "../SocialPostingManager";
import RichTextEditor from "../Editor/RichTextEditor";
import { triggerSocialPostAction } from "@/app/actions/social";

export default function ProductsSection() {
  const [items, setItems] = useState<
    any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
  >([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] =
    useState<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>(
      null,
    );

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/crud?type=products");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Fetch items failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingItem.id ? "update" : "create";

    // Prepare data - clone and remove non-scalar fields
    const dataToSave = { ...editingItem };
    const id = dataToSave.id;

    // Remove all relations and read-only fields
    const fieldsToRemove = [
      "id",
      "created_at",
      "updated_at",
      "gallery_slides",
      "order_items",
      "metafields",
      "pillars",
      "wishlist_items",
      "reviews",
    ];
    fieldsToRemove.forEach((f) => delete dataToSave[f]);

    // Parse numeric fields
    if (dataToSave.peach_number)
      dataToSave.peach_number = parseInt(dataToSave.peach_number.toString());

    const body: any = { type: "products", action, data: dataToSave };
    if (id) body.id = id;

    const res = await fetch("/api/admin/crud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const result = await res.json();
      const savedProductId = result.id || id;

      // Auto-post to social media if enabled and product is active
      if (
        dataToSave.social_auto_post &&
        dataToSave.status === "active" &&
        savedProductId
      ) {
        // We fire and forget or wait? User wants results logged in DB, so we fire it.
        triggerSocialPostAction(savedProductId, dataToSave.social_platforms);
      }

      setEditingItem(null);
      fetchData();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error || "Operation failed"}`);
    }
  };

  const handleGalleryChange = (idx: number, url: string) => {
    const newUrls = [...(editingItem.media_gallery_urls || [])];
    if (url) {
      newUrls[idx] = url;
    } else {
      newUrls.splice(idx, 1);
    }
    setEditingItem({ ...editingItem, media_gallery_urls: newUrls });
  };

  const addGalleryItem = () => {
    const newUrls = [...(editingItem.media_gallery_urls || []), ""];
    setEditingItem({ ...editingItem, media_gallery_urls: newUrls });
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch("/api/admin/crud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "products", action: "delete", id }),
    });
    fetchData();
  };

  const initNewProduct = () => {
    setEditingItem({
      peach_number: "",
      title: "",
      subtitle: "",
      tagline: "",
      brand: "tsgabrielle®",
      short_description: "",
      long_description: "",
      base_sku: "",
      base_mpn: "",
      base_gtin: "",
      product_type: "",
      catalogue_category: "",
      catalogue_collection: "",
      google_category_id: "",
      google_category_name: "",
      gs_condition: "New",
      gs_availability: "In Stock",
      gs_gender: "",
      gs_age_group: "",
      gs_size_system: "",
      seo_meta_title: "",
      seo_meta_description: "",
      seo_tags: [],
      hs_code_primary: "",
      hs_code_alt: "",
      shipping_tier: "",
      lead_time: "",
      warehouse_zone: "",
      country_of_origin: "",
      certifications: [],
      traceability: "",
      ethical_audit: "",
      carbon_footprint: "",
      msrp_display: "",
      map_policy: "",
      wholesale_price: "",
      seasonality_code: "",
      landed_cost_est: "",
      url_amazon: "",
      url_etsy: "",
      url_tiktok: "",
      composition: "",
      finish: "",
      care_instructions: "",
      prop65_status: "",
      trademark_notes: "",
      safety_testing: "",
      warranty_info: "",
      contact_info: "",
      media_primary_url: "",
      media_primary_alt: "",
      media_gallery_urls: [],
      media_gallery_alts: [],
      social_auto_post: true,
      social_platforms: [
        "instagram",
        "facebook",
        "twitter",
        "linkedin",
        "pinterest",
      ],
      status: "active",
    });
  };

  return (
    <div className="space-y-12 bg-white">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">
            PRODUCT DATA ARCHITECT{" "}
            <span className="text-xs align-top">(ELITE V5.0)</span>
          </h2>
          <p className="text-[#1a1a1a]/40 font-serif italic mt-2">
            Enforce the 15-Section Technical Synthesis on all inventory. All
            fields mathematically accurate.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              if (
                !confirm(
                  "Syncing from catalog will update existing products and create new ones from the Excel file. Proceed?",
                )
              )
                return;
              setLoading(true);
              try {
                const res = await fetch("/api/admin/sync-catalog", {
                  method: "POST",
                });
                const result = await res.json();
                if (result.success) {
                  alert(result.message);
                  fetchData();
                } else {
                  alert(`Sync failed: ${result.error}`);
                }
              } catch (err) {
                alert("Sync request failed");
              } finally {
                setLoading(false);
              }
            }}
            className="px-10 py-3 border border-black/10 text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-50 shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">sync</span>
            Sync from Catalog
          </button>
          <button
            onClick={initNewProduct}
            className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 shadow-sm"
          >
            Create Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="size-8 border-2 border-black/5 border-t-[#a932bd] rounded-full animate-spin" />
        </div>
      ) : (
        <ProductsTable
          products={items.map((i) => ({
            ...i,
            image:
              i.media_primary_url ||
              "https://images.unsplash.com/photo-1549493527-134cca013146?w=200&h=200&fit=crop",
            price: i.msrp_display,
            stock: i.gs_availability,
            collection: i.catalogue_collection,
            category: i.catalogue_category,
            name: i.title,
            sku: i.peach_number || i.base_sku,
          }))}
          onEdit={(id) => setEditingItem(items.find((i) => i.id === id))}
          onDelete={handleDelete}
        />
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-md z-50 flex items-center justify-center p-6 pb-20 pt-10">
          <div className="bg-white border border-black/10 w-full max-w-7xl h-full flex flex-col rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-black/5 bg-neutral-50 shrink-0">
              <div>
                <h3 className="text-xl font-light uppercase tracking-widest text-[#1a1a1a]">
                  {editingItem.id ? "Edit" : "New"} Technical Data Sheet
                </h3>
                <p className="text-[#1a1a1a]/40 text-[10px] uppercase mt-1">
                  15-Section Architecture | Brand Standard: Lato Light
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[10px] uppercase opacity-40 hover:opacity-100 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">close</span>{" "}
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <form
                id="productForm"
                onSubmit={handleSave}
                className="space-y-12 max-w-5xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                  {/* Section: Core Info */}
                  <div className="col-span-full border-b border-black/10 pb-4 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Core Architecture
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Peach Number
                    </label>
                    <input
                      type="number"
                      value={editingItem.peach_number || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          peach_number: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingItem.title || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          title: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingItem.subtitle || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          subtitle: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={editingItem.tagline || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          tagline: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={editingItem.brand || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          brand: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Product Type
                    </label>
                    <input
                      type="text"
                      value={editingItem.product_type || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          product_type: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Catalogue Category
                    </label>
                    <input
                      type="text"
                      value={editingItem.catalogue_category || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          catalogue_category: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Catalogue Collection
                    </label>
                    <input
                      type="text"
                      value={editingItem.catalogue_collection || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          catalogue_collection: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Base SKU
                    </label>
                    <input
                      type="text"
                      value={editingItem.base_sku || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          base_sku: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      MSRP Display
                    </label>
                    <input
                      type="text"
                      value={editingItem.msrp_display || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          msrp_display: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  {/* Section: Narrative */}
                  <div className="col-span-full border-b border-black/10 pb-4 mt-8 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Narrative & Holography
                    </h4>
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Short Description
                    </label>
                    <RichTextEditor
                      value={editingItem.short_description || ""}
                      onChange={(val) =>
                        setEditingItem({
                          ...editingItem,
                          short_description: val,
                        })
                      }
                      placeholder="Enter a concise evocative summary..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#a932bd] font-bold ml-1">
                      Holographic Highlight
                    </label>
                    <input
                      type="text"
                      value={editingItem.holographic_highlight || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          holographic_highlight: e.target.value,
                        })
                      }
                      placeholder="e.g., Iridescent shift in low light"
                      className="w-full bg-[#a932bd]/5 border border-[#a932bd]/20 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-[#a932bd] font-bold ml-1">
                      Organic Narrative Note
                    </label>
                    <input
                      type="text"
                      value={editingItem.organic_note || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          organic_note: e.target.value,
                        })
                      }
                      placeholder="e.g., Responsibly harvested silk"
                      className="w-full bg-[#a932bd]/5 border border-[#a932bd]/20 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Long Description
                    </label>
                    <RichTextEditor
                      value={editingItem.long_description || ""}
                      onChange={(val) =>
                        setEditingItem({
                          ...editingItem,
                          long_description: val,
                        })
                      }
                      placeholder="Tell the full story of this Maison masterpiece..."
                    />
                  </div>

                  {/* ADVANCED SEO SECTION */}
                  <div className="col-span-full border-b border-black/10 pb-4 mt-8 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Advanced SEO
                    </h4>
                  </div>

                  <div className="col-span-full md:col-span-2 space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1 flex justify-between">
                      <span>Meta Title (Required)</span>
                      <span className={(editingItem.seo_meta_title?.length || 0) > 60 ? "text-red-500 font-bold" : ""}>
                        {editingItem.seo_meta_title?.length || 0}/60
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={editingItem.seo_meta_title || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          seo_meta_title: e.target.value,
                        })
                      }
                      placeholder="Enter a descriptive meta title..."
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1 flex justify-between">
                      <span>Meta Description</span>
                      <span className={(editingItem.seo_meta_description?.length || 0) > 160 ? "text-red-500 font-bold" : ""}>
                        {editingItem.seo_meta_description?.length || 0}/160
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      maxLength={160}
                      value={editingItem.seo_meta_description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          seo_meta_description: e.target.value,
                        })
                      }
                      placeholder="Enter meta description for search results..."
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all resize-none"
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      SEO Tags (Comma separated keywords)
                    </label>
                    <input
                      type="text"
                      value={
                        editingItem.seo_tags
                          ? editingItem.seo_tags.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          seo_tags: e.target.value
                            .split(",")
                            .map((t: string) => t.trim())
                            .filter((t: string) => t !== ""),
                        })
                      }
                      placeholder="e.g., sustainable fashion, iridescent, luxury"
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  {/* COMMERCIAL & LOGISTICS SECTION */}
                  <div className="col-span-full border-b border-black/10 pb-4 mt-8 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Commercial & Logistics
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Wholesale Pricing ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingItem.wholesale_price || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          wholesale_price: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      MAP Policies
                    </label>
                    <input
                      type="text"
                      value={editingItem.map_policy || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          map_policy: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Seasonality Codes
                    </label>
                    <input
                      type="text"
                      value={editingItem.seasonality_code || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          seasonality_code: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      HS Codes (International)
                    </label>
                    <input
                      type="text"
                      value={editingItem.hs_code_primary || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          hs_code_primary: e.target.value,
                        })
                      }
                      placeholder="e.g., 6109.10.00"
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Warehouse Zones
                    </label>
                    <input
                      type="text"
                      value={editingItem.warehouse_zone || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          warehouse_zone: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Lead Times (Days)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingItem.lead_time || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          lead_time: e.target.value,
                        })
                      }
                      className="w-full bg-neutral-50 border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] transition-all"
                    />
                  </div>

                  {/* MATERIALS & COMPLIANCE SECTION */}
                  <div className="col-span-full border-b border-black/10 pb-4 mt-8 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Materials & Compliance
                    </h4>
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Material Composition
                    </label>
                    <RichTextEditor
                      value={editingItem.composition || ""}
                      onChange={(val) =>
                        setEditingItem({
                          ...editingItem,
                          composition: val,
                        })
                      }
                      placeholder="Detailed material breakdown..."
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Care Instructions
                    </label>
                    <RichTextEditor
                      value={editingItem.care_instructions || ""}
                      onChange={(val) =>
                        setEditingItem({
                          ...editingItem,
                          care_instructions: val,
                        })
                      }
                      placeholder="Washing, drying, and ironing details..."
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">
                      Trademark Notes
                    </label>
                    <RichTextEditor
                      value={editingItem.trademark_notes || ""}
                      onChange={(val) =>
                        setEditingItem({
                          ...editingItem,
                          trademark_notes: val,
                        })
                      }
                      placeholder="Legal markings and trademark info..."
                    />
                  </div>

                  {/* STATUS MANAGEMENT SECTION */}
                  <div className="col-span-full border-b border-black/10 pb-4 mt-8 mb-2">
                    <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">
                      Status Management
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-[#a932bd] font-bold ml-1">
                      Status Workflow
                    </label>
                    <select
                      value={editingItem.status || "active"}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-[#a932bd]/5 border border-[#a932bd]/20 rounded-xl px-4 py-3 text-sm focus:border-[#a932bd] outline-none text-[#1a1a1a] font-medium transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-12 mt-12 pt-12 border-t border-black/10">
                  <ProductVariantManager
                    variants={editingItem.variants || []}
                    onChange={(variants) =>
                      setEditingItem({ ...editingItem, variants })
                    }
                  />
                </div>

                <ProductGalleryManager
                  urls={editingItem.media_gallery_urls || []}
                  alts={editingItem.media_gallery_alts || []}
                  primaryUrl={editingItem.media_primary_url || ""}
                  primaryAlt={editingItem.media_primary_alt || ""}
                  onChange={(urls, alts, primaryUrl, primaryAlt) =>
                    setEditingItem({
                      ...editingItem,
                      media_gallery_urls: urls,
                      media_gallery_alts: alts,
                      media_primary_url: primaryUrl,
                      media_primary_alt: primaryAlt,
                    })
                  }
                />

                <SocialPostingManager
                  productId={editingItem.id}
                  autoPost={editingItem.social_auto_post}
                  selectedPlatforms={editingItem.social_platforms || []}
                  onAutoPostChange={(val) =>
                    setEditingItem({ ...editingItem, social_auto_post: val })
                  }
                  onPlatformsChange={(platforms) =>
                    setEditingItem({
                      ...editingItem,
                      social_platforms: platforms,
                    })
                  }
                />
              </form>
            </div>

            <div className="p-6 border-t border-black/5 bg-neutral-50 flex justify-end gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-12 py-4 border border-black/10 text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-white transition-all"
              >
                Discard
              </button>
              <button
                form="productForm"
                type="submit"
                className="px-12 py-4 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-xl hover:bg-neutral-800 transition-all shadow-xl shadow-purple-500/10"
              >
                Synchronize Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
