"use client";

import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold, Italic, List, ListOrdered, Quote, Undo, Redo,
    Link as LinkIcon, Image as ImageIcon, Underline as UnderlineIcon,
    Heading1, Heading2, Heading3
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-black/5 bg-neutral-50">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('bold') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Bold"
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('italic') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Italic"
            >
                <Italic size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('underline') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Underline"
            >
                <UnderlineIcon size={16} />
            </button>
            <div className="w-px h-6 bg-black/5 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Heading 1"
            >
                <Heading1 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Heading 2"
            >
                <Heading2 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('bulletList') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Bullet List"
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('orderedList') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Ordered List"
            >
                <ListOrdered size={16} />
            </button>
            <div className="w-px h-6 bg-black/5 mx-1 self-center" />
            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-black/5 transition-colors ${editor.isActive('link') ? 'bg-black/10 text-[#a932bd]' : 'text-neutral-500'}`}
                title="Set Link"
            >
                <LinkIcon size={16} />
            </button>
            <button
                onClick={addImage}
                className="p-2 rounded hover:bg-black/5 transition-colors text-neutral-500"
                title="Add Image"
            >
                <ImageIcon size={16} />
            </button>
            <div className="w-px h-6 bg-black/5 mx-1 self-center" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 rounded hover:bg-black/5 transition-colors text-neutral-500 disabled:opacity-30"
                title="Undo"
            >
                <Undo size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 rounded hover:bg-black/5 transition-colors text-neutral-500 disabled:opacity-30"
                title="Redo"
            >
                <Redo size={16} />
            </button>
        </div>
    );
};

const RichTextEditor = ({ value, onChange, placeholder = "Write something beautiful..." }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#a932bd] underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full my-4 border border-black/5',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-neutral max-w-none focus:outline-none min-h-[300px] p-6 text-neutral-800',
            },
        },
    });

    // Update editor content when value prop changes externally
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="w-full bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 flex flex-col group">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <div className="px-6 py-2 border-t border-black/5 text-[9px] uppercase tracking-widest text-neutral-400 font-light flex gap-2 items-center bg-neutral-50/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a932bd] animate-pulse"></span>
                TipTap Engine Active — High-Fashion Rich Text Orchestration
            </div>
            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    color: #adb5bd;
                    content: attr(data-placeholder);
                    float: left;
                    height: 0;
                    pointer-events: none;
                }
                .tiptap {
                    font-family: var(--font-lato), sans-serif;
                    font-weight: 300;
                }
                .tiptap h1, .tiptap h2, .tiptap h3 {
                    font-family: var(--font-playfair), serif;
                    font-style: italic;
                    color: #1a1a1a;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
