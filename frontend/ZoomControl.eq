\div class="flex h-full items-center border border-zinc-700 bg-[#171717]"
    \button 
        class="flex h-full items-center px-3 text-white transition hover:border-white hover:bg-zinc-800"
        @click={() => setZoom(z => Math.max(0.7, z - 0.1))}
        \Minus class="h-4 w-4"
    
    \button 
        class="min-w-[72px] px-2 text-center text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-zinc-800"
        {Math.round(zoom * 100)}%
    
    \button 
        class="flex h-full items-center px-3 text-white transition hover:border-white hover:bg-zinc-800"
        @click={() => setZoom(z => Math.min(1.8, z + 0.1))}
        \Plus class="h-4 w-4"
