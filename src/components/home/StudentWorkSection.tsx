"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { studentWorkSection } from "@/data/home/studentWork";
import { useCarousel } from "@/hooks/use-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ProjectView } from "@/types/sections";
import { CarouselControls, SlideProgress } from "./CarouselControls";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

/**
 * Student Work: a horizontal filmstrip of project cards. One, two or three cards are visible depending on the
 * screen; the strip slides one card at a time, by itself and through the arrows, pause button and dots.
 */
export function StudentWorkSection({ projects }: { projects: ProjectView[] }) {
  const { eyebrow, title, description, intervalMs, action } = studentWorkSection;
  const total = projects.length;
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1024px)");
  const medium = useMediaQuery("(min-width: 640px)");
  const visible = Math.min(total, wide ? 3 : medium ? 2 : 1);
  const positions = Math.max(1, total - visible + 1);

  const { rootRef, bind, ...carousel } = useCarousel<HTMLElement>({ count: positions, intervalMs });

  if (total === 0) return null;
  const position = Math.min(carousel.index, positions - 1);

  return (
    <section ref={rootRef} {...bind} aria-roledescription="carousel" aria-label="Student projects" data-scroll-section="student-work" className="overflow-x-clip bg-eit-surface py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="flex flex-wrap items-center gap-6">
            {action && (
              <Link href={action.href} className="group inline-flex items-center gap-3 text-base font-semibold text-primary">
                {action.label}
                <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <CarouselControls
              label="project"
              onPrev={carousel.prev}
              onNext={carousel.next}
              onTogglePause={carousel.togglePause}
              userPaused={carousel.userPaused}
              timed={carousel.timed}
            />
          </div>
        </div>

        <motion.div
          className="mt-12 touch-pan-y overflow-hidden"
          data-cursor="Drag"
          aria-live={carousel.running ? "off" : "polite"}
          onPanEnd={(_, info) => {
            if (info.offset.x < -60) carousel.next();
            else if (info.offset.x > 60) carousel.prev();
          }}
        >
          <motion.ul
            className="flex"
            style={{ width: `${(total * 100) / visible}%` }}
            initial={false}
            animate={{ x: `${-(position / total) * 100}%` }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: easing.out }}
          >
            {projects.map((project, index) => {
              const inView = index >= position && index < position + visible;
              const card = (
                <>
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.5rem] [container-type:inline-size]">
                    <SmartImage
                      image={project.image}
                      accent={project.accent}
                      label={String(index + 1).padStart(2, "0")}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
                      imageClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    {project.year && (
                      <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">{project.year}</span>
                    )}
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-xl font-bold tracking-tight text-primary">{project.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{project.team.join(", ")}</span>
                    </span>
                    {project.url && <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-primary/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />}
                  </span>
                  {project.summary && <span className="mt-3 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">{project.summary}</span>}
                </>
              );
              return (
                <li key={project.id} data-anim="card" className="shrink-0 pr-6" style={{ width: `${100 / total}%` }} aria-hidden={!inView}>
                  {project.url ? (
                    <Link href={project.url} tabIndex={inView ? 0 : -1} className="group block">
                      {card}
                    </Link>
                  ) : (
                    <div className="group">{card}</div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        <div className="mt-8 flex items-center gap-6">
          <ol className="flex items-center" aria-label="Choose position">
            {Array.from({ length: positions }, (_, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => carousel.goTo(index)}
                  aria-label={`Go to position ${index + 1} of ${positions}`}
                  aria-current={index === position ? "true" : undefined}
                  className="grid size-6 place-items-center"
                >
                  <span className={cn("block size-2 rounded-full transition-all", index === position ? "w-6 bg-primary" : "bg-primary/25")} />
                </button>
              </li>
            ))}
          </ol>
          <SlideProgress className="max-w-xs flex-1" />
        </div>
      </Container>
    </section>
  );
}
