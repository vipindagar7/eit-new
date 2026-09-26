import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { DocumentList } from "@/components/pages/DocumentList";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { getRoutesInGroup } from "@/data/site/routes";
import { getApprovals, getDocumentsByCategory } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/about/approvals";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const approvals = getApprovals();
  const approvalDocuments = getDocumentsByCategory("approvals");
  const links: QuickLink[] = getRoutesInGroup("about", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Governance"
        title={["Approvals and", "Affiliations"]}
        description="The statutory approvals and affiliations held by Echelon Institute of Technology."
        tone="peach"
      />

      {approvals.length > 0 && (
        <PageSection name="default" eyebrow="Approvals" title={["Approving", "authorities"]}>
          <ul className="grid gap-5 sm:grid-cols-2">
            {approvals.map((approval) => (
              <li key={approval.id} data-anim="card" className="rounded-2xl border border-primary/10 bg-white p-6">
                <p className="text-base font-semibold text-primary">{approval.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{approval.authority}</p>
                {approval.academicYear && <p className="mt-1 text-xs text-muted-foreground">{approval.academicYear}</p>}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      <PageSection name="default" bg="surface" eyebrow="Documents" title={["Approval and", "affiliation letters"]}>
        {approvalDocuments.length > 0 ? (
          <DocumentList documents={approvalDocuments} />
        ) : (
          <SectionNote title="Approval letters are being uploaded">
            Scanned copies of AICTE, IPU and NBA approval and affiliation letters will appear here once uploaded.
          </SectionNote>
        )}
      </PageSection>

      <PageSection name="default" eyebrow="More" title={["Explore", "About EIT"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
