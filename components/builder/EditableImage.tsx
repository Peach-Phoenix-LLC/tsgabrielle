"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useVisualBuilder } from "./VisualBuilderProvider";
import { ImageIcon, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface EditableImageProps {
  contentKey: string;
  initialSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function EditableImage({
  contentKey,
  initialSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: EditableImageProps) {
  const { isEditMode, pendingChanges, updateContent } = useVisualBuilder();
  const [localSrc, setLocalSrc] = useState(initialSrc);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (pendingChanges[contentKey] !== undefined) {
      setLocalSrc(pendingChanges[contentKey]);
    } else {
      setLocalSrc(initialSrc);
    }
  }, [pendingChanges, contentKey, initialSrc]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `builder/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setLocalSrc(publicUrl);
      updateContent(contentKey, publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  // Ensure src is valid for unoptimized images if next/image errors occasionally
  const displaySrc = localSrc || "/images/placeholder.png";

  if (!isEditMode) {
    return (
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <div className={`relative group inline-block ${className}`}>
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`w-full h-full object-cover transition-all ${
          isEditMode ? "ring-2 ring-transparent group-hover:ring-[#a932bd]" : ""
        }`}
      />
      
      {/* Edit Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 rounded z-10">
        {isUploading ? (
          <Loader2 className="animate-spin text-white" />
        ) : (
          <>
            <label className="cursor-pointer bg-[#a932bd] text-white px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-[#921fa6] transition-colors">
              <ImageIcon size={14} /> Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
            <div className="flex gap-1">
               <input 
                 type="text" 
                 value={localSrc} 
                 onChange={(e) => {
                    setLocalSrc(e.target.value);
                    updateContent(contentKey, e.target.value);
                 }}
                 placeholder="Or paste URL"
                 className="text-[10px] px-2 py-1 text-black outline-none w-32 rounded-l" 
                 onClick={(e) => e.stopPropagation()}
                />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
