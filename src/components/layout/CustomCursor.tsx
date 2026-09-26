"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CursorState {
  hover: boolean;
  label: string;
  down: boolean;
  hidden: boolean;
}

const INTERACTIVE = "[data-cursor], a, button, [role='button'], summary, label";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

/**
 * EIT cursor for mouse users: a small dot that follows the pointer exactly, and a ring that trails it.
 * The ring grows over links and buttons, and shows a word ("Drag", "View") over anything marked `data-cursor="Word"`.
 * Purely decorative: it never captures the pointer, is hidden over text fields (which keep the normal I-beam),
 * and does not exist on touch screens or for visitors who ask for reduced motion.
 *
 * Visibility: earlier this used `mix-blend-mode: difference` to auto-invert against whatever sits behind it.
 * That only works when nothing between the cursor and the page root starts its own stacking context or
 * compositing layer — but GSAP's scroll transforms on every section, Framer Motion's transformed elements and
 * the navbar's `backdrop-blur` all do exactly that, so the cursor silently vanished on most of the site. It now
 * uses a fixed accent colour with a white-then-navy halo instead, which stays visible against any background —
 * light, dark or photographic — without depending on blend compositing.
 */
export function CustomCursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });
  const [state, setState] = useState<CursorState>({ hover: false, label: "", down: false, hidden: true });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor-on");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setState((current) => (current.hidden ? { ...current, hidden: false } : current));
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      const inField = event.target.closest(TEXT_FIELDS) !== null;
      const target = event.target.closest<HTMLElement>(INTERACTIVE);
      setState((current) => ({
        ...current,
        hidden: inField,
        hover: target !== null,
        label: target?.dataset.cursor ?? "",
      }));
    };
    const onDown = () => setState((current) => ({ ...current, down: true }));
    const onUp = () => setState((current) => ({ ...current, down: false }));
    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) setState((current) => ({ ...current, hidden: true }));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseout", onLeave);

    return () => {
      root.classList.remove("custom-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labelled = state.label !== "";
  const scale = state.down ? 0.8 : labelled ? 2.1 : state.hover ? 1.6 : 1;

  // A white ring just outside a navy one reads on light and dark surfaces alike, and against a
  // photograph the pair still frames the shape instead of dissolving into a single mid-tone.
  const halo = "0 0 0 1.5px rgba(255,255,255,0.95), 0 0 0 3px rgba(23,50,77,0.45), 0 2px 10px rgba(23,50,77,0.35)";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-mt-5 -ml-5 grid size-10 place-items-center rounded-full border-[1.5px] border-white"
          initial={false}
          animate={{
            scale,
            opacity: state.hidden ? 0 : 1,
            backgroundColor: labelled ? "rgba(82, 188, 189, 0.95)" : state.hover ? "rgba(82, 188, 189, 0.3)" : "rgba(23, 50, 77, 0.08)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{ boxShadow: halo }}
        >
          {labelled && <span className="text-[0.5rem] leading-none font-bold text-primary">{state.label}</span>}
        </motion.div>
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.span
          className="-mt-[4px] -ml-[4px] block size-2 rounded-full bg-eit-accent"
          initial={false}
          animate={{ opacity: state.hidden || labelled ? 0 : 1, scale: state.hover ? 0.4 : 1 }}
          style={{ boxShadow: "0 0 0 1.5px rgba(255,255,255,0.95), 0 1px 4px rgba(23,50,77,0.4)" }}
        />
      </motion.div>
    </div>
  );
}
