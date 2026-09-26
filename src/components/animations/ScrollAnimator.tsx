"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/animations";

type Vars = gsap.TweenVars;

interface Ctx {
  root: HTMLElement;
  /** Reveal the elements matching `selector` when they scroll into view (and undo it when scrolling back up). */
  reveal: (selector: string, from: Vars, to?: Vars, options?: { each?: boolean; stagger?: number; start?: string }) => void;
  /** Move the elements matching `selector` continuously while the page scrolls past them. */
  parallax: (selector: string, from: Vars, to: Vars) => void;
}

/**
 * Every homepage section has its own scroll choreography, defined here in one place.
 *
 * Sections mark themselves with `data-scroll-section="name"` and the parts that move with `data-anim="part"`.
 * Nothing is hidden until this runs, and nothing runs at all for visitors who ask for reduced motion, so content
 * is always readable. Elements animated by Framer Motion are never targeted here (only their wrappers), so the
 * two libraries never fight over the same transform.
 */
const presets: Record<string, (ctx: Ctx) => void> = {
  // A curtain of image lifts from the bottom while the list slides in from the left.
  centres: ({ reveal, parallax }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=row]", { x: -50, opacity: 0 }, undefined, { stagger: 0.1 });
    reveal("[data-anim=stage]", { clipPath: "inset(100% 0% 0% 0% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.2, ease: "power3.inOut" });
    parallax("[data-anim=stage]", { yPercent: 5 }, { yPercent: -5 });
  },
  // Each reason slides in from the right on its own, one by one, as you reach it.
  why: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=row]", { x: 80, opacity: 0 }, undefined, { each: true, start: "top 90%" });
  },
  // The card fan rises from below, then the program strip follows.
  programs: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=stage]", { y: 100, scale: 0.92, opacity: 0 }, { duration: 1.1 });
    reveal("[data-anim=strip]", { y: 40, opacity: 0 });
  },
  // The stage scales up into place, the figures count up after it.
  placements: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=stage]", { y: 80, scale: 0.94, opacity: 0 }, { duration: 1.1 });
    reveal("[data-anim=stat]", { y: 36, opacity: 0 }, undefined, { stagger: 0.12 });
    reveal("[data-anim=ticker]", { opacity: 0, y: 24 });
  },
  // Project cards rise with a slight tilt, one after another.
  "student-work": ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=card]", { y: 70, rotation: 2.5, opacity: 0 }, undefined, { stagger: 0.13 });
  },
  // Two panels slide in from opposite sides.
  events: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=panel-left]", { x: -90, opacity: 0 }, { duration: 1 });
    reveal("[data-anim=panel-right]", { x: 90, opacity: 0 }, { duration: 1 });
  },
  // The two rows of clubs glide in from opposite edges.
  clubs: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=marquee-row]:not([data-from])", { x: "-14vw", opacity: 0 }, { duration: 1.2 }, { each: true, start: "top 92%" });
    reveal("[data-anim=marquee-row][data-from=right]", { x: "14vw", opacity: 0 }, { duration: 1.2 }, { each: true, start: "top 92%" });
  },
  // The cover spins in and settles.
  podcasts: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=row]", { y: 30, opacity: 0 }, undefined, { stagger: 0.1 });
    reveal("[data-anim=cover]", { rotation: -16, scale: 0.75, opacity: 0 }, { duration: 1.1, ease: "back.out(1.4)" });
  },
  // The stage tilts up out of the page, the portrait strip rises after it.
  celebrities: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=stage]", { y: 90, scale: 0.93, opacity: 0 }, { duration: 1.2 });
  },
  // Photographs fly in from different directions and land in their tilted places.
  campus: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal(
      "[data-anim=frame]",
      { y: 100, x: (index: number) => (index % 2 ? 60 : -60), rotation: (index: number) => (index % 2 ? 10 : -10), scale: 0.82, opacity: 0 },
      { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
      { stagger: 0.13 },
    );
    reveal("[data-anim=script]", { opacity: 0, y: 24, rotation: -10 }, { rotation: 0, delay: 0.6 });
  },
  // The card blooms open, the portraits rise after it.
  voices: ({ reveal }) => {
    reveal("[data-anim=stage]", { y: 60, scale: 0.95, opacity: 0 }, { duration: 1.1 });
    reveal("[data-anim=heading]", { y: 36, opacity: 0 }, { delay: 0.25 });
    reveal("[data-anim=portraits]", { y: 60, scale: 0.9, opacity: 0 }, { duration: 1, delay: 0.35 });
    reveal("[data-anim=script]", { opacity: 0, x: 30 }, { delay: 0.7 });
  },
  // Slanted colour bars sweep in, the buttons pop.
  cta: ({ reveal }) => {
    reveal("[data-anim=bar]", { x: 140, opacity: 0 }, { duration: 1.1 }, { stagger: 0.12 });
    reveal("[data-anim=heading]", { y: 40, opacity: 0 }, undefined, { stagger: 0.1 });
    reveal("[data-anim=cta-buttons]", { scale: 0.85, opacity: 0 }, { ease: "back.out(1.6)" });
    reveal("[data-anim=panel-right]", { y: 50, opacity: 0 }, { delay: 0.2 });
  },
  footer: ({ reveal }) => {
    reveal("[data-anim=row]", { y: 40, opacity: 0 }, undefined, { stagger: 0.1 });
  },
  // The centre line draws itself top-to-bottom as you scroll through; milestones tilt in with real
  // CSS 3D perspective, alternating left/right.
  history: ({ reveal, parallax }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal(
      "[data-anim=row]",
      { y: 50, opacity: 0, rotateY: (index: number) => (index % 2 ? -22 : 22) },
      { rotateY: 0, duration: 1 },
      { stagger: 0.15 },
    );
    parallax("[data-anim=stage]", { scaleY: 0 }, { scaleY: 1 });
  },
  // Generic choreography for any section that has no bespoke entry above (inner pages built from
  // PageHero/PageSection reuse this vocabulary, so a new page needs zero new animation code).
  default: ({ reveal }) => {
    reveal("[data-anim=heading]", { y: 40, opacity: 0 });
    reveal("[data-anim=media]", { y: 60, scale: 0.96, opacity: 0 }, { duration: 1.1 });
    reveal("[data-anim=card]", { y: 50, opacity: 0 }, undefined, { stagger: 0.1 });
    reveal("[data-anim=row]", { y: 30, opacity: 0 }, undefined, { stagger: 0.08 });
    reveal("[data-anim=stat]", { y: 36, opacity: 0 }, undefined, { stagger: 0.1 });
    reveal("[data-anim=panel-left]", { x: -70, opacity: 0 }, { duration: 1 });
    reveal("[data-anim=panel-right]", { x: 70, opacity: 0 }, { duration: 1 });
    reveal("[data-anim=cta-buttons]", { scale: 0.9, opacity: 0 }, { ease: "back.out(1.6)" });
  },
};

/**
 * Soft, theme-coloured motes (not literal WebGL particles — see components/layout/README or the
 * conversation that scoped this down) that gather and drift apart at the seam between two sections,
 * standing in for a full 3D "dissolve into particles" treatment. Alternates by boundary index: even
 * boundaries disperse outward (the leaving section feels like it is breaking apart / zooming out),
 * odd boundaries converge inward (the arriving section feels like it is gathering / zooming in). Pure
 * transform + opacity on small `position: fixed` dots — cheap, GPU-friendly, and never touches layout
 * or any ancestor of the real page content, so it carries none of the risk that broke the homepage's
 * pinned scroll morph earlier (see PageCurlTransition's docblock). Driven by the exact same
 * ScrollTrigger scrub idiom as applyBoundaryZoom above, just with its own targets.
 */
const MOTE_COLORS = [
  "var(--eit-accent)", "var(--eit-mist)", "var(--eit-sage)", "var(--eit-lilac)",
  "var(--eit-peach)", "var(--eit-butter)", "var(--eit-rose)", "var(--eit-navy)",
];

/**
 * The zoom half of the seam transition: at each boundary the leaving section and the arriving one
 * move in opposite directions, and that direction flips at every boundary — "Section 1 zooms in as
 * Section 2 zooms out, then Section 2 zooms in as Section 3 zooms out", exactly alternating down the
 * page. Only ever transforms a section's own children (never the section element itself, never an
 * ancestor), the same constraint the seam motes and the original depth effect both followed — see
 * PageCurlTransition's docblock for why that boundary matters.
 */
function applyBoundaryZoom(gsap: typeof import("gsap").gsap, current: HTMLElement, next: HTMLElement, index: number) {
  const currentZoomsIn = index % 2 === 0;

  const currentLayers = Array.from(current.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
  if (currentLayers.length > 0) {
    gsap.fromTo(
      currentLayers,
      { scale: 1, opacity: 1, transformOrigin: "50% 50%" },
      {
        scale: currentZoomsIn ? 1.07 : 0.93,
        opacity: 0.88,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: current, start: "bottom 85%", end: "bottom 15%", scrub: 0.6 },
      },
    );
  }

  const nextLayers = Array.from(next.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
  if (nextLayers.length > 0) {
    gsap.fromTo(
      nextLayers,
      { scale: currentZoomsIn ? 1.09 : 0.91, transformOrigin: "50% 50%" },
      {
        scale: 1,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: next, start: "top 100%", end: "top 35%", scrub: 0.6 },
      },
    );
  }
}

function createSeamMotes(gsap: typeof import("gsap").gsap, boundary: HTMLElement, index: number, registry: HTMLElement[]) {
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:45;opacity:0;overflow:hidden;";
  document.body.appendChild(container);
  registry.push(container);

  const disperse = index % 2 === 0;
  const count = 22;
  const spreadNear = Math.min(window.innerWidth, 640) * 0.16;
  const spreadFar = Math.min(window.innerWidth, 1200) * 0.42;

  const tl = gsap.timeline({ scrollTrigger: { trigger: boundary, start: "top 95%", end: "top 15%", scrub: 0.5 } });
  tl.to(container, { opacity: 1, duration: 0.3, ease: "none" }, 0).to(container, { opacity: 0, duration: 0.3, ease: "none" }, 0.7);

  for (let i = 0; i < count; i++) {
    const size = 4 + Math.random() * 7;
    const dot = document.createElement("span");
    const color = MOTE_COLORS[i % MOTE_COLORS.length];
    dot.style.cssText = `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;margin:-${size / 2}px;border-radius:9999px;background:${color};box-shadow:0 0 ${Math.round(size * 2)}px ${color};will-change:transform,opacity;`;
    container.appendChild(dot);

    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const depth = 0.55 + Math.random() * 0.75;
    const nearX = Math.cos(angle) * spreadNear * depth;
    const nearY = Math.sin(angle) * spreadNear * 0.55 * depth;
    const farX = Math.cos(angle) * spreadFar * depth;
    const farY = Math.sin(angle) * spreadFar * 0.55 * depth;

    const from = disperse ? { x: nearX, y: nearY, scale: 0.85 * depth, opacity: 0 } : { x: farX, y: farY, scale: 0.35 * depth, opacity: 0 };
    const to = disperse ? { x: farX, y: farY, scale: 0.35 * depth, opacity: 0.9 } : { x: nearX, y: nearY, scale: 0.85 * depth, opacity: 0.9 };

    tl.fromTo(dot, from, { ...to, duration: 1, ease: "none" }, 0);
  }
}

/**
 * Mount once on the page. Sets up the per-section scroll animations above with GSAP + ScrollTrigger.
 * Renders nothing. Skipped entirely for reduced motion.
 */
export function ScrollAnimator() {
  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;
    const moteContainers: HTMLElement[] = [];

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const wide = window.matchMedia("(min-width: 768px)").matches;

        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-section]"));

        sections.forEach((root) => {
          const name = root.dataset.scrollSection ?? "";
          const preset = presets[name] ?? presets.default;

          const reveal: Ctx["reveal"] = (selector, from, to = {}, options = {}) => {
            const targets = gsap.utils.toArray<HTMLElement>(selector, root);
            if (targets.length === 0) return;
            const animate = (target: HTMLElement | HTMLElement[], trigger: HTMLElement) =>
              gsap.fromTo(
                target,
                from,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  stagger: options.stagger ?? 0,
                  ...to,
                  scrollTrigger: { trigger, start: options.start ?? "top 85%", toggleActions: "play none none reverse" },
                },
              );
            if (options.each) targets.forEach((target) => animate(target, target));
            else animate(targets, targets[0]);
          };

          const parallax: Ctx["parallax"] = (selector, from, to) => {
            if (!wide) return;
            gsap.utils.toArray<HTMLElement>(selector, root).forEach((target) =>
              gsap.fromTo(target, from, { ...to, ease: "none", scrollTrigger: { trigger: target, start: "top bottom", end: "bottom top", scrub: true } }),
            );
          };

          preset({ root, reveal, parallax });

          // The EIT mark beside the section title draws itself as the section arrives.
          const bars = gsap.utils.toArray<SVGElement>("[data-brand-bar]", root);
          if (bars.length > 0) {
            gsap.fromTo(
              bars,
              { scaleY: 0, opacity: 0 },
              { scaleY: 1, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12, scrollTrigger: { trigger: bars[0], start: "top 88%", toggleActions: "play none none reverse" } },
            );
          }
        });

        // Seam transitions between consecutive sections — alternating zoom + motes, skipped on narrow viewports.
        if (wide) {
          sections.forEach((section, index) => {
            if (index === sections.length - 1) return;
            const next = sections[index + 1];
            applyBoundaryZoom(gsap, section, next, index);
            createSeamMotes(gsap, next, index, moteContainers);
          });
        }
      });

      revert = () => media.revert();

      const refresh = () => !cancelled && ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
    });

    return () => {
      cancelled = true;
      revert?.();
      moteContainers.forEach((el) => el.remove());
      moteContainers.length = 0;
    };
  }, []);

  return null;
}
