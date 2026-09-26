"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "radix-ui";
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { celebritiesSection } from "@/data/home/celebrities";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { CelebrityView } from "@/types/sections";
import { SectionHeading } from "./SectionHeading";
import { SmartImage, initials } from "./SmartImage";

const pad = (value: number) => String(value).padStart(2, "0");

const glassButton =
  "grid size-12 place-items-center rounded-full border border-white/40 bg-white/25 text-white backdrop-blur-xl transition-colors hover:bg-white/45 sm:size-14";

/**
 * Celebrity Corner. One person fills the whole stage (portrait behind, name in large capitals, role in italics) and a
 * strip of portraits along the bottom lets you pick anyone. It moves on by itself; the arrows, the play / pause button
 * and the strip also drive it, and the expand button opens the full profile.
 */
export function CelebritySection({ people }: { people: CelebrityView[] }) {
  const { eyebrow, title, description, intervalMs } = celebritiesSection;
  const total = people.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [openId, setOpenId] = useState<string | null>(null);
  const stripRef = useRef<HTMLOListElement>(null);
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  const index = carousel.index;

  // Keep the chosen portrait centred in the strip.
  useEffect(() => {
    const strip = stripRef.current;
    const item = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !item) return;
    strip.scrollTo({ left: item.offsetLeft - (strip.clientWidth - item.clientWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
  }, [index, reduceMotion]);

  if (total === 0) return null;
  const current = people[index];
  const opened = people.find((person) => person.id === openId);

  return (
    <section
      ref={rootRef}
      {...bind}
      aria-roledescription="carousel"
      aria-label="Celebrity corner"
      data-scroll-section="celebrities"
      className="overflow-x-clip bg-white py-20 lg:py-28"
    >
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div
          data-anim="stage"
          className="on-dark relative mt-12 aspect-[4/5] max-h-[46rem] w-full overflow-hidden rounded-[2rem] bg-eit-slate/30 sm:aspect-[16/11] lg:aspect-[16/9]"
        >
          {/* Portrait, crossfading */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0 [container-type:inline-size]"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: easing.out }}
            >
              <SmartImage image={current.photo} accent={current.accent} label={initials(current.name)} sizes="(min-width: 1024px) 1200px, 100vw" eager={index === 0} />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/10" />

          {/* Top bar */}
          <div className="absolute top-0 right-0 left-0 flex items-center justify-between gap-4 p-5 text-white sm:p-7">
            <p className="flex items-center gap-2.5 text-sm font-semibold tracking-wide">
              <BrandMark className="size-6" />
              {eyebrow}
            </p>
            <p aria-hidden className="text-sm font-semibold tabular-nums tracking-widest text-white/85">
              {pad(index + 1)} / {pad(total)}
            </p>
          </div>

          {/* Name */}
          <div className="absolute right-5 bottom-[9.5rem] left-5 text-white sm:right-7 sm:bottom-[11.5rem] sm:left-7 lg:bottom-[13rem]" aria-live={carousel.running ? "off" : "polite"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -14 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: easing.out }}
              >
                {current.category && <p className="mb-2 text-xs font-bold tracking-[0.2em] text-eit-accent uppercase">{current.category}</p>}
                <p className="text-sm text-white/85 italic sm:text-base">{current.role}</p>
                {/* Long, all-caps names (e.g. "Sample Celebrity One") are slower to read than sentence
                    case (usability audit #17). Uppercase is now reserved for genuinely short names;
                    longer ones keep their natural case at the same size and weight. */}
                <h3
                  className={cn(
                    "mt-1 text-[clamp(1.75rem,5.4vw,4.5rem)] leading-[1.02] font-light tracking-[0.05em]",
                    current.name.length <= 14 && "uppercase",
                  )}
                >
                  {current.name}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions (right) */}
          <div className="absolute right-4 bottom-[9rem] z-10 flex flex-col gap-3 sm:right-6 sm:bottom-[11rem] lg:bottom-[12.5rem]">
            {carousel.timed && (
              <button
                type="button"
                onClick={carousel.togglePause}
                aria-pressed={carousel.userPaused}
                aria-label={carousel.userPaused ? "Play celebrity slideshow" : "Pause celebrity slideshow"}
                className={glassButton}
              >
                {carousel.userPaused ? <Play aria-hidden className="size-5" /> : <Pause aria-hidden className="size-5" />}
              </button>
            )}
            <button type="button" onClick={() => setOpenId(current.id)} aria-label={`Open profile of ${current.name}`} data-cursor="Open" className={glassButton}>
              <Maximize2 aria-hidden className="size-5" />
            </button>
          </div>

          {/* Portrait strip */}
          <div className="absolute right-0 bottom-0 left-0 border-t border-white/25 bg-white/12 p-3 backdrop-blur-xl sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button type="button" onClick={carousel.prev} aria-label="Previous person" className="grid size-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/20">
                <ChevronLeft aria-hidden />
              </button>
              <ol
                ref={stripRef}
                aria-label="Choose a person"
                className="relative flex min-w-0 flex-1 gap-2.5 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
              >
                {people.map((person, personIndex) => {
                  const isActive = personIndex === index;
                  return (
                    <li key={person.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => carousel.goTo(personIndex)}
                        aria-label={`Show ${person.name}`}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          // The active thumbnail's own base size never changes — only its scale/ring
                          // shift with selection, and this active one just happens to default to index 0
                          // (usability audit #35 read that starting state as a fixed, oversized "first"
                          // thumbnail). The scale delta is softened here so the active item still reads
                          // clearly without breaking the row's rhythm as much.
                          "relative block h-24 w-[4.25rem] overflow-hidden rounded-md transition-all duration-500 [container-type:inline-size] sm:h-32 sm:w-24 lg:h-36 lg:w-28",
                          isActive ? "scale-100 ring-2 ring-white" : "scale-[0.95] opacity-70 hover:opacity-100",
                        )}
                      >
                        <SmartImage image={person.photo} accent={person.accent} label={initials(person.name)} sizes="120px" />
                      </button>
                    </li>
                  );
                })}
              </ol>
              <button type="button" onClick={carousel.next} aria-label="Next person" className="grid size-9 shrink-0 place-items-center rounded-full text-white hover:bg-white/20">
                <ChevronRight aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Full profile */}
      <Dialog.Root open={opened !== undefined} onOpenChange={(open) => !open && setOpenId(null)}>
        <AnimatePresence>
          {opened && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[60] bg-primary/50 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-x-4 top-1/2 z-[61] mx-auto grid max-h-[88vh] max-w-4xl -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white text-primary shadow-2xl sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.4, ease: easing.out }}
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[26rem] [container-type:inline-size]">
                    <SmartImage image={opened.photo} accent={opened.accent} label={initials(opened.name)} sizes="(min-width: 640px) 420px, 90vw" />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                    {opened.category && <p className="text-xs font-bold tracking-[0.2em] text-eit-slate uppercase">{opened.category}</p>}
                    <Dialog.Title className="text-3xl font-extrabold tracking-tight sm:text-4xl">{opened.name}</Dialog.Title>
                    <p className="text-base font-medium text-eit-slate italic">{opened.role}</p>
                    {opened.bio && <p className="text-base leading-relaxed text-primary/80">{opened.bio}</p>}
                    {opened.href && (
                      <Link href={opened.href} className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-eit-accent decoration-2 underline-offset-4">
                        Read more
                        <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                    )}
                  </div>
                  <Dialog.Close aria-label="Close profile" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-primary shadow hover:bg-white">
                    <X aria-hidden className="size-5" />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
