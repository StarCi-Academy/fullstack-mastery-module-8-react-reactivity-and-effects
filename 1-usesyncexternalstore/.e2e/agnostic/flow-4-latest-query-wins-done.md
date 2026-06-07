# Flow 4 — latest query wins (async external store)

- Spec: `.playwright/scripts/flow-4-latest-query-wins.spec.ts`
- Runner: Playwright chromium headless, vite dev server on `127.0.0.1:3200`
- Date: 2026-06-07

## Real output

```
ok 4 [chromium] › scripts\flow-4-latest-query-wins.spec.ts:9:5 › flow 4 — committed result is the latest query, not the slow earlier one (1.1s)
```

Result: PASS. Firing slow `alpha` (300ms) then fast `beta` (50ms) commits `beta`; after waiting 400ms (past the slow request) `query-result` is still `beta` and `query-pending` is `idle` — the store drops the stale slower response (latest-wins).

## Note
The Playwright `webServer` command runs `npm run dev` (the frontend's local vite,
port pinned to 3200 in `vite.config.ts`). `npx vite` was avoided because it pulls a
separate vite into the npm cache that cannot resolve the local config's plugins.
Final self-spawned run (Playwright starts the dev server itself): `4 passed (14.5s)`.
