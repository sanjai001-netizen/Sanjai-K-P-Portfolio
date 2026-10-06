# Sanjai KP — Portfolio

Single-page portfolio for Sanjai KP, Full Stack Developer. Built with Next.js (App Router), TypeScript, CSS Modules, GSAP + ScrollTrigger and Lenis.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

Requires Node 20+.

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Real production origin (e.g. `https://example.com`). When set, it enables `metadataBase`, the canonical URL, and absolute Open Graph URLs. If it is not set, no domain is assumed, and Next.js falls back to `localhost` for the OG image URL. |

## Structure

```
src/
  app/            layout (fonts, metadata, providers), page, globals.css, OG image, icon
  components/     one Server Component per section + CSS Module
    motion/       client-only: Lenis provider, scroll progress, hero/work/reveal motion, data grid
  data/           portfolio.ts — all content (typed)
  lib/gsap.ts     GSAP/ScrollTrigger registration + shared media queries
  types/          content types
```

Sections are Server Components. Motion lives in small client wrappers that take server-rendered children and animate elements marked with `data-*` attributes (see `section-reveal.tsx`).

## Motion notes

- **One Lenis instance**, created in `smooth-scroll-provider.tsx` with `autoRaf: false` and driven only by `gsap.ticker` (seconds → ms). It is destroyed on unmount and whenever reduced motion is turned on.
- **In-page anchors** are delegated in the provider. They scroll with Lenis or fall back to native scrolling, honour `scroll-margin-top` for the sticky header, push the hash, and move focus to the section.
- **Reduced motion**: Lenis is skipped, and every animation is registered through `gsap.matchMedia()`, so it reverts if the preference changes mid-session. CSS transitions are also cut.
- **Progressive enhancement**: all content is in the HTML. Only hero items are hidden before paint (under `.js`, with motion allowed), and a CSS failsafe reveals them after 2.5s if scripts never run.

## Content integrity

All content comes from the project brief. **No resume was supplied**, so these items are omitted or need confirmation:

- **Availability status**: hidden. Set `availableForOpportunities: true` in `src/data/portfolio.ts` to show it.
- **LinkedIn / GitHub**: not included because no profile URLs were supplied.
- **Production domain**: unknown. See `NEXT_PUBLIC_SITE_URL`.
- **"2+ years" experience**: taken from the brief and consistent with the listed dates (freelance since March 2024).
- **Project imagery**: none supplied. The project "plates" are decorative typographic layouts, not screenshots.
- **CoE-KISTI and the e-commerce training project** have no public links in the brief.
