import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { centresSection } from "@/data/home/centres";
import { getCentres } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/centres";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const centres = getCentres();

  return (
    <>
      <PageHero path={path} eyebrow={centresSection.eyebrow} title={centresSection.title} description={centresSection.description} tone="sage" />

      <PageSection name="default">
        {centres.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {centres.map((centre) => (
              <li key={centre.id} data-anim="card" className="group overflow-hidden rounded-2xl border border-primary/10 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden [container-type:inline-size]">
                  <SmartImage image={centre.image} accent={centre.accent} label={centre.name.slice(0, 2).toUpperCase()} sizes="(min-width: 1024px) 30vw, 90vw" />
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold text-primary">{centre.name}</p>
                  {(centre.description ?? centre.summary) && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{centre.description ?? centre.summary}</p>
                  )}
                  {centre.href && (
                    <Link href={centre.href} className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore this centre
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Centres are being added">
            Details for each Centre of Excellence will appear here once supplied.
          </SectionNote>
        )}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
