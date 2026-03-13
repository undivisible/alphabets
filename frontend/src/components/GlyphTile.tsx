import React from "react";

export function GlyphTile({ item, isKnown, onToggle, query, isKanji = false, invisible = false, style = {}, showLatin = true, showIPA = false }: any) {
  const label = isKanji ? getKanjiChar(item) : item.label;
  const primary = isKanji ? getKanjiMeaning(item) : item.meta;
  const readings = isKanji ? getKanjiReadings(item) : { on: [], kun: [] };
  const secondary = isKanji ? (readings.on[0] || readings.kun[0] || "") : item.ipa || "";
  const haystack = isKanji ? `${label} ${primary} ${readings.on.join(" ")} ${readings.kun.join(" ")}`.toLowerCase() : `${item.label} ${item.meta || ""} ${item.ipa || ""}`.toLowerCase();
  const matches = !query || haystack.includes(query.toLowerCase());
  
  if (invisible) return <div style={style} className="w-full border-r border-b border-zinc-800 bg-[#111111]" />;
  
  return (
    <button onClick={onToggle} style={style} className={`group relative z-0 w-full border-r border-b transition-all duration-200 ${isKnown ? "border-zinc-800 bg-[#151515] opacity-28" : matches ? "border-zinc-600 bg-[#1c1c1c] opacity-100" : "border-zinc-800 bg-[#171717] opacity-62"} hover:z-10 hover:opacity-100 active:scale-[0.99]`}>
      <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-200 group-hover:border-zinc-300" />
      <div className="flex h-full flex-col justify-center px-2 md:px-3">
        <div className="text-center text-4xl font-light text-zinc-100 md:text-5xl">{label}</div>
        {showLatin ? <div className="mt-2 line-clamp-2 min-h-[1.1rem] text-center text-[9px] uppercase tracking-[0.18em] text-zinc-500 md:text-[10px]">{primary || ""}</div> : <div className="mt-2 min-h-[1.1rem]" />}
        {showIPA ? <div className="mt-1 text-center text-[8px] tracking-[0.08em] text-zinc-700 md:text-[9px]">{secondary}</div> : null}
      </div>
    </button>
  );
}

export function getKanjiChar(item: any) { return item.kanji || item.char || item.character || item.literal || item.symbol || "?"; }
function getKanjiMeaning(item: any) {
  if (Array.isArray(item.meanings) && item.meanings.length) return item.meanings.join(", ");
  if (Array.isArray(item.meaning) && item.meaning.length) return item.meaning.join(", ");
  if (typeof item.meanings === "string") return item.meanings;
  if (typeof item.meaning === "string") return item.meaning;
  if (Array.isArray(item.gloss) && item.gloss.length) return item.gloss.join(", ");
  return "";
}
function getKanjiReadings(item: any) {
  const on = item.onyomi || item.on || [];
  const kun = item.kunyomi || item.kun || [];
  const onList = Array.isArray(on) ? on : typeof on === "string" ? [on] : [];
  const kunList = Array.isArray(kun) ? kun : typeof kun === "string" ? [kun] : [];
  return { on: onList.slice(0, 3), kun: kunList.slice(0, 3) };
}
