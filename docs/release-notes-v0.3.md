# Release Notes: v0.3

## Summary

`hand-anatomy-explorer` v0.3 delivers a public static 3D design reference for dexterous hand development, focused on profile-aware measurements, traceable naming rules, and browser-based interaction.

## What Landed

- Explorer (Approach A primary)
  - Parametric code-generated hand model in React Three Fiber
  - Orbit/zoom/pan controls
  - Joint and segment hover/select interaction
  - Detail panel with ROM/segment metadata and source trace
  - Adapter host seam reserved for future GLTF asset path
- Lengths
  - Profile comparison with selectable baseline profile
  - Delta (mm / %) computation
  - Derived vs direct visibility labels
  - Per-row source trace for both compared profiles
- Naming Guide
  - Joint naming and motion naming tables
  - Explicit neutral position and sign convention rules
  - Source-linked naming references
- Data and domain
  - Zod-validated schema-driven JSON catalog
  - Read models for explorer, lengths, naming guide
  - Source traceability utilities
- Quality and deploy
  - Vitest + React Testing Library coverage for critical paths
  - GitHub Pages static deploy pipeline for `dist/`

## Known Limits

- v0.3 is a design reference tool, not a medical simulator.
- GLTF hand assets are not the primary rendering path yet.
- Current profiles are limited to:
  - `western_male_50`
  - `asian_male_50`

## Next Direction (Post v0.3)

1. Add more profile datasets with evidence-level metadata.
2. Expand ROM provenance granularity per joint-motion source mapping.
3. Implement optional low-poly GLTF adapter on top of existing host interface.
