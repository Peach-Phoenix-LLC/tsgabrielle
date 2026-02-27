"use client";

import React, { useState, useEffect } from 'react';
import ImagePicker from '../ImagePicker';
export default function AboutPageSection({ data, onSave, saving }: { data: any, onSave: any, saving: boolean }) {
    const [formData, setFormData] = useState(data || {
        title: "The Maison Story",
        body: "",
        mission: "",
        vision: "",
        founder_name: "Gabrielle",
        founder_quote: "",
        team: []
    });

    useEffect(() => { if (data) setFormData(data); }, [data]);

    const handleChange = (key: string, value: any) => {
        setFormData({ ...formData, [key]: value });
    };

    const addTeamMember = () => {
        const newTeam = [...formData.team, { name: '', role: '', image: '' }];
        handleChange('team', newTeam);
    };

    const removeTeamMember = (index: number) => {
        const newTeam = formData.team.filter((_: any, i: number) => i !== index);
        handleChange('team', newTeam);
    };

    const updateTeamMember = (index: number, key: string, value: string) => {
        const newTeam = formData.team.map((m: any, i: number) => i === index ? { ...m, [key]: value } : m);
        handleChange('team', newTeam);
    };

    return (
        <div className="space-y-12 bg-white">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a]">About {formData.founder_name}</h2>
                    <p className="text-[#1a1a1a]/40 font-serif italic mt-2">Curate the history and souls behind the Maison.</p>
                </div>
                <button
                    onClick={() => onSave(formData)}
                    disabled={saving}
                    className="px-10 py-3 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-neutral-800 transition-all disabled:opacity-50 shadow-sm"
                >
                    {saving ? 'Syncing...' : 'Save Narrative'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[#1a1a1a]">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">About Title</label>
                        <input type="text" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 focus:border-[#a932bd] outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">About Body Text</label>
                        <textarea rows={4} value={formData.body} onChange={(e) => handleChange('body', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 resize-none focus:border-[#a932bd] outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">The Mission</label>
                            <textarea rows={3} value={formData.mission} onChange={(e) => handleChange('mission', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 resize-none focus:border-[#a932bd] outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">The Vision</label>
                            <textarea rows={3} value={formData.vision} onChange={(e) => handleChange('vision', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 resize-none focus:border-[#a932bd] outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 ml-1">Founder's Quote</label>
                        <input type="text" value={formData.founder_quote} onChange={(e) => handleChange('founder_quote', e.target.value)} className="w-full bg-neutral-50 border border-black/10 rounded-xl px-6 py-4 italic font-serif focus:border-[#a932bd] outline-none" />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">The Team</h3>
                        <button onClick={addTeamMember} className="size-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {formData.team.map((member: any, i: number) => (
                            <div key={i} className="flex gap-4 p-4 bg-neutral-50 border border-black/10 rounded-xl relative group shadow-sm transition-all hover:bg-neutral-100">
                                <div className="size-16 rounded-lg bg-black/5 overflow-hidden ring-1 ring-black/5 shrink-0">
                                    {member.image ? <img src={member.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-black/20 text-xl">person</span></div>}
                                </div>
                                <div className="flex-grow space-y-4">
                                    <div className="space-y-2">
                                        <input placeholder="Name" value={member.name} onChange={(e) => updateTeamMember(i, 'name', e.target.value)} className="w-full bg-transparent text-xs font-bold border-b border-black/5 pb-1 focus:outline-none focus:border-[#a932bd] text-[#1a1a1a]" />
                                        <input placeholder="Role" value={member.role} onChange={(e) => updateTeamMember(i, 'role', e.target.value)} className="w-full bg-transparent text-[10px] text-[#1a1a1a]/40 focus:outline-none" />
                                    </div>
                                    <ImagePicker
                                        label="Portrait URL"
                                        value={member.image || ''}
                                        onChange={(url) => updateTeamMember(i, 'image', url)}
                                    />
                                </div>
                                <button onClick={() => removeTeamMember(i)} className="absolute -top-2 -right-2 size-6 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                    <span className="material-symbols-outlined text-xs">close</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
