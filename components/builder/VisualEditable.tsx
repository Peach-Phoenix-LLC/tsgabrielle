"use client";

import React, { useState } from "react";
import { EditableText } from "./EditableText";
import { EditableImage } from "./EditableImage";
import { useVisualBuilder } from "./VisualBuilderProvider";

interface VisualEditableProps {
  contentKey: string;
  type: "text" | "image" | "html";
  initialValue: any;
  as?: React.ElementType;
  className?: string;
  // For images
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function VisualEditable({
  contentKey,
  type,
  initialValue,
  as,
  className,
  alt,
  width,
  height,
  priority,
}: VisualEditableProps) {
  const { isEditMode } = useVisualBuilder();

  if (type === "image") {
    return (
      <EditableImage
        contentKey={contentKey}
        initialSrc={initialValue}
        alt={alt || "tsgabrielle element"}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <EditableText
      contentKey={contentKey}
      initialValue={initialValue}
      as={as}
      className={className}
      multiline={type === "html"}
    />
  );
}
