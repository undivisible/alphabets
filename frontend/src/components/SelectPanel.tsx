import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function SelectPanel({ value, onChange, options, width = "w-64", placeholder = "Select" }: any) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option: any) => option.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`group relative flex h-full items-center justify-between overflow-hidden border border-zinc-700 bg-[#171717] px-4 text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white ${width}`}>
          <span className={`absolute inset-0 origin-left bg-white transition-transform duration-300 ${open ? "scale-x-100" : "scale-x-0"}`} />
          <span className={`relative z-10 truncate transition-colors duration-300 ${open ? "text-black" : "text-white"}`}>{selected?.label || placeholder}</span>
          <ChevronDown className={`relative z-10 ml-3 h-4 w-4 shrink-0 transition-colors duration-300 ${open ? "text-black" : "text-white/70"}`} />
        </button>
      </PopoverTrigger>
      <PopoverContent className={`border-zinc-800 bg-[#151515] p-0 ${width}`} align="end">
        <Command className="bg-[#151515] text-white">
          <CommandInput placeholder="Filter" className="border-zinc-800 text-white placeholder:text-zinc-500" />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-xs uppercase tracking-[0.18em] text-zinc-500">No results.</CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.value}`}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="group relative overflow-hidden border border-zinc-700 -mt-px first:mt-0 text-white data-[selected=true]:bg-transparent data-[selected=true]:text-white hover:border-white hover:z-10"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 active:scale-x-100" />
                  <div className="relative z-10 flex w-full items-center justify-between px-3 py-2 transition-colors duration-300 active:text-black">
                    <span className="text-[10px] uppercase tracking-[0.18em]">{option.label}</span>
                    {option.value === value ? <Check className="h-4 w-4" /> : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
