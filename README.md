# Elvis Fernandes — Portfolio 2026

A Senior Product Designer portfolio built as a system, not a poster.

Cinematic landing scroll, dedicated case-study routes, AI as substrate (not sticker), one live AI moment — the Prompt Lab — at the end of the practice piece. Designed and built to the blueprint in `.cursor/plans/2026_portfolio_blueprint_*.plan.md`.

## Stack

- **Next.js 16** (App Router, Turbopack build)
- **React 19**
- **Tailwind CSS v4** with a custom design-token layer (CSS variables) for theme & accent
- **Motion** (Framer Motion) + **Lenis** for inertial scroll
- **Vercel AI SDK** + **Anthropic Claude** for the Prompt Lab edge route
- **next/font** self-hosting Geist · Geist Mono · Fraunces (zero external font requests)
- TypeScript, strict mode

## Getting started

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY if you want the Prompt Lab to work
npm run dev
```

Open <http://localhost:3000>.

## Scripts

- `npm run dev` — Turbopack dev server
- `npm run build` — production build (all routes prerender except the AI edge route)
- `npm run start` — serve the production build
- `npm run typecheck` — strict TypeScript check
- `npm run lint` — Next ESLint

## Routes

| Route | What lives there |
| --- | --- |
| `/` | Seven-movement cinematic landing |
| `/work/voice-moderation` | Case study — Modulate · ToxMod · Voice Vault (featured) |
| `/work/career-navigator` | Case study — AI Skill & Career Navigator |
| `/work/signal` | Case study — Signal · AI Trust Layer |
| `/practice/ai-for-product-designers` | Workflow reflection + the live Prompt Lab |
| `/about` | Long-form bio · now · reading · philosophy |
| `/contact` | One input. One artifact. No backend. |
| `/api/prompt-lab` | Edge route. Streams Anthropic. Rate-limited (5/session/12h). |

Plus: `/sitemap.xml`, `/robots.txt`, per-route `/opengraph-image`.

## Folder shape

```
app/                          routes (App Router)
  api/prompt-lab/             edge route for the live AI moment
  work/[slug]/                dynamic case study route + per-route OG image
  practice/...                practice piece
  layout.tsx                  root layout · fonts · nav · Lenis · JSON-LD
  globals.css                 Tailwind v4 + token bridge
components/
  primitives/                 Section · Grid · ReadingColumn · ArtifactSurface · MetadataStrip · PullQuote · Eyebrow
  motion/                     FadeRise · MaskUp · Magnetic · ScrollScrub · SharedElementScope · ReducedMotionBranch · LenisProvider
  landing/                    OpeningLine · IdentityReel · FeaturedFilms · PracticeStrip · CapabilityMap · CreditsStrip · ClosingInvitation
  case-study/                 CaseStudyRenderer · VisualStub · SharedFilmHero
  prompt-lab/                 PromptLab (single, signature live AI moment)
  contact/                    ContactForm
  navigation/                 SiteNav · SiteFooter
content/
  case-studies/               typed content blocks per case study + registry
  practice/                   the AI-for-Product-Designers practice piece + prompt scenarios
lib/                          motion easings + durations + variants
styles/                       design tokens (CSS variables)
```

## Design tokens

Every visual decision flows through `styles/tokens.css`. To swap the accent or theme:

- Change `--signal` (default `#c8ff00`) for a different strategic accent.
- Toggle `data-theme="light"` on `<html>` for the light/paper theme.

Tokens are exposed to Tailwind v4 via `@theme` in `app/globals.css` so utilities like `bg-canvas`, `text-ink`, `bg-signal`, etc. are first-class.

## Motion philosophy

- All easings + durations live in `lib/motion.ts` — one place to retune the film.
- Two interactions are scroll-pinned: the practice strip horizontal scrub and the hero line scrub. Both have explicit reduced-motion variants.
- Lenis inertial scroll only activates when `prefers-reduced-motion: no-preference`.
- Default entrance: `cubic-bezier(0.16, 1, 0.3, 1)` at 400/700/1200ms.

## The Prompt Lab (live AI moment)

The single signature AI moment on the site. Lives on `/practice/ai-for-product-designers`.

- Edge runtime: `app/api/prompt-lab/route.ts`
- Three pre-curated scenarios (real design problems) live in `content/practice/ai-for-product-designers.ts`
- Server-side rate limit: 5 runs per IP+session per 12 hours (in-memory bucket — swap for Upstash KV/Redis for hardened production)
- Streamed response via Vercel AI SDK → Anthropic Claude 3.5 Haiku
- Model + remaining runs surfaced as response headers and rendered as `meta` in the artifact surface
- No client-side API key exposure. The system prompt stays server-side.

### Environment

```
ANTHROPIC_API_KEY=sk-ant-...
PROMPT_LAB_RATE_LIMIT=5          # optional, defaults to 5
```

If `ANTHROPIC_API_KEY` is missing the route returns 503 and the UI shows a clean error in the artifact surface.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel.
3. Set `ANTHROPIC_API_KEY` in Vercel project env (production + preview).
4. Deploy. Edge functions auto-route.
5. Add your custom domain in Vercel; update `metadataBase` in `app/layout.tsx` and `BASE` in `app/sitemap.ts` accordingly.
6. Enable Vercel Analytics (zero-config, privacy-first).

## Performance budget

- LCP < 1.2s on 4G (hero is text-only, no above-the-fold imagery)
- CLS 0 (fonts self-hosted with `display: swap`, no late-loading images shifting layout)
- JS budget on landing: under 120kb gzipped (no carousel libs, no chart libs, single inertial scroll dep)
- All imagery in case studies uses inline SVG placeholders until real assets are dropped in — swap `VisualStub` for `<Image>` when you have them

## Section 16 — Anti-pattern audit (launch checklist)

A literal pre-flight checklist before any section ships. Status as of this build:

- [x] No hero with a tilted device mockup
- [x] No "Hi, I'm Elvis" with a wave emoji or selfie
- [x] No skill bars, percentages, star ratings, or tool logos in a row
- [x] No "Selected Works" grid of equal-sized cropped images
- [x] No floating purple/blue gradient blobs
- [x] No "Available for work" pulsing dot in the top-right (removed from nav; the live dot only appears contextually in editorial places — `Eyebrow` and case study cards)
- [x] No marquee of client logos with no context
- [x] No "Made with love and coffee" footer
- [x] No autoplaying carousel
- [x] No "About Me" h1 — the about page leads with a worldview line, not the words "About Me"
- [x] No testimonials section

## Customization checklist

When you're ready to swap in real assets and copy:

- [ ] Replace `VisualStub` calls in `content/case-studies/*.ts` blocks with real `<Image>` or `<video>` references (AVIF/WebP, `next/image`).
- [ ] Add your headshot and OG asset if you want one beyond the editorial type-only OG.
- [ ] Update social links in `app/about/page.tsx`, `app/contact/page.tsx`, and the JSON-LD in `app/layout.tsx`.
- [ ] Replace the in-memory rate limit in `app/api/prompt-lab/route.ts` with Upstash Redis when you cross meaningful traffic.
- [ ] Set your real domain in `metadataBase`, sitemap, and the JSON-LD `url`.

## Credits

Built by Elvis Fernandes (with Claude as design partner).
