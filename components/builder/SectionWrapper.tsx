"use client";

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  GripVertical,
} from "lucide-react";
import { getSectionDefinition } from "@/lib/section-registry";
import type { BuilderSection } from "@/lib/builder-types";

interface SectionWrapperProps {
  section: BuilderSection;
  index: number;
  total: number;
  children: React.ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onToggleVisibility?: () => void;
}

export default function SectionWrapper({
  section,
  children,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  onToggleVisibility,
}: SectionWrapperProps) {
  const [hovered, setHovered] = useState(false);
  const def = getSectionDefinition(section.type);
  const label = def?.label || section.type;

  return (
    <div
      className={`relative group transition-all ${
        !section.visible ? "opacity-40" : ""
      } ${hovered ? "ring-2 ring-[#a932bd] ring-offset-2" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Section Controls Bar */}
      {hovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-[#111111] text-white rounded-full px-2 py-1 shadow-2xl border border-white/20">
          <GripVertical size={14} className="text-white/40 cursor-grab" />

          <button
            onClick={onMoveUp}
            disabled={!onMoveUp}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!onMoveDown}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move down"
          >
            <ChevronDown size={14} />
          </button>

          <span className="px-2 text-[10px] uppercase tracking-widest text-white/60 border-x border-white/10">
            {label}
          </span>

          <button
            onClick={onToggleVisibility}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title={section.visible ? "Hide section" : "Show section"}
          >
            {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button
            onClick={onDuplicate}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Duplicate section"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete "${label}" section?`)) {
                onDelete?.();
              }
            }}
            className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
            title="Delete section"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {children}
    </div>
  );
}
