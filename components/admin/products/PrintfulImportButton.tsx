"use client";

import React, { useState, useEffect } from "react";
import { DownloadCloud, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Option = { id: string; name: string };

function PrintfulImportModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [status, setStatus] = useState<"verifying" | "connected" | "error" | "importing">("verifying");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<Option[]>([]);
  const [collections, setCollections] = useState<Option[]>([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedCol, setSelectedCol] = useState("");

  useEffect(() => {
    verifyConnection();
    fetchOptions();
  }, []);

  async function verifyConnection() {
    try {
      const res = await fetch("/api/admin/printful/verify");
      const data = await res.json();
      if (!res.ok || !data.connected) {
        setStatus("error");
        setMessage(data.error || "Failed to connect to Printful");
      } else {
        setStatus("connected");
        setMessage(data.store?.name ? `Connected to ${data.store.name}` : "Connected & Active");
      }
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message);
    }
  }

  async function fetchOptions() {
    try {
      const [catRes, colRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/collections"),
      ]);
      const [catData, colData] = await Promise.all([
        catRes.json() as Promise<Option[]>,
        colRes.json() as Promise<Option[]>,
      ]);
      setCategories(catData);
      setCollections(colData);
    } catch {
      // noop
    }
  }

  async function handleImport() {
    setStatus("importing");
    try {
      const res = await fetch("/api/admin/printful/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: selectedCat || null,
          collection_id: selectedCol || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert(`Success! Imported ${data.count} products.`);
      onSuccess();
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6 shadow-xl relative">
        <header>
          <h3 className="text-xl font-light text-black">Import from Printful</h3>
          <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1">Sync your print-on-demand inventory</p>
        </header>

        {status === "verifying" && (
          <div className="flex items-center gap-2 p-4 bg-gray-50 text-gray-600 rounded-lg text-xs">
            <Loader2 className="animate-spin" size={16} /> Verifying Printful Connection...
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg text-xs">
            <AlertCircle size={16} /> {message}
          </div>
        )}

        {(status === "connected" || status === "importing") && (
          <div className="space-y-6 text-black">
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
              <CheckCircle2 size={16} /> {message}
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Assign Category (Optional)</label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg"
                >
                  <option value="">Do not assign</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Assign Collection (Optional)</label>
                <select
                  value={selectedCol}
                  onChange={(e) => setSelectedCol(e.target.value)}
                  className="w-full bg-white border border-black/10 px-4 py-3 text-xs outline-none focus:border-[#a932bd] rounded-lg"
                >
                  <option value="">Do not assign</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={onClose}
                disabled={status === "importing"}
                className="flex-1 py-3 border border-black/10 text-[10px] uppercase tracking-widest font-bold hover:bg-black/5 transition-all text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={status === "importing"}
                className="flex-1 py-3 bg-[#a932bd] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#921fa6] transition-all flex justify-center items-center gap-2 rounded"
              >
                {status === "importing" ? <Loader2 className="animate-spin" size={14} /> : <DownloadCloud size={14} />}
                Import
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PrintfulImportButton() {
  const [showImportModal, setShowImportModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setShowImportModal(true)}
        className="flex items-center gap-2 rounded border border-[#e7e7e7] bg-[#ffffff] px-6 py-4 text-base font-light text-[#111111] transition-colors hover:bg-[#e7e7e7]"
      >
        <DownloadCloud size={18} /> Import from Printful
      </button>

      {showImportModal && (
        <PrintfulImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => {
            setShowImportModal(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
