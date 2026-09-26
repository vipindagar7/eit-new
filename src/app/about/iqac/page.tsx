import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getCommittee } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/iqac";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const committee = getCommittee("iqac");
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Quality assurance"
        title={["Internal Quality", "Assurance Cell"]}
        description="The IQAC drives the institute's continuous quality-improvement processes."
        tone="mist"
      />

      <PageSection name="default" eyebrow="IQAC" title={["Cell", "overview"]}>
        {committee?.description && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{committee.description}</p>}
        {committee && committee.members.length > 0 ? (
          <ul className="mt-8 divide-y divide-primary/10 border-y border-primary/10">
            {committee.members.map((member, index) => (
              <li key={index} data-anim="row" className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-primary">{member.name}</p>
                  {member.designation && <p className="text-sm text-muted-foreground">{member.designation}</p>}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{member.role}</p>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="IQAC composition is being finalised" className="mt-8">
            The cell&apos;s charter and member list will appear here once supplied by the institute.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Explore", "About EIT"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
