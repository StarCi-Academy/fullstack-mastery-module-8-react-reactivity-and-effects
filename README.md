# Fullstack Mastery — Module 8: Routing & URL State with Next.js App Router

This repository contains 4 lessons that teach the production-grade routing techniques
of the Next.js App Router. Each lesson lives in its own folder and follows the
canonical 4-sibling layout (`backend/` if needed, `frontend/`, `.playwright/`, `test.md`).

| # | Lesson | Topic |
|---|---|---|
| 0 | `0-dynamic-routes-and-layouts` | File-based routing, dynamic segments, nested layouts, route groups |
| 1 | `1-searchparams-as-state` | `useSearchParams` + filter/sort UI synced to URL |
| 2 | `2-parallel-and-intercepting-routes` | Parallel routes for tabs + intercepting routes for modal |
| 3 | `3-middleware-auth-and-i18n` | `middleware.ts` for auth redirect + locale routing |

## Run a lesson

```bash
cd <lesson-dir>/frontend
npm install
npm run dev
# Frontend on http://localhost:3001
```

L3 also has a backend on :3000:

```bash
cd 3-middleware-auth-and-i18n/backend
npm install
nest start --watch
```

## Run end-to-end tests

```bash
cd <lesson-dir>/frontend
npm run test:e2e
```
