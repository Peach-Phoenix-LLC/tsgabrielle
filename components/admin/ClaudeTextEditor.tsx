"use client";

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

interface ClaudeTextEditorProps {
  initialValue: string;
  name?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  "en-US": {
    appTitle: "Claude Writing Assistant",
    yourText: "Your Text",
    sample: "Sample Text",
    copy: "Copy",
    characters: "chars",
    fontFamily: "Font",
    fontSize: "Size",
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    textColor: "Text Color",
    textHighlightColor: "Highlight Color",
    addLink: "Add Link",
    addLinkTitle: "Add Link",
    enterUrl: "URL",
    add: "Add",
    cancel: "Cancel",
    alignLeft: "Align Left",
    alignCenter: "Align Center",
    alignRight: "Align Right",
    lineSpacing: "Line Spacing",
    bulletList: "Bullet List",
    numberedList: "Numbered List",
    decreaseIndent: "Decrease Indent",
    increaseIndent: "Increase Indent",
    analyzeText: "Analyze Text",
    analyzing: "Analyzing...",
    suggestions: "Suggestions",
    all: "All",
    grammar: "Grammar",
    spelling: "Spelling",
    punctuation: "Punct.",
    style: "Style",
    clarity: "Clarity",
    clickAnalyzeText: "Click Analyze to see suggestions.",
    noSuggestionsCategory: "No suggestions for this category.",
    applySuggestion: "Apply",
    applyAllSuggestions: "Apply All",
    dismiss: "Dismiss",
    reject: "Reject",
    accept: "Accept",
    pleaseEnterText: "Please enter some text.",
    failedToAnalyze: "Analysis failed.",
    failedToParse: "Failed to parse analysis.",
  }
};

export function ClaudeTextEditor({ initialValue, onChange, label }: ClaudeTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !editorRef.current) return;

    let Quill: any;
    
    const initQuill = async () => {
      try {
        const mod = await import("quill");
        Quill = mod.default || mod;

        if (!editorRef.current) return;

        if (!quillRef.current) {
          quillRef.current = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
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
            },
          });

          // Set initial value
          if (initialValue) {
            const clipboard = quillRef.current.getModule("clipboard");
            clipboard.dangerouslyPasteHTML(initialValue);
          }

          quillRef.current.on("text-change", () => {
            let html = quillRef.current.root.innerHTML;
            if (html === "<p><br></p>") html = "";
            if (onChange) onChange(html);
          });
          
          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load Quill", err);
      }
    };

    initQuill();

    return () => {
      // Cleanup for StrictMode
      if (containerRef.current) {
        const toolbar = containerRef.current.querySelector(".ql-toolbar");
        if (toolbar) {
          toolbar.remove();
        }
      }
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      quillRef.current = null;
    };
  }, []);

  // Sync value changes if they come from outside the editor (e.g., reset form)
  useEffect(() => {
    if (quillRef.current && initialValue !== undefined) {
      const currentHtml = quillRef.current.root.innerHTML;
      if (initialValue !== currentHtml && initialValue !== "<p><br></p>") {
        if (initialValue) {
            const clipboard = quillRef.current.getModule("clipboard");
            clipboard.dangerouslyPasteHTML(initialValue);
        } else if (currentHtml !== "<p><br></p>" && currentHtml !== "") {
            quillRef.current.setText('');
        }
      }
    }
  }, [initialValue]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#e7e7e7] bg-white">
      {label && (
        <label className="block px-4 pt-3 pb-2 text-[10px] uppercase tracking-widest font-bold text-[#555]">
          {label}
        </label>
      )}
      <div className="rich-text-container" ref={containerRef}>
        {!isLoaded && (
            <div className="min-h-[200px] border-b border-gray-200 animate-pulse bg-gray-50 pointer-events-none" />
        )}
        <div ref={editorRef} className={`bg-white min-h-[200px] ${!isLoaded ? 'hidden' : ''}`} />
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
