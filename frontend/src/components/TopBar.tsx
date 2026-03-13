import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ZoomControl } from "./ZoomControl";
import { SelectPanel } from "./SelectPanel";
import { SettingsPanel } from "./SettingsPanel";

interface TopBarProps {
  progress: number;
  knownCount: number;
  total: number;
  query: string;
  setQuery: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  variant: string;
  setVariant: (v: string) => void;
  languageOptions: { value: string; label: string }[];
  variantOptions: { value: string; label: string }[];
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  accentColor: string;
  setAccentColor: (c: string) => void;
  showLatin: boolean;
  setShowLatin: (s: boolean) => void;
  showIPA: boolean;
  setShowIPA: (s: boolean) => void;
  denseMode: boolean;
  setDenseMode: (d: boolean) => void;
}

export function TopBar({
  progress,
  knownCount,
  total,
  query,
  setQuery,
  onSearchSubmit,
  language,
  setLanguage,
  variant,
  setVariant,
  languageOptions,
  variantOptions,
  zoom,
  setZoom,
  accentColor,
  setAccentColor,
  showLatin,
  setShowLatin,
  showIPA,
  setShowIPA,
  denseMode,
  setDenseMode,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#111111]/95 backdrop-blur">
      <div className="flex h-14 w-full items-center gap-0 border-b border-zinc-800">
        <div className="relative flex min-w-0 flex-1 h-full items-center overflow-hidden border-r border-zinc-800 bg-[#1a1a1a]">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-300"
              style={{ width: `${progress}%`, background: accentColor }}
            />
          </div>
          <div className="relative z-10 flex h-full w-full items-center bg-transparent px-4">
            <div className="mr-4 shrink-0 text-left text-sm font-medium uppercase tracking-[0.26em] text-white">
              {knownCount} / {total}
            </div>
            <Search className="mr-3 h-4 w-4 shrink-0 text-white/70" />
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSearchSubmit(query);
              }}
              placeholder="filter or command"
              className="h-full w-full border-none bg-transparent px-0 text-left text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <ZoomControl zoom={zoom} setZoom={setZoom} />
        <SelectPanel
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          width="w-80 md:w-96"
          placeholder="Language"
        />
        <SelectPanel
          value={variant}
          onChange={setVariant}
          options={variantOptions}
          width="w-80 md:w-96"
          placeholder="Variant"
        />
        <SettingsPanel
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          showLatin={showLatin}
          setShowLatin={setShowLatin}
          showIPA={showIPA}
          setShowIPA={setShowIPA}
          denseMode={denseMode}
          setDenseMode={setDenseMode}
        />
      </div>
    </div>
  );
}
