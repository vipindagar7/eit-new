"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { campusLifeSection } from "@/data/home/campusLife";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { MomentView } from "@/types/sections";
import { CarouselControls } from "./CarouselControls";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

/** Size, place and tilt of the five frames, as % of the collage box (measured from the design). */
const frames = [
  { left: 0, top: 21, width: 32.6, height: 72.6, rotate: -3, z: 2 },
  { left: 22, top: 0, width: 29.4, height: 74.5, rotate: 3, z: 1 },
  { left: 50.8, top: 8, width: 26.7, height: 37, rotate: 5, z: 3 },
  { left: 46.5, top: 41.6, width: 28.9, height: 58.4, rotate: -2, z: 4 },
  { left: 73.2, top: 35.4, width: 23, height: 58.4, rotate: 7, z: 3 },
];

/**
 * "Beyond Classrooms": a collage of tilted, white-bordered photographs. Every few seconds the frames change
 * to the next photographs in turn (each frame a beat after the last). Controls: previous, next, pause.
 */
export function CampusLifeSection({ moments }: { moments: MomentView[] }) {
  const { eyebrow, title, description, script, intervalMs, action } = campusLifeSection;
  const total = moments.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;

  return (
    <section ref={rootRef} {...bind} aria-roledescription="carousel" aria-label="Campus life photographs" data-scroll-section="campus" className="overflow-x-clip bg-white py-16 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-eit-surface px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-10">
            <div>
              <SectionHeading eyebrow={eyebrow} title={title} description={description} />
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link href={action.href} className="group inline-flex items-center gap-3 text-base font-semibold text-primary">
                  {action.label}
                  <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <CarouselControls
                  label="photo"
                  onPrev={carousel.prev}
                  onNext={carousel.next}
                  onTogglePause={carousel.togglePause}
                  userPaused={carousel.userPaused}
                  timed={carousel.timed}
                />
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[1.65] w-full" aria-live={carousel.running ? "off" : "polite"}>
                {frames.map((frame, frameIndex) => {
                  const moment = moments[(carousel.index + frameIndex) % total];
                  return (
                    <div
                      key={frameIndex}
                      data-anim="frame"
                      className="absolute rounded-[1.1rem] border-[5px] border-white bg-white shadow-[0_18px_36px_-18px_rgba(23,50,77,0.5)] [container-type:inline-size]"
                      style={{
                        left: `${frame.left}%`,
                        top: `${frame.top}%`,
                        width: `${frame.width}%`,
                        height: `${frame.height}%`,
                        rotate: `${frame.rotate}deg`,
                        zIndex: frame.z,
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[0.7rem]">
                        <AnimatePresence initial={false}>
                          <motion.div
                            key={moment.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : frameIndex * 0.14 }}
                          >
                            <SmartImage
                              image={moment.image}
                              accent={moment.accent}
                              sizes="(min-width: 1024px) 20vw, 40vw"
                            />
                            {!moment.image.ready && moment.caption && (
                              <span className="absolute inset-x-2 bottom-2 rounded-md bg-white/80 px-2 py-1 text-[0.7rem] font-medium text-primary">
                                {moment.title}
                              </span>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Handwritten signature and a few spark lines, as in the design */}
              <p
                aria-hidden
                data-anim="script"
                className="pointer-events-none absolute -top-6 right-0 hidden rotate-[-7deg] font-[family-name:var(--font-script)] text-[clamp(1.6rem,3vw,2.6rem)] leading-[0.95] text-eit-slate sm:block"
              >
                {script.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <svg aria-hidden data-anim="script" viewBox="0 0 40 40" className="pointer-events-none absolute top-[24%] right-[1%] hidden size-10 text-primary/70 lg:block">
                <path d="M6 20 L14 24 M14 6 L17 15 M28 6 L24 14 M34 18 L26 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
