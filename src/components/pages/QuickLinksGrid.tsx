import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickLink {
  href: string;
  label: string;
  description?: string;
}

interface QuickLinksGridProps {
  links: QuickLink[];
  /** Card columns at the widest breakpoint. */
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** A grid of link cards to related pages — used to keep every route reachable even before it has its own content. */
export function QuickLinksGrid({ links, columns = 3, className }: QuickLinksGridProps) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("grid gap-4", columnClasses[columns], className)}>
      {links.map((link) => (
        <li key={link.href} data-anim="card">
          <Link
            href={link.href}
            className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-primary/10 bg-white p-6 transition-colors hover:border-primary/25 hover:bg-eit-surface"
          >
            <div>
              <p className="text-lg font-semibold text-primary">{link.label}</p>
              {link.description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{link.description}</p>}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
