# Test flows for 2-parallel-and-intercepting-routes

## Flow 1 — Click photo opens modal, URL changes
**Purpose:** Verify that clicking a photo link triggers the `(.)photos/[id]` interception, opening a modal in the `@modal` slot while the home list remains underneath.
**Playwright file:** `.playwright/scripts/flow-1-click-opens-modal.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-click-opens-modal.spec.ts`
**Pass criteria:** Modal visible, URL ends with `/photos/1`, home title still present.

## Flow 2 — Close modal returns to list
**Purpose:** Verify that the modal close link navigates back to `/` and removes the modal.
**Playwright file:** `.playwright/scripts/flow-2-close-modal-returns-to-list.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-close-modal-returns-to-list.spec.ts`
**Pass criteria:** Final URL is `/`, modal element absent from the DOM.

## Flow 3 — Reload renders full-page route
**Purpose:** Verify that a hard reload on `/photos/3` bypasses the intercepting route and renders the full-page version.
**Playwright file:** `.playwright/scripts/flow-3-reload-shows-full-page.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-reload-shows-full-page.spec.ts`
**Pass criteria:** `fullpage-title` contains `Photo 3`; modal element absent.
