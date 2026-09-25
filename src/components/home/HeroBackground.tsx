"use client";

import Image from "next/image";
import { useState, type Ref } from "react";
import { motion } from "framer-motion";
import { heroTimeThemes, type ResolvedHeroSlide } from "@/data/home/hero";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easing } from "@/lib/animations";

interface HeroBackgroundProps {
  slides: ResolvedHeroSlide[];
  active: number;
  /** Indexes that are currently mounted: visited slides plus the next one. Others cost nothing. */
  mounted: Set<number>;
  reduceMotion: boolean;
  /** Target for the GSAP scroll parallax. */
  wrapperRef: Ref<HTMLDivElement>;
}

/**
 * Stacked background layers. Only the visited slides and the next one are mounted, and only the
 * first image is preloaded. The incoming slide fades and settles in from a slight zoom; the outgoing
 * one stays put underneath until the new one is opaque, so there is never a dark dip in between.
 */
export function HeroBackground({ slides, active, mounted, reduceMotion, wrapperRef }: HeroBackgroundProps) {
  const [failedVideos, setFailedVideos] = useState<string[]>([]);
  // No background video on small screens: saves data and battery.
  const allowVideo = useMediaQuery("(min-width: 768px)") && !reduceMotion;

  return (
    <div ref={wrapperRef} className="absolute inset-0 -z-10 will-change-transform">
      {slides.map((slide, index) => {
        if (!mounted.has(index)) return null;

        const theme = heroTimeThemes[slide.timeTheme];
        const isActive = index === active;
        const showVideo = isActive && allowVideo && slide.videoReady && slide.video && !failedVideos.includes(slide.id);

        return (
          <motion.div
            key={slide.id}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{ zIndex: isActive ? 1 : 0 }}
            initial={index === 0 ? false : { opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
            animate={
              isActive
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: reduceMotion
                      ? { duration: 0.01 }
                      : { opacity: { duration: 1.1 }, scale: { duration: 2.6, ease: easing.out } },
                  }
                : {
                    opacity: 0,
                    scale: 1,
                    transition: { duration: 0.01, delay: reduceMotion ? 0 : 1.3 },
                  }
            }
          >
            {slide.imageReady ? (
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="100vw"
                quality={80}
                preload={index === 0}
                className="object-cover"
              />
            ) : (
              <div role="img" aria-label={slide.imageAlt} className="absolute inset-0" style={{ background: theme.fallback }} />
            )}

            {showVideo && (
              <video
                className="absolute inset-0 size-full object-cover"
                src={slide.video}
                poster={slide.imageReady ? slide.image : undefined}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-hidden
                tabIndex={-1}
                onError={() => setFailedVideos((list) => [...list, slide.id])}
              />
            )}

            {/* Legibility scrim: strongest behind the text, lightest over the buildings */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, rgba(23,50,77,${theme.scrim.side}) 0%, rgba(23,50,77,${(theme.scrim.side * 0.55).toFixed(2)}) 38%, rgba(23,50,77,0) 74%), linear-gradient(180deg, rgba(23,50,77,${theme.scrim.edge}) 0%, rgba(23,50,77,0) 26%, rgba(23,50,77,0) 58%, rgba(23,50,77,${theme.scrim.edge}) 100%)`,
              }}
            />
            <div aria-hidden className="absolute inset-0 bg-primary/30 md:hidden" />
          </motion.div>
        );
      })}
    </div>
  );
}
