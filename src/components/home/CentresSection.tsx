"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { centresSection } from "@/data/home/centres";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { CentreView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Centres of Excellence: a numbered list on the left and a large picture on the right.
 * The active centre opens up (with a progress line) and its picture takes over the stage; it moves on by itself,
 * and the list, the arrows and the pause button all control it.
 */
export function CentresSection({ centres }: { centres: CentreView[] }) {
  const { eyebrow, title, description, intervalMs, action } = centresSection;
  const total = centres.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;
  const current = centres[carousel.index];

  return (
    <section ref={rootRef} {...bind} aria-roledescription="carousel" aria-label="Centres of Excellence" data-scroll-section="centres" className="overflow-hidden bg-[#EDF6F1] py-20 text-primary morph:-mt-16 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />

          <ol className="mt-10 border-t border-primary/15">
            {centres.map((centre, index) => {
              const isActive = index === carousel.index;
              return (
                <li key={centre.id} data-anim="row" className="border-b border-primary/15">
                  <button
                    type="button"
                    onClick={() => carousel.goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    className="flex w-full items-baseline gap-5 py-4 text-left"
                  >
                    <span className={cn("w-8 shrink-0 text-sm font-bold tabular-nums", isActive ? "text-primary" : "text-primary/40")}>{pad(index + 1)}</span>
                    <span className="flex-1">
                      <span className={cn("block text-xl font-semibold transition-colors sm:text-2xl", isActive ? "text-primary" : "text-primary/55 hover:text-primary/90")}>
                        {centre.name}
                      </span>
                      {!isActive && centre.summary && <span className="mt-0.5 block text-sm text-primary/55">{centre.summary}</span>}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: reduceMotion ? "auto" : 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: reduceMotion ? "auto" : 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easing.out }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-[3.25rem]">
                          {(centre.description ?? centre.summary) && (
                            <p className="max-w-md text-base leading-relaxed text-primary/75">{centre.description ?? centre.summary}</p>
                          )}
                          {centre.href && (
                            <Link href={centre.href} className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-eit-accent decoration-2 underline-offset-4">
                              Explore this centre
                              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          )}
                          <SlideProgress className="mt-5 max-w-md" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <CarouselControls
              label="centre"
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

        <div className="order-1 lg:order-2" aria-live={carousel.running ? "off" : "polite"}>
          <div data-anim="stage" className="relative">
            <span aria-hidden className="absolute -inset-3 rounded-[2.4rem] border border-primary/15 sm:-inset-4" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white/60 [container-type:inline-size]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 1, ease: easing.out }}
                >
                  <SmartImage image={current.image} accent={current.accent} label={pad(carousel.index + 1)} sizes="(min-width: 1024px) 45vw, 100vw" />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
                <p className="text-lg font-semibold text-primary sm:text-xl">{current.name}</p>
                <p aria-hidden className="text-sm font-semibold tabular-nums text-primary/70">
                  {pad(carousel.index + 1)} / {pad(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
