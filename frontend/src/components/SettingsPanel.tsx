import React from "react";
import { Settings2, Palette, Grid, Copy, Brain } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ACCENT_PRESETS } from "@/src/data/constants";

interface SettingsPanelProps {
  viewMode: "grid" | "flashcards" | "quiz";
  setViewMode: (m: "grid" | "flashcards" | "quiz") => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  showLatin: boolean;
  setShowLatin: (show: boolean) => void;
  showIPA: boolean;
  setShowIPA: (show: boolean) => void;
  denseMode: boolean;
  setDenseMode: (dense: boolean) => void;
}

export function SettingsPanel({ 
  viewMode,
  setViewMode,
  accentColor, 
  setAccentColor, 
  showLatin, 
  setShowLatin, 
  showIPA, 
  setShowIPA, 
  denseMode, 
  setDenseMode 
}: SettingsPanelProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-full items-center border-l sm:border-l-0 border-zinc-700 bg-transparent px-3 md:px-4 text-white transition hover:bg-zinc-800/50">
          {viewMode === "grid" && <Grid className="h-4 w-4" />}
          {viewMode === "flashcards" && <Copy className="h-4 w-4" />}
          {viewMode === "quiz" && <Brain className="h-4 w-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 border-zinc-800 bg-[#151515] p-0">
        <div className="border-b border-zinc-800 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white">Mode</div>
        <div className="flex border-b border-zinc-800 p-2 gap-2">
          <button onClick={() => setViewMode("grid")} className={`flex-1 flex flex-col items-center gap-2 rounded-sm p-3 transition ${viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
            <Grid className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.1em]">Grid</span>
          </button>
          <button onClick={() => setViewMode("flashcards")} className={`flex-1 flex flex-col items-center gap-2 rounded-sm p-3 transition ${viewMode === "flashcards" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
            <Copy className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.1em]">Flashcards</span>
          </button>
          <button onClick={() => setViewMode("quiz")} className={`flex-1 flex flex-col items-center gap-2 rounded-sm p-3 transition ${viewMode === "quiz" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
            <Brain className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.1em]">Quiz</span>
          </button>
        </div>
        <div className="border-b border-zinc-800 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white">Display</div>
        <div className="border-b border-zinc-800 px-4 py-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white"><Palette className="h-4 w-4" />Accent</div>
          <div className="grid grid-cols-6 gap-2">
            {ACCENT_PRESETS.map((color: string) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className={`h-8 border transition ${accentColor === color ? "border-white" : "border-zinc-700 hover:border-white"}`}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
        <label className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer hover:bg-zinc-800/30">
          <span>Romanization</span>
          <Checkbox checked={showLatin} onCheckedChange={(v: boolean | string) => setShowLatin(!!v)} />
        </label>
        <label className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer hover:bg-zinc-800/30">
          <span>IPA</span>
          <Checkbox checked={showIPA} onCheckedChange={(v: boolean | string) => setShowIPA(!!v)} />
        </label>
        <label className="flex items-center justify-between px-4 py-4 text-sm text-white cursor-pointer hover:bg-zinc-800/30">
          <span>Dense layout</span>
          <Checkbox checked={denseMode} onCheckedChange={(v: boolean | string) => setDenseMode(!!v)} />
        </label>
      </PopoverContent>
    </Popover>
  );
}
