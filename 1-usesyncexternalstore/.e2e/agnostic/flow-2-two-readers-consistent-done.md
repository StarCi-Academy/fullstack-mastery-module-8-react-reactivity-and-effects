# Flow 2 — two readers consistent (no tearing)

- Spec: `.playwright/scripts/flow-2-two-readers-consistent.spec.ts`
- Runner: Playwright chromium headless, vite dev server on `127.0.0.1:3200`
- Date: 2026-06-07

## Real output

```
ok 2 [chromium] › scripts\flow-2-two-readers-consistent.spec.ts:8:5 › flow 2 — both readers stay consistent through a burst of updates (748ms)
```

Result: PASS. After a 5-increment burst both `tick-a` and `tick-b` read `5`, and after one more increment both read `6` — two components subscribed to the same external store never tear.
