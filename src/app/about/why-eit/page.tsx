import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { whyEitPoints, whyEitSection } from "@/data/home/whyEit";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/why-eit";

export const metadata = getRouteMetadata(path);

export default function Page() {
  return (
    <>
      <PageHero
        path={path}
        eyebrow={whyEitSection.eyebrow}
        title={whyEitSection.title}
        description={whyEitSection.description}
        tone="sage"
      />

      <PageSection name="default">
        <ol className="divide-y divide-primary/10 border-y border-primary/10">
          {whyEitPoints.map((point, index) => (
            <li key={point.id} data-anim="row" className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-8">
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full text-lg font-bold text-primary" style={{ backgroundColor: point.accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-xl font-semibold text-primary">{point.title}</p>
                <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-muted-foreground">{point.body}</p>
              </div>
              <Link href={point.href} className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
                Read more
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ol>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
