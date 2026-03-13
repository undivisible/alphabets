\div class="relative {width}"
    \button 
        class="group relative flex h-full items-center justify-between overflow-hidden border border-zinc-700 bg-[#171717] px-4 text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white w-full"
        @click={() => open = !open}
        
        \span class="absolute inset-0 origin-left bg-white transition-transform duration-300 {open ? 'scale-x-100' : 'scale-x-0'}"
        \span class="relative z-10 truncate transition-colors duration-300 {open ? 'text-black' : 'text-white'}"
            {selected?.label || placeholder}
        \ChevronDown class="relative z-10 ml-3 h-4 w-4 shrink-0 transition-colors duration-300 {open ? 'text-black' : 'text-white/70'}"

    {open && (
        \div class="absolute right-0 top-full z-50 mt-px border border-zinc-800 bg-[#151515] p-0 {width}"
            \div class="flex flex-col"
                {options.map((option) => (
                    \button 
                        class="group relative overflow-hidden border border-zinc-700 -mt-px first:mt-0 text-white px-3 py-2 hover:z-10 hover:border-white transition-all"
                        @click={() => { onChange(option.value); open = false; }}
                        
                        \span class="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-300 active:scale-x-100"
                        \div class="relative z-10 flex w-full items-center justify-between"
                            \span class="text-[10px] uppercase tracking-[0.18em] group-active:text-black"
                                {option.label}
                            {option.value === value && \Check class="h-4 w-4 text-white group-active:text-black"}
                ))}
    )}
