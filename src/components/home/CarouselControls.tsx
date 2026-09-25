"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onTogglePause?: () => void;
  userPaused?: boolean;
  /** Hide the pause button when autoplay does not exist (reduced motion, single slide). */
  timed?: boolean;
  /** "light" for white surfaces, "dark" for navy surfaces. */
  tone?: "light" | "dark";
  /** Noun used in the accessible names, e.g. "story" gives "Previous story". */
  label?: string;
  className?: string;
}

/** Previous / pause / next. The same three buttons on every slideshow. */
export function CarouselControls({
  onPrev,
  onNext,
  onTogglePause,
  userPaused = false,
  timed = true,
  tone = "light",
  label = "slide",
  className,
}: CarouselControlsProps) {
  const style =
    tone === "dark"
      ? "border border-white/40 text-white hover:bg-white/15 hover:text-white"
      : "border border-primary/25 text-primary hover:bg-primary/5";

  return (
    <div role="group" aria-label={`${label} controls`} className={cn("flex items-center gap-2", className)}>
      {timed && onTogglePause && (
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", style)}
          onClick={onTogglePause}
          aria-pressed={userPaused}
          aria-label={userPaused ? `Play ${label}s` : `Pause ${label}s`}
        >
          {userPaused ? <Play aria-hidden /> : <Pause aria-hidden />}
        </Button>
      )}
      <Button variant="ghost" size="icon" className={cn("rounded-full", style)} onClick={onPrev} aria-label={`Previous ${label}`}>
        <ChevronLeft aria-hidden />
      </Button>
      <Button variant="ghost" size="icon" className={cn("rounded-full", style)} onClick={onNext} aria-label={`Next ${label}`}>
        <ChevronRight aria-hidden />
      </Button>
    </div>
  );
}

/** Thin progress line for the current slide, driven by the `--progress` variable set by useCarousel. */
export function SlideProgress({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span aria-hidden className={cn("block h-0.5 overflow-hidden rounded-full", tone === "dark" ? "bg-white/25" : "bg-primary/15", className)}>
      <span
        className="block h-full w-full origin-left bg-eit-accent"
        style={{ transform: "scaleX(var(--progress, 0))" }}
      />
    </span>
  );
}
