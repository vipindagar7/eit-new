"use client";

import Link from "next/link";
import { useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Dialog } from "radix-ui";
import { ArrowRight, Search, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@/data/site/social";
import type { NavItem, NavLink } from "@/types";
import { duration, easing } from "@/lib/animations";
import type { LogoAssets } from "@/lib/assets";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  cta: NavLink;
  utility: NavLink[];
  logoAssets: LogoAssets;
  social: SocialLink[];
  onSearch: () => void;
  /** Element that receives focus when the drawer closes. */
  returnFocusRef: RefObject<HTMLElement | null>;
}

/**
 * Full site menu. Full-screen on phones, a side panel from `sm` up.
 * Radix Dialog provides focus trapping, Escape, scroll lock and aria-modal;
 * Framer Motion animates the panel, overlay and menu items.
 */
export function MobileNav({ open, onOpenChange, items, cta, utility, logoAssets, social, onSearch, returnFocusRef }: MobileNavProps) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState("");
  const close = () => onOpenChange(false);

  const list: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reduce ? 0 : 0.18, staggerChildren: reduce ? 0 : 0.045 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: reduce ? 0.01 : duration.base, ease: easing.out } },
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : duration.base }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                returnFocusRef.current?.focus();
              }}
            >
              <motion.div
                className="fixed inset-y-0 right-0 z-[61] flex w-full flex-col bg-white/80 text-primary shadow-[-24px_0_48px_-24px_rgba(23,50,77,0.5)] backdrop-blur-2xl backdrop-saturate-150 sm:max-w-md"
                initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
                transition={{ duration: reduce ? 0.01 : 0.45, ease: easing.out }}
              >
                <div className="flex h-(--nav-h) shrink-0 items-center justify-between border-b px-5">
                  <Dialog.Title className="sr-only">Site menu</Dialog.Title>
                  <Logo variant="color" assets={logoAssets} onClick={close} nameClassName="hidden min-[400px]:flex" />
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu" className="hover:bg-primary/5">
                      <X aria-hidden className="size-5" />
                    </Button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Site menu" className="flex-1 overflow-y-auto px-5 pb-6">
                  <motion.ul variants={list} initial="hidden" animate="visible">
                    <motion.li variants={row} className="border-b py-3">
                      <button
                        type="button"
                        onClick={() => {
                          close();
                          onSearch();
                        }}
                        className="flex h-12 w-full items-center gap-3 rounded-xl border bg-white px-4 text-left text-base text-muted-foreground"
                      >
                        <Search aria-hidden className="size-5" />
                        Search the site
                      </button>
                    </motion.li>

                    {items.map((item) => (
                      <motion.li key={item.label} variants={row} className="border-b last:border-b-0">
                        {item.sections ? (
                          <Accordion
                            type="single"
                            collapsible
                            value={expanded}
                            onValueChange={setExpanded}
                          >
                            <AccordionItem value={item.label} className="border-b-0">
                              <AccordionTrigger>{item.label}</AccordionTrigger>
                              <AccordionContent>
                                <Link
                                  href={item.href}
                                  onClick={close}
                                  className="block py-2 text-base font-semibold underline decoration-eit-accent decoration-2 underline-offset-4"
                                >
                                  {item.label} overview
                                </Link>
                                {item.sections.map((section, index) => (
                                  <div key={section.title ?? index} className="mt-4">
                                    {section.title && (
                                      <h3 className="text-sm font-bold text-muted-foreground">{section.title}</h3>
                                    )}
                                    <ul className="mt-1">
                                      {section.links.map((entry) => (
                                        <li key={entry.href}>
                                          <Link href={entry.href} onClick={close} className="block py-2 text-base">
                                            {entry.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <Link href={item.href} onClick={close} className="block py-4 text-lg font-semibold">
                            {item.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.ul
                    variants={list}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
                  >
                    {utility.map((entry) => (
                      <motion.li key={entry.href} variants={row}>
                        <Link href={entry.href} onClick={close} className="underline-offset-4 hover:underline">
                          {entry.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <SocialLinks links={social} variant="row" className="mt-6" />
                </nav>

                <div className="shrink-0 border-t p-5">
                  <Button asChild size="lg" className="w-full rounded-full">
                    <Link href={cta.href} onClick={close}>
                      {cta.label}
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
