"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { podcastsSection } from "@/data/home/podcasts";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { EpisodeView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

const pad = (value: number) => String(value).padStart(2, "0");
const BARS = 28;

/**
 * Podcasts & Talks: the featured episode with its cover, a spinning ring and equaliser bars (both stop when the
 * slideshow is paused), and the episode list beside it. It moves on by itself; the list, arrows and pause button
 * also drive it.
 */
export function PodcastsSection({ episodes }: { episodes: EpisodeView[] }) {
  const { eyebrow, title, description, intervalMs, action } = podcastsSection;
  const total = episodes.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;
  const current = episodes[carousel.index];
  const link = current.url ?? action?.href ?? "/podcasts";
  const external = link.startsWith("http");

  return (
    <section
      ref={rootRef}
      {...bind}
      aria-roledescription="carousel"
      aria-label="Podcast episodes"
      data-scroll-section="podcasts"
      className={cn("overflow-x-clip bg-[#F1E9F1] py-20 text-primary lg:py-28", !carousel.running && "playing-off")}
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <ol className="mt-10 border-t border-primary/15" aria-label="Episodes">
            {episodes.map((episode, index) => {
              const isActive = index === carousel.index;
              return (
                <li key={episode.id} data-anim="row" className="border-b border-primary/15">
                  <button
                    type="button"
                    onClick={() => carousel.goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    className="flex w-full items-center gap-5 py-4 text-left"
                  >
                    <span className={cn("w-8 shrink-0 text-sm font-bold tabular-nums", isActive ? "text-primary" : "text-primary/40")}>{pad(index + 1)}</span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate text-lg font-semibold transition-colors", isActive ? "text-primary" : "text-primary/60 hover:text-primary")}>{episode.title}</span>
                      {episode.speakers.length > 0 && <span className="block truncate text-sm text-primary/55">{episode.speakers.join(", ")}</span>}
                    </span>
                    {episode.duration && <span className="shrink-0 text-sm tabular-nums text-primary/55">{episode.duration}</span>}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <CarouselControls
              label="episode"
              onPrev={carousel.prev}
              onNext={carousel.next}
              onTogglePause={carousel.togglePause}
              userPaused={carousel.userPaused}
              timed={carousel.timed}
            />
            {action && (
              <Link href={action.href} className="group inline-flex items-center gap-2 text-base font-semibold">
                {action.label}
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Featured episode */}
        <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]" aria-live={carousel.running ? "off" : "polite"}>
          <div data-anim="cover" className="relative mx-auto w-full max-w-[15rem] sm:max-w-none">
            <span aria-hidden className="spin-ring absolute -inset-4 rounded-full border border-dashed border-primary/30" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] [container-type:inline-size]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: easing.out }}
                >
                  <SmartImage image={current.cover} accent={current.accent} label={pad(carousel.index + 1)} sizes="240px" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easing.out }}
              >
                <p className="text-sm font-semibold text-primary/70">{[current.dateLabel, current.duration].filter(Boolean).join(" · ")}</p>
                <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{current.title}</h3>
                {current.speakers.length > 0 && <p className="mt-2 text-base font-semibold text-eit-slate">{current.speakers.join(", ")}</p>}
                {current.summary && <p className="mt-4 max-w-md text-base leading-relaxed text-primary/75">{current.summary}</p>}
              </motion.div>
            </AnimatePresence>

            <div aria-hidden className="mt-7 flex h-10 items-end gap-1">
              {Array.from({ length: BARS }, (_, index) => (
                <span
                  key={index}
                  className="eq-bar w-1 flex-1 rounded-full bg-eit-accent"
                  style={{
                    height: `${40 + ((index * 37) % 60)}%`,
                    ["--eq-s" as string]: `${0.9 + ((index * 13) % 7) / 10}s`,
                    ["--eq-d" as string]: `${-((index * 17) % 10) / 10}s`,
                  }}
                />
              ))}
            </div>

            <SlideProgress className="mt-5 max-w-sm" />

            <Button asChild size="lg" className="mt-6 rounded-full">
              <Link href={link} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Headphones aria-hidden />
                Listen now
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
