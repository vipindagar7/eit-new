import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage, initials } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getGoverningBody } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/governing-body";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const members = getGoverningBody();
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero path={path} eyebrow="Governance" title={["Governing", "Body"]} description="The Governing Body overseeing Echelon Institute of Technology." tone="lilac" />

      <PageSection name="default" eyebrow="Governance" title={["Governing body", "members"]}>
        {members.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <li key={member.id} data-anim="card" className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-6">
                <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-full [container-type:inline-size]">
                  <SmartImage image={member.photo} accent="#C8A5C9" label={initials(member.name)} sizes="56px" />
                </div>
                <div>
                  <p className="text-base font-semibold text-primary">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {member.organisation && <p className="text-xs text-muted-foreground">{member.organisation}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="The Governing Body list is being finalised">
            Names and roles of the Governing Body members will appear here once supplied by the institute.
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
