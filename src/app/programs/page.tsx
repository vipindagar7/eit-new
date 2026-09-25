import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { programIcons } from "@/components/home/program-icons";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { programsSection } from "@/data/home/programs";
import { programLevelLabel } from "@/data/programs/programs";
import { getPrograms } from "@/lib/assets";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/programs";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const programs = getPrograms();

  return (
    <>
      <PageHero path={path} eyebrow={programsSection.eyebrow} title={programsSection.title} description={programsSection.description} tone="peach" />

      <PageSection name="default">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = programIcons[program.icon];
            return (
              <li key={program.slug} data-anim="card" className="group overflow-hidden rounded-2xl border border-primary/10 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden [container-type:inline-size]">
                  <SmartImage
                    image={program.image ? { src: program.image.src, alt: program.image.alt, ready: program.imageReady } : undefined}
                    accent={program.accent}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                  />
                  <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-full bg-white/90 text-primary shadow-sm">
                    <Icon aria-hidden className="size-5" />
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-[0.12em] text-eit-slate uppercase">{programLevelLabel[program.level]}</p>
                  <p className="mt-1.5 text-xl font-semibold text-primary">{program.fullName}</p>
                  {program.tagline && <p className="mt-1 text-sm text-muted-foreground italic">{program.tagline}</p>}
                  {program.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{program.summary}</p>}
                  <Link href={`/programs/${program.slug}`} className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Program details
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
