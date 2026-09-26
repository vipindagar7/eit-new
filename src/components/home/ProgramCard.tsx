"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { programLevelLabel, type ResolvedProgram } from "@/data/programs/programs";
import { easing } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { programIcons } from "./program-icons";

interface Pose {
  x: string;
  scale: number;
  rotateY: number;
  opacity: number;
  z: number;
}

/**
 * Position of a card relative to the active one. 0 is the centre; -1 peeks in on the left,
 * 1 and 2 fan out to the right, anything further waits invisibly (so wrapping never flies across the stage).
 * Side cards share one gentle tilt, like the design reference.
 */
// -1's title ("MBA" etc.) was reported as significantly obscured behind the active card (usability
// audit #30). Easing its offset out from -66% to -58% keeps the fanned-card look but uncovers most of
// its heading; nudging 1 and 2 outward by the same amount keeps the fan visually balanced.
const poses: Record<number, Pose> = {
  [-1]: { x: "-58%", scale: 0.8, rotateY: 10, opacity: 1, z: 20 },
  0: { x: "0%", scale: 1, rotateY: 0, opacity: 1, z: 30 },
  1: { x: "82%", scale: 0.8, rotateY: 10, opacity: 1, z: 20 },
  2: { x: "136%", scale: 0.7, rotateY: 10, opacity: 1, z: 10 },
};
const hiddenRight: Pose = { x: "180%", scale: 0.6, rotateY: 10, opacity: 0, z: 0 };

interface ProgramCardProps {
  program: ResolvedProgram;
  index: number;
  total: number;
  /** Offset from the active card. */
  offset: number;
  reduceMotion: boolean;
  onSelect: () => void;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function ProgramCard({ program, index, total, offset, reduceMotion, onSelect }: ProgramCardProps) {
  const isActive = offset === 0;
  const pose = poses[offset] ?? hiddenRight;
  const Icon = programIcons[program.icon];

  const learnMoreClass = "inline-flex items-center gap-3 text-base font-medium";
  const learnMore = (
    <>
      Learn More
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full border border-white/70 transition-colors",
          isActive && "group-hover/link:bg-white group-hover/link:text-primary",
        )}
      >
        <ArrowRight aria-hidden className="size-5" />
      </span>
    </>
  );

  return (
    <motion.article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!isActive}
      className={cn(
        "absolute top-1/2 left-0 h-[calc(var(--card-w)*1.22)] w-(--card-w) -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] bg-primary text-white transition-shadow duration-700",
        isActive ? "shadow-[0_40px_80px_-32px_rgba(23,50,77,0.6)]" : "shadow-[0_24px_48px_-28px_rgba(23,50,77,0.5)]",
      )}
      style={{ zIndex: pose.z }}
      initial={false}
      animate={{ x: pose.x, scale: pose.scale, rotateY: pose.rotateY, opacity: pose.opacity }}
      transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: easing.out }}
    >
      {/* Photograph, or a navy fallback tinted with the program accent until the photo exists */}
      {program.imageReady && program.image ? (
        <Image
          src={program.image.src}
          alt={isActive ? program.image.alt : ""}
          fill
          sizes="(min-width: 1280px) 24rem, (min-width: 1024px) 18rem, 74vw"
          quality={80}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(90% 60% at 85% 100%, ${program.accent}66 0%, transparent 65%), linear-gradient(160deg, #24567a 0%, #17324d 70%)`,
          }}
        />
      )}

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-primary/35" />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-primary"
        initial={false}
        animate={{ opacity: isActive ? 0 : 0.42 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.85 }}
      />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <p className="flex items-center gap-3 pt-1 text-base font-semibold tabular-nums">
            {pad(index + 1)}
            <span aria-hidden className="h-px w-8 bg-white/70" />
          </p>
          <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-sm">
            {programLevelLabel[program.level]}
          </span>
        </div>

        <div>
          <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-white text-primary shadow-sm">
            <Icon aria-hidden className="size-7" />
          </span>
          <h3 className="text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-none tracking-[-0.03em]">{program.name}</h3>
          {program.tagline && <p className="mt-2 max-w-[16rem] text-lg leading-snug text-white/85">{program.tagline}</p>}

          <div className="mt-7">
            {isActive ? (
              <Link
                href={`/programs/${program.slug}`}
                aria-label={`Learn more about ${program.fullName}`}
                className={cn(learnMoreClass, "group/link")}
              >
                {learnMore}
              </Link>
            ) : (
              <span aria-hidden className={learnMoreClass}>
                {learnMore}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Inactive cards: click anywhere to bring them forward (keyboard users use the strip and arrows) */}
      {!isActive && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Show ${program.name}`}
          onClick={onSelect}
          className="absolute inset-0 z-10 cursor-pointer"
        />
      )}
    </motion.article>
  );
}
