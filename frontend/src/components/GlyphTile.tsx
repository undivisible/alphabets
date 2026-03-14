import React from "react";

export function GlyphTile({ 
  item, 
  isKnown, 
  onToggle, 
  query, 
  isKanji = false, 
  invisible = false, 
  style = {}, 
  showLatin = true, 
  showIPA = false,
  showName = false
}: any) {
  const label = isKanji ? getKanjiChar(item) : item.label;
  
  // Extract display name and pronunciation
  let displayName = isKanji ? "" : (item.meta || "");
  let displayPronunciation = isKanji ? getKanjiMeaning(item) : (item.meta || "");

  if (!isKanji && item.meta) {
    const meta = item.meta.toLowerCase();
    // Heuristic: if it's a long Unicode name, extract the core part
    if (meta.includes("letter ")) {
      displayName = meta.split("letter ").pop() || meta;
    } else {
      displayName = meta;
    }

    // Heuristic for pronunciation
    const commonNames: Record<string, string> = {
      "alpha": "a", "beta": "b", "gamma": "g", "delta": "d", "epsilon": "e", 
      "zeta": "z", "eta": "e", "theta": "th", "iota": "i", "kappa": "k",
      "lambda": "l", "mu": "m", "nu": "n", "xi": "x", "omicron": "o",
      "pi": "p", "rho": "r", "sigma": "s", "tau": "t", "upsilon": "u",
      "phi": "ph", "chi": "ch", "psi": "ps", "omega": "o",
      "aleph": "a", "bet": "b", "gimel": "g", "dalet": "d", "he": "h",
      "vav": "v", "zayin": "z", "chet": "ch", "tet": "t", "yod": "y",
      "kaf": "k", "lamed": "l", "mem": "m", "nun": "n", "samekh": "s",
      "ayin": "a", "pe": "p", "tsadi": "ts", "qof": "q", "resh": "r",
      "shin": "sh", "tav": "t", "ayb": "a", "ben": "b", "gim": "g",
      "da": "d", "ech": "e", "za": "z", "ini": "i", "lyun": "l", "khe": "kh",
      "ken": "k", "ho": "h", "dzola": "dz", "ghat": "gh", "che": "ch",
      "men": "m", "hi": "h", "now": "n", "sha": "sh", "vo": "v", "cha": "ch",
      "pe": "p", "je": "j", "ra": "r", "se": "s", "vev": "v", "tyun": "t",
      "re": "r", "co": "ts", "yiwn": "y", "p'iwr": "p", "k'e": "k", "oh": "o", "fe": "f"
    };

    if (commonNames[displayName]) {
      displayPronunciation = commonNames[displayName];
    } else if (displayName.includes(" ")) {
      // For Thai like "ko kai", use the first word as pronunciation
      displayPronunciation = displayName.split(" ")[0];
    }
    
    // If they are the same, don't show both
    if (displayPronunciation === displayName) {
      // If we are showing Name, we might want to hide pronunciation or vice versa
      // but let's keep it simple for now.
    }
  }

  const readings = isKanji ? getKanjiReadings(item) : { on: [], kun: [] };
  const ipa = isKanji ? (readings.on[0] || readings.kun[0] || "") : (item.ipa || "");
  
  const haystack = isKanji 
    ? `${label} ${displayPronunciation} ${readings.on.join(" ")} ${readings.kun.join(" ")}`.toLowerCase() 
    : `${item.label} ${item.meta || ""} ${item.ipa || ""}`.toLowerCase();
  
  const matches = !query || haystack.includes(query.toLowerCase());
  
  if (invisible) return <div style={style} className="w-full border-r border-b border-zinc-800 bg-[#111111] transition-all duration-500 ease-in-out" />;
  
  const showCount = (showLatin ? 1 : 0) + (showName ? 1 : 0) + (showIPA ? 1 : 0);
  const isCramped = showCount >= 2;

  return (
    <button onClick={onToggle} style={style} className={`group relative w-full border-r border-b transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isKnown ? "border-zinc-800 bg-[#121212] hover:bg-[#1a1a1a]" : matches ? "border-zinc-700 bg-[#1c1c1c] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:bg-[#252525]" : "border-zinc-800 bg-[#151515] hover:bg-[#1f1f1f]"} z-0 hover:z-10 hover:shadow-xl active:scale-[0.97]`}>
      <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 ease-in-out group-hover:border-zinc-500/30" />
      <div className={`flex h-full flex-col justify-center px-1.5 md:px-3 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 ${isKnown ? "opacity-30" : matches ? "opacity-100" : "opacity-60"}`}>
        <div className={`text-center font-light transition-colors duration-300 ${isCramped ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"} ${isKnown ? "text-zinc-600" : matches ? "text-zinc-100 group-hover:text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>{label}</div>
        
        <div className="flex flex-col items-center">
          {showLatin && (
            <div className={`mt-0.5 sm:mt-1 line-clamp-1 min-h-[0.8rem] text-center text-[8px] sm:text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 ${isKnown ? "text-zinc-700" : "text-zinc-500 group-hover:text-zinc-400"} md:text-[10px]`}>
              {displayPronunciation}
            </div>
          )}
          
          {showName && displayName !== displayPronunciation && (
            <div className={`line-clamp-1 min-h-[0.8rem] text-center text-[7px] sm:text-[8px] uppercase tracking-[0.12em] transition-colors duration-300 ${isKnown ? "text-zinc-800" : "text-zinc-600 group-hover:text-zinc-500"} md:text-[9px]`}>
              {displayName}
            </div>
          )}

          {showIPA && (
            <div className={`mt-0.5 text-center text-[7px] sm:text-[8px] tracking-[0.08em] transition-colors duration-300 ${isKnown ? "text-zinc-800" : "text-zinc-600 group-hover:text-zinc-500"} md:text-[9px]`}>
              {ipa}
            </div>
          )}
        </div>
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
