# Flow 1 — store value updates (useSyncExternalStore reader)

- Spec: `.playwright/scripts/flow-1-store-value-updates.spec.ts`
- Runner: Playwright chromium headless, vite dev server on `127.0.0.1:3200`
- Date: 2026-06-07

## Real output

```
Running 4 tests using 1 worker
ok 1 [chromium] › scripts\flow-1-store-value-updates.spec.ts:7:5 › flow 1 — incrementing the external store updates the reader value (3.0s)
```

Result: PASS. `tick-a` starts at `0`, becomes `1` after `btn-inc`, and `render-a` strictly increases — the useSyncExternalStore reader returns the exact snapshot and re-renders on change.
