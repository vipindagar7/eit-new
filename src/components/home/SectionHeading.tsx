import { BrandMark } from "@/components/layout/BrandMark";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  /** One entry per line. */
  title: string[];
  description?: string;
  /** "dark" for navy sections. */
  tone?: "light" | "dark";
  /** Show the last title line in the muted colour, as in the Programs design. */
  mutedLast?: boolean;
  className?: string;
  as?: "h2" | "h3";
}

/** Eyebrow + large headline + optional intro. Used by every homepage section for a consistent voice. */
export function SectionHeading({ eyebrow, title, description, tone = "light", mutedLast = false, className, as: Tag = "h2" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div data-anim="heading" className={className}>
      <p className={cn("mb-5 flex items-center gap-3 text-sm font-semibold", dark ? "text-white/75" : "text-muted-foreground")}>
        <BrandMark className="size-6" />
        {eyebrow}
        <span aria-hidden className={cn("h-px w-14", dark ? "bg-white/30" : "bg-primary/25")} />
      </p>
      <Tag
        className={cn(
          "text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em]",
          dark ? "text-white" : "text-primary",
        )}
      >
        {title.map((line, index) => (
          <span
            key={line}
            className={cn("block", mutedLast && index === title.length - 1 && (dark ? "text-eit-mist" : "text-muted-foreground"))}
          >
            {line}
          </span>
        ))}
      </Tag>
      {description && (
        <p className={cn("mt-6 max-w-md text-lg leading-relaxed", dark ? "text-white/80" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
}
