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
      <div className="relative flex h-[22rem] w-full items-center justify-center sm:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
        {items.map((item, i) => {
          const d = signedDelta(i, index, n);
          const visible = Math.abs(d) <= WINDOW;
          const angle = reduce ? 0 : d * 9;
          const xOffset = d * (n > 5 ? 36 : 46);
          const scale = (d === 0 ? 1 : Math.max(0.72, 1 - Math.abs(d) * 0.13)) * (visible ? 1 : 0.85);
          const lift = Math.abs(d) * 14;

          return (
            <motion.div
              key={item.id}
              className="absolute w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80"
              style={{ zIndex: 100 - Math.abs(d) * 10, transformOrigin: "50% 100%" }}
              animate={{ x: `${xOffset}%`, y: lift, rotate: angle, scale, opacity: visible ? 1 : 0 }}
              transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={d !== 0}
            >
              <div
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-2xl border-[3px] shadow-[0_24px_48px_-16px_rgba(23,50,77,0.5)] [container-type:inline-size]",
                  d === 0 ? "border-white" : "border-white/70",
                )}
              >
                <SmartImage
                  image={item.photo}
                  accent={item.accent ?? "#CFE7EC"}
                  label={initials(item.name)}
                  sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 224px, 160px"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div key={active.id} className="mt-7 text-center">
        <p className="text-xl font-semibold text-primary sm:text-2xl">{active.name}</p>
        {active.subtitle && <p className="mt-1 text-sm text-muted-foreground sm:text-base">{active.subtitle}</p>}
      </div>

      {n > 1 && (
        <div role="group" aria-label="Carousel controls" className="mt-6 flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="size-10 rounded-full border border-primary/15 text-primary hover:bg-eit-mist sm:size-11" onClick={prev} aria-label="Previous">
            <ChevronLeft aria-hidden className="size-5" />
          </Button>
          <ol className="flex items-center gap-2">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === index ? "true" : undefined}
                  aria-label={`Go to ${item.name}`}
                  className={cn("block h-2.5 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45")}
                />
              </li>
            ))}
          </ol>
          <Button variant="ghost" size="icon" className="size-10 rounded-full border border-primary/15 text-primary hover:bg-eit-mist sm:size-11" onClick={next} aria-label="Next">
            <ChevronRight aria-hidden className="size-5" />
          </Button>
          {timed && (
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-full border border-primary/15 text-primary hover:bg-eit-mist sm:size-11"
              onClick={togglePause}
              aria-pressed={userPaused}
              aria-label={userPaused ? "Play" : "Pause"}
            >
              {userPaused ? <Play aria-hidden className="size-5" /> : <Pause aria-hidden className="size-5" />}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
