"use client";

import React, { useState, useEffect } from "react";
import { useVisualBuilder } from "./VisualBuilderProvider";
import { Edit2 } from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    setPendingChanges((prev) => ({
      ...prev,
      [contentKey]: val,
    }));
  };

  if (!isEditMode) {
    // Standard view mode
    return <Component className={className}>{localValue}</Component>;
  }

  // Edit Mode - Active Editing State
  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            autoFocus
            value={localValue}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className={`w-full bg-white text-black border-2 border-[#a932bd] rounded p-2 outline-none shadow-lg ${className}`}
            rows={5}
          />
        ) : (
          <input
            type="text"
            autoFocus
            value={localValue}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(false);
            }}
            className={`w-full bg-white text-black border-2 border-[#a932bd] rounded px-2 py-1 outline-none shadow-lg ${className}`}
          />
        )}
      </div>
    );
  }

  // Edit Mode - Hover State (Indicates it's editable)
  return (
    <Component
      onClick={() => setIsEditing(true)}
      className={`relative cursor-pointer transition-all hover:ring-2 hover:ring-[#a932bd] hover:bg-[#a932bd]/10 group rounded rounded-sm ${className}`}
    >
      {localValue || <span className="text-gray-400 italic">Empty text</span>}
      <div className="absolute -top-2 -right-2 bg-[#a932bd] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Edit2 size={12} />
      </div>
    </Component>
  );
}
