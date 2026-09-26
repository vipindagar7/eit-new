import type { ReactNode } from "react";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { BlueprintTexture } from "@/components/decor/BlueprintTexture";
import { cn } from "@/lib/utils";

const backgrounds = {
  white: "bg-white text-primary",
  surface: "bg-eit-surface text-primary",
  mist: "bg-[#EDF6F1] text-primary",
  sage: "bg-[#F1F5EC] text-primary",
  navy: "bg-primary text-white",
  /** The warm sand wash with a faint architectural sketch layer — used for the deeper "featured" sections. */
  parchment: "bg-eit-parchment text-primary",
} as const;

interface PageSectionProps {
  /** Unique name within the page: drives the ScrollAnimator preset lookup (falls back to "default") and the section-card CSS. */
  name: string;
  bg?: keyof typeof backgrounds;
  eyebrow?: string;
  /** One entry per line. */
  title?: string[];
  description?: string;
  /** Extra content next to the heading (e.g. an action link). */
  aside?: ReactNode;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/**
 * The "card" every inner-page section is built from: it overlaps the section above it (see the
 * `[data-scroll-section]` rule in globals.css) and picks up scroll-in motion from ScrollAnimator's
 * "default" preset automatically, via the shared `data-anim` vocabulary.
 */
export function PageSection({ name, bg = "white", eyebrow, title, description, aside, className, containerClassName, children }: PageSectionProps) {
  const dark = bg === "navy";
  return (
    <section data-scroll-section={name} className={cn("relative overflow-x-clip py-16 lg:py-24", backgrounds[bg], className)}>
      {bg === "parchment" && <BlueprintTexture variant="panel" />}
      <Container className={cn("relative", containerClassName)}>
        {(eyebrow || title) && (
          <div className={cn("flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between", (children || aside) && "mb-12 lg:mb-16")}>
            <SectionHeading eyebrow={eyebrow ?? ""} title={title ?? []} description={description} tone={dark ? "dark" : "light"} className="max-w-2xl" />
            {aside}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
