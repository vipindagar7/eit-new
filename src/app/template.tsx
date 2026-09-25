"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * A subtle "book page" turn on every route change: the incoming page rotates in a few degrees
 * around its left edge and settles flat, like a page turning over. `template.tsx` (unlike
 * `layout.tsx`) remounts on every navigation, so this runs once per route while the header, footer
 * and custom cursor in the root layout stay put. Entrance-only — there is no exit animation and
 * nothing waits on it, so navigation never feels delayed. Skipped entirely for reduced motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, rotateY: -7, x: 26 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1400, transformOrigin: "0% 50%" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}