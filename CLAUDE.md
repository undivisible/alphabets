# AI Agent Instructions

## Core Architecture
- **Framework (Main):** React 18 + Vite (Static Build).
- **Framework (Equilibrium Branch):** Equilibrium Language (.eq UI, .eqv Logic).
- **Styling:** Tailwind CSS v4 + Vanilla CSS variables for theming.
- **Components:** Radix UI primitives / shadcn-like components.

## Guidelines
- **Modularity:** Keep components small and single-purpose. All large datasets should remain in `backend/public/data/` or be fetched asynchronously to prevent bloating the component files.
- **Styling:** Prefer `zinc` colors for dark mode UI elements. Maintain sharp edges (no rounding/`rounded-none`) on popovers, dropdowns, and command palettes to match the minimalist block aesthetic.
- **State Management:** Local storage is used for persistence.
- **Tooling:** Use `bun` for script execution and package management.

## Project Structure
- `frontend/`: UI source code and assets.
- `backend/`: Data generation scripts and static data assets.
- `docs/`: Supplemental documentation.
