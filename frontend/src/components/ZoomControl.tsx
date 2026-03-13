import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

export function ZoomControl({ zoom, setZoom }: any) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(Math.round(zoom * 100)));

  useEffect(() => {
    if (!editing) setDraft(String(Math.round(zoom * 100)));
  }, [zoom, editing]);

  const commit = () => {
    const value = Number(draft);
    if (!Number.isNaN(value)) {
      const next = Math.max(70, Math.min(180, value));
      setZoom(next / 100);
    }
    setEditing(false);
  };

  return (
    <div className="flex h-full items-center border border-zinc-700 bg-[#171717]">
      <button onClick={() => setZoom((z: number) => Math.max(0.7, Math.round((z - 0.1) * 10) / 10))} className="flex h-full items-center px-3 text-white transition hover:border-white hover:bg-zinc-800"><Minus className="h-4 w-4" /></button>
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="h-full min-w-[72px] bg-[#171717] px-2 text-center text-[10px] uppercase tracking-[0.22em] text-white outline-none"
        />
      ) : (
        <button onClick={() => setEditing(true)} className="min-w-[72px] px-2 text-center text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-zinc-800">{Math.round(zoom * 100)}%</button>
      )}
      <button onClick={() => setZoom((z: number) => Math.min(1.8, Math.round((z + 0.1) * 10) / 10))} className="flex h-full items-center px-3 text-white transition hover:border-white hover:bg-zinc-800"><Plus className="h-4 w-4" /></button>
    </div>
  );
}
