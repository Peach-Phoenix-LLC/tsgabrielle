"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Edit3, Loader2 } from "lucide-react";

const VisualBuilderProvider = dynamic(
  () => import("./VisualBuilderProvider").then((mod) => mod.VisualBuilderProvider),
  { ssr: false }
);

interface BuilderGateProps {
  initialEnabled: boolean;
  children: React.ReactNode;
}

export default function BuilderGate({ initialEnabled, children }: BuilderGateProps) {
  const [isToggling, setIsToggling] = useState(false);

  const toggleBuilder = async (enabled: boolean) => {
    setIsToggling(true);
    try {
      const res = await fetch("/api/admin/builder-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) throw new Error("Failed to toggle builder mode");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Could not update builder mode.");
    } finally {
      setIsToggling(false);
    }
  };

  if (!initialEnabled) {
    return (
      <>
        {children}
        <button
          onClick={() => toggleBuilder(true)}
          disabled={isToggling}
          className="fixed bottom-6 right-6 z-[9999] rounded-full bg-[#111111] px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white shadow-2xl border border-white/20 flex items-center gap-2 hover:bg-[#a932bd] transition-colors"
        >
          {isToggling ? <Loader2 size={14} className="animate-spin" /> : <Edit3 size={14} />}
          Edit Page
        </button>
      </>
    );
  }

  return (
    <VisualBuilderProvider onExit={() => toggleBuilder(false)} initialEditMode={true}>
      {children}
    </VisualBuilderProvider>
  );
}
