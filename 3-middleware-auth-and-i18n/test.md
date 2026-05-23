# Test flows for 3-middleware-auth-and-i18n

## Flow 1 — Unauthenticated dashboard redirects to /login
**Purpose:** Verify that visiting `/en/dashboard` without a valid `session` cookie is redirected by `middleware.ts` to `/login`.
**Playwright file:** `.playwright/scripts/flow-1-unauth-redirects-login.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-unauth-redirects-login.spec.ts`
**Pass criteria:** Final URL ends with `/login`; login title is visible.

## Flow 2 — Authenticated dashboard reachable
**Purpose:** Verify that with a `session=valid-token` cookie, the backend `/auth/verify-session` accepts the request and middleware allows the dashboard render.
**Playwright file:** `.playwright/scripts/flow-2-auth-reaches-dashboard.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-auth-reaches-dashboard.spec.ts`
**Pass criteria:** Dashboard title contains `Dashboard (en)`.

## Flow 3 — Locale routing renders /en/about
**Purpose:** Verify that the `[locale]` dynamic segment renders English content for `/en/about`.
**Playwright file:** `.playwright/scripts/flow-3-locale-routing.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-locale-routing.spec.ts`
**Pass criteria:** About title = `About`; about-locale shows `en`.
