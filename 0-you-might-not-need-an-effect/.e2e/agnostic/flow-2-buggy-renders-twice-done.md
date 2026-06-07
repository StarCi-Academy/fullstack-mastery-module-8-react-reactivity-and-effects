# Flow 2 — Buggy panel renders twice per keystroke — DONE

Spec: `.playwright/scripts/flow-2-buggy-renders-twice.spec.ts`
Runner: Playwright chromium (headless), Vite dev server on 127.0.0.1.

## What it verifies

Typing the same 3 characters into each panel one keystroke at a time, the buggy
panel (effect + setState) grows its render counter strictly more than the fixed
panel (derived in render), which grows by exactly one render per keystroke.

- `buggyGrowth > fixedGrowth`.
- `fixedGrowth === 3` (3 keystrokes → 3 renders).

## Observed render counters (probe)

```
METRICS buggy 2->8 fixed 1->4
```

Initial mount: buggy = 2 (render + effect setState), fixed = 1. After typing
`"car"` (3 keystrokes): buggy +6 (2 renders/keystroke), fixed +3 (1/keystroke).

## Real output

```
Running 1 test using 1 worker
  ok 1 [chromium] › scripts\flow-2-buggy-renders-twice.spec.ts:12:5 › flow 2 — buggy render growth is larger than fixed render growth for the same typing (760ms)
  1 passed (1.8s)
```

Status: PASS
