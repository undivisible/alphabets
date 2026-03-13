import React, { useState } from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function SelectPanel({ value, onChange, options, width = "w-64", placeholder = "Select", open: controlledOpen, onOpenChange }: any) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const setOpen = (newOpen: boolean) => {
    if (onOpenChange) onOpenChange(newOpen);
    if (controlledOpen === undefined) setInternalOpen(newOpen);
  };

  const selected = options.find((option: any) => option.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`group relative flex h-full items-center justify-center overflow-hidden border-r border-zinc-800 bg-transparent px-3 sm:px-4 text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-zinc-800/50 ${width}`}>
          <span className={`absolute inset-0 origin-left bg-white transition-transform duration-300 ${open ? "scale-x-100" : "scale-x-0"}`} />
          <span className={`relative z-10 truncate transition-colors duration-300 ${open ? "text-black" : "text-white"}`}>{selected?.label || placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="fixed top-14 left-0 w-full sm:relative sm:top-auto sm:left-auto z-[100] sm:w-auto border-b sm:border border-zinc-800 bg-[#151515] p-0 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2" 
        align="start"
        sideOffset={0}
      >
        <Command className="bg-[#151515] text-white w-full sm:w-[inherit]" style={{ width: "inherit" }}>
          <CommandInput placeholder="Filter" className="h-12 border-b border-zinc-800 text-white placeholder:text-zinc-500 px-4" />
          <CommandList className="max-h-[50vh] sm:max-h-[400px]">
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
                  className="group relative overflow-hidden border border-zinc-700 -mt-px first:mt-0 text-white data-[selected=true]:bg-transparent data-[selected=true]:text-white hover:border-white hover:z-10 h-12 sm:h-10"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 active:scale-x-100" />
                  <div className="relative z-10 flex w-full items-center justify-between px-3 py-2 transition-colors duration-300 active:text-black">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em]">{option.label}</span>
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
