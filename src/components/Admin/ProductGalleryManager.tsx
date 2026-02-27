"use client";

import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImagePicker from './ImagePicker';

interface GalleryItem {
    id: string; // url as id for dnd
    url: string;
    alt: string;
}

interface ProductGalleryManagerProps {
    urls: string[];
    alts: string[];
    primaryUrl: string;
    primaryAlt: string;
    onChange: (urls: string[], alts: string[], primaryUrl: string, primaryAlt: string) => void;
}

function SortableItem({ item, isPrimary, onSetPrimary, onRemove, onEditAlt, onRename }: {
    item: GalleryItem;
    isPrimary: boolean;
    onSetPrimary: () => void;
    onRemove: () => void;
    onEditAlt: (newAlt: string) => void;
    onRename: (newName: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [editingAlt, setEditingAlt] = useState(false);
    const [tempAlt, setTempAlt] = useState(item.alt);
    const [editingName, setEditingName] = useState(false);
    const [tempName, setTempName] = useState(item.url.split('/').pop() || '');

    return (
        <div ref={setNodeRef} style={style} className="group bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 p-4">
            <div className="w-32 h-32 shrink-0 bg-neutral-100 rounded-xl overflow-hidden relative group/img">
                <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                <div {...attributes} {...listeners} className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity">
                    <span className="material-symbols-outlined text-white">drag_indicator</span>
                </div>
            </div>

            <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1 max-w-[200px]">
                        {editingName ? (
                            <div className="flex gap-2">
                                <input
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="text-[10px] font-bold bg-neutral-50 px-2 py-1 border border-black/10 rounded"
                                />
                                <button onClick={() => { onRename(tempName); setEditingName(false); }} className="text-[10px] text-primary font-bold">Save</button>
                            </div>
                        ) : (
                            <p className="text-[10px] font-bold truncate flex items-center gap-2">
                                {item.url.split('/').pop()}
                                <button onClick={() => setEditingName(true)} className="material-symbols-outlined text-xs text-black/20 hover:text-black">edit</button>
                            </p>
                        )}
                        <p className="text-[9px] uppercase tracking-widest text-black/40">URL: {item.url.split('/').slice(-1)[0]}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onSetPrimary}
                            disabled={isPrimary}
                            className={`px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest transition-all ${isPrimary ? 'bg-primary text-white' : 'border border-black/10 hover:bg-neutral-50'}`}
                        >
                            {isPrimary ? 'Main Image' : 'Set Main'}
                        </button>
                        <button onClick={onRemove} className="p-2 text-red-400 hover:text-red-600">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-black/40">Alt Text (SEO)</label>
                    {editingAlt ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tempAlt}
                                onChange={(e) => setTempAlt(e.target.value)}
                                className="flex-grow bg-neutral-50 border border-black/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary"
                            />
                            <button onClick={() => { onEditAlt(tempAlt); setEditingAlt(false); }} className="px-4 py-2 bg-black text-white text-[9px] uppercase font-bold rounded-lg">Save</button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center group/alt">
                            <p className="text-xs italic text-black/60">{item.alt || 'No alt text set'}</p>
                            <button onClick={() => setEditingAlt(true)} className="text-[9px] uppercase font-bold text-primary opacity-0 group-hover/alt:opacity-100 transition-opacity">Edit Alt</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductGalleryManager({ urls, alts, primaryUrl, primaryAlt, onChange }: ProductGalleryManagerProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const items: GalleryItem[] = (urls || []).map((url, i) => ({
        id: url,
        url,
        alt: alts?.[i] || ''
    }));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            onChange(
                newItems.map(i => i.url),
                newItems.map(i => i.alt),
                primaryUrl,
                primaryAlt
            );
        }
    };

    const handleAdd = (url: string) => {
        const newUrls = [...urls, url];
        const newAlts = [...alts, ""];
        onChange(newUrls, newAlts, primaryUrl, primaryAlt);
    };

    const handleRemove = (idx: number) => {
        const newUrls = [...urls];
        const newAlts = [...alts];
        const removedUrl = newUrls.splice(idx, 1)[0];
        newAlts.splice(idx, 1);

        let newPrimaryUrl = primaryUrl;
        let newPrimaryAlt = primaryAlt;
        if (removedUrl === primaryUrl) {
            newPrimaryUrl = newUrls[0] || '';
            newPrimaryAlt = newAlts[0] || '';
        }

        onChange(newUrls, newAlts, newPrimaryUrl, newPrimaryAlt);
    };

    const handleSetPrimary = (idx: number) => {
        onChange(urls, alts, urls[idx], alts[idx] || '');
    };

    const handleEditAlt = (idx: number, newAlt: string) => {
        const newAlts = [...alts];
        newAlts[idx] = newAlt;

        let newPrimaryAlt = primaryAlt;
        if (urls[idx] === primaryUrl) {
            newPrimaryAlt = newAlt;
        }

        onChange(urls, newAlts, primaryUrl, newPrimaryAlt);
    };

    const handleRename = async (idx: number, newName: string) => {
        const oldUrl = urls[idx];
        const oldName = oldUrl.split('/').pop();
        if (!oldName || oldName === newName) return;

        try {
            const res = await fetch('/api/admin/media/rename', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldName: `uploads/${oldName}`, newName: `uploads/${newName}` })
            });

            if (res.ok) {
                const data = await res.json();
                const newUrl = data.url;
                const newUrls = [...urls];
                newUrls[idx] = newUrl;

                let newPrimaryUrl = primaryUrl;
                if (oldUrl === primaryUrl) {
                    newPrimaryUrl = newUrl;
                }

                onChange(newUrls, alts, newPrimaryUrl, primaryAlt);
            }
        } catch (e) {
            alert('Rename failed');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]">Media Architecture</h4>
                <div className="relative">
                    <ImagePicker
                        label="+ Add to Architecture"
                        value=""
                        onChange={(url) => handleAdd(url)}
                    />
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                isPrimary={item.url === primaryUrl}
                                onSetPrimary={() => handleSetPrimary(idx)}
                                onRemove={() => handleRemove(idx)}
                                onEditAlt={(newAlt) => handleEditAlt(idx, newAlt)}
                                onRename={(newName) => handleRename(idx, newName)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {items.length === 0 && (
                <div className="p-12 border border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center grayscale opacity-30 text-center">
                    <span className="material-symbols-outlined text-4xl mb-4">image_not_supported</span>
                    <p className="text-[10px] uppercase tracking-widest leading-relaxed">No Visual Data Assets<br />Upload photos to initialize architecture</p>
                </div>
            )}
        </div>
    );
}
