import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/button";
import type { AboutContent as AboutContentData } from "@/data/home/about";
import { cn } from "@/lib/utils";

/** Heading, copy and actions. Every piece carries `data-about-item` so the scroll timeline can stagger it in. */
export function AboutContent({ content, className }: { content: AboutContentData; className?: string }) {
  return (
    <div className={cn("text-primary", className)}>
      <p data-about-item className="mb-5 flex items-center gap-3 text-sm font-semibold text-muted-foreground sm:text-base">
        <BrandMark className="size-6" />
        {content.eyebrow}
      </p>

      <h2
        data-about-item
        className="text-[clamp(2rem,3.7vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em]"
      >
        {content.title.split("\n").map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p data-about-item className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
        {content.description}
      </p>

      {(content.primaryAction || content.secondaryAction) && (
        <div data-about-item className="mt-8 flex flex-wrap items-center gap-3">
          {content.primaryAction && (
            <Button asChild size="lg" className="rounded-full">
              <Link href={content.primaryAction.href}>
                {content.primaryAction.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          )}
          {content.secondaryAction && (
            <Button asChild size="lg" variant="ghost" className="rounded-full border border-primary/25 hover:bg-primary/5">
              <Link href={content.secondaryAction.href}>{content.secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/** Small frosted card that floats over the split image. */
export function AboutCard({ words, className }: { words: string[]; className?: string }) {
  return (
    <div
      data-about-card
      className={cn(
        "w-40 rounded-2xl border border-white/70 bg-white/80 p-5 text-primary shadow-[0_24px_48px_-24px_rgba(23,50,77,0.45)] backdrop-blur-md",
        className,
      )}
    >
      <ul className="space-y-1 text-lg font-semibold leading-tight">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <span aria-hidden className="mt-4 block h-0.5 w-8 rounded-full bg-eit-accent" />
    </div>
  );
}
