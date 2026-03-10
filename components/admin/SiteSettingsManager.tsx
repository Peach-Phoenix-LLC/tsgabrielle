"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Upload, Save, Loader2, Trash2, Plus, GripVertical } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Settings = {
  site_name: string;
  site_tagline: string;
  site_logo: string;
  site_favicon: string;
  contact_email: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  twitter_url: string;
  pinterest_url: string;
  linkedin_url: string;
  snapchat_url: string;
};

type HeroSlide = {
  id?: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  sort_order: number;
  active: boolean;
};

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    site_name: "",
    site_tagline: "",
    site_logo: "",
    site_favicon: "",
    contact_email: "",
    facebook_url: "",
    instagram_url: "",
    tiktok_url: "",
    youtube_url: "",
    twitter_url: "",
    pinterest_url: "",
    linkedin_url: "",
    snapchat_url: "",
  });
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New slide form
  const [newSlide, setNewSlide] = useState<Partial<HeroSlide>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchSlides();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSlides() {
    try {
      const res = await fetch("/api/admin/hero-slides");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Error saving settings" });
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `site/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setSettings({ ...settings, site_logo: url });
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploading(false);
  }

  async function handleFaviconUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setSettings({ ...settings, site_favicon: url });
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploading(false);
  }

  async function handleSlideImageUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      const newSlides = [...slides];
      newSlides[index] = { ...newSlides[index], image_url: url };
      setSlides(newSlides);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploading(false);
  }

  async function handleNewSlideImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setNewSlide({ ...newSlide, image_url: url });
    } catch (error) {
      console.error("Upload error:", error);
    }
    setUploading(false);
  }

  async function saveSlide(slide: HeroSlide) {
    try {
      const res = await fetch("/api/admin/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      if (!res.ok) throw new Error("Failed to save slide");
      await fetchSlides();
      setMessage({ type: "success", text: "Slide saved!" });
    } catch (error) {
      console.error("Error saving slide:", error);
    }
  }

  async function deleteSlide(id: string) {
    if (!confirm("Delete this slide?")) return;
    try {
      await fetch(`/api/admin/hero-slides?id=${id}`, { method: "DELETE" });
      await fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  }

  async function addNewSlide() {
    if (!newSlide.title || !newSlide.image_url) {
      setMessage({ type: "error", text: "Title and image are required" });
      return;
    }
    await saveSlide({
      title: newSlide.title,
      subtitle: newSlide.subtitle || "",
      image_url: newSlide.image_url,
      link_url: newSlide.link_url || "",
      sort_order: slides.length + 1,
      active: true,
    });
    setNewSlide({});
    setMessage({ type: "success", text: "Slide added!" });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
          {message.text}
        </div>
      )}

      {/* Site Identity */}
      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Site Identity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Site Name</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Tagline</label>
            <input
              type="text"
              value={settings.site_tagline}
              onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Contact Email</label>
          <input
            type="email"
            value={settings.contact_email}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
            className="w-full border border-[#e7e7e7] p-3 text-base font-light"
          />
        </div>
      </div>

      {/* Logo & Favicon */}
      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Logo & Favicon</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Site Logo</label>
            <div className="flex items-center gap-4">
              {settings.site_logo && (
                <Image src={settings.site_logo} alt="Logo" width={128} height={64} className="h-16 w-auto object-contain" />
              )}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload size={16} />}
                Upload
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>
            <input
              type="text"
              placeholder="Or enter logo URL"
              value={settings.site_logo}
              onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light mt-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Favicon</label>
            <div className="flex items-center gap-4">
              {settings.site_favicon && (
                <Image src={settings.site_favicon} alt="Favicon" width={32} height={32} className="h-8 w-8 object-contain" />
              )}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload size={16} />}
                Upload
                <input type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
              </label>
            </div>
            <input
              type="text"
              placeholder="Or enter favicon URL"
              value={settings.site_favicon}
              onChange={(e) => setSettings({ ...settings, site_favicon: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light mt-2"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-6">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Social Media Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Facebook URL</label>
            <input
              type="url"
              value={settings.facebook_url}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Instagram URL</label>
            <input
              type="url"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">TikTok URL</label>
            <input
              type="url"
              value={settings.tiktok_url}
              onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">YouTube URL</label>
            <input
              type="url"
              value={settings.youtube_url}
              onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Twitter/X URL</label>
            <input
              type="url"
              value={settings.twitter_url}
              onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Pinterest URL</label>
            <input
              type="url"
              value={settings.pinterest_url}
              onChange={(e) => setSettings({ ...settings, pinterest_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">LinkedIn URL</label>
            <input
              type="url"
              value={settings.linkedin_url}
              onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-[#555555] font-light">Snapchat URL</label>
            <input
              type="url"
              value={settings.snapchat_url}
              onChange={(e) => setSettings({ ...settings, snapchat_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base font-light"
            />
          </div>
        </div>
      </div>

      <button
        onClick={saveSettings}
        disabled={saving}
        className="flex items-center justify-center gap-2 w-full bg-[#a932bd] py-5 text-sm uppercase tracking-widest font-light text-white transition-all hover:bg-[#921fa6] disabled:opacity-50"
      >
        {saving ? <Loader2 className="animate-spin" /> : <Save size={16} />}
        {saving ? "Saving..." : "Save Settings"}
      </button>

      {/* Hero Slides */}
      <div className="space-y-6 pt-8 border-t border-[#e7e7e7]">
        <h2 className="text-xl font-light text-[#111111] border-b border-[#e7e7e7] pb-4">Hero Slides</h2>
        
        <div className="grid gap-6">
          {slides.map((slide, index) => (
            <div key={slide.id || index} className="border border-[#e7e7e7] p-4 rounded-lg">
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  {slide.image_url && <Image src={slide.image_url} alt={slide.title} width={128} height={80} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-1 px-2 py-1 bg-[#a932bd]/10 text-[#a932bd] text-xs rounded hover:bg-[#a932bd]/20">
                      <Upload size={12} />
                      Change Image
                      <input type="file" accept="image/*" onChange={(e) => handleSlideImageUpload(e, index)} className="hidden" />
                    </label>
                    <label className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-xs rounded cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={slide.active}
                        onChange={(e) => {
                          const newSlides = [...slides];
                          newSlides[index] = { ...newSlides[index], active: e.target.checked };
                          setSlides(newSlides);
                        }}
                        className="hidden" 
                      />
                      {slide.active ? "Active" : "Inactive"}
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={slide.title}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...newSlides[index], title: e.target.value };
                      setSlides(newSlides);
                    }}
                    className="w-full border border-[#e7e7e7] p-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle"
                    value={slide.subtitle}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...newSlides[index], subtitle: e.target.value };
                      setSlides(newSlides);
                    }}
                    className="w-full border border-[#e7e7e7] p-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Link URL (e.g., /collections/paris)"
                    value={slide.link_url}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...newSlides[index], link_url: e.target.value };
                      setSlides(newSlides);
                    }}
                    className="w-full border border-[#e7e7e7] p-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveSlide(slide)}
                      className="px-3 py-1 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]"
                    >
                      Save
                    </button>
                    {slide.id && (
                      <button
                        onClick={() => deleteSlide(slide.id!)}
                        className="px-3 py-1 bg-red-50 text-red-600 text-xs uppercase tracking-widest rounded hover:bg-red-100"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Slide */}
        <div className="border-2 border-dashed border-[#e7e7e7] p-6 rounded-lg">
          <h3 className="text-sm font-light mb-4">Add New Slide</h3>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {newSlide.image_url ? (
                    <Image src={newSlide.image_url} alt="Preview" width={128} height={80} className="w-full h-full object-cover" />
                  ) : (

                  <Upload size={24} className="text-gray-400" />
                )}
              </div>
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]">
                <Upload size={16} />
                Upload Image
                <input type="file" accept="image/*" onChange={handleNewSlideImageUpload} className="hidden" />
              </label>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={newSlide.title || ""}
              onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={newSlide.subtitle || ""}
              onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base"
            />
            <input
              type="text"
              placeholder="Link URL"
              value={newSlide.link_url || ""}
              onChange={(e) => setNewSlide({ ...newSlide, link_url: e.target.value })}
              className="w-full border border-[#e7e7e7] p-3 text-base"
            />
            <button
              onClick={addNewSlide}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#a932bd] text-white text-xs uppercase tracking-widest rounded hover:bg-[#921fa6]"
            >
              <Plus size={16} />
              Add Slide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
