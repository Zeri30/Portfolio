# Czerina Piedad — Portfolio

Personal portfolio for a full stack web developer role. A calm, minimal layout with a few deliberate moments of motion: a preloader that decodes my name, masked headline reveals, a cursor spotlight, project hover previews, and live-site showcases that scroll on hover.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Zod · Resend · Playwright

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate Next route types, then `tsc` |
| `npm run test:e2e` | Playwright tests on desktop and mobile viewports (first run: `npx playwright install chromium`) |

## How it's put together

```
src/
  app/
    layout.tsx     fonts, metadata, and the inline script that decides if the intro plays
    page.tsx       assembles the sections
    actions.ts     contact form server action (Zod validation, honeypot, Resend email)
    globals.css    palette, type, and every animation
  components/      one file per section, plus small client "islands" for interactivity
  lib/content.ts   all copy and data: edit this, not the components
tests/e2e/         Playwright specs
```

- **Mostly server-rendered.** Sections are Server Components. Only interactive parts (intro, cursor, typing line, project hover preview, count-ups, process tabs, contact form) are Client Components. The route builds as fully static HTML.
- **Intro without a flash.** An inline `<head>` script sets `<html data-intro>` before first paint, so the preloader plays on every load (and is skipped, without flicker, for visitors who prefer reduced motion). The Intro component reads that attribute with `useSyncExternalStore`.
- **No randomness during server render.** The cipher letters, clock and timers only run in client effects, as Cache Components requires.
- **Progressive enhancement.** Scroll reveals use CSS scroll-driven animations inside `@supports`. Count-ups render their final value on the server. The intro is hidden when JavaScript is off. `prefers-reduced-motion` turns animation off.

## Contact form email

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Without them, development logs messages to the terminal and production asks visitors to email directly.

## Still to fill in

Search the code for `[` placeholders and `TODO`, or see `src/lib/content.ts`:

- Favorite cartoon series (contact section)

## Deploy

Push to GitHub and import the repo in Vercel. Add the env vars from `.env.example` in the project settings.
