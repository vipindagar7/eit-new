"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseCarouselOptions {
  /** Number of slides. Fewer than 2 disables autoplay. */
  count: number;
  /** Time each slide stays, in milliseconds. Comes from the section's data file. */
  intervalMs: number;
  /** Start index. */
  initial?: number;
}

export interface CarouselState<T extends HTMLElement> {
  index: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  /** The visitor pressed pause. */
  userPaused: boolean;
  togglePause: () => void;
  /** Autoplay exists at all (2 or more slides). With reduced motion the slides change instantly, without movement. */
  timed: boolean;
  /** Autoplay is actually counting: not paused, not hovered/focused, and on screen. */
  running: boolean;
  /**
   * Attach to the section element. The hook writes `--progress` (0 → 1, per slide) on it every frame,
   * so any descendant can draw a progress bar with `transform: scaleX(var(--progress))` at no React cost.
   */
  rootRef: RefObject<T | null>;
  /**
   * Spread on the same element. Autoplay pauses while KEYBOARD focus is inside (so someone tabbing through the
   * controls is not interrupted). Hovering with a mouse or clicking a control does not stop it; the pause
   * button does.
   */
  bind: {
    onFocusCapture: (event: React.FocusEvent) => void;
    onBlurCapture: (event: React.FocusEvent) => void;
  };
}

/**
 * Shared behaviour for every slideshow on the site: autoplay on a defined interval, manual controls,
 * pause on keyboard focus / when scrolled out of view, and a pause button.
 * The clock only advances while running, so pausing and resuming continue from where they stopped.
 */
export function useCarousel<T extends HTMLElement = HTMLElement>({
  count,
  intervalMs,
  initial = 0,
}: UseCarouselOptions): CarouselState<T> {
  const [index, setIndex] = useState(initial);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<T>(null);
  const elapsed = useRef(0);

  const timed = count > 1;
  const running = timed && !userPaused && !interacting && inView;

  const reset = () => {
    elapsed.current = 0;
    rootRef.current?.style.setProperty("--progress", "0");
  };

  const goTo = (target: number) => {
    reset();
    setIndex(((target % count) + count) % count);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const progress = Math.min(1, elapsed.current / intervalMs);
      rootRef.current?.style.setProperty("--progress", progress.toFixed(4));

      if (progress >= 1) {
        elapsed.current = 0;
        rootRef.current?.style.setProperty("--progress", "0");
        setIndex((value) => (value + 1) % count);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, intervalMs, count]);

  return {
    index,
    goTo,
    next: () => goTo(index + 1),
    prev: () => goTo(index - 1),
    userPaused,
    togglePause: () => setUserPaused((value) => !value),
    timed,
    running,
    rootRef,
    bind: {
      onFocusCapture: (event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setInteracting(true);
      },
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      },
    },
  };
}
