"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode, Ref } from "react";
import { motion } from "framer-motion";
import { heroTimeThemes, type ResolvedHeroSlide } from "@/data/home/hero";
import { cn } from "@/lib/utils";

interface SplitImageProps {
  slides: ResolvedHeroSlide[];
  active: number;
  /** Slide indexes that are mounted (visited + next). Others cost nothing. */
  mounted: Set<number>;
  /** Number of slanted parts the image is cut into. */
  panels: number;
  reduceMotion: boolean;
  /**
   * morph  – sized like the hero and animated by GSAP: starts as ONE full image and splits as the page scrolls.
   * static – already split, used on small screens and for reduced motion.
   */
  variant: "morph" | "static";
  /** Element GSAP scales / moves, and whose `--p` variable drives the split (0 = one image, 1 = split). */
  groupRef?: Ref<HTMLDivElement>;
  className?: string;
}

/** Vertical offsets per panel, in % of the group height, so the strips step up and down. */
const STEP_Y = [-3.5, 5.5, -6, 4];

const geometry: Record<SplitImageProps["variant"], CSSProperties> = {
  morph: { "--spread": "2.4cqw", "--radius": "4.4cqw", "--skew": "-7deg" } as CSSProperties,
  static: { "--spread": "3.4cqw", "--radius": "5cqw", "--skew": "-7deg" } as CSSProperties,
};

/**
 * Mirrored continuation of the picture just outside its left / right edge. Slanting the outer parts pushes
 * their corners past the picture, and this fills that gap so they keep clean slanted edges.
 * Outside the parts' own clip it is never visible, and at progress 0 it sits off screen.
 */
function Flank({ side, children }: { side: "left" | "right"; children: ReactNode }) {
  const left = side === "left";
  return (
    <div
      className="absolute top-0 h-full overflow-hidden"
      style={{ width: "calc(12cqw + 2px)", ...(left ? { right: "calc(100% - 2px)" } : { left: "calc(100% - 2px)" }) }}
    >
      <div
        className="absolute top-0 h-full"
        style={{ width: "100cqw", transform: "scaleX(-1)", ...(left ? { right: 0 } : { left: 0 }) }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * One photograph cut into slanted parts. Each part is a window onto the SAME full-size image box,
 * offset so the parts line up into a single picture at progress 0. Spreading the parts (translate,
 * skew, rounded corners) is driven entirely by the CSS variable `--p`, so GSAP only has to tween one number.
 * The photograph follows the hero: whichever slide is active is the picture shown in every part.
 */
export function SplitImage({ slides, active, mounted, panels, reduceMotion, variant, groupRef, className }: SplitImageProps) {
  const initialProgress = variant === "static" ? 1 : 0;

  const renderLayers = (panelIndex: number) =>
    slides.map((slide, index) => {
      if (!mounted.has(index)) return null;

      const theme = heroTimeThemes[slide.timeTheme];
      const isActive = index === active;
      const stagger = reduceMotion ? 0 : panelIndex * 0.1;

      return (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          style={{ zIndex: isActive ? 1 : 0 }}
          initial={index === 0 ? false : { opacity: 0 }}
          animate={
            isActive
              ? { opacity: 1, transition: { duration: reduceMotion ? 0.01 : 0.9, delay: stagger } }
              : { opacity: 0, transition: { duration: 0.01, delay: reduceMotion ? 0 : 1.4 + stagger } }
          }
        >
          {slide.imageReady ? (
            <Image src={slide.image} alt="" fill sizes="100vw" quality={80} className="object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: theme.fallback }} />
          )}
          {/* Same scrim as the hero, so the swap at scroll start is invisible; GSAP fades it out. Not needed once split. */}
          {variant === "morph" && (
            <div
              data-split-scrim
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, rgba(23,50,77,${theme.scrim.side}) 0%, rgba(23,50,77,${(theme.scrim.side * 0.55).toFixed(2)}) 38%, rgba(23,50,77,0) 74%), linear-gradient(180deg, rgba(23,50,77,${theme.scrim.edge}) 0%, rgba(23,50,77,0) 26%, rgba(23,50,77,0) 58%, rgba(23,50,77,${theme.scrim.edge}) 100%)`,
              }}
            />
          )}
        </motion.div>
      );
    });

  return (
    // The outer element only provides the size (container query units). It must not be the element GSAP
    // scales, because size containment would clip the slanted parts where they overhang the group box.
    <div aria-hidden className={cn("absolute inset-0 [container-type:size]", className)}>
      <div
        ref={groupRef}
        className="absolute inset-0 will-change-transform"
        style={{ ...geometry[variant], "--p": initialProgress } as CSSProperties}
      >
        {Array.from({ length: panels }, (_, panelIndex) => {
          const centred = panelIndex - (panels - 1) / 2;
          const leftPercent = (panelIndex * 100) / panels;

          return (
            <div
              key={panelIndex}
              data-split-panel
              className="absolute top-0 h-full overflow-hidden will-change-transform"
              style={{
                left: `${leftPercent}%`,
                width: "calc(100% / " + panels + " + 1px)", // +1px hides hairline seams while it is still one image
                borderRadius: "calc(var(--p) * var(--radius))",
                transform: `translate(calc(var(--p) * var(--spread) * ${centred}), calc(var(--p) * ${STEP_Y[panelIndex % STEP_Y.length]}cqh)) skewX(calc(var(--p) * var(--skew)))`,
              }}
            >
              {/* Counter-skew keeps the picture upright inside the slanted frame */}
              <div className="absolute inset-0" style={{ transform: "skewX(calc(var(--p) * var(--skew) * -1))" }}>
                <div
                  className="absolute top-0"
                  style={{ left: `calc(${-leftPercent} * 1cqw)`, width: "100cqw", height: "100cqh" }}
                >
                  {renderLayers(panelIndex)}
                  {panelIndex === 0 && <Flank side="left">{renderLayers(panelIndex)}</Flank>}
                  {panelIndex === panels - 1 && <Flank side="right">{renderLayers(panelIndex)}</Flank>}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
