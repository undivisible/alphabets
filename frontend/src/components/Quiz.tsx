import React, { useState, useEffect } from "react";
import { getKanjiChar } from "./GlyphTile";

export function Quiz({ items, isKanji, accentColor, showLatin, showIPA, showName }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizItems, setQuizItems] = useState<any[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) return;
    // Shuffle items for the quiz
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    setQuizItems(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setIsCorrect(null);
  }, [items]);

  const getKanjiMeaning = (it: any) => {
    if (Array.isArray(it.meanings) && it.meanings.length) return it.meanings.join(", ");
    if (Array.isArray(it.meaning) && it.meaning.length) return it.meaning.join(", ");
    if (typeof it.meanings === "string") return it.meanings;
    if (typeof it.meaning === "string") return it.meaning;
    if (Array.isArray(it.gloss) && it.gloss.length) return it.gloss.join(", ");
    return "";
  };

  const generateOptions = (currentItem: any) => {
    const wrongOptions = items
      .filter((it: any) => it !== currentItem)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allOptions = [currentItem, ...wrongOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  useEffect(() => {
    if (quizItems.length > 0 && currentIndex < quizItems.length) {
      generateOptions(quizItems[currentIndex]);
      setSelected(null);
      setIsCorrect(null);
    } else if (quizItems.length > 0 && currentIndex >= quizItems.length) {
      setFinished(true);
    }
  }, [currentIndex, quizItems]);

  if (!items || items.length === 0) return null;

  if (finished) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-[#111111]">
        <h2 className="text-2xl uppercase tracking-[0.2em] text-white mb-6">Quiz Complete</h2>
        <div className="text-6xl font-light text-zinc-300 mb-12" style={{ color: accentColor }}>
          {Math.round((score / quizItems.length) * 100)}%
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-12">
          {score} / {quizItems.length} correct
        </div>
        <button 
          onClick={() => {
            const shuffled = [...items].sort(() => 0.5 - Math.random());
            setQuizItems(shuffled);
            setCurrentIndex(0);
            setScore(0);
            setFinished(false);
          }}
          className="px-8 py-4 border border-zinc-700 text-xs uppercase tracking-[0.2em] text-white hover:bg-zinc-800 transition-colors"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentItem = quizItems[currentIndex];
  if (!currentItem) return null;
  const label = isKanji ? getKanjiChar(currentItem) : currentItem.label;

  const handleSelect = (idx: number, opt: any) => {
    if (selected !== null) return;
    
    setSelected(idx);
    const correct = opt === currentItem;
    setIsCorrect(correct);
    
    setTimeout(() => {
      let nextIndex = currentIndex + 1;
      
      if (correct) {
        setScore((s) => s + 1);
      } else {
        setQuizItems((prev) => {
          const nextItems = [...prev];
          const minInsertIdx = nextIndex + 1; 
          const maxInsertIdx = nextItems.length;
          
          let insertIdx = minInsertIdx + Math.floor(Math.random() * (maxInsertIdx - minInsertIdx + 1));
          if (minInsertIdx > maxInsertIdx) {
              insertIdx = nextItems.length;
          }
          
          nextItems.splice(insertIdx, 0, currentItem);
          return nextItems;
        });
      }
      
      setCurrentIndex(nextIndex);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-[#111111]">
      <div className="mb-12 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-8">Question {currentIndex + 1} of {quizItems.length}</span>
        <div className="h-40 w-40 sm:h-48 sm:w-48 border border-zinc-800 bg-[#171717] flex items-center justify-center shadow-xl">
          <span className="text-7xl sm:text-8xl font-light text-white">{label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {options.map((opt, idx) => {
          let displayName = isKanji ? "" : (opt.meta || "");
          let displayPronunciation = isKanji ? getKanjiMeaning(opt) : (opt.meta || "");
          if (!isKanji && opt.meta) {
            const meta = opt.meta.toLowerCase();
            displayName = meta.includes("letter ") ? (meta.split("letter ").pop() || meta) : meta;
            const commonNames: Record<string, string> = { "alpha": "a", "beta": "b", "gamma": "g", "delta": "d", "epsilon": "e", "zeta": "z", "eta": "e", "theta": "th", "iota": "i", "kappa": "k", "lambda": "l", "mu": "m", "nu": "n", "xi": "x", "omicron": "o", "pi": "p", "rho": "r", "sigma": "s", "tau": "t", "upsilon": "u", "phi": "ph", "chi": "ch", "psi": "ps", "omega": "o", "aleph": "a", "bet": "b", "gimel": "g", "dalet": "d", "he": "h", "vav": "v", "zayin": "z", "chet": "ch", "tet": "t", "yod": "y", "kaf": "k", "lamed": "l", "mem": "m", "nun": "n", "samekh": "s", "ayin": "a", "pe": "p", "tsadi": "ts", "qof": "q", "resh": "r", "shin": "sh", "tav": "t" };
            if (commonNames[displayName]) displayPronunciation = commonNames[displayName];
            else if (displayName.includes(" ")) displayPronunciation = displayName.split(" ")[0];
          }

          const isSelected = selected === idx;
          const isActuallyCorrect = opt === currentItem;
          
          let btnClass = "border-zinc-800 bg-[#171717] hover:border-zinc-500 hover:bg-[#1a1a1a] text-zinc-300";
          if (selected !== null) {
            if (isActuallyCorrect) {
              btnClass = "border-green-500/50 bg-green-500/10 text-green-400";
            } else if (isSelected && !isCorrect) {
              btnClass = "border-red-500/50 bg-red-500/10 text-red-400";
            } else {
              btnClass = "border-zinc-800 bg-[#111] text-zinc-600 opacity-50";
            }
          }

          return (
            <button 
              key={idx}
              onClick={() => handleSelect(idx, opt)}
              disabled={selected !== null}
              className={`p-6 border transition-all duration-300 flex flex-col items-center justify-center min-h-[100px] ${btnClass}`}
            >
              {showLatin && <span className="text-sm sm:text-base uppercase tracking-[0.2em] mb-1">{displayPronunciation || "?"}</span>}
              {showName && displayName !== displayPronunciation && <span className="text-[10px] uppercase tracking-[0.1em] opacity-60 mb-1">{displayName}</span>}
              {showIPA && opt.ipa && <span className="text-[10px] sm:text-xs tracking-[0.1em] opacity-50">{opt.ipa}</span>}
              {!showLatin && !showName && !showIPA && <span className="text-sm sm:text-base uppercase tracking-[0.2em]">{displayPronunciation || "?"}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}