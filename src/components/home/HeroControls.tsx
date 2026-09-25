"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { heroTimeThemes, type HeroSlide } from "@/data/home/hero";
import { cn } from "@/lib/utils";

interface HeroControlsProps {
  slides: HeroSlide[];
  active: number;
  accent: string;
  intervalMs: number;
  /** false = reduced motion or a single slide: no animated progress line. */
  timed: boolean;
  /** Show the pause button (autoplay exists, even if it runs without animation). */
  pauseable: boolean;
  /** false = the visitor paused, or is hovering / focused inside the hero. */
  running: boolean;
  /** Pause button is only meaningful when the carousel is timed. */
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  userPaused: boolean;
}

const pad = (value: number) => String(value).padStart(2, "0");

const roundButton =
  "size-10 rounded-full border border-white/40 text-white hover:bg-white/15 hover:text-white";

/**
 * Slide index (large screens), progress + labels, counter and prev / next / pause.
 * Every control is a real button; ← / → move between slides while focus is inside the bottom bar.
 */
export function HeroControls({
  slides,
  active,
  accent,
  intervalMs,
  timed,
  pauseable,
  running,
  onSelect,
  onPrev,
  onNext,
  onTogglePause,
  userPaused,
}: HeroControlsProps) {
  const total = slides.length;
  if (total < 2) return null;

  return (
    <>
      {/* Left: vertical slide index */}
      <Container className="pointer-events-none absolute inset-x-0 inset-y-0 z-20 hidden lg:block">
        <nav aria-label="Slides" className="pointer-events-auto absolute top-1/2 left-10 -translate-y-1/2">
          <ol className="relative space-y-6 border-l border-white/25 pl-6">
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <li key={slide.id} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 -left-[1.9rem] size-2.5 rounded-full border-2 border-white/60 bg-transparent transition-all",
                      isActive && "scale-125 border-transparent",
                    )}
                    style={isActive ? { backgroundColor: accent } : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                    className={cn(
                      "block text-left transition-opacity",
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                    )}
                  >
                    <span className="block text-sm font-bold tabular-nums text-white">{pad(index + 1)}</span>
                    <span className="block text-sm text-white">{slide.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>

      {/* Bottom: caption, progress, counter and buttons */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <Container className="flex items-end justify-between gap-8 pb-6 sm:pb-8">
          <p className="pointer-events-auto hidden max-w-xs text-sm text-white/80 sm:block">
            {slides[active].caption}
          </p>

          <div
            role="group"
            aria-label="Slideshow controls"
            className="pointer-events-auto w-full sm:w-auto sm:min-w-[24rem] lg:min-w-[30rem]"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                onPrev();
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                onNext();
              }
            }}
          >
            <ol className="flex gap-2 md:gap-3">
              {slides.map((slide, index) => {
                const isActive = index === active;
                const isPast = index < active;
                return (
                  <li key={slide.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => onSelect(index)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Go to slide ${index + 1}: ${heroTimeThemes[slide.timeTheme].name}`}
                      className="group block w-full py-2 text-left"
                    >
                      <span className="block h-0.5 overflow-hidden rounded-full bg-white/30 group-hover:bg-white/45">
                        <span
                          key={isActive ? `active-${active}` : "idle"}
                          className={cn("block h-full w-full", isActive && timed && "hero-progress-fill")}
                          style={{
                            backgroundColor: accent,
                            transform: isPast || (isActive && !timed) ? "scaleX(1)" : isActive ? undefined : "scaleX(0)",
                            transformOrigin: "left center",
                            animationDuration: isActive && timed ? `${intervalMs}ms` : undefined,
                            animationPlayState: running ? "running" : "paused",
                          }}
                          onAnimationEnd={isActive && timed ? onNext : undefined}
                        />
                      </span>
                      <span
                        className={cn(
                          "mt-2 hidden text-xs font-medium text-white md:block",
                          isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100",
                        )}
                      >
                        {heroTimeThemes[slide.timeTheme].name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-1 flex items-center justify-between gap-4 md:mt-3">
              <p aria-hidden className="text-sm font-semibold tabular-nums text-white">
                {pad(active + 1)} <span className="text-white/60">/ {pad(total)}</span>
              </p>
              <div className="flex items-center gap-2">
                {pauseable && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={roundButton}
                    onClick={onTogglePause}
                    aria-pressed={userPaused}
                    aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  >
                    {userPaused ? <Play aria-hidden /> : <Pause aria-hidden />}
                  </Button>
                )}
                <Button variant="ghost" size="icon" className={roundButton} onClick={onPrev} aria-label="Previous slide">
                  <ChevronLeft aria-hidden />
                </Button>
                <Button variant="ghost" size="icon" className={roundButton} onClick={onNext} aria-label="Next slide">
                  <ChevronRight aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
