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

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-mt-5 -ml-5 grid size-10 place-items-center rounded-full border-[1.5px]"
          initial={false}
          animate={{
            scale,
            opacity: state.hidden ? 0 : 1,
            backgroundColor: labelled ? "rgba(82, 188, 189, 0.95)" : state.hover ? "rgba(82, 188, 189, 0.22)" : "rgba(255, 255, 255, 0)",
            borderColor: labelled ? "rgba(82, 188, 189, 1)" : "rgba(255, 255, 255, 0.95)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{ mixBlendMode: labelled ? "normal" : "difference" }}
        >
          {labelled && <span className="text-[0.5rem] leading-none font-bold text-primary">{state.label}</span>}
        </motion.div>
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.span
          className="-mt-[3px] -ml-[3px] block size-1.5 rounded-full bg-white"
          initial={false}
          animate={{ opacity: state.hidden || labelled ? 0 : 1, scale: state.hover ? 0.4 : 1 }}
          style={{ mixBlendMode: "difference" }}
        />
      </motion.div>
    </div>
  );
}
