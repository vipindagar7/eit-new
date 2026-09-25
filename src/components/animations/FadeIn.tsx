"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { duration, easing } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /**
   * Inherit hidden / visible / exit from a parent motion element (default), or
   * run on its own when the component mounts.
   */
  standalone?: boolean;
  /** Reveal when scrolled into view (once) instead of on mount. */
  inView?: boolean;
}

/** Fade + short upward move. Honours prefers-reduced-motion (fade only, no travel). */
export function FadeIn({ children, className, delay = 0, y = 16, standalone = false, inView = false }: FadeInProps) {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : y;

  const variants: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : duration.slow, delay, ease: easing.out },
    },
    exit: { opacity: 0, y: -offset / 2, transition: { duration: reduce ? 0.01 : duration.fast } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      {...(inView
        ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "0px 0px -12% 0px" } }
        : standalone
          ? { initial: "hidden", animate: "visible" }
          : {})}
    >
      {children}
    </motion.div>
  );
}
