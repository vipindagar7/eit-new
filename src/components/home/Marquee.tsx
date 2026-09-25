import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  seconds: number;
  reverse?: boolean;
  /** Freeze the row (driven by a pause button). It also freezes on hover and keyboard focus. */
  paused?: boolean;
  className?: string;
}

/**
 * Endless horizontal ticker. The children are rendered twice (the second copy is hidden from assistive tech)
 * so the loop is seamless. Pure CSS, so it costs no JavaScript per frame.
 */
export function Marquee({ children, seconds, reverse = false, paused = false, className }: MarqueeProps) {
  return (
    <div
      data-paused={paused}
      className={cn("marquee overflow-hidden", reverse && "marquee-reverse", className)}
      style={{ "--marquee-s": `${seconds}s` } as CSSProperties}
    >
      <div className="marquee-track flex w-max">
        <div className="marquee-copy flex shrink-0">{children}</div>
        <div className="marquee-copy flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
