# Hand Anatomy Explorer

Open-source 3D interactive hand anatomy reference for dexterous hand design.

## Live Demo

https://zerodemary.github.io/hand-anatomy-explorer/

## v0.3 Status

This repository follows an incremental commit plan.
Current progress: **Commit 3 (Explorer 3D Parametric Interaction)**.

Included in this increment:

- React + TypeScript + Vite + Tailwind setup
- three.js + @react-three/fiber + @react-three/drei wiring
- Zod schema-driven data layer
- Static JSON dataset with stable IDs and source traceability
- Vitest + React Testing Library test scaffolding
- Domain read models for profile-aware measurement access
- Derived metadata normalization and source trace aggregation utilities
- Parametric R3F hand interaction: hover + select highlight, clickable joints/segments
- Profile-driven geometry updates from measurement data
- Mesh adapter host architecture with future GLTF placeholder adapter
- GitHub Pages deployment workflow for `dist/`

## Product Scope (v0.3 target)

- Explorer: 3D parametric hand model (Approach A)
- Lengths: profile-aware segment table and comparison
- Naming Guide: joint/motion naming conventions + source list

## Required Profiles

- `western_male_50`
- `asian_male_50`

## Local Development

```bash
npm install
npm run dev
```

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

## Data Sources (current references)

- AAOS Joint Motion (2nd)
- Kapandji Vol.1
- Buryanov & Kotiuk 2010
- IFSSH nomenclature context
- FIPAT Terminologia Anatomica 2
- Kuo et al. 2009 scaling reference

## License

MIT. See [LICENSE](./LICENSE).
