\div class="sticky top-0 z-30 bg-[#111111]/95 backdrop-blur"
    \div class="flex h-14 w-full items-center gap-0 border-b border-zinc-800"
        \div class="relative flex min-w-0 flex-1 h-full items-center overflow-hidden border-r border-zinc-800 bg-[#1a1a1a]"
            \div class="absolute inset-0 z-0 overflow-hidden bg-[#1a1a1a]"
                \div 
                    class="absolute inset-y-0 left-0 transition-all duration-300" 
                    style="width: {progress}%; background: {accentColor}"
            
            \div class="relative z-10 flex h-full w-full items-center bg-transparent px-4"
                \div class="mr-4 shrink-0 text-left text-sm font-medium uppercase tracking-[0.26em] text-white"
                    {knownCount} / {total}
                
                \Search class="mr-3 h-4 w-4 shrink-0 text-white/70"
                \input 
                    value={query}
                    @input={e => setQuery(e.target.value)}
                    @keydown={e => e.key === "Enter" && onSearchSubmit(query)}
                    placeholder="filter or command"
                    class="h-full w-full border-none bg-transparent px-0 text-left text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        
        \ZoomControl zoom={zoom} @change={setZoom}
        \SelectPanel value={language} options={languageOptions} @change={setLanguage}
        \SelectPanel value={variant} options={variantOptions} @change={setVariant}
        \SettingsPanel accentColor={accentColor}
