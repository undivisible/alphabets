\button 
    class="group relative z-0 w-full border-r border-b transition-all duration-200 {isKnown ? 'border-zinc-800 bg-[#151515] opacity-28' : 'border-zinc-600 bg-[#1c1c1c]'} hover:z-10 hover:opacity-100 active:scale-[0.99]"
    style="height: {height}"
    @click=onToggle
    
    \span class="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-200 group-hover:border-zinc-300"
    
    \div class="flex h-full flex-col justify-center px-2 md:px-3"
        \div class="text-center text-4xl font-light text-zinc-100 md:text-5xl"
            {item.label}
        \div class="mt-2 line-clamp-2 min-h-[1.1rem] text-center text-[9px] uppercase tracking-[0.18em] text-zinc-500 md:text-[10px]"
            {item.meta}
        {showIPA && \div class="mt-1 text-center text-[8px] tracking-[0.08em] text-zinc-700 md:text-[9px]"
            {item.ipa}}
