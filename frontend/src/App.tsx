import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { 
  STORAGE_KEY, 
  KANJI_BASE_URL, 
  KANJI_FALLBACK_URL, 
  KANJI_LEVELS, 
  DEFAULT_ACCENT, 
  LOCAL_DATA, 
  LANGUAGE_DEFINITIONS, 
  GROUPED_VARIANTS, 
  ROW_SHAPES 
} from "./data/constants";
import { TopBar } from "./components/TopBar";
import { GlyphTile, getKanjiChar } from "./components/GlyphTile";
import { ConfettiLayer } from "./components/ConfettiLayer";

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function App() {
  const [language, setLanguage] = useState("japanese");
  const [variant, setVariant] = useState("hiragana");
  const [kanjiLevel, setKanjiLevel] = useState("n5");
  const [known, setKnown] = useState<Record<string, Record<string, boolean>>>({});
  const [query, setQuery] = useState("");
  const [kanjiItems, setKanjiItems] = useState<any[]>([]);
  const [dynamicItems, setDynamicItems] = useState<any[]>([]);
  const [manifest, setManifest] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [kanjiLoading, setKanjiLoading] = useState(false);
  const [kanjiError, setKanjiError] = useState("");
  const [showLatin, setShowLatin] = useState(true);
  const [showIPA, setShowIPA] = useState(false);
  const [denseMode, setDenseMode] = useState(true);
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT);
  const [completeMessage, setCompleteMessage] = useState("");
  const [confettiFire, setConfettiFire] = useState(false);
  const completedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    fetch("./data/manifest.json")
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => console.error("Failed to load manifest", err));
  }, []);

  const languageOptions = useMemo(() => {
    const local = Object.entries(LANGUAGE_DEFINITIONS).map(([value, info]: [string, any]) => ({ value, label: info.label }));
    const dynamic = Object.entries(manifest).map(([value, info]: [string, any]) => ({ value, label: info.label }));
    const localValues = new Set(local.map(o => o.value));
    const combined = [...local, ...dynamic.filter(o => !localValues.has(o.value))];
    return combined.sort((a, b) => a.label.localeCompare(b.label));
  }, [manifest]);

  const variantOptions = useMemo(() => {
    const def = LANGUAGE_DEFINITIONS[language] || manifest[language];
    if (!def) return [];
    return def.variants.map((item: any) => ({ value: item.id, label: item.label }));
  }, [language, manifest]);

  useEffect(() => {
    const def = LANGUAGE_DEFINITIONS[language] || manifest[language];
    if (def) {
      setVariant(def.variants[0].id);
    }
    setQuery("");
  }, [language, manifest]);

  useEffect(() => {
    if (LANGUAGE_DEFINITIONS[language]) {
      setDynamicItems([]);
      return;
    }
    setLoading(true);
    fetch(`./data/${language}-${variant}.json`)
      .then(res => res.json())
      .then(data => {
        setDynamicItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load script data", err);
        setLoading(false);
      });
  }, [language, variant]);

  const languageLookup = useMemo(() => languageOptions.map((entry: any) => ({ key: entry.value, normalized: normalizeText(entry.label) })), [languageOptions]);
  const variantLookup = useMemo(() => {
    const all = { ...LANGUAGE_DEFINITIONS, ...manifest };
    return Object.fromEntries(Object.entries(all).map(([langKey, def]: [string, any]) => [langKey, def.variants.map((item: any) => ({ key: item.id, normalized: normalizeText(item.label) }))]));
  }, [manifest, LANGUAGE_DEFINITIONS]);

  const handleSearchSubmit = (rawValue: string) => {
    const text = normalizeText(rawValue);
    if (!text) return;
    const kanjiLevelMatch = text.match(/^n\s*([1-5])$/);
    if (kanjiLevelMatch && language === "japanese" && variant === "kanji") {
      setKanjiLevel(`n${kanjiLevelMatch[1]}`);
      setQuery("");
      return;
    }
    const pathParts = rawValue.split(">").map((part) => normalizeText(part)).filter(Boolean);
    if (pathParts.length > 0) {
      const matchedLanguage = languageLookup.find((entry) => entry.normalized === pathParts[0]);
      if (matchedLanguage) {
        setLanguage(matchedLanguage.key);
        if (pathParts[1]) {
          const matchedVariant = variantLookup[matchedLanguage.key].find((entry: any) => entry.normalized === pathParts[1]);
          if (matchedVariant) setVariant(matchedVariant.key);
        }
        setQuery("");
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setKnown(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(known)); }, [known]);

  useEffect(() => {
    if (!(language === "japanese" && variant === "kanji")) return;
    let cancelled = false;
    async function loadKanji() {
      setKanjiLoading(true); setKanjiError("");
      try {
        const urls = [`${KANJI_BASE_URL}/${kanjiLevel}.json`, `${KANJI_FALLBACK_URL}/${kanjiLevel}.json`];
        let data = null;
        for (const url of urls) {
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (Array.isArray(json)) { data = json; break; }
          } catch {}
        }
        if (!data) throw new Error(`Failed to load ${kanjiLevel.toUpperCase()} kanji list`);
        if (!cancelled) setKanjiItems(data);
      } catch (err) {
        if (!cancelled) { setKanjiItems([]); setKanjiError(err instanceof Error ? err.message : "Could not load kanji list"); }
      } finally { if (!cancelled) setKanjiLoading(false); }
    }
    loadKanji();
    return () => { cancelled = true; };
  }, [language, variant, kanjiLevel]);

  const activeItems = useMemo(() => {
    if (language === "japanese" && variant === "kanji") return kanjiItems;
    if (LANGUAGE_DEFINITIONS[language]) return LOCAL_DATA[language]?.[variant] || [];
    return dynamicItems || [];
  }, [language, variant, kanjiItems, dynamicItems]);

  const storageBucket = `${language}:${variant}${language === "japanese" && variant === "kanji" ? `:${kanjiLevel}` : ""}`;
  const total = activeItems.length;
  const knownCount = useMemo(() => (language === "japanese" && variant === "kanji") ? activeItems.filter((item: any) => known[storageBucket]?.[getKanjiChar(item)]).length : activeItems.filter((item: any) => known[storageBucket]?.[item.label]).length, [activeItems, known, storageBucket, language, variant]);
  const progress = total > 0 ? (knownCount / total) * 100 : 0;

  useEffect(() => {
    const done = total > 0 && knownCount === total;
    if (done && !completedRef.current[storageBucket]) {
      completedRef.current[storageBucket] = true;
      const all = { ...LANGUAGE_DEFINITIONS, ...manifest };
      const languageLabel = all[language]?.label || language;
      const variantLabel = all[language]?.variants?.find((v: any) => v.id === variant)?.label || variant;
      setCompleteMessage(`Completed ${languageLabel} / ${variantLabel}`);
      setConfettiFire(true);
      setTimeout(() => setConfettiFire(false), 1800);
      setTimeout(() => setCompleteMessage(""), 2200);
    }
    if (!done) completedRef.current[storageBucket] = false;
  }, [knownCount, total, storageBucket, language, variant, manifest]);

  const toggleKnown = (key: string) => setKnown((prev: any) => ({ ...prev, [storageBucket]: { ...prev[storageBucket], [key]: !prev[storageBucket]?.[key] } }));
  const isKanji = language === "japanese" && variant === "kanji";

  const groupedRows = useMemo(() => {
    if (isKanji) return null;
    const layout = GROUPED_VARIANTS[language]?.[variant];
    if (layout) {
      const itemMap = new Map(activeItems.map((item: any) => [item.meta, item]));
      return layout.map((row: any) => row.map((key: any) => (key ? itemMap.get(key) || null : null)));
    }
    const shape = ROW_SHAPES[language]?.[variant];
    if (!shape) return null;

    const { columns, orientation } = shape;
    if (orientation === "column") {
      const rows = Math.ceil(activeItems.length / columns);
      const grid = Array.from({ length: rows }, () => Array(columns).fill(null));
      activeItems.forEach((item: any, index: number) => {
        const col = Math.floor(index / rows);
        const row = index % rows;
        grid[row][col] = item;
      });
      return grid;
    }

    const rows = [];
    for (let i = 0; i < activeItems.length; i += columns) {
      const row = activeItems.slice(i, i + columns);
      while (row.length < columns) row.push(null);
      rows.push(row);
    }
    return rows;
  }, [activeItems, isKanji, language, variant]);

  const barHeight = 56;
  const extraTop = isKanji ? 40 : 0;
  const availableHeight = typeof window !== "undefined" ? window.innerHeight - barHeight - extraTop : 720;
  const rowsCount = groupedRows ? groupedRows.length : Math.max(1, Math.ceil(activeItems.length / 12));
  const tileHeight = `${Math.max(60, Math.floor((availableHeight / rowsCount) * (denseMode ? 1 : 0.82)))}px`;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#111111] text-zinc-100">
      <ConfettiLayer fire={confettiFire} accentColor={accentColor} />
      <TopBar
        progress={progress}
        knownCount={knownCount}
        total={total}
        query={query}
        setQuery={setQuery}
        onSearchSubmit={handleSearchSubmit}
        language={language}
        setLanguage={setLanguage}
        variant={variant}
        setVariant={setVariant}
        languageOptions={languageOptions}
        variantOptions={variantOptions}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        showLatin={showLatin}
        setShowLatin={setShowLatin}
        showIPA={showIPA}
        setShowIPA={setShowIPA}
        denseMode={denseMode}
        setDenseMode={setDenseMode}
      />

      {completeMessage ? (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 border border-zinc-700 bg-[#111111] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white">{completeMessage}</div>
      ) : null}

      {isKanji && (
        <div className="flex h-10 border-b border-zinc-800 bg-[#141414] overflow-x-auto">
          {KANJI_LEVELS.map((level) => (
            <button key={level} onClick={() => setKanjiLevel(level)} className={`h-full border-r border-zinc-800 px-4 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap transition ${kanjiLevel === level ? "text-black" : "bg-[#141414] text-zinc-500 hover:bg-[#1b1b1b] hover:text-zinc-100"}`} style={kanjiLevel === level ? { background: accentColor } : undefined}>{level}</button>
          ))}
        </div>
      )}

      <div className={`overflow-auto ${isKanji ? "h-[calc(100vh-96px)]" : "h-[calc(100vh-56px)]"}`}>
        {(isKanji && kanjiLoading) || loading ? (
          <div className="flex h-full items-center justify-center"><div className="flex h-14 items-center gap-3 border border-zinc-800 bg-[#181818] px-5 text-[11px] uppercase tracking-[0.25em] text-zinc-400"><Loader2 className="h-4 w-4 animate-spin" />Loading</div></div>
        ) : isKanji && kanjiError ? (
          <Card className="border-0 bg-[#181818]"><CardContent className="p-6 text-[11px] uppercase tracking-[0.18em] text-zinc-400">{kanjiError}</CardContent></Card>
        ) : groupedRows ? (
          <div className="border-l border-t border-zinc-800">
            {groupedRows.map((row: any, rowIndex: number) => (
              <div key={`${storageBucket}-row-${rowIndex}`} className="grid" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
                {row.map((item: any, index: number) => item ? (
                  <GlyphTile key={`${storageBucket}-${item.label}-${rowIndex}-${index}`} item={item} query={query} isKnown={!!known[storageBucket]?.[item.label]} onToggle={() => toggleKnown(item.label)} style={{ height: tileHeight }} showLatin={showLatin} showIPA={showIPA} />
                ) : (
                  <GlyphTile key={`${storageBucket}-empty-${rowIndex}-${index}`} invisible item={{ label: "", meta: "" }} query={query} onToggle={() => {}} style={{ height: tileHeight }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 border-l border-t border-zinc-800 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
            {activeItems.map((item: any, index: number) => {
              const key = isKanji ? getKanjiChar(item) : item.label;
              return <GlyphTile key={`${storageBucket}-${key}-${index}`} item={item} query={query} isKanji={isKanji} isKnown={!!known[storageBucket]?.[key]} onToggle={() => toggleKnown(key)} style={{ height: tileHeight }} showLatin={showLatin} showIPA={showIPA} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
