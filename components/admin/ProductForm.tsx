"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ClaudeTextEditor } from "./ClaudeTextEditor";
import { createClient } from "@supabase/supabase-js";

type Option = { id: string; name: string };

type ProductFormProps = {
  categories: Option[];
  collections: Option[];
};

// Initialize Supabase client for browser-side uploads
function getSupabaseBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function ProductForm({ categories, collections }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File): Promise<string> {
    const supabase = getSupabaseBrowserClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image_file") as File;
    
    let image_url = formData.get("image_url") as string;

    // Upload image file if provided
    if (imageFile && imageFile.size > 0) {
      setUploading(true);
      try {
        image_url = await uploadImage(imageFile);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price_cents: Math.round(parseFloat(formData.get("price") as string) * 100),
      category_id: formData.get("category_id") as string || null,
      collection_id: formData.get("collection_id") as string || null,
      active: formData.get("active") === "on",
      sku: formData.get("sku") as string,
      image_url,
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-8 bg-white p-8 border border-[#e7e7e7]">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 text-sm font-light">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Product Title</label>
            <input 
              required
              name="title"
              type="text"
              className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none"
              placeholder="e.g. Silk Scarf"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">URL Slug</label>
            <input 
              required
              name="slug"
              type="text"
              className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none"
              placeholder="e.g. silk-scarf"
            />
          </div>
        </div>

        <div className="space-y-4">
          <ClaudeTextEditor
            label="Description"
            name="description"
            initialValue=""
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Organization & Pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Base Price (USD)</label>
            <input 
              required
              name="price"
              type="number"
              min="0"
              step="0.01"
              className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Category</label>
            <select name="category_id" className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] bg-white focus:border-[#a932bd] focus:outline-none">
              <option value="">None</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Collection</label>
            <select name="collection_id" className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] bg-white focus:border-[#a932bd] focus:outline-none">
              <option value="">None</option>
              {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Primary Variant & Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Initial SKU</label>
            <input 
              required
              name="sku"
              type="text"
              className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none"
              placeholder="e.g. SCARF-SILK-01"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Primary Image</label>
            <div className="border-2 border-dashed border-[#e7e7e7] rounded-lg p-4 hover:border-[#a932bd] transition-colors">
              <input 
                ref={fileInputRef}
                name="image_file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-[#555555] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:uppercase file:tracking-widest file:bg-[#a932bd] file:text-white hover:file:bg-[#921fa6]"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="h-32 w-auto object-contain" />
                </div>
              )}
            </div>
            <p className="text-xs text-[#555555] mt-1">Or enter image URL below</p>
            <input 
              name="image_url"
              type="url"
              className="w-full border border-[#e7e7e7] p-3 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-[#e7e7e7]">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="active" defaultChecked className="w-5 h-5 accent-[#a932bd]" />
          <span className="text-sm uppercase tracking-widest text-[#111111] font-light">Active (Visible on Store)</span>
        </label>
      </div>

      <div className="pt-8">
        <button 
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-[#a932bd] py-5 text-sm uppercase tracking-widest font-light text-white transition-all hover:bg-[#921fa6] disabled:opacity-50"
        >
          {loading || uploading ? (uploading ? "Uploading Image..." : "Saving...") : "Create Product"}
        </button>
      </div>
    </form>
  );
}
