{fire && (
    \div class="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        {pieces.map((i) => (
            \span
                key={i}
                class="absolute block h-3 w-2 animate-fall"
                style="left: {(i * 97) % 100}%; top: -10px; background: {i % 2 ? accentColor : '#ffffff'}; transform: rotate({i * 17}deg); animation-delay: {(i % 8) * 40}ms"
        ))}
)}
