\div class="relative h-full"
    \button 
        class="flex h-full items-center border border-zinc-700 bg-[#171717] px-4 text-white transition hover:border-white"
        @click={() => open = !open}
        \Settings2 class="h-4 w-4"

    {open && (
        \div class="absolute right-0 top-full z-50 mt-px w-80 border border-zinc-800 bg-[#151515] p-0"
            \div class="border-b border-zinc-800 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white"
                "Display"
            
            \div class="border-b border-zinc-800 px-4 py-4"
                \div class="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white"
                    \Palette class="h-4 w-4"
                    "Accent"
                \div class="grid grid-cols-6 gap-2"
                    {presets.map((color) => (
                        \button 
                            class="h-8 border transition {accentColor === color ? 'border-white' : 'border-zinc-700 hover:border-white'}"
                            style="background: {color}"
                            @click=setAccentColor(color)
                    ))}
            
            \label class="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer"
                \span "Latin pronunciation"
                \Checkbox checked={showLatin} @change=setShowLatin
            
            \label class="flex items-center justify-between border-b border-zinc-800 px-4 py-4 text-sm text-white cursor-pointer"
                \span "IPA"
                \Checkbox checked={showIPA} @change=setShowIPA
            
            \label class="flex items-center justify-between px-4 py-4 text-sm text-white cursor-pointer"
                \span "Dense layout"
                \Checkbox checked={denseMode} @change=setDenseMode
    )}
