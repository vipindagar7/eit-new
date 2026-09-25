"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/button";
import type { HeroSlide, TimeThemeStyle } from "@/data/home/hero";

interface HeroContentProps {
  slide: HeroSlide;
  index: number;
  total: number;
  theme: TimeThemeStyle;
  reduceMotion: boolean;
}

/**
 * Text layer. It changes independently of the background: the old text leaves quickly,
 * then eyebrow → headline → description → actions arrive in sequence.
 */
export function HeroContent({ slide, index, total, theme, reduceMotion }: HeroContentProps) {
  const sequence: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reduceMotion ? 0 : 0.3, staggerChildren: reduceMotion ? 0 : 0.11 } },
    exit: { transition: { staggerChildren: 0.02 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${total}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sequence}
        className="max-w-5xl"
      >
        {slide.eyebrow && (
          <FadeIn>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-white/90 sm:mb-6 sm:text-base">
              <span aria-hidden className="h-0.5 w-10 rounded-full" style={{ backgroundColor: theme.accent }} />
              {slide.eyebrow}
            </p>
          </FadeIn>
        )}

        <h1 className="text-[clamp(2.25rem,5.6vw,5.75rem)] font-extrabold leading-[1] tracking-[-0.045em] text-white">
          <TextReveal lines={slide.title.split("\n")} />
        </h1>

        {slide.description && (
          <FadeIn>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:mt-8 sm:text-lg">
              {slide.description}
            </p>
          </FadeIn>
        )}

        {(slide.primaryAction || slide.secondaryAction) && (
          <FadeIn>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              {slide.primaryAction && (
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                  <Link href={slide.primaryAction.href}>
                    {slide.primaryAction.label}
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              )}
              {slide.secondaryAction && (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full border border-white/50 text-white hover:bg-white/15 hover:text-white"
                >
                  <Link href={slide.secondaryAction.href}>{slide.secondaryAction.label}</Link>
                </Button>
              )}
            </div>
          </FadeIn>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
