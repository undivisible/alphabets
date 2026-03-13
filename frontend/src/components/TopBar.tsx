import React, { useState, useRef, useEffect } from "react";
import { Search, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  allSearchOptions: { type: string, langKey: string, variantKey: string, label: string }[];
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
  allSearchOptions,
  accentColor,
  setAccentColor,
  showLatin,
  setShowLatin,
  showIPA,
  setShowIPA,
  denseMode,
  setDenseMode,
}: TopBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [varOpen, setVarOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const queryLower = query.toLowerCase().trim();
  const searchSuggestions = queryLower.length > 1 
    ? allSearchOptions.filter(opt => opt.label.toLowerCase().includes(queryLower) && !(opt.langKey === language && opt.variantKey === variant))
    : [];

  const activeTab = searchFocused ? 'search' : langOpen ? 'lang' : varOpen ? 'var' : null;

  return (
    <div className="sticky top-0 z-30 bg-[#111111]/95 backdrop-blur transition-all duration-300">
      <div className="flex h-14 w-full items-center gap-0 border-b border-zinc-800">
        <div 
          ref={searchRef} 
          className={`relative h-full items-center border-r border-zinc-800 bg-[#1a1a1a] transition-all duration-300 flex ${
            (activeTab === 'lang' || activeTab === 'var') ? 'w-0 overflow-hidden opacity-0 border-0 sm:border-r sm:w-auto sm:opacity-100 sm:flex-1' : 'flex-1 min-w-0'
          }`}
        >
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a1a1a]">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: accentColor }}
            />
          </div>
          <div className="relative z-10 flex h-full w-full items-center bg-transparent px-2 md:px-4">
            <div className="hidden sm:block mr-2 md:mr-4 shrink-0 text-left text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] md:tracking-[0.26em] text-white">
              {knownCount} / {total}
            </div>
            <Search className="mr-2 h-3 w-3 md:h-4 md:w-4 shrink-0 text-white/70" />
            <Input
              value={query}
              onFocus={() => {
                setShowSuggestions(true);
                setSearchFocused(true);
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setSearchFocused(true);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  if (searchSuggestions.length > 0) {
                    setLanguage(searchSuggestions[0].langKey);
                    setVariant(searchSuggestions[0].variantKey);
                    setQuery("");
                  } else {
                    onSearchSubmit(query);
                  }
                  setShowSuggestions(false);
                  setSearchFocused(false);
                }
              }}
              placeholder="Search..."
              className="h-full w-full border-none bg-transparent px-0 text-left text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
            />
          </div>

          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute left-0 top-[100%] z-50 w-full border border-t-0 border-zinc-700 bg-[#151515] shadow-2xl">
              <div className="max-h-[60vh] overflow-y-auto py-2">
                <div className="px-4 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Switch Script
                </div>
                {searchSuggestions.map((opt) => (
                  <button
                    key={`${opt.langKey}-${opt.variantKey}`}
                    onClick={() => {
                      setLanguage(opt.langKey);
                      setVariant(opt.variantKey);
                      setQuery("");
                      setShowSuggestions(false);
                      setSearchFocused(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-800"
                  >
                    <Globe className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs uppercase tracking-[0.18em] text-white">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <SelectPanel
          value={language}
          onChange={setLanguage}
          options={languageOptions}
          open={langOpen}
          onOpenChange={setLangOpen}
          width={`${activeTab === 'lang' ? 'flex-1 w-full sm:w-40 md:w-64 lg:w-80' : activeTab ? 'w-0 overflow-hidden opacity-0 px-0 sm:px-4 border-0 sm:border-r sm:opacity-100 sm:w-40 md:w-64 lg:w-80' : 'w-28 sm:w-40 md:w-64 lg:w-80'}`}
          placeholder="Language"
        />
        <SelectPanel
          value={variant}
          onChange={setVariant}
          options={variantOptions}
          open={varOpen}
          onOpenChange={setVarOpen}
          width={`${activeTab === 'var' ? 'flex-1 w-full sm:w-40 md:w-64 lg:w-80' : activeTab ? 'w-0 overflow-hidden opacity-0 px-0 sm:px-4 border-0 sm:border-r sm:opacity-100 sm:w-40 md:w-64 lg:w-80' : 'w-28 sm:w-40 md:w-64 lg:w-80'}`}
          placeholder="Variant"
        />
        <div className={`h-full transition-all duration-300 overflow-hidden ${activeTab && activeTab !== 'search' ? 'w-0 sm:w-auto' : 'w-10 sm:w-auto'}`}>
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
    </div>
  );
}
