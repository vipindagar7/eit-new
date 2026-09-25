"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { placementsSection } from "@/data/home/placements";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { RecruiterView, StatView, StoryView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { Marquee } from "./Marquee";
import { SectionHeading } from "./SectionHeading";
import { SmartImage, initials } from "./SmartImage";

const pad = (value: number) => String(value).padStart(2, "0");

interface PlacementsSectionProps {
  stories: StoryView[];
  stats: StatView[];
  recruiters: RecruiterView[];
}

/**
 * Placements & Achievements. A featured student fills a large navy stage (name and company on the left,
 * portrait on the right) with a thumbnail strip to pick anyone directly. It moves on by itself; arrows and pause
 * also control it. Below: the placement figures and a ticker of recruiters. Empty parts simply do not render.
 */
export function PlacementsSection({ stories, stats, recruiters }: PlacementsSectionProps) {
  const { eyebrow, title, description, intervalMs, action, secondaryAction } = placementsSection;
  const total = stories.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [tickerPaused, setTickerPaused] = useState(false);
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;
  const current = stories[carousel.index];

  return (
    <section ref={rootRef} {...bind} aria-roledescription="carousel" aria-label="Placement stories" data-scroll-section="placements" className="overflow-x-clip bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="flex flex-wrap gap-3">
            {action && (
              <Button asChild size="lg" className="rounded-full">
                <Link href={action.href}>
                  {action.label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="ghost" className="rounded-full border border-primary/25 hover:bg-primary/5">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          </div>
        </div>

        {/* Stage */}
        <div data-anim="stage" className="relative mt-12 overflow-hidden rounded-[2rem] bg-eit-mist text-primary">
          <div className="grid lg:min-h-[35rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="relative z-10 order-2 flex flex-col justify-between gap-10 p-7 sm:p-10 lg:order-1 lg:p-14">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold tabular-nums text-primary/70">
                  {pad(carousel.index + 1)} / {pad(total)}
                </p>
                <CarouselControls
                  label="story"
                  onPrev={carousel.prev}
                  onNext={carousel.next}
                  onTogglePause={carousel.togglePause}
                  userPaused={carousel.userPaused}
                  timed={carousel.timed}
                />
              </div>

              <div aria-live={carousel.running ? "off" : "polite"} className="min-h-[15rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: easing.out }}
                  >
                    <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-sm">
                      <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: current.accent }} />
                      {current.company}
                    </p>
                    <h3 className="mt-5 text-[clamp(2.25rem,4.6vw,4rem)] font-extrabold leading-[1] tracking-[-0.04em]">{current.name}</h3>
                    <p className="mt-3 text-lg font-medium text-primary/85">
                      {[current.role, current.batch].filter(Boolean).join(" · ")}
                    </p>
                    {current.story && <p className="mt-5 max-w-md text-base leading-relaxed text-primary/75">{current.story}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>

              <SlideProgress className="max-w-sm" />
            </div>

            <div className="relative order-1 min-h-[22rem] lg:order-2 lg:min-h-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0 [container-type:inline-size]"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: easing.out }}
                >
                  <SmartImage image={current.photo} accent={current.accent} label={initials(current.name)} sizes="(min-width: 1024px) 45vw, 100vw" />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-eit-mist via-eit-mist/10 to-transparent lg:bg-gradient-to-r lg:from-eit-mist lg:via-eit-mist/10 lg:to-transparent" />

              <ol aria-label="Choose a student" className="absolute right-4 bottom-4 left-4 flex justify-center gap-2 overflow-x-auto rounded-2xl bg-white/75 p-2 backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-auto sm:justify-end">
                {stories.map((story, index) => {
                  const isActive = index === carousel.index;
                  return (
                    <li key={story.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => carousel.goTo(index)}
                        aria-label={`Show ${story.name}, ${story.company}`}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "relative block h-16 w-12 overflow-hidden rounded-xl border-2 transition-all [container-type:inline-size] sm:h-20 sm:w-16",
                          isActive ? "scale-105 border-primary" : "border-transparent opacity-70 hover:opacity-100",
                        )}
                      >
                        <SmartImage image={story.photo} accent={story.accent} label={initials(story.name)} sizes="64px" />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* Figures */}
        {stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-y-8 border-y border-primary/15 py-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.id} data-anim="stat" className={cn("flex flex-col-reverse justify-end px-2 lg:px-8", index > 0 && "lg:border-l lg:border-primary/15")}>
                <dt className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                  {stat.note && <span className="block text-xs">{stat.note}</span>}
                </dt>
                <dd className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.04em] text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Recruiters */}
        {recruiters.length > 0 && (
          <div data-anim="ticker" className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-muted-foreground">Our recruiters</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTickerPaused((value) => !value)}
                aria-pressed={tickerPaused}
                className="text-muted-foreground hover:bg-primary/5"
              >
                {tickerPaused ? "Play ticker" : "Pause ticker"}
              </Button>
            </div>
            <Marquee seconds={38} paused={tickerPaused}>
              {recruiters.map((recruiter) => (
                <span
                  key={recruiter.id}
                  className="mr-4 grid h-16 w-44 shrink-0 place-items-center rounded-2xl border border-primary/10 bg-eit-surface px-4 text-sm font-semibold text-primary/70"
                >
                  {recruiter.logo?.ready ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={recruiter.logo.src} alt={recruiter.logo.alt} className="max-h-9 w-auto object-contain" loading="lazy" />
                  ) : (
                    recruiter.name
                  )}
                </span>
              ))}
            </Marquee>
          </div>
        )}
      </Container>
    </section>
  );
}
