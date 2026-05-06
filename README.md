# Bryan Gradi — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-12-0055FF)](https://motion.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

A single-page personal portfolio for **Bryan Gradi** — Founder of [Gradios](https://gradios.co) and full-stack engineer based in Londrina, Brazil. Dark editorial design, Geist typography, microanimations everywhere, and a couple of easter eggs hiding in plain sight.

---

## Features

- ✅ Dark mode permanent + Geist Sans / Geist Mono via `next/font`
- ✅ Hero with staggered entrance animation and accent line motif
- ✅ About section with vertical timeline (current role gets a pulsing dot)
- ✅ Stack grid grouped by category — Languages / Frontend / Backend / AI / DevOps
- ✅ Project cards with status indicator, hover lift, and external link
- ✅ Contact CTA with one-click copy + mailto and social pills
- ✅ Sticky navbar that turns blurry on scroll, full hamburger overlay on mobile
- ✅ Custom cursor (desktop only, two-layer with delayed outer ring)
- ✅ Scroll-triggered animations on every section (`whileInView`)
- ✅ SEO: dynamic favicon, OpenGraph image, robots, sitemap, full metadata
- ✅ Fully responsive — works at 375px and up

## Easter eggs

> Stop reading if you want to find them on your own.

- **Konami code** — `↑ ↑ ↓ ↓ ← → ← → B A` toggles a CRT retro mode with scanlines, mono font, and a synthesized 8-bit chime. Toggle off by entering the sequence again.
- **Hidden terminal** — type `bryan` anywhere on the page (with no input focused) to summon a fake terminal. Try `help`, `about`, `stack`, `projects`, `experience`, `contact`, `gradios`, `joke`, `matrix`, `clear`, and `exit`. `ESC` closes it.

## Stack

| Layer    | Tech                                        |
| -------- | ------------------------------------------- |
| Runtime  | Next.js 15 (App Router) · React 19 · TS 5   |
| Styling  | Tailwind CSS 4 · CSS variables              |
| Motion   | `motion` (Framer Motion successor)          |
| Imagery  | `next/og` for icon + OpenGraph at the edge  |
| Hosting  | Vercel                                      |

## Run locally

```bash
git clone https://github.com/bryangradi11/bryangradi-portfolio.git
cd bryangradi-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build     # production build
npm run start     # serve build locally
```

The project is wired for [Vercel](https://vercel.com) with zero config — push the repo and import the project, or run `vercel deploy`.

## Project structure

```
app/
├── layout.tsx              # Metadata, fonts, easter eggs mount
├── page.tsx                # Single-page composition
├── globals.css             # Theme tokens, retro mode, scanlines, cursor toggle
├── icon.tsx                # Dynamic favicon (next/og)
├── opengraph-image.tsx     # Dynamic OG card (next/og)
├── robots.ts
└── sitemap.ts
components/
├── Background.tsx          # Radial glow + grid
├── Navbar.tsx              # Sticky, blur-on-scroll, mobile menu
├── Hero.tsx
├── About.tsx
├── Timeline.tsx
├── Stack.tsx
├── Projects.tsx
├── ProjectCard.tsx
├── Contact.tsx
├── Footer.tsx
├── KonamiCode.tsx          # Easter egg — retro mode
├── Terminal.tsx            # Easter egg — hidden CLI
├── MatrixRain.tsx          # `matrix` command effect
├── CustomCursor.tsx
└── useTerminalShortcut.tsx # `bryan` key listener hook
lib/
├── data.ts                 # Single source of truth for content
└── animations.ts           # Reusable motion variants
```

## License

MIT — see the badge above.

## Credits

Built by **Bryan Gradi** · [gradios.co](https://gradios.co) · [@bryangradi11](https://github.com/bryangradi11)
