import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlueprintTexture } from "@/components/decor/BlueprintTexture";
import type { CallToAction } from "@/types";
import { cn } from "@/lib/utils";

const tones = {
  mist: "from-eit-mist/50",
  sage: "from-eit-sage/50",
  peach: "from-eit-peach/40",
  lilac: "from-eit-lilac/35",
  blush: "from-eit-blush/40",
  sand: "from-eit-sand/45",
  butter: "from-eit-butter/40",
  rose: "from-eit-rose/35",
} as const;

interface PageHeroProps {
  /** Registered route path, e.g. "/about". Drives the breadcrumb trail. */
  path: string;
  eyebrow: string;
  /** One entry per line. */
  title: string[];
  description?: string;
  primaryAction?: CallToAction;
  secondaryAction?: CallToAction;
  tone?: keyof typeof tones;
  children?: ReactNode;
}

/**
 * The banner every inner page opens with: breadcrumbs, eyebrow, a large reveal headline and optional CTAs.
 * It animates in on mount (it is visible immediately, so there is nothing to scroll-trigger) and deliberately
 * carries no `data-scroll-section`, so the first real section's rounded card visibly slides up over it.
 */
export function PageHero({ path, eyebrow, title, description, primaryAction, secondaryAction, tone = "mist", children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-eit-parchment via-eit-parchment to-eit-surface pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pb-32">
      <BlueprintTexture variant="hero" />
      <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b to-transparent", tones[tone])} />
      <Container className="relative">
        <FadeIn standalone y={10}>
          <Breadcrumbs path={path} />
        </FadeIn>

        <div className="mt-10 max-w-3xl sm:mt-14">
          <FadeIn standalone delay={0.05}>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <BrandMark className="size-6" />
              {eyebrow}
              <span aria-hidden className="h-px w-14 bg-primary/25" />
            </p>
          </FadeIn>

          <h1 className="text-[clamp(2.75rem,6.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-primary">
            <TextReveal lines={title} standalone delay={0.12} />
          </h1>

          {description && (
            <FadeIn standalone delay={0.32}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
            </FadeIn>
          )}

          {(primaryAction || secondaryAction) && (
            <FadeIn standalone delay={0.42} className="mt-9 flex flex-wrap items-center gap-6">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-[0.9375rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {primaryAction.label}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              )}
              {secondaryAction && (
                <Link href={secondaryAction.href} className="text-[0.9375rem] font-semibold text-primary underline decoration-eit-accent decoration-2 underline-offset-4">
                  {secondaryAction.label}
                </Link>
              )}
            </FadeIn>
          )}

          {children && (
            <FadeIn standalone delay={0.5} className="mt-10">
              {children}
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  );
}