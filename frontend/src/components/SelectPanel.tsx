import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

function formatFallbackLabel(val: string) {
  if (!val) return "";
  return val.replace(/([a-z])([A-Z])/g, '$1 $2').split(/[- ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function SelectPanel({ value, onChange, options, width = "w-40", placeholder = "Select", open: controlledOpen, onOpenChange }: any) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (val: boolean) => {
    if (!val) setFilterText("");
    if (onOpenChange) onOpenChange(val);
    if (controlledOpen === undefined) setInternalOpen(val);
  };

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const selected = options.find((o: any) => o.value === value);
  const displayLabel = selected?.label || formatFallbackLabel(value) || placeholder;

  const filtered = filterText
    ? options.filter((o: any) =>
        o.label.toLowerCase().includes(filterText.toLowerCase()) ||
        o.value.toLowerCase().includes(filterText.toLowerCase())
      )
    : options;

  const list = (
    <>
      {filtered.length === 0 ? (
        <div className="py-6 text-center text-xs uppercase tracking-[0.18em] text-zinc-500">
          No results.
        </div>
      ) : filtered.map((option: any) => (
        <button
          key={option.value}
          onClick={() => { onChange(option.value); setOpen(false); }}
          className="group relative w-full overflow-hidden border border-zinc-700 -mt-px first:mt-0 flex items-center justify-between px-4 sm:px-3 h-14 sm:h-10 bg-[#151515] text-white hover:border-white hover:z-10 transition-colors"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 max-sm:active:scale-x-100 sm:hidden" />
          <span className="relative z-10 text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-colors duration-300 max-sm:group-active:text-black">
            {option.label}
          </span>
          {option.value === value && <Check className="relative z-10 h-4 w-4 shrink-0" />}
        </button>
      ))}
    </>
  );

  return (
    <div className={`relative h-full shrink-0 ${width}`}>
      {/* Trigger */}
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden border-r border-zinc-800 bg-transparent px-3 sm:px-4 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 hover:bg-zinc-800/50 cursor-pointer ${open ? "bg-zinc-800" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={`absolute inset-0 origin-left bg-white transition-transform duration-300 sm:hidden ${open ? "scale-x-100" : "scale-x-0"}`} />
        <div className={`relative z-10 flex w-full h-full items-center justify-center transition-colors duration-300 ${open ? "text-black sm:text-white" : "text-white"}`}>
          {open ? (
            <input
              ref={inputRef}
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              placeholder="FILTER..."
              className="w-full bg-transparent border-none outline-none ring-0 text-center text-[10px] uppercase tracking-[0.22em] placeholder:text-black/40 sm:placeholder:text-white/40 h-full caret-current"
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className="truncate text-white">{displayLabel}</span>
          )}
        </div>
      </div>

      {open && (
        <>
          {/* Desktop: absolute, no portal — lines up with trigger width */}
          <div className="hidden sm:block absolute top-full left-0 w-full z-50 border border-zinc-800 bg-[#151515] shadow-2xl max-h-96 overflow-y-auto">
            {list}
          </div>

          {/* Mobile: portal to body — avoids backdrop-filter containing block clipping fixed children */}
          {createPortal(
            <div className="sm:hidden">
              <div
                className="fixed inset-0 top-14 z-40 bg-black/50"
                onClick={() => setOpen(false)}
              />
              <div className="fixed top-14 left-0 w-full z-50 bg-[#151515] border-b border-zinc-800 shadow-2xl max-h-[calc(100dvh-3.5rem)] overflow-y-auto">
                {list}
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </div>
  );
}
