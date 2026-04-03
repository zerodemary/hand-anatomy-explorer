# v0.3 Commit Plan (Strict Incremental)

## Commit 1: Foundation Bootstrap
- Migrate project to React + TypeScript + Vite + Tailwind
- Add Vitest + React Testing Library scaffolding
- Add schema-driven data layer with Zod
- Add initial JSON datasets with stable IDs
- Add baseline validation tests (ID uniqueness, reference integrity)
- Keep Explorer 3D as minimal placeholder scene only

## Commit 2: Data Domain + Read Models
- Build domain selectors for profile-aware measurements
- Add derived-value metadata handling (evidenceLevel, notes)
- Implement source tracing utilities for UI usage

## Commit 3: Explorer 3D (Parametric A)
- Implement code-generated parametric hand model in R3F
- Add orbit/zoom/pan, hover/select highlights, detail panel
- Add profile-driven geometry updates
- Add clean mesh adapter interface for future GLB path (Approach B)

## Commit 4: Lengths + Naming Guide
- Implement full Lengths page with profile comparison and derived indicators
- Implement Naming Guide page (joint/motion/neutral/sign conventions)
- Add source list rendering and traceability links

## Commit 5: Hardening + Static Deploy
- Add tests for critical domain/UI paths
- Improve accessibility and desktop/mobile readability
- Finalize GitHub Pages static deployment workflow for Vite dist/
- Update docs and release notes for v0.3
