"use client";

import React, { useEffect, useState } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { RichTextEditor } from "../RichTextEditor";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  hero_image_1: string | null;
  hero_image_2: string | null;
  hero_image_3: string | null;
  hero_description_1: string | null;
  hero_description_2: string | null;
  hero_description_3: string | null;
  background_color: string | null;
  text_color: string | null;
  product_grid_background_color: string | null;
  product_grid_text_color: string | null;
  product_grid_accent_color: string | null;
  hero_overlay_color: string | null;
};

type CategoryForm = {
  name: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  seo_title: string;
  seo_description: string;
  tagsInput: string;
  hero_image_1: string;
  hero_image_2: string;
  hero_image_3: string;
  hero_description_1: string;
  hero_description_2: string;
  hero_description_3: string;
  background_color: string;
  text_color: string;
  product_grid_background_color: string;
  product_grid_text_color: string;
  product_grid_accent_color: string;
  hero_overlay_color: string;
};

const EMPTY_FORM: CategoryForm = {
  name: "",
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  seo_title: "",
  seo_description: "",
  tagsInput: "",
  hero_image_1: "",
  hero_image_2: "",
  hero_image_3: "",
  hero_description_1: "",
  hero_description_2: "",
  hero_description_3: "",
  background_color: "#f9f9f9",
  text_color: "#111111",
  product_grid_background_color: "#ffffff",
  product_grid_text_color: "#111111",
  product_grid_accent_color: "#a932bd",
  hero_overlay_color: "rgba(0,0,0,0.2)",
};

export default function CategorySection() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState<CategoryForm>(EMPTY_FORM);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data as CategoryItem[]);
      } else {
        setItems([]);
      }
    } catch {
      // noop
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setEditingItem({} as CategoryItem);
    setFormData(EMPTY_FORM);
  }

  function startEdit(item: CategoryItem) {
    setEditingItem(item);
    setFormData({
      name: item.name ?? "",
      slug: item.slug ?? "",
      title: item.title ?? item.name ?? "",
      subtitle: item.subtitle ?? "",
      description: item.description ?? "",
      seo_title: item.seo_title ?? "",
      seo_description: item.seo_description ?? "",
      tagsInput: (item.tags ?? []).join(", "),
      hero_image_1: item.hero_image_1 ?? "",
      hero_image_2: item.hero_image_2 ?? "",
      hero_image_3: item.hero_image_3 ?? "",
      hero_description_1: item.hero_description_1 ?? "",
      hero_description_2: item.hero_description_2 ?? "",
      hero_description_3: item.hero_description_3 ?? "",
      background_color: item.background_color ?? "#f9f9f9",
      text_color: item.text_color ?? "#111111",
      product_grid_background_color: item.product_grid_background_color ?? "#ffffff",
      product_grid_text_color: item.product_grid_text_color ?? "#111111",
      product_grid_accent_color: item.product_grid_accent_color ?? "#a932bd",
      hero_overlay_color: item.hero_overlay_color ?? "rgba(0,0,0,0.2)",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tags = formData.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 25);

    try {
      const method = editingItem?.id ? "PUT" : "POST";
      const body = {
        ...(editingItem?.id ? { id: editingItem.id } : {}),
        ...formData,
        tags,
      };

      const res = await fetch("/api/admin/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save category");

      setEditingItem(null);
      setFormData(EMPTY_FORM);
      await fetchItems();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    try {
      await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      await fetchItems();
    } catch {
      // noop
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-[#a932bd]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h3 className="text-xl font-light">Store Categories</h3>
        {!editingItem && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-black transition-all"
          >
            <Plus size={14} /> New Category
          </button>
        )}
      </header>

      {editingItem && (
        <form onSubmit={handleSubmit} className="bg-[#fdfcf5] p-8 rounded-2xl border border-black/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} required />
            <Field label="Slug" value={formData.slug} onChange={(value) => setFormData({ ...formData, slug: value })} required />
            <Field label="Title" value={formData.title} onChange={(value) => setFormData({ ...formData, title: value })} />
            <Field label="Subtitle" value={formData.subtitle} onChange={(value) => setFormData({ ...formData, subtitle: value })} />
          </div>

          <TextAreaField
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="SEO Title" value={formData.seo_title} onChange={(value) => setFormData({ ...formData, seo_title: value })} />
            <Field label="Tags (max 25, comma separated)" value={formData.tagsInput} onChange={(value) => setFormData({ ...formData, tagsInput: value })} />
          </div>

          <TextAreaField
            label="SEO Description"
            value={formData.seo_description}
            onChange={(value) => setFormData({ ...formData, seo_description: value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Hero Image 1 URL" value={formData.hero_image_1} onChange={(value) => setFormData({ ...formData, hero_image_1: value })} />
            <Field label="Hero Image 2 URL" value={formData.hero_image_2} onChange={(value) => setFormData({ ...formData, hero_image_2: value })} />
            <Field label="Hero Image 3 URL" value={formData.hero_image_3} onChange={(value) => setFormData({ ...formData, hero_image_3: value })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextAreaField label="Hero Description 1" value={formData.hero_description_1} onChange={(value) => setFormData({ ...formData, hero_description_1: value })} />
            <TextAreaField label="Hero Description 2" value={formData.hero_description_2} onChange={(value) => setFormData({ ...formData, hero_description_2: value })} />
            <TextAreaField label="Hero Description 3" value={formData.hero_description_3} onChange={(value) => setFormData({ ...formData, hero_description_3: value })} />
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold mb-2">Category Colors</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Background Color" value={formData.background_color} onChange={(value) => setFormData({ ...formData, background_color: value })} />
              <Field label="Text Color" value={formData.text_color} onChange={(value) => setFormData({ ...formData, text_color: value })} />
              <Field label="Hero Overlay Color" value={formData.hero_overlay_color} onChange={(value) => setFormData({ ...formData, hero_overlay_color: value })} />
              <Field label="Product Grid Background" value={formData.product_grid_background_color} onChange={(value) => setFormData({ ...formData, product_grid_background_color: value })} />
              <Field label="Product Grid Text" value={formData.product_grid_text_color} onChange={(value) => setFormData({ ...formData, product_grid_text_color: value })} />
              <Field label="Product Grid Accent" value={formData.product_grid_accent_color} onChange={(value) => setFormData({ ...formData, product_grid_accent_color: value })} />
            </div>
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
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-6 bg-white border border-black/5 rounded-xl hover:shadow-sm transition-all group">
            <div>
              <p className="font-medium text-[#111]">{item.name}</p>
              <p className="text-[8px] text-black/40 uppercase tracking-widest mt-1">Slug: {item.slug}</p>
              <p className="text-[8px] text-black/40 uppercase tracking-widest mt-1">Tags: {(item.tags ?? []).length}/25</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(item)} className="p-2 hover:text-[#a932bd] bg-gray-50 rounded">
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

function Field({
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
    <div className="space-y-1">
      <label className="text-[10px] uppercase font-bold">{label}</label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-black/10 px-3 py-2 text-xs outline-none"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <RichTextEditor
        label={label}
        initialValue={value}
        onChange={onChange}
      />
    </div>
  );
}
