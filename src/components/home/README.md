# components/home

Homepage sections live here, one file per section (created only when that section is designed).

Rules
- Content comes from `src/data/home/*` and the canonical data folders they point to. Never hardcode copy.
- Each section gets its own visual identity; do not reuse one card layout across sections.
- Framer Motion for UI transitions, GSAP + ScrollTrigger for scroll storytelling (see `src/lib/animations.ts`).
