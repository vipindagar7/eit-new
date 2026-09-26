import { FileText } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getMandatoryDisclosure } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/mandatory-disclosure";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const items = getMandatoryDisclosure();
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Governance"
        title={["Mandatory", "Disclosure"]}
        description="Statutory information Echelon Institute of Technology is required to disclose publicly."
        tone="blush"
      />

      <PageSection name="default" eyebrow="Disclosure" title={["Required", "information"]}>
        {items.length > 0 ? (
          <ul className="divide-y divide-primary/10 border-y border-primary/10">
            {items.map((item) => (
              <li key={item.id} data-anim="row" className="flex items-center gap-4 py-5">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-eit-mist text-primary">
                  <FileText aria-hidden className="size-5" />
                </span>
                {item.href ? (
                  <a href={item.href} className="text-base font-semibold text-primary underline decoration-eit-accent decoration-2 underline-offset-4">
                    {item.title}
                  </a>
                ) : (
                  <span className="text-base font-semibold text-primary">{item.title}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Mandatory disclosure items are being compiled">
            The AICTE-required disclosure list will appear here once compiled by the institute. In the meantime,
            see the institute&apos;s approvals and affiliations below.
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
