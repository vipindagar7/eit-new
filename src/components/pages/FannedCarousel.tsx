"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/hooks/use-carousel";
import type { ResolvedImage } from "@/types";
import { cn } from "@/lib/utils";

export interface CarouselCardItem {
  id: string;
  name: string;
  subtitle?: string;
  photo?: ResolvedImage;
  accent?: string;
}

interface FannedCarouselProps {
  items: CarouselCardItem[];
  /** How long each card stays active before auto-advancing. */
  intervalMs?: number;
  className?: string;
}

/** Cards this many positions from the active one are still shown, tilted and shrunk, at the edges. */
const WINDOW = 2;

/** Shortest signed distance from `i` to `active` around a deck of `n` cards (e.g. -2, -1, 0, 1, 2). */
function signedDelta(i: number, active: number, n: number) {
  const raw = (((i - active) % n) + n) % n;
  return raw > n / 2 ? raw - n : raw;
}

/**
 * The fanned, tilted photo-card carousel used on About / Alumni / Placements: one card sits flat and
 * centred with its name and role always visible underneath, the rest of the deck fans out tilted on
 * either side, and it auto-rotates on the same autoplay-plus-manual-controls behaviour as the homepage
 * hero (see useCarousel) — arrows, dots, and a pause button, pausing on keyboard focus or when
 * scrolled off screen, honouring reduced motion.
 */
export function FannedCarousel({ items, intervalMs = 4200, className }: FannedCarouselProps) {
  const reduce = useReducedMotion();
  const n = items.length;
  const { index, goTo, next, prev, timed, userPaused, togglePause, rootRef, bind } = useCarousel<HTMLDivElement>({
    count: n,
    intervalMs,
  });

  if (n === 0) return null;
  const active = items[index];

  return (
    <div ref={rootRef} {...bind} className={cn("flex flex-col items-center", className)}>
      <div className="relative flex h-[19rem] w-full items-center justify-center sm:h-[23rem]">
        {items.map((item, i) => {
          const d = signedDelta(i, index, n);
          const visible = Math.abs(d) <= WINDOW;
          const angle = reduce ? 0 : d * 9;
          const xOffset = d * (n > 5 ? 34 : 44);
          const scale = (d === 0 ? 1 : Math.max(0.72, 1 - Math.abs(d) * 0.13)) * (visible ? 1 : 0.85);
          const lift = Math.abs(d) * 10;

          return (
            <motion.div
              key={item.id}
              className="absolute w-32 sm:w-40 lg:w-44"
              style={{ zIndex: 100 - Math.abs(d) * 10, transformOrigin: "50% 100%" }}
              animate={{ x: `${xOffset}%`, y: lift, rotate: angle, scale, opacity: visible ? 1 : 0 }}
              transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={d !== 0}
            >
              <div
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-2xl border-[3px] shadow-[0_18px_34px_-14px_rgba(23,50,77,0.45)] [container-type:inline-size]",
                  d === 0 ? "border-white" : "border-white/70",
                )}
              >
                <SmartImage image={item.photo} accent={item.accent ?? "#CFE7EC"} label={initials(item.name)} sizes="176px" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div key={active.id} className="mt-5 text-center">
        <p className="text-lg font-semibold text-primary">{active.name}</p>
        {active.subtitle && <p className="text-sm text-muted-foreground">{active.subtitle}</p>}
      </div>

      {n > 1 && (
        <div role="group" aria-label="Carousel controls" className="mt-5 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-9 rounded-full border border-primary/15 text-primary hover:bg-eit-mist" onClick={prev} aria-label="Previous">
            <ChevronLeft aria-hidden className="size-4" />
          </Button>
          <ol className="flex items-center gap-2">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Go to ${item.name}`}
                  className={cn("block h-2 rounded-full transition-all", i === index ? "w-5 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/45")}
                />
              </li>
            ))}
          </ol>
          <Button variant="ghost" size="icon" className="size-9 rounded-full border border-primary/15 text-primary hover:bg-eit-mist" onClick={next} aria-label="Next">
            <ChevronRight aria-hidden className="size-4" />
          </Button>
          {timed && (
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full border border-primary/15 text-primary hover:bg-eit-mist"
              onClick={togglePause}
              aria-pressed={userPaused}
              aria-label={userPaused ? "Play" : "Pause"}
            >
              {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}