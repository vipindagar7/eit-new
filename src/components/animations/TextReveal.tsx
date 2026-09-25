"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { duration, easing } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** One entry per visual line. Each line slides up from behind a mask. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  /** Seconds between lines. */
  stagger?: number;
  /** Inherit hidden / visible / exit from a parent motion element (default), or run on mount. */
  standalone?: boolean;
}

/** Masked line-by-line headline reveal. Reduced motion: lines simply appear. */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  standalone = false,
}: TextRevealProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
    exit: { transition: { staggerChildren: 0.03 } },
  };
  const line: Variants = {
    hidden: { y: reduce ? "0%" : "110%", opacity: reduce ? 0 : 1 },
    visible: { y: "0%", opacity: 1, transition: { duration: reduce ? 0.01 : duration.slow, ease: easing.out } },
    exit: { y: reduce ? "0%" : "-60%", opacity: 0, transition: { duration: reduce ? 0.01 : duration.fast } },
  };

  return (
    <motion.span
      className={cn("block", className)}
      variants={container}
      {...(standalone ? { initial: "hidden", animate: "visible" } : {})}
    >
      {lines.map((text, index) => (
        <span key={`${index}-${text}`} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className={cn("block", lineClassName)} variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
