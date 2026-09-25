"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const STRIPS = 12;
const STRIP_DURATION = 0.5;
const STAGGER = 0.035;
const TOTAL_MS = (STRIP_DURATION + (STRIPS - 1) * STAGGER) * 1000 + 150;

/**
 * A page-curl reveal on every route change: a bank of vertical "paper" strips covers the screen the
 * instant the new page mounts, then peels away left to right — each strip rotating off around its
 * own left edge with a sheen sweeping across, like a page rolling off to reveal the one underneath.
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] flex overflow-hidden">
      {Array.from({ length: STRIPS }, (_, index) => (
        <motion.div
          key={`${pathname}-${index}`}
          className="relative h-full flex-1"
          style={{
            transformOrigin: "0% 50%",
            background: "linear-gradient(115deg, var(--eit-parchment) 0%, var(--eit-parchment-deep) 65%, var(--eit-parchment) 100%)",
            boxShadow: "10px 0 22px -6px rgba(23, 50, 77, 0.35)",
          }}
          initial={{ rotateY: 0, opacity: 1 }}
          animate={{ rotateY: -100, opacity: 0 }}
          transition={{ duration: STRIP_DURATION, delay: index * STAGGER, ease: [0.6, 0, 0.2, 1] }}
        >
          {/* A diagonal sheen, offset per strip, so it reads as one continuous highlight sweeping across the bank. */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.65) 48%, transparent 66%)",
              backgroundSize: `${STRIPS * 140}% 100%`,
              backgroundPositionX: `${(index / (STRIPS - 1)) * 100}%`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}