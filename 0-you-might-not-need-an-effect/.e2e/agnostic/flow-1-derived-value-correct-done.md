# Flow 1 — Derived value is correct (fixed panel) — DONE

Spec: `.playwright/scripts/flow-1-derived-value-correct.spec.ts`
Runner: Playwright chromium (headless), Vite dev server on 127.0.0.1.

## What it verifies

The fixed panel computes the filtered list inline during render. The match count
and rows reflect the query immediately, with no effect-driven catch-up frame.

- Empty query → `fixed-count` = `6` (all seed users).
- Query `"ar"` → `fixed-count` = `1`, `fixed-row-3` (Carol) visible.
- Clear query → `fixed-count` = `6` again.

## Real output

```
Running 1 test using 1 worker
  ok 1 [chromium] › scripts\flow-1-derived-value-correct.spec.ts:9:5 › flow 1 — typing a query filters the fixed list to the matching rows (964ms)
  1 passed (3.3s)
```

Status: PASS
