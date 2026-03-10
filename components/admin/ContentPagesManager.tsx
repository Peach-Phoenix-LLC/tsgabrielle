"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Upload, Save, Loader2, Trash2, Plus, Edit2 } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageContent = {
  id: string;
  page_path: string;
  content_key: string;
  content_type: string;
  content_value: string;
  sort_order: number;
};

const PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/about-gabrielle", label: "About Gabrielle" },
  { path: "/the-brand", label: "The Brand" },
  { path: "/meet-tsgabrielle", label: "Meet tsgabrielle" },
  { path: "/sustainability", label: "Sustainability" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact-tsgabrielle", label: "Contact" },
  { path: "/legal-hub", label: "Legal Hub" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" },
  { path: "/refund-policy", label: "Refund Policy" },
  { path: "/shipping-policy", label: "Shipping Policy" },
  { path: "/cookie-policy", label: "Cookie Policy" },
  { path: "/peaches", label: "Peaches" },
  { path: "/your-inclusive-store", label: "Your Inclusive Store" },
  { path: "/store-directory", label: "Store Directory" },
  { path: "/the-blogs", label: "The Blogs" },
  { path: "/videos-by-youtube", label: "Videos" },
  { path: "/follow-tsgabrielle", label: "Follow Us" },
  { path: "/tsgabrielle-worldwide", label: "Worldwide" },
  { path: "/adidas-x-tsgabrielle", label: "Adidas Collab" },
  { path: "/champion-heritage", label: "Champion Collab" },
  { path: "/columbia-sportswear", label: "Columbia Collab" },
  { path: "/under-armour-performance", label: "Under Armour Collab" },
];

export default function ContentPagesManager() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingItem, setEditingItem] = useState<PageContent | null>(null);

  useEffect(() => {
    fetchContents();
  }, [selectedPage]);

  async function fetchContents() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/page-content?page_path=${selectedPage}`);
      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `content/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function saveContent(content: Partial<PageContent>) {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_path: selectedPage,
          content_key: content.content_key,
          content_type: content.content_type,
          content_value: content.content_value,
          sort_order: content.sort_order || 0,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      await fetchContents();
      setEditingItem(null);
      setMessage({ type: "success", text: "Content saved!" });
    } catch (error) {
      setMessage({ type: "error", text: "Error saving content" });
    } finally {
      setSaving(false);
    }
  }

  async function deleteContent(id: string) {
    if (!confirm("Delete this content?")) return;
    try {
      await fetch(`/api/admin/page-content?id=${id}`, { method: "DELETE" });
      await fetchContents();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, key: string, type: string) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setEditingItem({ ...editingItem!, content_key: key, content_type: type, content_value: url } as PageContent);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploading(false);
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
          {message.text}
        </div>
      )}

      {/* Page Selector */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Select Page</label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full border border-[#e7e7e7] p-3 text-base font-light bg-white"
        >
          {PAGES.map((page) => (
            <option key={page.path} value={page.path}>
              {page.label} ({page.path})
            </option>
          ))}
        </select>
      </div>

      {/* Existing Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-light">Current Content</h3>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : contents.length === 0 ? (
          <p className="text-gray-400 text-sm">No content yet. Add some below.</p>
        ) : (
          <div className="space-y-4">
            {contents.map((item) => (
              <div key={item.id} className="border border-[#e7e7e7] p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-[#a932bd]/10 text-[#a932bd] px-2 py-1 rounded">
                        {item.content_key}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.content_type}
                      </span>
                    </div>
                    {item.content_type === "image" ? (
                      <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                        <Image 
                          src={item.content_value} 
                          alt={item.content_key} 
                          width={128} 
                          height={128} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <p className="text-sm line-clamp-3">{item.content_value}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-[#a932bd] hover:bg-[#a932bd]/10 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteContent(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Content Form */}
      <div className="border-t border-[#e7e7e7] pt-6 space-y-4">
        <h3 className="text-lg font-light">{editingItem ? "Edit Content" : "Add New Content"}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Content Key</label>
            <input
              type="text"
              placeholder="e.g., hero_title, section_1_text, banner_image"
              value={editingItem?.content_key || ""}
              onChange={(e) => setEditingItem({ ...editingItem!, content_key: e.target.value } as PageContent)}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Content Type</label>
            <select
              value={editingItem?.content_type || "text"}
              onChange={(e) => setEditingItem({ ...editingItem!, content_type: e.target.value } as PageContent)}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light bg-white"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="html">HTML</option>
            </select>
          </div>
        </div>

        {editingItem?.content_type === "image" ? (
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Image</label>
            <div className="flex items-center gap-4">
              {editingItem?.content_value && (
                <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden">
                  <Image 
                    src={editingItem.content_value} 
                    alt="Preview" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload size={16} />}
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, editingItem.content_key || "", editingItem.content_type || "image")}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="text"
              placeholder="Or enter image URL"
              value={editingItem?.content_value || ""}
              onChange={(e) => setEditingItem({ ...editingItem!, content_value: e.target.value } as PageContent)}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <RichTextEditor
              label={editingItem?.content_type === "html" ? "HTML Content" : "Text Content"}
              initialValue={editingItem?.content_value || ""}
              onChange={(val: string) => setEditingItem({ ...editingItem!, content_value: val } as PageContent)}
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => editingItem && saveContent(editingItem)}
            disabled={saving || !editingItem?.content_key}
            className="flex items-center gap-2 px-6 py-3 bg-[#a932bd] text-white text-sm uppercase tracking-widest rounded hover:bg-[#921fa6] disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving..." : "Save Content"}
          </button>
          <button
            onClick={() => setEditingItem(null)}
            className="px-6 py-3 border border-[#e7e7e7] text-sm uppercase tracking-widest rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Quick Keys Reference */}
      <div className="border-t border-[#e7e7e7] pt-6">
        <h3 className="text-sm font-light mb-4">Recommended Content Keys</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["hero_title", "hero_subtitle", "section_1_title", "section_1_text", "banner_image", "footer_text", "meta_description"].map((key) => (
            <button
              key={key}
              onClick={() => setEditingItem({ ...editingItem!, content_key: key } as PageContent)}
              className="text-xs bg-gray-100 px-3 py-2 rounded text-left hover:bg-gray-200"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
