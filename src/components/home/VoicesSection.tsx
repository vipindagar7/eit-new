"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { storiesSection } from "@/data/home/stories";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { VoiceView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { SmartImage, initials } from "./SmartImage";

/** Pose of a portrait by its distance from the active one. */
const poses: Record<number, { x: string; scale: number; opacity: number; z: number }> = {
  [-2]: { x: "-135%", scale: 0.68, opacity: 0, z: 0 },
  [-1]: { x: "-78%", scale: 0.82, opacity: 0.55, z: 10 },
  0: { x: "0%", scale: 1, opacity: 1, z: 30 },
  1: { x: "78%", scale: 0.82, opacity: 0.55, z: 10 },
  2: { x: "135%", scale: 0.68, opacity: 0, z: 0 },
};

const offsetOf = (index: number, active: number, total: number) => {
  let offset = ((index - active) % total + total) % total;
  if (offset > total / 2) offset -= total;
  return offset;
};

/**
 * "Stories That Inspire": a quote on the left, a fan of portraits on the right. The active portrait is centred
 * and the quote changes with it. Advances by itself; previous / next / pause and the dots also drive it.
 */
export function VoicesSection({ voices }: { voices: VoiceView[] }) {
  const { eyebrow, title, script, intervalMs } = storiesSection;
  const total = voices.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;
  const current = voices[carousel.index];

  return (
    <section ref={rootRef} {...bind} aria-roledescription="carousel" aria-label="Student stories" data-scroll-section="voices" className="overflow-x-clip bg-white py-16 lg:py-24">
      <Container>
        <div data-anim="stage" className="relative overflow-hidden rounded-[2rem] bg-eit-blush/40 px-6 py-12 text-primary sm:px-10 lg:px-14 lg:py-16">
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-white/60 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div>
              <p data-anim="heading" className="mb-5 flex items-center gap-3 text-sm font-semibold text-primary/75">
                <BrandMark className="size-6" />
                {eyebrow}
              </p>
              <h2 data-anim="heading" className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <div className="mt-9 min-h-[13rem]" aria-live={carousel.running ? "off" : "polite"}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={current.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easing.out }}
                  >
                    <Quote aria-hidden className="mb-3 size-8 fill-primary/80 text-primary/80" />
                    <blockquote className="max-w-lg text-xl leading-relaxed text-primary sm:text-[1.4rem]">{current.quote}</blockquote>
                    <figcaption className="mt-7 flex items-center gap-4">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-white [container-type:inline-size]">
                        <SmartImage image={current.photo} accent={current.accent} label={initials(current.name)} sizes="48px" />
                      </span>
                      <span>
                        <span className="block font-semibold">{current.name}</span>
                        {current.designation && <span className="block text-sm text-primary/70">{current.designation}</span>}
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <CarouselControls
                  label="story"
                  onPrev={carousel.prev}
                  onNext={carousel.next}
                  onTogglePause={carousel.togglePause}
                  userPaused={carousel.userPaused}
                  timed={carousel.timed}
                />
                <SlideProgress className="hidden w-32 sm:block" />
              </div>
            </div>

            <div className="relative">
              <div data-anim="portraits" className="relative mx-auto h-[19rem] w-full max-w-[34rem] sm:h-[23rem]">
                  {voices.map((voice, index) => {
                    const offset = offsetOf(index, carousel.index, total);
                    const pose = poses[Math.max(-2, Math.min(2, offset))];
                    const isActive = offset === 0;
                    return (
                      <motion.button
                        key={voice.id}
                        type="button"
                        tabIndex={-1}
                        aria-label={`Show story by ${voice.name}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => carousel.goTo(index)}
                        className={cn(
                          "absolute top-1/2 left-1/2 h-[86%] w-[47%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.6rem] border-2 border-white bg-white text-left [container-type:inline-size]",
                          isActive ? "shadow-[0_30px_60px_-24px_rgba(23,50,77,0.45)]" : "shadow-none",
                        )}
                        style={{ zIndex: pose.z }}
                        initial={false}
                        animate={{ x: pose.x, scale: pose.scale, opacity: Math.abs(offset) > 2 ? 0 : pose.opacity }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: easing.out }}
                      >
                        <SmartImage image={voice.photo} accent={voice.accent} label={initials(voice.name)} sizes="(min-width: 640px) 16rem, 45vw" />
                      </motion.button>
                    );
                  })}
              </div>

              <ol className="mt-5 flex items-center justify-center gap-2" aria-label="Choose a story">
                {voices.map((voice, index) => (
                  <li key={voice.id}>
                    <button
                      type="button"
                      onClick={() => carousel.goTo(index)}
                      aria-label={`Story ${index + 1} of ${total}: ${voice.name}`}
                      aria-current={index === carousel.index ? "true" : undefined}
                      className="grid size-6 place-items-center"
                    >
                      <span className={cn("block size-2 rounded-full transition-all", index === carousel.index ? "w-5 bg-primary" : "bg-primary/25")} />
                    </button>
                  </li>
                ))}
              </ol>

              <p aria-hidden data-anim="script" className="pointer-events-none absolute right-0 bottom-0 hidden rotate-[-6deg] font-[family-name:var(--font-script)] text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[0.95] text-eit-slate lg:block">
                {script.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
