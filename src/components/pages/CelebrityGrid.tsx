"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";
import { ArrowUpRight, X } from "lucide-react";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { easing } from "@/lib/animations";
import type { CelebrityView } from "@/types/sections";

/**
 * Grid version of the homepage's Celebrity Corner stage: every person gets a portrait card, and
 * opening one shows the same full-profile dialog used there. Used by /celebrities and /alumni.
 */
export function CelebrityGrid({ people }: { people: CelebrityView[] }) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  if (people.length === 0) return null;
  const opened = people.find((person) => person.id === openId);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <li key={person.id} data-anim="card">
            <button
              type="button"
              onClick={() => setOpenId(person.id)}
              aria-label={`Open profile of ${person.name}`}
              data-cursor="Open"
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl [container-type:inline-size]"
            >
              <SmartImage image={person.photo} accent={person.accent} label={initials(person.name)} sizes="(min-width: 1024px) 24vw, 45vw" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent transition-opacity group-hover:from-primary/95" />
              <div className="absolute right-3 bottom-3 left-3 text-left text-white">
                {person.category && <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-eit-accent uppercase">{person.category}</p>}
                <p className="mt-1 text-base leading-tight font-semibold">{person.name}</p>
                <p className="mt-0.5 text-xs text-white/80 italic">{person.role}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={opened !== undefined} onOpenChange={(open) => !open && setOpenId(null)}>
        <AnimatePresence>
          {opened && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[60] bg-primary/50 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-x-4 top-1/2 z-[61] mx-auto grid max-h-[88vh] max-w-4xl -translate-y-1/2 overflow-hidden rounded-[2rem] bg-white text-primary shadow-2xl sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.4, ease: easing.out }}
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[26rem] [container-type:inline-size]">
                    <SmartImage image={opened.photo} accent={opened.accent} label={initials(opened.name)} sizes="(min-width: 640px) 420px, 90vw" />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                    {opened.category && <p className="text-xs font-bold tracking-[0.2em] text-eit-slate uppercase">{opened.category}</p>}
                    <Dialog.Title className="text-3xl font-extrabold tracking-tight sm:text-4xl">{opened.name}</Dialog.Title>
                    <p className="text-base font-medium text-eit-slate italic">{opened.role}</p>
                    {opened.bio && <p className="text-base leading-relaxed text-primary/80">{opened.bio}</p>}
                    {opened.href && (
                      <Link href={opened.href} className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-eit-accent decoration-2 underline-offset-4">
                        Read more
                        <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                    )}
                  </div>
                  <Dialog.Close aria-label="Close profile" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-primary shadow hover:bg-white">
                    <X aria-hidden className="size-5" />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
