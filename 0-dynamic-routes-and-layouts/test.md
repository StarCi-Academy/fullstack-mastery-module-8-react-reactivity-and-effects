# Test flows for 0-dynamic-routes-and-layouts

## Flow 1 — Dynamic route renders params.id
**Purpose:** Verify that `/products/[id]` renders the injected `params.id` for arbitrary values.
**Playwright file:** `.playwright/scripts/flow-1-dynamic-route-renders-id.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-dynamic-route-renders-id.spec.ts`
**Pass criteria:** Page title contains `123`; the `product-id` element shows `id = 123`.

## Flow 2 — Nested layout persists across dynamic siblings
**Purpose:** Verify that `app/products/layout.tsx` renders its header on every `/products/[id]` route.
**Playwright file:** `.playwright/scripts/flow-2-nested-layout-header.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-nested-layout-header.spec.ts`
**Pass criteria:** `products-header` is visible at both `/products/123` and `/products/abc`.

## Flow 3 — Route group `(marketing)` is invisible in URL
**Purpose:** Verify that `app/(marketing)/about/page.tsx` is served at `/about`, NOT `/(marketing)/about`.
**Playwright file:** `.playwright/scripts/flow-3-route-group-invisible-in-url.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-route-group-invisible-in-url.spec.ts`
**Pass criteria:** Final URL matches `/about$`; the about page renders.
