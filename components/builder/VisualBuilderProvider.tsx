"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { VisualBuilderToolbar } from "./VisualBuilderToolbar";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface VisualBuilderContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  pendingChanges: Record<string, any>;
  setPendingChanges: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  saveChanges: () => Promise<void>;
  isSaving: boolean;
}

const VisualBuilderContext = createContext<VisualBuilderContextType>({
  isAdmin: false,
  isEditMode: false,
  setIsEditMode: () => {},
  pendingChanges: {},
  setPendingChanges: () => {},
  saveChanges: async () => {},
  isSaving: false,
});

export const useVisualBuilder = () => useContext(VisualBuilderContext);

export function VisualBuilderProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  async function checkAdminStatus() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const user = session.user;
      const email = user?.email ?? "";
      
      // In a real scenario, this matches the middleware logic
      // But for client-side, we just check email against contact@tsgabrielle.us for now
      // Or fetch from an endpoint.
      if (email.toLowerCase() === "contact@tsgabrielle.us") {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Error checking admin status", e);
    }
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
        isAdmin,
        isEditMode,
        setIsEditMode,
        pendingChanges,
        setPendingChanges,
        saveChanges,
        isSaving,
      }}
    >
      {children}
      {isAdmin && <VisualBuilderToolbar />}
    </VisualBuilderContext.Provider>
  );
}
