"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { programsSection } from "@/data/home/programs";
import type { ResolvedProgram } from "@/data/programs/programs";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CarouselControls } from "./CarouselControls";
import { ProgramCard } from "./ProgramCard";
import { ProgramsStrip } from "./ProgramsStrip";

/** Position of card `index` relative to the active one, wrapping around so the fan is always balanced. */
const offsetOf = (index: number, active: number, total: number) => (((index - active + 1) % total) + total) % total - 1;

/**
 * Programs carousel. All content comes from data/home/programs.ts and data/programs/programs.ts.
 * Cards are positioned in 3D relative to the active one; swipe, the arrow buttons, the strip below
 * and ← / → all move it.
 */
export function ProgramsSection({ programs }: { programs: ResolvedProgram[] }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const total = programs.length;
  const { eyebrow, title, description, intro, intervalMs, action } = programsSection;
  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: Math.max(total, 1), intervalMs });

  if (total === 0) return null;

  const active = carousel.index;
  const { goTo, prev, next } = carousel;
  const current = programs[active];

  const controls = (
    <CarouselControls
      label="program"
      onPrev={prev}
      onNext={next}
      onTogglePause={carousel.togglePause}
      userPaused={carousel.userPaused}
      timed={carousel.timed}
    />
  );

  return (
    <section
      ref={rootRef}
      {...bind}
      aria-roledescription="carousel"
      aria-label="Our programs"
      data-scroll-section="programs"
      className="relative overflow-hidden bg-eit-surface pt-12 pb-20 [--card-w:min(74vw,22rem)] sm:[--card-w:22rem] lg:pt-14 lg:pb-28 lg:[--card-w:18rem] xl:[--card-w:24rem]"
      onKeyDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("input, textarea")) return;
        if (event.key === "ArrowLeft") prev();
        if (event.key === "ArrowRight") next();
      }}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-6">
          <div data-anim="heading" className="lg:pt-8">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <BrandMark className="size-6" />
              {eyebrow}
              <span aria-hidden className="h-px w-16 bg-primary/25" />
            </p>
            <h2 className="text-[clamp(2.25rem,3.6vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-primary">
              {title.map((line, index) => (
                <span key={line} className={index === title.length - 1 ? "block text-muted-foreground" : "block"}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">{description}</p>

            <Link href={action.href} className="group mt-9 inline-flex items-center gap-4 text-[0.9375rem] font-semibold text-primary">
              <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                <ArrowRight aria-hidden className="size-6" />
              </span>
              {action.label}
            </Link>
          </div>

          <div className="min-w-0">
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-muted-foreground lg:max-w-sm">{intro}</p>

            {/* Stage: perspective container. Cards anchor at one point and fan out from it. */}
            <motion.div
              data-anim="stage"
              data-cursor="Drag"
              className="relative mt-4 h-[calc(var(--card-w)*1.22+4rem)] touch-pan-y [perspective:1800px]"
              onPanEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
            >
              <div className="absolute inset-y-0 left-1/2 w-0 lg:left-[56%] xl:left-1/2">
                {programs.map((program, index) => (
                  <ProgramCard
                    key={program.slug}
                    program={program}
                    index={index}
                    total={total}
                    offset={offsetOf(index, active, total)}
                    reduceMotion={reduceMotion}
                    onSelect={() => goTo(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Previously sat in a top row, well above and detached from the card stack it drives
                (usability audit #29). It now sits directly under the stage on every breakpoint, so the
                prev/next/pause buttons are physically adjacent to the cards they control. */}
            <div className="mt-4 flex justify-center lg:justify-end">{controls}</div>
          </div>
        </div>

        <p className="sr-only" aria-live={carousel.running ? "off" : "polite"}>
          {current.fullName}, program {active + 1} of {total}
        </p>

        <ProgramsStrip
          programs={programs}
          active={active}
          onSelect={goTo}
          allHref={action.href}
          allLabel="Explore all programs"
        />
      </Container>
    </section>
  );
}
