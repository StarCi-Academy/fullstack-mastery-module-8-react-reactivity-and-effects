# Flow 4 — Buggy panel re-syncs via its effect (extra renders) — DONE

Spec: `.playwright/scripts/flow-4-buggy-effect-resync.spec.ts`
Runner: Playwright chromium (headless), Vite dev server on 127.0.0.1.

## What it verifies

The buggy panel keeps the filtered list in state, synced by an effect, so it
converges correctly but at the cost of extra renders beyond the keystroke count.

- After mount the effect has synced → `buggy-count` = `6`.
- Type `"erin"` (4 keystrokes) → `buggy-count` = `1`, `buggy-row-5` (Erin) visible.
- Clear query → effect re-syncs → `buggy-count` = `6`.
- Render counter grew by more than the 4 keystrokes (effect added renders).

## Real output

```
Running 1 test using 1 worker
  ok 1 [chromium] › scripts\flow-4-buggy-effect-resync.spec.ts:12:5 › flow 4 — buggy panel re-syncs via its effect and costs more renders than keystrokes (728ms)
  1 passed (1.5s)
```

Status: PASS
