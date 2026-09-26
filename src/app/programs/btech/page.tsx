import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { programIcons } from "@/components/home/program-icons";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { btech } from "@/data/programs/btech";
import { programLevelLabel, programs } from "@/data/programs/programs";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPrograms } from "@/lib/assets";
import { getProgramDetail } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/programs/btech";
const slug = "btech" as const;

export const metadata = getRouteMetadata(path);

export default function Page() {
  const base = programs.find((program) => program.slug === slug)!;
  const detail = getProgramDetail(slug, btech);
  const resolved = getPrograms().find((program) => program.slug === slug);
  const links: QuickLink[] = getRoutesInGroup("programs", [path]).map((route) => ({ href: route.path, label: route.title }));
  const Icon = programIcons[base.icon];

  const hasDetail = Boolean(detail?.duration || detail?.eligibility?.length || detail?.specialisations?.length || detail?.careerPaths?.length);

  return (
    <>
      <PageHero
        path={path}
        eyebrow={base.category}
        title={base.fullName.split(" of ")}
        description={base.tagline}
        primaryAction={{ label: "Admissions", href: "/admissions" }}
        secondaryAction={{ label: "Explore Departments", href: "/departments" }}
        tone="peach"
      />

      <PageSection name="default">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl [container-type:inline-size]">
            <SmartImage
              image={resolved?.image ? { src: resolved.image.src, alt: resolved.image.alt, ready: resolved.imageReady } : undefined}
              accent={base.accent}
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
          <div>
            <span aria-hidden className="grid size-12 place-items-center rounded-full bg-eit-mist text-primary">
              <Icon aria-hidden className="size-5" />
            </span>
            <p className="mt-5 text-xs font-bold tracking-[0.12em] text-eit-slate uppercase">{programLevelLabel[base.level]}</p>
            <p className="mt-1.5 text-2xl font-semibold text-primary">{base.fullName}</p>
            {detail?.summary && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{detail.summary}</p>}
          </div>
        </div>

        {hasDetail ? (
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {detail?.duration && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Duration</p>
                <p className="mt-1 text-base text-primary">{detail.duration}</p>
              </div>
            )}
            {detail?.eligibility && detail.eligibility.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Eligibility</p>
                <ul className="mt-1 space-y-1 text-base text-primary">
                  {detail.eligibility.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {detail?.specialisations && detail.specialisations.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Specialisations</p>
                <ul className="mt-1 space-y-1 text-base text-primary">
                  {detail.specialisations.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {detail?.careerPaths && detail.careerPaths.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Career paths</p>
                <ul className="mt-1 space-y-1 text-base text-primary">
                  {detail.careerPaths.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <SectionNote title="Full program details are being finalised" className="mt-14">
            Duration, eligibility, specialisations and career paths will appear here once supplied by the institute.
            Meanwhile, see the relevant department below or get in touch with Admissions.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "programs"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <PageSection name="cta" bg="navy">
        <div data-anim="cta-buttons" className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-2xl font-extrabold tracking-[-0.03em]">Ready to apply to {base.name}?</p>
          <Link href="/admissions" className="group inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-eit-mist">
            Go to Admissions
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
