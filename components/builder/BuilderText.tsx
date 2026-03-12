import type { ElementType } from "react";
import { getBuilderModeStatus } from "@/lib/builder-mode";
import { EditableText } from "@/components/builder/EditableText";

interface BuilderTextProps {
  contentKey: string;
  initialValue: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  allowBuilder?: boolean;
}

export default async function BuilderText({
  contentKey,
  initialValue,
  as,
  className = "",
  multiline = false,
  allowBuilder = true,
}: BuilderTextProps) {
  const { builderEnabled } = await getBuilderModeStatus();
  const Component = (as || "span") as any;

  if (!allowBuilder || !builderEnabled) {
    return (
      <Component
        className={className}
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
    );
  }

  return (
    <EditableText
      contentKey={contentKey}
      initialValue={initialValue}
      as={as}
      className={className}
      multiline={multiline}
    />
  );
}
