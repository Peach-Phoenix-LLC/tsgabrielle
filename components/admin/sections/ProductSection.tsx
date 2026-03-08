"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AlertCircle, ArrowLeft, Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { ClaudeTextEditor } from "../ClaudeTextEditor";

type Option = {
  id: string;
  name: string;
  slug: string;
};

type ProductVariant = {
  id?: string;
  sku: string;
  title: string;
  stock: number;
  price_cents: number;
  currency: string;
};

type ProductImage = {
  id?: string;
  url: string;
  alt?: string | null;
  sort_order: number;
};

type ProductRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_cents: number;
  currency: string;
  category_id: string | null;
  collection_id: string | null;
  active: boolean;
  metafields?: Record<string, unknown> | null;
  categories?: { name: string; slug: string } | null;
  collections?: { name: string; slug: string } | null;
  product_variants?: ProductVariant[];
  product_images?: ProductImage[];
};

type ProductEditorState = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  price_cents: number;
  currency: string;
  category_id: string;
  collection_id: string;
  active: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  seoTitle: string;
  seoDescription: string;
  peachNumber: string;
  brand: string;
  gtin: string;
  mpn: string;
  customLabel0: string;
  condition: string;
  identifierExists: string;
  googleProductCategory: string;
  productType: string;
  weight: string;
  warrantyPolicy: string;
  capacityVolume: string;
  dimensions: string;
  color: string;
  material: string;
  size: string;
  stylePattern: string;
  finish: string;
  sustainabilityScore: string;
  directWebUrl: string;
  tag13: string;
  tag50: string;
  customMetafieldsJson: string;
};

const EMPTY_EDITOR: ProductEditorState = {
  title: "",
  slug: "",
  description: "",
  price_cents: 0,
  currency: "USD",
  category_id: "",
  collection_id: "",
  active: true,
  images: [{ url: "", alt: "", sort_order: 0 }],
  variants: [{ sku: "", title: "Default", stock: 0, price_cents: 0, currency: "USD" }],
  seoTitle: "",
  seoDescription: "",
  peachNumber: "",
  brand: "",
  gtin: "",
  mpn: "",
  customLabel0: "",
  condition: "",
  identifierExists: "",
  googleProductCategory: "",
  productType: "",
  weight: "",
  warrantyPolicy: "",
  capacityVolume: "",
  dimensions: "",
  color: "",
  material: "",
  size: "",
  stylePattern: "",
  finish: "",
  sustainabilityScore: "",
  directWebUrl: "",
  tag13: "",
  tag50: "",
  customMetafieldsJson: "{}",
};

function getMetafieldString(meta: Record<string, unknown> | null | undefined, key: string): string {
  if (!meta || typeof meta !== "object") return "";
  const value = meta[key];
  return value ? String(value) : "";
}

const KNOWN_META_KEYS = new Set([
  "SEO Title",
  "SEO Description",
  "Peach Number",
  "g:brand",
  "g:gtin",
  "g:mpn",
  "g:Custom_Label_0",
  "g:Condition",
  "g:identifier_exists",
  "g:google_product_category",
  "Product Type",
  "Weight (g/oz)",
  "Warranty/Return Policy (30 Days)",
  "Capacity/Volume",
  "Dimensions",
  "Color",
  "Material",
  "Size",
  "Style/Pattern",
  "Finish",
  "Sustainability Score",
  "Direct_Web_URL",
  "Tag 13",
  "Tag 50",
]);

function fromProduct(product: ProductRecord): ProductEditorState {
  const meta = product.metafields || {};
  const variants =
    product.product_variants && product.product_variants.length > 0
      ? product.product_variants
      : [{ sku: "", title: "Default", stock: 0, price_cents: product.price_cents, currency: product.currency || "USD" }];
  const images =
    product.product_images && product.product_images.length > 0
      ? [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)
      : [{ url: "", alt: "", sort_order: 0 }];

  return {
    id: product.id,
    title: product.title || "",
    slug: product.slug || "",
    description: product.description || "",
    price_cents: product.price_cents || 0,
    currency: product.currency || "USD",
    category_id: product.category_id || "",
    collection_id: product.collection_id || "",
    active: Boolean(product.active),
    images,
    variants,
    seoTitle: getMetafieldString(meta, "SEO Title"),
    seoDescription: getMetafieldString(meta, "SEO Description"),
    peachNumber: getMetafieldString(meta, "Peach Number"),
    brand: getMetafieldString(meta, "g:brand"),
    gtin: getMetafieldString(meta, "g:gtin"),
    mpn: getMetafieldString(meta, "g:mpn"),
    customLabel0: getMetafieldString(meta, "g:Custom_Label_0"),
    condition: getMetafieldString(meta, "g:Condition"),
    identifierExists: getMetafieldString(meta, "g:identifier_exists"),
    googleProductCategory: getMetafieldString(meta, "g:google_product_category"),
    productType: getMetafieldString(meta, "Product Type"),
    weight: getMetafieldString(meta, "Weight (g/oz)"),
    warrantyPolicy: getMetafieldString(meta, "Warranty/Return Policy (30 Days)"),
    capacityVolume: getMetafieldString(meta, "Capacity/Volume"),
    dimensions: getMetafieldString(meta, "Dimensions"),
    color: getMetafieldString(meta, "Color"),
    material: getMetafieldString(meta, "Material"),
    size: getMetafieldString(meta, "Size"),
    stylePattern: getMetafieldString(meta, "Style/Pattern"),
    finish: getMetafieldString(meta, "Finish"),
    sustainabilityScore: getMetafieldString(meta, "Sustainability Score"),
    directWebUrl: getMetafieldString(meta, "Direct_Web_URL"),
    tag13: getMetafieldString(meta, "Tag 13"),
    tag50: getMetafieldString(meta, "Tag 50"),
    customMetafieldsJson: JSON.stringify(
      Object.fromEntries(
        Object.entries(meta).filter(([key]) => !KNOWN_META_KEYS.has(key))
      ),
      null,
      2
    ),
  };
}

function buildMetafields(state: ProductEditorState): Record<string, string> {
  const metafields: Record<string, string> = {};
  const mappings: Array<[string, string]> = [
    ["SEO Title", state.seoTitle],
    ["SEO Description", state.seoDescription],
    ["Peach Number", state.peachNumber],
    ["g:brand", state.brand],
    ["g:gtin", state.gtin],
    ["g:mpn", state.mpn],
    ["g:Custom_Label_0", state.customLabel0],
    ["g:Condition", state.condition],
    ["g:identifier_exists", state.identifierExists],
    ["g:google_product_category", state.googleProductCategory],
    ["Product Type", state.productType],
    ["Weight (g/oz)", state.weight],
    ["Warranty/Return Policy (30 Days)", state.warrantyPolicy],
    ["Capacity/Volume", state.capacityVolume],
    ["Dimensions", state.dimensions],
    ["Color", state.color],
    ["Material", state.material],
    ["Size", state.size],
    ["Style/Pattern", state.stylePattern],
    ["Finish", state.finish],
    ["Sustainability Score", state.sustainabilityScore],
    ["Direct_Web_URL", state.directWebUrl],
    ["Tag 13", state.tag13],
    ["Tag 50", state.tag50],
  ];

  for (const [key, value] of mappings) {
    const normalized = value.trim();
    if (normalized) metafields[key] = normalized;
  }

  if (state.customMetafieldsJson.trim()) {
    try {
      const parsed = JSON.parse(state.customMetafieldsJson);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        for (const [key, value] of Object.entries(parsed)) {
          if (value !== null && value !== undefined && String(value).trim() !== "") {
            metafields[key] = String(value);
          }
        }
      }
    } catch {
      // Ignore invalid JSON; base mappings still save.
    }
  }

  return metafields;
}

export default function ProductSection() {
  const [view, setView] = useState<"list" | "edit" | "new">("list");
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (view === "list") {
      fetchProducts();
    }
  }, [view]);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = (await res.json()) as ProductRecord[];
      setProducts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to archive this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to archive product");
      await fetchProducts();
    } catch (e) {
      alert((e as Error).message);
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
          onClick={() => {
            setEditingProduct(null);
            setView("new");
          }}
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
                <th className="pb-4 font-bold">Category / Collection</th>
                <th className="pb-4 font-bold">Price</th>
                <th className="pb-4 font-bold">Variants</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-black/20 uppercase tracking-widest">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const primaryImg = product.product_images?.[0]?.url || "/images/logo-icon.png";
                  const variantCount = product.product_variants?.length || 0;
                  return (
                    <tr key={product.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                      <td className="py-4">
                        <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
                          <Image 
                            src={primaryImg} 
                            alt={product.title} 
                            width={48} 
                            height={64} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-[#111]">{product.title}</p>
                        <p className="text-[8px] text-black/40 uppercase tracking-widest mt-1">Slug: {product.slug}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-[10px]">{product.categories?.name || "Unassigned"}</p>
                        <p className="text-[10px] text-black/50">{product.collections?.name || "No collection"}</p>
                      </td>
                      <td className="py-4 font-light">${(product.price_cents / 100).toFixed(2)}</td>
                      <td className="py-4 font-light">{variantCount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-tighter ${product.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                          {product.active ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingProduct(product); setView("edit"); }} className="p-2 hover:text-[#a932bd] bg-white border border-black/5 rounded shadow-sm"><Edit size={12} /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 hover:text-red-500 bg-white border border-black/5 rounded shadow-sm"><Trash2 size={12} /></button>
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

function ProductEditor({ product, onBack }: { product: ProductRecord | null; onBack: () => void }) {
  const [state, setState] = useState<ProductEditorState>(product ? fromProduct(product) : EMPTY_EDITOR);
  const [categories, setCategories] = useState<Option[]>([]);
  const [collections, setCollections] = useState<Option[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  async function fetchOptions() {
    try {
      const [catRes, colRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/collections"),
      ]);
      const [catData, colData] = await Promise.all([
        catRes.json() as Promise<Option[]>,
        colRes.json() as Promise<Option[]>,
      ]);
      setCategories(catData);
      setCollections(colData);
    } catch {
      // noop
    }
  }

  function update<K extends keyof ProductEditorState>(key: K, value: ProductEditorState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  const priceDollars = useMemo(() => (state.price_cents / 100).toFixed(2), [state.price_cents]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...(state.id ? { id: state.id } : {}),
        title: state.title.trim(),
        slug: state.slug.trim(),
        description: state.description,
        price_cents: state.price_cents,
        currency: state.currency,
        category_id: state.category_id || null,
        collection_id: state.collection_id || null,
        active: state.active,
        variants: state.variants
          .filter((variant) => variant.sku.trim())
          .map((variant) => ({
            ...variant,
            sku: variant.sku.trim(),
            title: variant.title.trim() || "Default",
          })),
        images: state.images
          .filter((image) => image.url.trim())
          .map((image, index) => ({
            ...image,
            url: image.url.trim(),
            sort_order: index,
          })),
        metafields: buildMetafields(state),
      };

      const method = state.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to save product");
      }
      onBack();
    } catch (e) {
      alert((e as Error).message);
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
        <h3 className="text-xl font-light">{state.id ? "Edit Product Details" : "New Product"}</h3>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Basic Details</h4>
            <TextField label="Product Title" value={state.title} onChange={(value) => update("title", value)} required />
            <TextField label="URL Slug" value={state.slug} onChange={(value) => update("slug", value)} required />
            <div className="space-y-4">
              <ClaudeTextEditor
                label="Description"
                initialValue={state.description}
                onChange={(value: string) => update("description", value)}
              />
            </div>
          </div>

          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Media (Images)</h4>
            {state.images.map((image, index) => (
              <div key={`img-${index}`} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-7">
                  <TextField
                    label={`Image ${index + 1} URL`}
                    value={image.url}
                    onChange={(value) => {
                      const next = [...state.images];
                      next[index] = { ...next[index], url: value };
                      update("images", next);
                    }}
                  />
                </div>
                <div className="col-span-4">
                  <TextField
                    label="Alt Text"
                    value={image.alt || ""}
                    onChange={(value) => {
                      const next = [...state.images];
                      next[index] = { ...next[index], alt: value };
                      update("images", next);
                    }}
                  />
                </div>
                <div className="col-span-1 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = state.images.filter((_, i) => i !== index);
                      update("images", next.length > 0 ? next : [{ url: "", alt: "", sort_order: 0 }]);
                    }}
                    className="p-2 border border-black/10 rounded hover:text-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => update("images", [...state.images, { url: "", alt: "", sort_order: state.images.length }])}
              className="px-4 py-2 text-[10px] uppercase tracking-widest border border-black/10 rounded hover:bg-black hover:text-white transition-colors"
            >
              Add Image
            </button>
          </div>

          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Variants</h4>
            {state.variants.map((variant, index) => (
              <div key={`variant-${index}`} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-3">
                  <TextField
                    label="SKU"
                    value={variant.sku}
                    onChange={(value) => {
                      const next = [...state.variants];
                      next[index] = { ...next[index], sku: value };
                      update("variants", next);
                    }}
                    required
                  />
                </div>
                <div className="col-span-3">
                  <TextField
                    label="Title"
                    value={variant.title}
                    onChange={(value) => {
                      const next = [...state.variants];
                      next[index] = { ...next[index], title: value };
                      update("variants", next);
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <NumberField
                    label="Stock"
                    value={variant.stock}
                    onChange={(value) => {
                      const next = [...state.variants];
                      next[index] = { ...next[index], stock: value };
                      update("variants", next);
                    }}
                  />
                </div>
                <div className="col-span-3">
                  <TextField
                    label="Price ($)"
                    value={(variant.price_cents / 100).toFixed(2)}
                    onChange={(value) => {
                      const cents = Math.round((Number(value) || 0) * 100);
                      const next = [...state.variants];
                      next[index] = { ...next[index], price_cents: cents };
                      update("variants", next);
                    }}
                  />
                </div>
                <div className="col-span-1 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = state.variants.filter((_, i) => i !== index);
                      update("variants", next.length > 0 ? next : [{ sku: "", title: "Default", stock: 0, price_cents: state.price_cents, currency: state.currency }]);
                    }}
                    className="p-2 border border-black/10 rounded hover:text-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update("variants", [
                  ...state.variants,
                  { sku: "", title: "Default", stock: 0, price_cents: state.price_cents, currency: state.currency },
                ])
              }
              className="px-4 py-2 text-[10px] uppercase tracking-widest border border-black/10 rounded hover:bg-black hover:text-white transition-colors"
            >
              Add Variant
            </button>
          </div>

          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">SEO & Attributes</h4>
            <TextField label="SEO Title" value={state.seoTitle} onChange={(value) => update("seoTitle", value)} />
            <TextField label="SEO Description" value={state.seoDescription} onChange={(value) => update("seoDescription", value)} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Peach Number" value={state.peachNumber} onChange={(value) => update("peachNumber", value)} />
              <TextField label="Brand" value={state.brand} onChange={(value) => update("brand", value)} />
              <TextField label="GTIN" value={state.gtin} onChange={(value) => update("gtin", value)} />
              <TextField label="MPN" value={state.mpn} onChange={(value) => update("mpn", value)} />
              <TextField label="Google Custom Label 0" value={state.customLabel0} onChange={(value) => update("customLabel0", value)} />
              <TextField label="Condition" value={state.condition} onChange={(value) => update("condition", value)} />
              <TextField label="Identifier Exists" value={state.identifierExists} onChange={(value) => update("identifierExists", value)} />
              <TextField label="Google Product Category" value={state.googleProductCategory} onChange={(value) => update("googleProductCategory", value)} />
              <TextField label="Product Type" value={state.productType} onChange={(value) => update("productType", value)} />
              <TextField label="Weight (g/oz)" value={state.weight} onChange={(value) => update("weight", value)} />
              <TextField label="Warranty / Return Policy" value={state.warrantyPolicy} onChange={(value) => update("warrantyPolicy", value)} />
              <TextField label="Capacity / Volume" value={state.capacityVolume} onChange={(value) => update("capacityVolume", value)} />
              <TextField label="Dimensions" value={state.dimensions} onChange={(value) => update("dimensions", value)} />
              <TextField label="Color" value={state.color} onChange={(value) => update("color", value)} />
              <TextField label="Material" value={state.material} onChange={(value) => update("material", value)} />
              <TextField label="Size" value={state.size} onChange={(value) => update("size", value)} />
              <TextField label="Style / Pattern" value={state.stylePattern} onChange={(value) => update("stylePattern", value)} />
              <TextField label="Finish" value={state.finish} onChange={(value) => update("finish", value)} />
              <TextField label="Sustainability Score" value={state.sustainabilityScore} onChange={(value) => update("sustainabilityScore", value)} />
              <TextField label="Direct Web URL" value={state.directWebUrl} onChange={(value) => update("directWebUrl", value)} />
              <TextField label="Tag 13" value={state.tag13} onChange={(value) => update("tag13", value)} />
              <TextField label="Tag 50" value={state.tag50} onChange={(value) => update("tag50", value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Custom Metafields JSON</label>
              <textarea
                rows={7}
                value={state.customMetafieldsJson}
                onChange={(e) => update("customMetafieldsJson", e.target.value)}
                className="w-full bg-[#f8f8f8] border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] resize-y rounded-lg font-mono"
              />
              <p className="text-[9px] text-black/50 uppercase tracking-widest">
                Key/value JSON merged into metafields.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <div className="p-8 bg-[#fdfcf5] rounded-2xl border border-black/5 space-y-6 shadow-sm">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Configuration</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Price ($)</label>
                <input
                  type="text"
                  value={priceDollars}
                  onChange={(e) => update("price_cents", Math.round((Number(e.target.value) || 0) * 100))}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Category</label>
                <select
                  value={state.category_id}
                  onChange={(e) => update("category_id", e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Collection</label>
                <select
                  value={state.collection_id}
                  onChange={(e) => update("collection_id", e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg"
                >
                  <option value="">No collection</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-lg">
                <span className="text-[10px] uppercase tracking-widest font-bold">Visible on Store</span>
                <button
                  type="button"
                  onClick={() => update("active", !state.active)}
                  className={`w-10 h-5 rounded-full relative transition-all ${state.active ? "bg-[#a932bd]" : "bg-black/10"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.active ? "right-1" : "left-1"}`} />
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
            {state.id ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold">{label}</label>
      <input
        required={required}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] transition-colors"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full bg-[#f8f8f8] border-b border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] transition-colors"
      />
    </div>
  );
}
