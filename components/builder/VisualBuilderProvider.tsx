"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { VisualBuilderToolbar } from "./VisualBuilderToolbar";

interface VisualBuilderContextType {
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  pendingChanges: Record<string, any>;
  setPendingChanges: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => Promise<void>;
  isSaving: boolean;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  exitBuilder: () => void;
}

const VisualBuilderContext = createContext<VisualBuilderContextType>({
  isEditMode: false,
  setIsEditMode: () => {},
  pendingChanges: {},
  setPendingChanges: () => {},
  updateContent: () => {},
  saveChanges: async () => {},
  isSaving: false,
  undo: () => {},
  redo: () => {},
  canUndo: false,
  canRedo: false,
  exitBuilder: () => {},
});

export const useVisualBuilder = () => useContext(VisualBuilderContext);

interface VisualBuilderProviderProps {
  children: React.ReactNode;
  initialEditMode?: boolean;
  onExit?: () => void;
}

export function VisualBuilderProvider({ children, initialEditMode = false, onExit }: VisualBuilderProviderProps) {
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<Record<string, any>[]>([]);
  const [future, setFuture] = useState<Record<string, any>[]>([]);
  const pendingRef = useRef(pendingChanges);

  pendingRef.current = pendingChanges;

  function updateContent(key: string, value: string) {
    setPendingChanges((prev) => {
      const next = { ...prev, [key]: value };
      setHistory((current) => [...current, prev]);
      setFuture([]);
      return next;
    });
  }

  async function saveChanges() {
    if (Object.keys(pendingChanges).length === 0) return;
    
    setIsSaving(true);
    try {
      // We will send all pending changes to a new bulk endpoint
      const currentPath = window.location.pathname;
      const updates = Object.entries(pendingChanges).map(([key, value]) => ({
        page_path: currentPath,
        content_key: key,
        content_type: typeof value === 'string' && value.startsWith('<') ? 'html' : 'text', // Simple heuristic for now
        content_value: String(value),
        sort_order: 0
      }));

      const res = await fetch("/api/admin/page-content/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!res.ok) throw new Error("Failed to save changes");
      
      setPendingChanges({});
      // Optionally show a toast here
    } catch (e) {
      console.error("Error saving builder changes", e);
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <VisualBuilderContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        pendingChanges,
        setPendingChanges,
        updateContent,
        saveChanges,
        isSaving,
        undo: () => {
          setHistory((current) => {
            if (current.length === 0) return current;
            const previous = current[current.length - 1];
            setFuture((next) => [pendingRef.current, ...next]);
            setPendingChanges(previous);
            return current.slice(0, -1);
          });
        },
        redo: () => {
          setFuture((current) => {
            if (current.length === 0) return current;
            const [nextState, ...rest] = current;
            setHistory((historyState) => [...historyState, pendingRef.current]);
            setPendingChanges(nextState);
            return rest;
          });
        },
        canUndo: history.length > 0,
        canRedo: future.length > 0,
        exitBuilder: onExit || (() => setIsEditMode(false)),
      }}
    >
      {children}
      <VisualBuilderToolbar />
    </VisualBuilderContext.Provider>
  );
}
