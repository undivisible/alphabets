import React from "react";
import { Settings2, Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ACCENT_PRESETS } from "@/src/data/constants";

interface SettingsPanelProps {
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
        <button className="flex h-full items-center border border-zinc-700 bg-[#171717] px-3 md:px-4 text-white transition hover:border-white"><Settings2 className="h-4 w-4" /></button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 border-zinc-800 bg-[#151515] p-0">
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
        <label className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer">
          <span>Latin pronunciation</span>
          <Checkbox checked={showLatin} onCheckedChange={(v: boolean | string) => setShowLatin(!!v)} />
        </label>
        <label className="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer">
          <span>IPA</span>
          <Checkbox checked={showIPA} onCheckedChange={(v: boolean | string) => setShowIPA(!!v)} />
        </label>
        <label className="flex items-center justify-between px-4 py-4 text-sm text-white cursor-pointer">
          <span>Dense layout</span>
          <Checkbox checked={denseMode} onCheckedChange={(v: boolean | string) => setDenseMode(!!v)} />
        </label>
      </PopoverContent>
    </Popover>
  );
}
