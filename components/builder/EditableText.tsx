"use client";

import React, { useState, useEffect } from "react";
import { useVisualBuilder } from "./VisualBuilderProvider";
import { Edit2, Check } from "lucide-react";
import { ClaudeTextEditor } from "@/components/admin/ClaudeTextEditor";

interface EditableTextProps {
  contentKey: string;
  initialValue: string;
  as?: React.ElementType;
  className?: string;
  multiline?: boolean;
}

export function EditableText({
  contentKey,
  initialValue,
  as,
  className = "",
  multiline = false,
}: EditableTextProps) {
  const Component = (as || "span") as any;
  const { isEditMode, pendingChanges, setPendingChanges } = useVisualBuilder();
  const [localValue, setLocalValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  // Sync with pending changes if an edit exists, otherwise use initialValue
  useEffect(() => {
    if (pendingChanges[contentKey] !== undefined) {
      setLocalValue(pendingChanges[contentKey]);
    } else {
      setLocalValue(initialValue);
    }
  }, [pendingChanges, contentKey, initialValue]);

  const handleChange = (val: string) => {
    setLocalValue(val);
    setPendingChanges((prev) => ({
      ...prev,
      [contentKey]: val,
    }));
  };

  if (!isEditMode) {
    // Standard view mode
    return <Component className={className} dangerouslySetInnerHTML={{ __html: localValue }} />;
  }

  // Edit Mode - Active Editing State
  if (isEditing) {
    return (
      <div className="relative inline-block w-full z-50">
        <div className="absolute top-0 left-0 bg-white p-2 rounded-xl border-2 border-[#a932bd] shadow-2xl min-w-[300px] sm:min-w-[400px]">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">Visual Editor</span>
            <button 
              onClick={() => setIsEditing(false)} 
              className="flex items-center gap-1 bg-[#111] hover:bg-[#a932bd] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md transition-all"
            >
              <Check size={12} /> Done
            </button>
          </div>
          <ClaudeTextEditor 
            initialValue={localValue || ""}
            onChange={handleChange}
          />
        </div>
        {/* Placeholder sizing based on current content safely */}
        <Component className={`${className} opacity-0`} dangerouslySetInnerHTML={{ __html: localValue }} />
      </div>
    );
  }

  // Edit Mode - Hover State (Indicates it's editable)
  return (
    <Component
      onClick={() => setIsEditing(true)}
      className={`relative cursor-pointer transition-all hover:ring-2 hover:ring-[#a932bd] hover:bg-[#a932bd]/10 group rounded-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: localValue || '<span class="text-gray-400 italic">Empty text</span>' }}
    />
  );
}
