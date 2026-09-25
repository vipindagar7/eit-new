/**
 * Animation foundation. Nothing here animates anything yet — it only
 * centralises the tokens and helpers future sections will share.
 *
 * Ownership rules:
 *  - Framer Motion: component transitions, navigation, hover, modals, carousels.
 *  - GSAP + ScrollTrigger: scroll storytelling, pinning, horizontal scroll,
 *    timelines, image reveals, parallax.
 *  - Never drive the same animation with both libraries.
 *  - Always respect prefers-reduced-motion. No scroll-jacking.
 *
 * GSAP is imported lazily by `loadGsap()` so pages that only use Framer Motion
 * (like the header) never download it. Import this module from Client Components.
 */

export const easing = {
  /** Smooth deceleration for entrances and dropdowns. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric ease for moves between two visible states. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Durations in seconds. */
export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.7,
} as const;

/** Media query string for reduced motion (usable with matchMedia / gsap.matchMedia). */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

let gsapPromise: Promise<{
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}> | null = null;

/**
 * Loads GSAP + ScrollTrigger on demand and registers the plugin exactly once.
 *
 * @example
 * useEffect(() => {
 *   let ctx: { revert: () => void } | undefined;
 *   loadGsap().then(({ gsap }) => { ctx = gsap.context(() => { ... }, scope); });
 *   return () => ctx?.revert();
 * }, []);
 */
export function loadGsap() {
  gsapPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return gsapPromise;
}
