"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";
import { Search, X } from "lucide-react";
import { allRoutes } from "@/data/site/routes";
import { searchSuggestions } from "@/data/site/navigation";
import { duration, easing } from "@/lib/animations";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Moves focus back to whatever opened the dialog. */
  onCloseFocus: () => void;
}

const MAX_RESULTS = 8;

/** Searches page titles from the route registry. No external service needed. */
export function SearchDialog({ open, onOpenChange, onCloseFocus }: SearchDialogProps) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return allRoutes
      .filter((route) => route.path !== "/")
      .filter((route) => {
        const haystack = `${route.title} ${route.path.replace(/[/-]/g, " ")}`.toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
      .slice(0, MAX_RESULTS)
      .map((route) => ({ href: route.path, label: route.title }));
  }, [query]);

  const shown = query.trim() ? results : searchSuggestions;
  const close = () => onOpenChange(false);

  const moveFocus = (event: React.KeyboardEvent, direction: 1 | -1) => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    const all = [inputRef.current, ...items].filter(Boolean) as HTMLElement[];
    const index = all.indexOf(document.activeElement as HTMLElement);
    const next = all[Math.min(Math.max(index + direction, 0), all.length - 1)];
    if (next) {
      event.preventDefault();
      next.focus();
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setQuery("");
        onOpenChange(next);
      }}
    >
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
                onCloseFocus();
              }}
            >
              <motion.div
                className="fixed inset-x-0 top-[10vh] z-[61] mx-auto w-[min(40rem,92vw)] overflow-hidden rounded-2xl border border-white/50 bg-white/95 text-primary shadow-[0_30px_60px_-30px_rgba(23,50,77,0.6)] backdrop-blur-xl"
                initial={{ opacity: 0, y: reduce ? 0 : -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: reduce ? 0 : duration.base, ease: easing.out }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") moveFocus(event, 1);
                  if (event.key === "ArrowUp") moveFocus(event, -1);
                }}
              >
                <Dialog.Title className="sr-only">Search the site</Dialog.Title>

                <form
                  role="search"
                  className="flex items-center gap-3 border-b px-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const first = shown[0];
                    if (first) {
                      router.push(first.href);
                      close();
                    }
                  }}
                >
                  <Search aria-hidden className="size-5 shrink-0 text-muted-foreground" />
                  <label htmlFor="site-search" className="sr-only">
                    Search pages
                  </label>
                  <input
                    id="site-search"
                    ref={inputRef}
                    type="search"
                    autoComplete="off"
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search programs, admissions, placements…"
                    className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
                  />
                  <Dialog.Close
                    aria-label="Close search"
                    className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  >
                    <X aria-hidden className="size-5" />
                  </Dialog.Close>
                </form>

                <div className="max-h-[55vh] overflow-y-auto p-2" aria-live="polite">
                  {!query.trim() && <p className="px-3 pt-2 pb-1 text-sm font-semibold text-muted-foreground">Popular pages</p>}
                  {shown.length === 0 ? (
                    <p className="px-3 py-6 text-sm text-muted-foreground">No pages match &ldquo;{query.trim()}&rdquo;.</p>
                  ) : (
                    <ul ref={listRef}>
                      {shown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium hover:bg-eit-mist/50"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
