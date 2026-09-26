import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getCommittee, getDocumentsByCategory } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";
import { DocumentList } from "@/components/pages/DocumentList";

const path = "/about/nba-naac-policy";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const committee = getCommittee("nba-naac");
  const approvalDocuments = getDocumentsByCategory("approvals").filter((document) => document.id.includes("nba"));
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Quality assurance"
        title={["NBA and NAAC", "Policy"]}
        description="The institute's accreditation policy and committee for NBA and NAAC processes."
        tone="sage"
      />

      <PageSection name="default" eyebrow="Accreditation" title={["Policy", "overview"]}>
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
          <SectionNote title="The NBA/NAAC policy is being finalised" className="mt-8">
            The committee&apos;s charter and members will appear here once supplied by the institute.
          </SectionNote>
        )}
      </PageSection>

      {approvalDocuments.length > 0 && (
        <PageSection name="default" bg="surface" eyebrow="Documents" title={["Accreditation", "letters"]}>
          <DocumentList documents={approvalDocuments} />
        </PageSection>
      )}

      <PageSection name="default" eyebrow="More" title={["Explore", "About EIT"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
