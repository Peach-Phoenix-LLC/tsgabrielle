"use client";

import React from "react";
import {
  Sparkles,
  LayoutPanelLeft,
  AlignLeft,
  Grid3x3,
  LayoutGrid,
  GalleryHorizontal,
  Megaphone,
  Bell,
  Play,
  Mail,
  Code,
} from "lucide-react";
import { SECTION_DEFINITIONS } from "@/lib/section-registry";
import type { SectionDefinition } from "@/lib/section-registry";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles,
  LayoutPanelLeft,
  AlignLeft,
  Grid3x3,
  LayoutGrid,
  GalleryHorizontal,
  Megaphone,
  Bell,
  Play,
  Mail,
  Code,
};

const CATEGORY_LABELS: Record<string, string> = {
  hero: "Hero",
  content: "Content",
  commerce: "Commerce",
  media: "Media",
  engagement: "Engagement",
  custom: "Custom",
};

interface AddSectionPanelProps {
  onAddSection: (definition: SectionDefinition) => void;
  insertPosition?: number;
}

export default function AddSectionPanel({
  onAddSection,
  insertPosition,
}: AddSectionPanelProps) {
  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <div className="space-y-4">
      {insertPosition !== undefined && (
        <p className="text-[10px] text-white/40 uppercase tracking-widest">
          Insert at position {insertPosition + 1}
        </p>
      )}
      {categories.map((cat) => {
        const sections = SECTION_DEFINITIONS.filter((d) => d.category === cat);
        if (sections.length === 0) return null;
        return (
          <div key={cat}>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
              {CATEGORY_LABELS[cat]}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((def) => {
                const Icon = ICON_MAP[def.icon] || Sparkles;
                return (
                  <button
                    key={def.type}
                    onClick={() => onAddSection(def)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-[#a932bd]/20 border border-transparent hover:border-[#a932bd]/40 transition-all text-center"
                  >
                    <Icon size={20} className="text-[#a932bd]" />
                    <span className="text-[10px] uppercase tracking-widest text-white/70">
                      {def.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
