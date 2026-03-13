\div class="h-screen w-screen overflow-hidden bg-[#111111] text-zinc-100"
    \TopBar 
        progress={progress} 
        knownCount={knownCount} 
        total={total}
        @query=query
        @onSearchSubmit=handleSearchSubmit
        @language=language
        @variant=variant
        @zoom=zoom
        @accentColor=accentColor
    
    \div class="overflow-auto h-[calc(100vh-56px)]"
        \div class="grid grid-cols-3 border-l border-t border-zinc-800 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12"
            {activeItems.map((item) => (
                \GlyphTile 
                    item={item} 
                    isKnown={known[storageBucket][item.label]}
                    @click=toggleKnown(storageBucket, item.label)
            ))}
