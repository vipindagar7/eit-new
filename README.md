# EIT Faridabad Website

Foundation for the new website of **Echelon Institute of Technology (EIT), Faridabad** — eitfaridabad.com.

## Purpose

A scalable Next.js project where every future page already has a route, a data file and a home.
At this stage the only visible page content is a single reusable **Coming Soon** placeholder inside the
real site layout (header, footer, navigation). Sections and pages are designed and built one at a time
without restructuring the project.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, `src/` directory), React 19 |
| Language | TypeScript (strict), alias `@/*` → `src/*` |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css`) |
| Components | shadcn/ui (Button, NavigationMenu, Accordion added; Radix via `radix-ui`), Magic UI (registry configured) |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| Icons | Lucide React |
| Font | Manrope (variable), bundled locally via `next/font/local` |

## Installation

```bash
npm install
cp .env.example .env.local      # then adjust values
```

## Commands

```bash
npm run dev             # development server
npm run build           # production build
npm run start           # serve the production build
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run verify:routes   # smoke-test every route + old-site redirects (server must be running)
```

`verify:routes` takes an optional base URL: `node scripts/verify-routes.mjs http://localhost:3000`.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (metadata, sitemap) |
| `NEXT_PUBLIC_SITE_NAME` | Institute name |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` keeps `noindex` + `Disallow: /`. Set `true` at launch |

Only `NEXT_PUBLIC_*` values exist, and they are exposed to the browser. Never put secrets in them.
`.env.local` is git-ignored; `.env.example` is committed.

## Folder structure

```
src/
├── app/                 Routes (every page renders <ComingSoon />), layout, sitemap, robots, not-found
├── components/
│   ├── layout/          Header, TopBar, DesktopNav, MobileNav, Footer, Logo, Breadcrumbs, Container …
│   ├── sections/        Shared page blocks (ComingSoon)
│   ├── home/            Homepage sections (added as they are designed)
│   ├── animations/      Reusable animation wrappers
│   └── ui/              shadcn / Magic UI components
├── data/                All site content (see below)
├── fonts/               Local font files
├── lib/                 utils.ts, constants.ts, animations.ts, fonts.ts, metadata.ts
└── types/index.ts       Shared types
scripts/verify-routes.mjs
```

## Navbar and Hero (built)

Only these two parts of the homepage are implemented; every other page is still Coming Soon.

- **Navbar** (`components/layout/Navbar.tsx`, data in `data/site/navigation.ts`): transparent + blurred over the hero, turning
  white + blurred with a shadow after scrolling (Framer Motion). Hover (or keyboard) dropdowns use the shadcn
  NavigationMenu. Right side: search (searches the route registry), Apply Now, and a menu icon that opens the full site menu.
  On phones the same drawer is the whole navigation. Every page except Home uses the solid navbar from the start.
- **Hero** (`components/home/Hero*.tsx`, content in `data/home/hero.ts`): rotating day-based carousel
  (morning → night), autoplay with pause, prev/next, progress and keyboard support. Framer Motion handles transitions;
  GSAP + ScrollTrigger adds a light parallax on desktop only (off for reduced motion).
- **About** (`components/home/HomeIntro.tsx`, `SplitImage.tsx`, content in `data/home/about.ts`): sits right under the hero and is part
  of the same pinned scroll scene. On desktop the hero photograph shrinks, is cut into slanted parts and moves right while the About
  text fades in; the picture keeps following the hero carousel. On phones and for reduced motion the split image is static below the hero.
- **Programs** (`components/home/ProgramsSection.tsx`, content in `data/home/programs.ts` and `data/programs/programs.ts`): 3D card carousel
  with swipe, arrow buttons, keyboard and a program strip. Photographs go in `public/images/programs/` (see its README).
- **Assets**: put real files in `public/images/hero/`, `public/videos/hero/` and `public/images/logo/`
  (see the README in each folder). Missing files never break the page: the hero shows a navy fallback and the navbar a text
  wordmark. Availability is checked on the server (`lib/assets.ts`), so rebuild after adding files.


## Homepage sections and slideshow timing

Order: Navbar, Hero + About (one scroll scene), Centres of Excellence, Why EIT, Programs, Placements & Achievements,
Student Work, Events & Notifications, Clubs & Activities, Podcasts & Talks, Campus Life, Stories That Inspire, Admissions call to action, Footer.

Every slideshow advances by itself and can also be controlled by hand (previous, next, pause, dots or list). Each pauses
with its pause button, while keyboard focus is inside it and while it is scrolled off screen.
Change the time each slide stays in the section's data file:

| Slideshow | Setting | Default |
| --- | --- | --- |
| Hero | `heroSettings.intervalMs` in `data/home/hero.ts` | 7000 ms |
| Centres of Excellence | `centresSection.intervalMs` in `data/home/centres.ts` | 6500 ms |
| Programs | `programsSection.intervalMs` in `data/home/programs.ts` | 6000 ms |
| Placements | `placementsSection.intervalMs` in `data/home/placements.ts` | 6000 ms |
| Student Work | `studentWorkSection.intervalMs` in `data/home/studentWork.ts` | 5500 ms |
| Events, Notice board | `eventsSection.intervalMs`, `noticeStepMs` in `data/home/events.ts` | 6000 ms, 3500 ms |
| Clubs ticker | `clubsSection.marqueeSeconds` in `data/home/clubs.ts` | 45 s per pass |
| Podcasts | `podcastsSection.intervalMs` in `data/home/podcasts.ts` | 7000 ms |
| Campus Life | `campusLifeSection.intervalMs` in `data/home/campusLife.ts` | 4500 ms |
| Stories That Inspire | `storiesSection.intervalMs` in `data/home/stories.ts` | 7000 ms |

Content comes from the data files in `src/data/**`. A section with no real content hides itself. For layout review only, set
`NEXT_PUBLIC_SAMPLE_CONTENT=true` (see `.env.example`) to fill empty sections with clearly labelled "Sample" entries from
`src/data/samples/index.ts`. Keep it `false` in production.


## Scroll animation, colour and icon

- **Scroll animation:** every section has its own choreography, defined in one file: `src/components/animations/ScrollAnimator.tsx`
  (GSAP + ScrollTrigger). Sections mark themselves with `data-scroll-section` and the moving parts with `data-anim`. It plays as the
  section scrolls into view and reverses when you scroll back up. It never runs for reduced motion, so content is always readable.
  A thin teal progress line under the navbar shows how far down the page you are.
- **Colour:** the whole site uses light surfaces (white, soft grey and the EIT pastels) with navy text. Only the hero photograph and
  the navy buttons are dark.
- **Icon:** the EIT mark (`BrandMark.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/manifest.ts`) is the app icon and the section marker.
- **Autoplay:** every slideshow advances by itself. The mouse does not stop it; the pause button and keyboard focus do, and it waits while
  off screen. With reduced motion the slides still change, but without movement.


## Cursor, social links, glass navbar and section transitions

- **Cursor:** mouse users get the EIT cursor (a dot plus a trailing ring that grows over links and shows a word such as "Drag" over
  anything marked `data-cursor="Drag"`). It is off on touch screens and for reduced motion, and text fields keep the normal I-beam.
  Code: `components/layout/CustomCursor.tsx`.
- **Social links:** put the real profile URLs in `src/data/site/social.ts`. They then appear as a glass rail on the right of wide screens
  (1360 px and up), in the footer and in the menu. An empty list hides them everywhere.
- **Navbar:** transparent glass with a strong blur over the hero, and frosted white once you scroll. The menu panels and the mobile
  drawer are blurred too.
- **Section transitions:** every section is a rounded card whose top edge slides over the bottom of the one before, while the section
  underneath recedes slightly (`ScrollAnimator.tsx`, `[data-scroll-section]` rules in `globals.css`). No fading or tilting of whole sections.
- **Celebrity Corner:** notable alumni, chief guests and speakers, in `src/data/celebrities/celebrities.ts`.

## Routes

`src/data/site/routes.ts` is the single registry of every public URL. It drives page titles, breadcrumbs,
`sitemap.xml`, navigation validation and the verification script. Department pages
(`/departments/[department]/[section]`) and per-department journal papers
(`/research/journal-papers/[department]`) are generated from `src/data/departments/departments.ts`.

To replace a placeholder, edit that route's `page.tsx` and swap `<ComingSoon />` for the real page.
Keep the route's entry in the registry.

### Old website

Every URL in the old PHP sitemap (108 pages, 22 PDFs) is accounted for:

- Pages redirect (308) via `src/data/legacy/redirects.ts`, loaded by `next.config.ts`.
- PDFs are registered in `src/data/site/documents.ts` with `available: false`. To publish one, copy the file
  to the path in its `file` field under `public/documents/`, then set `available: true`. Its old `/pdf/...` URL
  then redirects automatically.
- `src/data/legacy/sitemap.ts` keeps the original list purely so `verify:routes` can prove coverage.

## Data architecture

All content lives in `src/data/`. Components never hardcode copy.

```
site/          site.ts, navigation.ts, footer.ts, routes.ts, documents.ts
home/          hero, about, centres, whyEit, programs, placements, studentWork, events, clubs, podcasts, campusLife, admissions
programs/      programs.ts + btech, mtech, bca, mca, bba, mba
centres/       centres.ts
placements/    statistics, recruiters, achievements, successStories, policy, process, mous, activities, gallery, testimonials
students/      projects, achievements, testimonials
events/        events, announcements
clubs/         clubs, activities, societies
podcasts/      episodes, speakers
campus/        locations, facilities, galleries, library
departments/   departments.ts (departments + sub-pages)
about/         messages, governance, approvals, committees, disclosure
academics/     calendar, circulars
admissions/    fees, scholarships, procedure, checklist, entranceExams, policies
research/      committee, publications, patents, mous, fdp, cells
careers/       openings
legacy/        sitemap.ts, redirects.ts
```

Content files are typed and intentionally empty. Do not add placeholder statistics.
`home/*` files only curate ids from the canonical folders, so content is never duplicated.
Files imported by `next.config.ts` (`legacy/redirects.ts`, `departments`, `site/documents.ts`) must use
relative imports, not `@/`.

## Asset architecture

For the exact file names, formats and sizes of every asset, see [`assets.md`](./assets.md).

```
public/
├── images/   logo, hero, about, centres, programs, placements, students, events, clubs, podcasts, campus
├── videos/   hero, campus, events, centres
├── icons/
└── documents/  brochures, reports, certificates, approvals, calendars, magazines, notices, policies
```

Never put files directly in `/public`. Use meaningful names, e.g. `eit-campus-day.webp`, `eit-logo.svg`.
Placeholder logo: the header uses a text wordmark until `public/images/logo/eit-logo.svg` is supplied;
the favicon (`src/app/icon.svg`) is also a placeholder.

## Design system

Tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind as `eit-*` colours and the shadcn semantic set.

- Primary `#17324D` · supporting `#536579` · accent `#52BCBD` · base `#FFFFFF` / `#F8FAFC`
- Pastels (accents only): mist `#CFE7EC`, sage `#D3E9DC`, lilac `#C8A5C9`, blush `#DDAFBD`, butter `#F5ED8F`, peach `#F3C4AA`, rose `#E79BB2`, sand `#E4D3BC`
- Teal `#52BCBD` fails contrast as text on white. Use it for rules and highlights, or as text/focus on navy.

Each section should have its own visual identity (editorial, cinematic, asymmetric, data-driven …). Avoid
generic university templates, SaaS-style card grids, heavy glassmorphism or gradients, floating blobs and decorative 3D.

## Animation libraries

- **Framer Motion**: component transitions, navigation, hover, modals, carousels.
- **GSAP + ScrollTrigger**: scroll storytelling, pinning, horizontal scroll, timelines, reveals, parallax.
- Never use both for the same animation. Respect `prefers-reduced-motion`. No scroll-jacking.
- `src/lib/animations.ts` holds shared easing/duration tokens and `loadGsap()`, which lazy-loads GSAP and registers
  ScrollTrigger once, so GSAP stays out of bundles that don't need it.

## shadcn/ui setup

`components.json` is configured (style `new-york`, Tailwind v4, aliases, `lucide`). `cn()` is in `src/lib/utils.ts`.
No components are generated yet. Add them when needed:

```bash
npx shadcn@latest add button
```

## Magic UI setup

The `@magicui` registry is defined in `components.json`. No Magic UI components are installed. Add one when a section needs it:

```bash
npx shadcn@latest add @magicui/marquee
```

## Future development plan

1. Confirm institute details in `src/data/site/site.ts` (address, phone, email, social) and DCA / HAS / DMS names.
2. Add the official logo and favicon; replace the wordmark in `Logo.tsx`.
3. Copy PDFs into `public/documents/...` and flip `available` in `documents.ts`.
4. Design and build the homepage sections one by one in `components/home`, fed from `data/home`.
5. Replace Coming Soon on inner pages, starting with programs, admissions and placements.
6. Fill data files with verified content only.
7. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` and the production `NEXT_PUBLIC_SITE_URL` at launch.
