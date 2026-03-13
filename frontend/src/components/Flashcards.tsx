import React, { useState, useEffect } from "react";
import { getKanjiChar } from "./GlyphTile";

export function Flashcards({ items, isKanji, accentColor, showLatin, showIPA }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [items]);

  if (!items || items.length === 0) return null;

  const item = items[currentIndex];
  const label = isKanji ? getKanjiChar(item) : item.label;
  
  const getKanjiMeaning = (it: any) => {
    if (Array.isArray(it.meanings) && it.meanings.length) return it.meanings.join(", ");
    if (Array.isArray(it.meaning) && it.meaning.length) return it.meaning.join(", ");
    if (typeof it.meanings === "string") return it.meanings;
    if (typeof it.meaning === "string") return it.meaning;
    if (Array.isArray(it.gloss) && it.gloss.length) return it.gloss.join(", ");
    return "";
  };

  const getKanjiReadings = (it: any) => {
    const on = it.onyomi || it.on || [];
    const kun = it.kunyomi || it.kun || [];
    const onList = Array.isArray(on) ? on : typeof on === "string" ? [on] : [];
    const kunList = Array.isArray(kun) ? kun : typeof kun === "string" ? [kun] : [];
    return { on: onList.slice(0, 3), kun: kunList.slice(0, 3) };
  };

  const primary = isKanji ? getKanjiMeaning(item) : item.meta;
  const readings = isKanji ? getKanjiReadings(item) : { on: [], kun: [] };
  const secondary = isKanji ? (readings.on[0] || readings.kun[0] || "") : item.ipa || "";

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-[#111111]">
      <div 
        className="group relative w-full max-w-[280px] sm:max-w-sm aspect-[4/5] sm:aspect-square cursor-pointer [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`absolute inset-0 h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 h-full w-full border border-zinc-800 bg-[#171717] flex flex-col items-center justify-center [backface-visibility:hidden] shadow-xl hover:bg-[#1a1a1a] transition-colors">
            <span className="text-8xl md:text-9xl font-light text-white">{label}</span>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 h-full w-full border border-zinc-700 bg-[#1c1c1c] flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl p-8 text-center" style={{ borderBottomColor: accentColor, borderBottomWidth: '4px' }}>
            <span className="text-6xl font-light text-zinc-600 mb-8 opacity-20">{label}</span>
            {showLatin && <span className="text-2xl uppercase tracking-[0.2em] text-zinc-300 mb-4 leading-tight">{primary || ""}</span>}
            {showIPA && <span className="text-lg tracking-[0.1em] text-zinc-500">{secondary}</span>}
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex items-center gap-8">
        <button onClick={handlePrev} className="px-6 py-3 border border-zinc-800 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-zinc-500 transition-all active:scale-95">Prev</button>
        <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">{currentIndex + 1} / {items.length}</span>
        <button onClick={handleNext} className="px-6 py-3 border border-zinc-800 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-zinc-500 transition-all active:scale-95">Next</button>
      </div>
    </div>
  );
}