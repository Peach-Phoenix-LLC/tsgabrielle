"use client";

import React from "react";
import { PageLayout } from "@/lib/types";
import { DynamicSectionRenderer } from "./DynamicSectionRenderer";
import { useVisualBuilder } from "./VisualBuilderProvider";
import { Plus } from "lucide-react";

interface PageLayoutRendererProps {
  layout: PageLayout;
}

export function PageLayoutRenderer({ layout }: PageLayoutRendererProps) {
  const { isEditMode } = useVisualBuilder();

  return (
    <div className="flex flex-col w-full">
      {layout.sections.map((section, index) => (
        <React.Fragment key={section.id}>
          {isEditMode && (
            <div className="relative h-4 group">
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-[#a932bd] text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </button>
               </div>
            </div>
          )}
          <DynamicSectionRenderer section={section} index={index} />
        </React.Fragment>
      ))}
      
      {isEditMode && (
        <button className="my-10 mx-auto border-2 border-dashed border-black/10 rounded-xl p-8 flex flex-col items-center gap-4 text-black/20 hover:text-[#a932bd] hover:border-[#a932bd] transition-all group">
          <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Add New Section</span>
        </button>
      )}
    </div>
  );
}
