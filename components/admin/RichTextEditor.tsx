"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Create a safe, SSR-disabled dynamic import
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function ForwardedQuill(props: any) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => <div className="min-h-[200px] border border-gray-200 animate-pulse bg-gray-50 rounded-xl" />
  }
);

interface RichTextEditorProps {
  initialValue: string;
  name?: string;
  onChange: (value: string) => void;
  label?: string;
}

export function RichTextEditor({ initialValue, onChange, label }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header", "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent", "link", "image", "video",
    "color", "background", "align",
  ];

  return (
    <div className="rounded-xl overflow-hidden border border-[#e7e7e7] bg-white">
      {label && (
        <label className="block px-4 pt-3 pb-2 text-[10px] uppercase tracking-widest font-bold text-[#555]">
          {label}
        </label>
      )}
      <div className="rich-text-container">
        <ReactQuill
          theme="snow"
          value={initialValue}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="bg-white min-h-[200px]"
        />
      </div>
      <style jsx global>{`
        .rich-text-container .ql-container { min-height: 200px; font-family: inherit; }
        .rich-text-container .ql-editor { min-height: 200px; }
        .rich-text-container .ql-toolbar.ql-snow { border-right: none; border-left: none; border-top: none; border-bottom: 1px solid #e7e7e7; background: #fafafa; }
        .rich-text-container .ql-container.ql-snow { border: none; }
      `}</style>
    </div>
  );
}
