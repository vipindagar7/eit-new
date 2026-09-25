# components/animations

Reusable animation wrappers go here (scroll reveals, pinned sections, horizontal scrollers, parallax).

Rules
- Client Components only.
- Framer Motion: component transitions, hover, modals, carousels.
- GSAP + ScrollTrigger: scroll storytelling. Load it with `loadGsap()` from `src/lib/animations.ts` so it stays out of bundles that don't need it.
- Every animation must honour `prefers-reduced-motion`. No scroll-jacking.
