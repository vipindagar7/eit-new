import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionNoteProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * An honest placeholder for content that has not been supplied yet — used instead of inventing
 * copy, statistics or photographs. Dashed border marks it clearly as provisional.
 */
export function SectionNote({ title, children, className }: SectionNoteProps) {
  return (
    <div data-anim="card" className={cn("rounded-2xl border border-dashed border-primary/25 bg-eit-surface/60 p-8 sm:p-10", className)}>
      <p className="text-lg font-semibold text-primary">{title}</p>
      <div className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
