# Fullstack Mastery — Module 8: Data Visualization with Recharts

This repository contains 4 lessons that teach charting with Recharts inside the
standard Vite + HeroUI lesson shell. Each lesson lives in its own folder and follows
the canonical layout (`frontend/`, `.playwright/`, `test.md`).

| # | Lesson | Topic |
|---|---|---|
| 0 | `0-line-and-bar-charts` | LineChart vs BarChart toggle, axes, responsive container |
| 1 | `1-responsive-and-tooltips` | ResponsiveContainer + custom Tooltip + summary stats |
| 2 | `2-interactive-brush-and-zoom` | Brush range selection + preset buttons + summary |
| 3 | `3-dashboard-composition` | Multi-chart dashboard sharing one metric selector |

## Run a lesson

```bash
cd <lesson-dir>/frontend
npm install
npm run dev
```

Default dev ports: L0 `3200`, L1 `3210`, L2 `3220`, L3 `3230`.

## Run end-to-end tests

```bash
cd <lesson-dir>/frontend
npm run test:e2e
```

Playwright boots Vite via the isolated `.playwright` package (`FE_PORT` env overrides the default port).
