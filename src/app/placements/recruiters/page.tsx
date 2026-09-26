import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getRecruiters } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/placements/recruiters";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const recruiters = getRecruiters();
  const links: QuickLink[] = getRoutesInGroup("placements", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Placements" title={["Our", "Recruiters"]} description="Companies that have hired from EIT." tone="mist" />

      <PageSection name="default">
        {recruiters.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {recruiters.map((recruiter) => (
              <li key={recruiter.id} data-anim="card" className="grid h-24 place-items-center rounded-2xl border border-primary/10 bg-white px-4 text-center">
                {recruiter.logo?.ready ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={recruiter.logo.src} alt={recruiter.logo.alt} className="max-h-10 w-auto object-contain" loading="lazy" />
                ) : (
                  <span className="text-sm font-semibold text-primary">{recruiter.name}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="The recruiter list is being finalised">
            Logos and names of recruiting companies will appear here once supplied by the placement cell.
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
