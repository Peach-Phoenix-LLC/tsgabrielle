"use client";

import React from "react";
import { getSectionComponent } from "@/lib/section-registry";
import type { BuilderSection } from "@/lib/builder-types";
import SectionWrapper from "./SectionWrapper";
import { useVisualBuilder } from "./VisualBuilderProvider";

interface SectionRendererProps {
  sections: BuilderSection[];
  onReorder?: (fromIndex: number, toIndex: number) => void;
  onDelete?: (sectionId: string) => void;
  onDuplicate?: (sectionId: string) => void;
  onToggleVisibility?: (sectionId: string) => void;
  onUpdateProps?: (sectionId: string, props: Record<string, any>) => void;
}

export default function SectionRenderer({
  sections,
  onReorder,
  onDelete,
  onDuplicate,
  onToggleVisibility,
  onUpdateProps,
}: SectionRendererProps) {
  const { isEditMode } = useVisualBuilder();

  return (
    <div className="builder-sections">
      {sections
        .filter((s) => isEditMode || s.visible)
        .map((section, index) => {
          const Component = getSectionComponent(section.type);
          if (!Component) {
            return isEditMode ? (
              <div
                key={section.id}
                className="py-8 px-6 text-center text-red-400 bg-red-50 border border-dashed border-red-200 rounded-lg mx-6 my-2"
              >
                Unknown section type: <code>{section.type}</code>
              </div>
            ) : null;
          }

          const rendered = <Component {...section.props} />;

          if (!isEditMode) {
            return <React.Fragment key={section.id}>{rendered}</React.Fragment>;
          }

          return (
            <SectionWrapper
              key={section.id}
              section={section}
              index={index}
              total={sections.length}
              onMoveUp={
                onReorder && index > 0
                  ? () => onReorder(index, index - 1)
                  : undefined
              }
              onMoveDown={
                onReorder && index < sections.length - 1
                  ? () => onReorder(index, index + 1)
                  : undefined
              }
              onDelete={onDelete ? () => onDelete(section.id) : undefined}
              onDuplicate={onDuplicate ? () => onDuplicate(section.id) : undefined}
              onToggleVisibility={
                onToggleVisibility
                  ? () => onToggleVisibility(section.id)
                  : undefined
              }
            >
              {rendered}
            </SectionWrapper>
          );
        })}
    </div>
  );
}
