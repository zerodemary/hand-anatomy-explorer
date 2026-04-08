# Deploy Checklist (GitHub Pages, v0.3)

## Preconditions

- Repository default branch is `main`.
- GitHub Pages source is configured as `GitHub Actions`.
- `vite.config.ts` base path matches repository name:
  - `base: "/hand-anatomy-explorer/"`

## Workflow

- Deploy workflow file exists:
  - `.github/workflows/deploy.yml`
- Workflow triggers:
  - `push` on `main`
  - `workflow_dispatch`
- Workflow build output path:
  - `./dist`

## Local Verification Before Merge

```bash
npm test -- --run
npm run build
```

## Post-Merge Verification

1. Open GitHub Actions and confirm `Deploy to GitHub Pages` is green.
2. Open Pages URL and verify all three sections load:
   - Explorer
   - Lengths
   - Naming Guide
3. Switch profile and verify geometry/table/naming content updates without errors.
4. Verify no broken links in Source List.

## Rollback

1. Revert the merge commit on `main`.
2. Push revert commit to `main`.
3. Wait for Pages redeploy from reverted state.
