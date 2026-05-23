# Test flows for 1-searchparams-as-state

## Flow 1 — Filter UI writes to URL
**Purpose:** Verify that interacting with a filter widget updates `?category=...` in the URL.
**Playwright file:** `.playwright/scripts/flow-1-filter-updates-url.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-filter-updates-url.spec.ts`
**Pass criteria:** URL contains `category=book`; filter-state JSON reflects the new value.

## Flow 2 — Reload preserves filter from URL
**Purpose:** Verify that the source-of-truth is the URL: a hard reload re-hydrates the UI.
**Playwright file:** `.playwright/scripts/flow-2-reload-preserves-filter.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-reload-preserves-filter.spec.ts`
**Pass criteria:** After reload, category=`game`, sort=`desc`, priceMin=`10`.

## Flow 3 — Clear All empties the URL
**Purpose:** Verify that the clear button removes all query parameters via `router.replace(pathname)`.
**Playwright file:** `.playwright/scripts/flow-3-clear-empties-url.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-clear-empties-url.spec.ts`
**Pass criteria:** Final URL matches `/products$` with no query string.
