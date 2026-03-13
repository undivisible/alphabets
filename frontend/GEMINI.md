# AI Agent Instructions

## Core Architecture
- **Framework:** React 18 + Vite (Static Build)
- **Styling:** Tailwind CSS + Vanilla CSS variables for theming.
- **Components:** Radix UI primitives / shadcn-like components.

## Guidelines
- **Modularity:** Keep components small and single-purpose. All large datasets should remain in `src/data/constants.ts` or be fetched asynchronously to prevent bloating the component files.
- **Styling:** Prefer `zinc` colors for dark mode UI elements. Maintain sharp edges (no rounding/`rounded-none`) on popovers, dropdowns, and command palettes to match the minimalist block aesthetic.
- **State Management:** Local storage is used for persistence. Ensure any new data buckets (e.g., when adding new languages) are correctly typed and handle undefined states gracefully when reading from `localStorage`.
- **Tooling:** When writing commands or scripts, ensure they are compatible with standard Unix environments.
