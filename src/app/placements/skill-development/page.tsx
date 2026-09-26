import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getPlacementActivities } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/skill-development";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const programs = getPlacementActivities("skill-development");
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Skill", "Development"]} description="Training programs that prepare students for placement drives and the workplace." tone="mist" />

      <PageSection name="default">
        {programs.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {programs.map((program) => (
              <li key={program.id} data-anim="card" className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
                {program.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden [container-type:inline-size]">
                    <SmartImage image={program.images[0]} accent="#CFE7EC" sizes="(min-width: 1024px) 45vw, 90vw" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-base font-semibold text-primary">{program.title}</p>
                  {program.date && <p className="mt-1 text-xs text-muted-foreground">{program.date}</p>}
                  {program.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{program.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Skill development programs are being compiled">
            Details of skill-development and training programs will appear here once compiled.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "placements"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
