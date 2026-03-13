import React from "react";

export function GlyphTile({ item, isKnown, onToggle, query, isKanji = false, invisible = false, style = {}, showLatin = true, showIPA = false }: any) {
  const label = isKanji ? getKanjiChar(item) : item.label;
  const primary = isKanji ? getKanjiMeaning(item) : item.meta;
  const readings = isKanji ? getKanjiReadings(item) : { on: [], kun: [] };
  const secondary = isKanji ? (readings.on[0] || readings.kun[0] || "") : item.ipa || "";
  const haystack = isKanji ? `${label} ${primary} ${readings.on.join(" ")} ${readings.kun.join(" ")}`.toLowerCase() : `${item.label} ${item.meta || ""} ${item.ipa || ""}`.toLowerCase();
  const matches = !query || haystack.includes(query.toLowerCase());
  
  if (invisible) return <div style={style} className="w-full border-r border-b border-zinc-800 bg-[#111111] transition-all duration-500 ease-in-out" />;
  
  return (
    <button onClick={onToggle} style={style} className={`group relative w-full border-r border-b transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isKnown ? "border-zinc-800 bg-[#121212] hover:bg-[#1a1a1a]" : matches ? "border-zinc-700 bg-[#1c1c1c] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:bg-[#252525]" : "border-zinc-800 bg-[#151515] hover:bg-[#1f1f1f]"} z-0 hover:z-10 hover:shadow-xl active:scale-[0.97]`}>
      <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 ease-in-out group-hover:border-zinc-500/30" />
      <div className={`flex h-full flex-col justify-center px-2 md:px-3 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 ${isKnown ? "opacity-30" : matches ? "opacity-100" : "opacity-60"}`}>
        <div className={`text-center text-3xl sm:text-4xl font-light md:text-5xl transition-colors duration-300 ${isKnown ? "text-zinc-600" : matches ? "text-zinc-100 group-hover:text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>{label}</div>
        {showLatin ? <div className={`mt-1 sm:mt-2 line-clamp-2 min-h-[1.1rem] text-center text-[8px] sm:text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 ${isKnown ? "text-zinc-700" : "text-zinc-500 group-hover:text-zinc-400"} md:text-[10px]`}>{primary || ""}</div> : <div className="mt-1 sm:mt-2 min-h-[1.1rem]" />}
        {showIPA ? <div className={`mt-0.5 sm:mt-1 text-center text-[7px] sm:text-[8px] tracking-[0.08em] transition-colors duration-300 ${isKnown ? "text-zinc-800" : "text-zinc-600 group-hover:text-zinc-500"} md:text-[9px]`}>{secondary}</div> : null}
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
