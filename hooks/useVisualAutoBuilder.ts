"use client";

import { useEffect } from "react";
import { useVisualBuilder } from "@/components/builder/VisualBuilderProvider";

export function useVisualAutoBuilder() {
  const { isEditMode, updateContent, pendingChanges } = useVisualBuilder();

  useEffect(() => {
    if (!isEditMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const editableTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A', 'BUTTON'];
      
      if (editableTags.includes(target.tagName) && !target.closest('.visual-builder-ignore')) {
        e.preventDefault();
        e.stopPropagation();

        const currentText = target.innerText;
        const newText = prompt("Edit Text:", currentText);
        
        if (newText !== null && newText !== currentText) {
          const contentKey = target.getAttribute('data-content-key') || `auto_${target.tagName.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`;
          target.innerText = newText;
          target.classList.add('ring-2', 'ring-[#a932bd]', 'ring-offset-2');
          updateContent(contentKey, newText);
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const editableTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A', 'BUTTON'];
      if (editableTags.includes(target.tagName) && !target.closest('.visual-builder-ignore')) {
        target.style.outline = '2px dashed #a932bd';
        target.style.outlineOffset = '2px';
        target.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      target.style.outline = '';
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isEditMode, updateContent]);
}
