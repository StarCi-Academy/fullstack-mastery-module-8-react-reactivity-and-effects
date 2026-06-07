# Flow 3 — Both panels agree on the result — DONE

Spec: `.playwright/scripts/flow-3-panels-consistent.spec.ts`
Runner: Playwright chromium (headless), Vite dev server on 127.0.0.1.

## What it verifies

The effect-based and derived-in-render approaches must end at the same value —
the anti-pattern is only worse on renders, not on correctness.

- Query `"a"` → both `buggy-count` and `fixed-count` = `4` (Alice, Carol, Dave, Frank).
- `buggy-row-1` / `fixed-row-1` (Alice) and `buggy-row-6` / `fixed-row-6` (Frank) visible in both panels.

## Real output

```
Running 1 test using 1 worker
  ok 1 [chromium] › scripts\flow-3-panels-consistent.spec.ts:10:5 › flow 3 — buggy and fixed panels show the same matches for the same query (540ms)
  1 passed (1.3s)
```

Status: PASS
