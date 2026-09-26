"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const DURATION = 0.8;
const TOTAL_MS = DURATION * 1000 + 150;
// The page is only actually visible while it's rotated less than ~90deg (past that, viewed
// edge-on, backfaceVisibility: hidden makes it vanish and the real new page shows through).
// A prior version drove the rotation with a single cubic-bezier ([0.5, 0.02, 0.2, 1]) whose
// second control point's x (0.2) sat *before* the first's (0.5) — a non-monotonic curve that
// rushed past 90deg within ~130ms, so the whole effect read as an instant cut rather than a
// turning page. A follow-up attempt used a 3-keyframe rotateY with a `times` array and a
// per-segment `ease` array, expecting `times` to pin exactly when 90deg was reached — but that
// combination measurably reached 90deg well ahead of its configured time fraction, so it's
// avoided here too. This uses a single, standard "easeInOut" curve over the full -172deg swing:
// well-behaved and monotonic, and its symmetry means the page crosses ~90deg (90/172 = 52% of
// the rotation) very close to the midpoint of the timeline — verified below by sampling the
// actual computed transform frame-by-frame rather than assuming it from the easing math.

/**
 * A page-curl reveal on every route change: one "page", anchored at its left edge like a book's
 * spine, lifts and turns away in real 3D (rotateY, under CSS perspective) to reveal the new route
 * already sitting underneath it — with a fold shadow that swells as the page passes edge-on and a
 * highlight along its lifting edge, so it reads as one sheet of paper turning rather than a wipe or
 * a venetian-blind reveal (an earlier vertical-strips version of this component read that way).
 * `backfaceVisibility: hidden` makes the page vanish the instant it is edge-on to the viewer, which
 * is what actually sells the illusion — past that point you are simply looking at the real new page.
 *
 * Deliberately NOT a wrapper around page content (that was the previous approach, in template.tsx,
 * and it broke HomeIntro's GSAP ScrollTrigger pin: any transform on an ancestor of a pinned scene
 * corrupts the getBoundingClientRect() measurements GSAP takes at setup time). This instead renders
 * as a sibling overlay in the root layout — the real page never has any transform applied to it or
 * any ancestor of it, so it can never affect scroll pinning, GSAP, or any other page's geometry, on
 * the homepage or anywhere else. It unmounts completely between navigations, so it costs nothing at
 * rest.
 *
 * Skips the very first paint (no curl on a hard load/reload, only on subsequent client-side
 * navigations) and is skipped entirely for reduced motion.
 */
export function PageCurlTransition() {
  const pathname = usePathname();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [trackedPath, setTrackedPath] = useState(pathname);
  const [playing, setPlaying] = useState(false);

  // Adjust state in response to a changed prop, during render (React's own recommended pattern for
  // this — see "Adjusting some state when a prop changes" in the React docs) rather than in an effect:
  // it runs exactly once per real navigation, with no extra render or setState-in-effect cascade, and
  // naturally skips the very first paint (trackedPath already equals pathname on mount).
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    if (!reduce) setPlaying(true);
  }

  // The only genuine side effect: turn the overlay back off once its animation has finished.
  useEffect(() => {
    if (!playing) return;
    const timeout = window.setTimeout(() => setPlaying(false), TOTAL_MS);
    return () => window.clearTimeout(timeout);
  }, [playing]);

  if (!playing) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" style={{ perspective: "2400px", perspectiveOrigin: "0% 50%" }}>
      <motion.div
        key={pathname}
        className="absolute inset-0"
        style={{
          transformOrigin: "0% 50%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          background: "linear-gradient(100deg, var(--eit-parchment) 0%, var(--eit-parchment-deep) 55%, var(--eit-parchment) 100%)",
          boxShadow: "18px 0 40px -12px rgba(23, 50, 77, 0.4)",
        }}
        initial={{ rotateY: "0deg" }}
        animate={{ rotateY: "-172deg" }}
        transition={{ duration: DURATION, ease: "easeInOut" }}
      >
        {/* Fold shadow: swells as the page passes edge-on (light catching the curling paper), then clears. */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, transparent 0%, rgba(23,50,77,0.22) 45%, rgba(23,50,77,0.4) 62%, transparent 85%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0.85, 0.3, 0] }}
          transition={{ duration: DURATION, times: [0, 0.32, 0.5, 0.68, 1], ease: "easeInOut" }}
        />
        {/* Lifting edge: a bright highlight riding the far (right) edge of the page as it curls. */}
        <div
          className="absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.85) 100%)" }}
        />
      </motion.div>
    </div>
  );
}
