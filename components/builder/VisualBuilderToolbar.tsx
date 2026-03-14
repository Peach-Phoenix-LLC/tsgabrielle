"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Edit3,
  Save,
  X,
  Eye,
  Loader2,
  Palette,
  ImageIcon,
  Layout,
  Undo2,
  Redo2,
  Plus,
  UploadCloud,
  Search,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import { useVisualBuilder } from "./VisualBuilderProvider";
import AddSectionPanel from "./panels/AddSectionPanel";
import PageStructurePanel from "./panels/PageStructurePanel";
import DesignSettingsPanel from "./panels/DesignSettingsPanel";
import MediaManagerPanel from "./panels/MediaManagerPanel";
import type { SectionDefinition } from "@/lib/section-registry";
import type { BuilderSection } from "@/lib/builder-types";

type PanelType = "sections" | "design" | "media" | "structure" | "pages" | "seo" | null;

export function VisualBuilderToolbar() {
  const {
    isEditMode,
    setIsEditMode,
    pendingChanges,
    saveChanges,
    isSaving,
    undo,
    redo,
    canUndo,
    canRedo,
    exitBuilder,
  } = useVisualBuilder();

  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [pageSections, setPageSections] = useState<BuilderSection[]>([]);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");

  const hasChanges = Object.keys(pendingChanges).length > 0;
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  // Load page sections
  const loadSections = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/builder/pages?path=${encodeURIComponent(currentPath)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.draft_layout?.sections) {
          setPageSections(data.draft_layout.sections);
        }
        if (data?.seo_title) setSeoTitle(data.seo_title);
        if (data?.seo_description) setSeoDesc(data.seo_description);
      }
    } catch {
      // ignore
    }
  }, [currentPath]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const addSection = async (def: SectionDefinition) => {
    const newSection: BuilderSection = {
      id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: def.type,
      props: { ...def.defaultProps },
      visible: true,
    };
    const updated = [...pageSections, newSection];
    setPageSections(updated);
    await saveSections(updated);
  };

  const reorderSections = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pageSections.length) return;
    const updated = [...pageSections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPageSections(updated);
    await saveSections(updated);
  };

  const deleteSection = async (sectionId: string) => {
    const updated = pageSections.filter((s) => s.id !== sectionId);
    setPageSections(updated);
    await saveSections(updated);
  };

  const toggleSectionVisibility = async (sectionId: string) => {
    const updated = pageSections.map((s) =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    setPageSections(updated);
    await saveSections(updated);
  };

  const saveSections = async (sections: BuilderSection[]) => {
    try {
      await fetch("/api/admin/builder/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: currentPath,
          title: document.title || currentPath,
          draft_layout: { page: currentPath, title: document.title, sections },
        }),
      });
    } catch (e) {
      console.error("Failed to save sections:", e);
    }
  };

  const publishPage = async () => {
    try {
      await saveChanges();
      const res = await fetch("/api/admin/builder/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: currentPath }),
      });
      if (!res.ok) throw new Error("Publish failed");
      alert("Page published successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to publish page");
    }
  };

  const saveSeo = async () => {
    try {
      await fetch("/api/admin/builder/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: currentPath,
          seo_title: seoTitle,
          seo_description: seoDesc,
        }),
      });
      alert("SEO data saved");
    } catch {
      alert("Failed to save SEO data");
    }
  };

  // Apply viewport preview
  useEffect(() => {
    const main = document.querySelector("main") || document.querySelector("#__next");
    if (!main) return;
    const el = main as HTMLElement;
    if (viewport === "desktop") {
      el.style.maxWidth = "";
      el.style.margin = "";
    } else if (viewport === "tablet") {
      el.style.maxWidth = "768px";
      el.style.margin = "0 auto";
    } else {
      el.style.maxWidth = "375px";
      el.style.margin = "0 auto";
    }
    return () => {
      el.style.maxWidth = "";
      el.style.margin = "";
    };
  }, [viewport]);

  return (
    <>
      {/* Main Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#111111] text-white px-3 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20">
        {/* Edit Mode Toggle */}
        <button
          onClick={() => setIsEditMode(true)}
          className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            isEditMode ? "bg-[#a932bd] text-white shadow" : "text-white/60 hover:text-white"
          }`}
        >
          <Edit3 size={14} /> Edit Page
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActivePanel(activePanel === "sections" ? null : "sections")}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              activePanel === "sections" ? "bg-[#a932bd] text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Plus size={14} /> Add Section
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "design" ? null : "design")}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              activePanel === "design" ? "bg-[#a932bd] text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Palette size={14} /> Design
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "media" ? null : "media")}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              activePanel === "media" ? "bg-[#a932bd] text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <ImageIcon size={14} /> Media
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "structure" ? null : "structure")}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              activePanel === "structure" ? "bg-[#a932bd] text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Layout size={14} /> Structure
          </button>
          <button
            onClick={() => setActivePanel(activePanel === "seo" ? null : "seo")}
            className={`px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
              activePanel === "seo" ? "bg-[#a932bd] text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Search size={14} /> SEO
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded-full transition-all ${
            canUndo ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
          title="Undo"
        >
          <Undo2 size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded-full transition-all ${
            canRedo ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
          title="Redo"
        >
          <Redo2 size={14} />
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Responsive Preview */}
        <div className="flex items-center gap-0.5">
          {[
            { key: "desktop" as const, icon: Monitor },
            { key: "tablet" as const, icon: Tablet },
            { key: "mobile" as const, icon: Smartphone },
          ].map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              className={`p-2 rounded-full transition-all ${
                viewport === key
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
              title={key}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Preview Mode */}
        <button
          onClick={() => setIsEditMode(false)}
          className={`p-2 rounded-full transition-all ${
            !isEditMode ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
          }`}
          title="Preview"
        >
          <Eye size={14} />
        </button>

        {/* Save Draft */}
        <button
          onClick={saveChanges}
          disabled={!hasChanges || isSaving}
          className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all ${
            hasChanges
              ? "bg-green-500 hover:bg-green-600 text-white shadow"
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {isSaving ? "..." : `Save${hasChanges ? ` (${Object.keys(pendingChanges).length})` : ""}`}
        </button>

        {/* Publish */}
        <button
          onClick={publishPage}
          className="px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-[#a932bd] hover:bg-[#921fa6] text-white shadow transition-all"
        >
          <UploadCloud size={14} /> Publish
        </button>

        {/* Exit */}
        <button
          onClick={() => {
            if (!hasChanges || confirm("Exit builder? Unsaved changes will be lost.")) {
              exitBuilder();
            }
          }}
          className="px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all"
        >
          <X size={14} /> Exit
        </button>
      </div>

      {/* Side Panel */}
      {activePanel && (
        <div className="fixed right-6 bottom-24 z-[9998] w-[360px] max-h-[70vh] rounded-2xl border border-white/10 bg-[#111111] text-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
              {activePanel === "sections" && "Add Section"}
              {activePanel === "design" && "Design Settings"}
              {activePanel === "media" && "Media Manager"}
              {activePanel === "structure" && "Page Structure"}
              {activePanel === "pages" && "Manage Pages"}
              {activePanel === "seo" && "SEO & Meta"}
            </span>
            <button
              onClick={() => setActivePanel(null)}
              className="text-white/50 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-4 text-sm text-white/70 overflow-y-auto">
            {activePanel === "sections" && (
              <AddSectionPanel onAddSection={addSection} />
            )}

            {activePanel === "structure" && (
              <PageStructurePanel
                sections={pageSections}
                onReorder={reorderSections}
                onDelete={deleteSection}
                onToggleVisibility={toggleSectionVisibility}
                currentPage={currentPath}
              />
            )}

            {activePanel === "design" && <DesignSettingsPanel />}

            {activePanel === "media" && <MediaManagerPanel />}

            {activePanel === "pages" && (
              <div className="space-y-4">
                <button className="w-full bg-[#a932bd] py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest text-white">
                  + Create New CMS Page
                </button>
                <div className="space-y-2">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Store Pages</p>
                  {["Home", "The Brand", "About", "Sustainability", "FAQ"].map((p) => (
                    <div key={p} className="flex items-center justify-between p-2 rounded bg-white/5 text-xs">
                      <span>{p}</span>
                      <span className="text-[#a932bd] cursor-pointer">Edit</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === "seo" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">URL Handle</label>
                  <input type="text" value={currentPath} readOnly className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Enter SEO Title"
                    className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none focus:border-[#a932bd]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    placeholder="Enter description..."
                    className="w-full bg-white/5 border border-white/10 p-2 rounded text-xs outline-none focus:border-[#a932bd]"
                  />
                </div>
                <button
                  onClick={saveSeo}
                  className="w-full bg-green-600 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest text-white"
                >
                  Save Meta Data
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
