"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface BlueprintTextureProps {
  /** "hero" draws the fuller composition; "panel" draws a smaller corner motif for a feature card. */
  variant?: "hero" | "panel";
  className?: string;
}

/**
 * A faint, decorative monoline architectural sketch — compass circles, construction lines, a
 * colonnade and an arch, in the spirit of a Renaissance architect's study page. Pure geometry (no
 * reproduction of any specific drawing), rendered at very low opacity so it reads as texture behind
 * the parchment background rather than as artwork of its own. Drifts a few pixels on scroll for a
 * gentle parallax layer; the drift is skipped entirely for reduced motion and below desktop widths.
 */
export function BlueprintTexture({ variant = "hero", className }: BlueprintTextureProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          node,
          { yPercent: -4, rotate: 0 },
          { yPercent: 4, ease: "none", scrollTrigger: { trigger: node.parentElement ?? node, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      revert = () => media.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  const stroke = "rgba(var(--eit-ink-line), 0.09)";
  const strokeSoft = "rgba(var(--eit-ink-line), 0.05)";

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className={variant === "hero" ? "absolute -top-[8%] right-[-6%] h-[130%] w-[70%] min-w-[32rem] opacity-90" : "absolute -bottom-[10%] -left-[8%] h-[85%] w-[60%] min-w-[20rem] opacity-80"}
        viewBox="0 0 800 800"
        fill="none"
      >
        {/* Compass rose: the recurring "study page" motif */}
        <circle cx="560" cy="220" r="150" stroke={stroke} strokeWidth="1.2" />
        <circle cx="560" cy="220" r="96" stroke={strokeSoft} strokeWidth="1" />
        <circle cx="560" cy="220" r="2.5" fill={stroke} />
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <line
            key={deg}
            x1={560 - 150 * Math.cos((deg * Math.PI) / 180)}
            y1={220 - 150 * Math.sin((deg * Math.PI) / 180)}
            x2={560 + 150 * Math.cos((deg * Math.PI) / 180)}
            y2={220 + 150 * Math.sin((deg * Math.PI) / 180)}
            stroke={strokeSoft}
            strokeWidth="0.75"
          />
        ))}

        {/* A classical arch, drafted as a construction diagram */}
        <path d="M180 620 V360 A140 140 0 0 1 460 360 V620" stroke={stroke} strokeWidth="1.2" />
        <line x1="180" y1="620" x2="180" y2="360" stroke={strokeSoft} strokeWidth="0.75" />
        <line x1="460" y1="620" x2="460" y2="360" stroke={strokeSoft} strokeWidth="0.75" />
        <line x1="130" y1="620" x2="510" y2="620" stroke={stroke} strokeWidth="1.2" />
        {/* Colonnade ticks along the base line, evenly spaced like ruled columns */}
        {Array.from({ length: 9 }, (_, index) => 150 + index * 45).map((x) => (
          <line key={x} x1={x} y1="620" x2={x} y2="636" stroke={strokeSoft} strokeWidth="0.75" />
        ))}

        {/* Diagonal construction lines and a small dimension mark, typical of a drafting sheet */}
        <line x1="40" y1="80" x2="260" y2="220" stroke={strokeSoft} strokeWidth="0.75" strokeDasharray="2 6" />
        <line x1="620" y1="560" x2="780" y2="700" stroke={strokeSoft} strokeWidth="0.75" strokeDasharray="2 6" />
        <path d="M40 680 h80 M40 674 v12 M120 674 v12" stroke={strokeSoft} strokeWidth="0.75" />

        {/* Golden-ratio style nested squares, echoing a proportion study */}
        <rect x="560" y="480" width="180" height="180" stroke={strokeSoft} strokeWidth="0.75" />
        <rect x="560" y="480" width="111" height="111" stroke={strokeSoft} strokeWidth="0.75" />
        <rect x="560" y="480" width="69" height="69" stroke={strokeSoft} strokeWidth="0.75" />
      </svg>
    </div>
  );
}