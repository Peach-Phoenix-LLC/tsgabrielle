"use client";

import React, { ChangeEvent } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Write something beautiful..." }: RichTextEditorProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="w-full bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 flex flex-col group p-4">
            <textarea
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full min-h-[300px] outline-none text-neutral-800 bg-transparent resize-y"
            />
            <div className="mt-2 text-xs text-neutral-400 font-light flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Simple HTML Text Editor Active (Rich Editor Fallback)
            </div>
        </div>
    );
};

export default RichTextEditor;
