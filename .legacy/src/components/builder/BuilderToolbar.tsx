'use client';

import {
  MousePointer2,
  Plus,
  Palette,
  Image as ImageIcon,
  PanelLeft,
  Undo,
  Redo,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Rocket,
  X,
} from 'lucide-react';
import { useBuilder } from '@/hooks/useBuilder';

export function BuilderToolbar() {
  const { setBuilderMode } = useBuilder();

  const toolbarButtons = [
    { icon: <MousePointer2 size={20} />, label: 'Select' },
    { icon: <Plus size={20} />, label: 'Add Section' },
    { icon: <Palette size={20} />, label: 'Design' },
    { icon: <ImageIcon size={20} />, label: 'Media' },
    { icon: <PanelLeft size={20} />, label: 'Structure' },
    { icon: <Undo size={20} />, label: 'Undo' },
    { icon: <Redo size={20} />, label: 'Redo' },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white rounded-lg shadow-2xl flex items-center gap-2 p-2 border border-gray-700">
      {/* Main Tools */}
      {toolbarButtons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => console.log(btn.label)}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          title={btn.label}
        >
          {btn.icon}
        </button>
      ))}

      <div className="w-px h-8 bg-gray-600 mx-2" />

      {/* Responsive Previews */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-md hover:bg-gray-700" title="Desktop"><Monitor size={20} /></button>
        <button className="p-2 rounded-md hover:bg-gray-700" title="Tablet"><Tablet size={20} /></button>
        <button className="p-2 rounded-md hover:bg-gray-700" title="Mobile"><Smartphone size={20} /></button>
      </div>

      <div className="w-px h-8 bg-gray-600 mx-2" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 p-2 rounded-md text-sm bg-gray-700 hover:bg-gray-600" title="Save Draft">
          <Save size={16} />
          Save
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md text-sm bg-blue-600 hover:bg-blue-500" title="Publish">
          <Rocket size={16} />
          Publish
        </button>
        <button
          onClick={() => setBuilderMode(false)}
          className="p-2 rounded-full hover:bg-gray-700"
          title="Exit Builder"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
