# Flow 3 — useEffect mirror goes stale vs sync reader

- Spec: `.playwright/scripts/flow-3-effect-mirror-goes-stale.spec.ts`
- Runner: Playwright chromium headless, vite dev server on `127.0.0.1:3200`
- Date: 2026-06-07

## Real output

```
ok 3 [chromium] › scripts\flow-3-effect-mirror-goes-stale.spec.ts:8:5 › flow 3 — sync reader advances, effect mirror stays stale (644ms)
```

Result: PASS. After three increments `sync-value` (useSyncExternalStore) reads `3` while `mirror-value` (useEffect + useState copy) stays at its mounted snapshot `0` — the effect-mirror anti-pattern tears away from the store.
