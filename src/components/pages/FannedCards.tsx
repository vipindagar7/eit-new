"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SmartImage, initials } from "@/components/home/SmartImage";
import type { ResolvedImage } from "@/types";
import { cn } from "@/lib/utils";

export interface FannedCardItem {
  id: string;
  name: string;
  photo?: ResolvedImage;
  accent?: string;
}

interface FannedCardsProps {
  items: FannedCardItem[];
  className?: string;
}

/**
 * A hand of portrait cards fanned open like pages of a book — the "book type" visual for the
 * About / Alumni / Placements redesign. Angle, overlap and lift are all computed from the item
 * count (never a hardcoded per-index array), so any number of people fans out correctly. Purely
 * decorative and duplicative of the accessible list already on the page: names are screen-reader
 * text only here, the full names/roles/bios live in the grid below.
 */
export function FannedCards({ items, className }: FannedCardsProps) {
  const reduce = useReducedMotion();
  const n = items.length;
  if (n === 0) return null;

  const center = (n - 1) / 2;
  const step = n > 1 ? Math.min(11, 62 / (n - 1)) : 0; // degrees between neighbouring cards
  const overlapPct = n > 6 ? 60 : n > 3 ? 52 : 38; // how much of the previous card's width the next one covers

  return (
    <div className={cn("flex justify-center overflow-x-auto px-6 py-8 [scrollbar-width:none] sm:overflow-visible", className)}>
      <div className="flex">
        {items.map((item, index) => {
          const offset = index - center;
          const angle = reduce ? 0 : offset * step;
          const lift = reduce ? 0 : Math.abs(offset / Math.max(center, 1)) * 26;

          return (
            <motion.div
              key={item.id}
              className="relative w-36 shrink-0 sm:w-44 lg:w-48"
              style={{ marginLeft: index === 0 ? 0 : `-${overlapPct}%`, zIndex: 100 - Math.round(Math.abs(offset) * 10), transformOrigin: "50% 100%" }}
              initial={{ rotate: 0, y: 44, opacity: 0 }}
              whileInView={{ rotate: angle, y: lift, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              whileHover={{ rotate: 0, y: lift - 30, zIndex: 200 }}
              whileFocus={{ rotate: 0, y: lift - 30, zIndex: 200 }}
              transition={{ duration: reduce ? 0.01 : 0.75, delay: reduce ? 0 : 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
              tabIndex={0}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[3px] border-white shadow-[0_18px_34px_-14px_rgba(23,50,77,0.45)] [container-type:inline-size]">
                <SmartImage image={item.photo} accent={item.accent ?? "#CFE7EC"} label={initials(item.name)} sizes="192px" />
              </div>
              <span className="sr-only">{item.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}