import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { admissionsCta } from "@/data/home/admissions";
import { getRoutesInGroup } from "@/data/site/routes";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/admissions";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const links: QuickLink[] = getRoutesInGroup("admissions", [path]).map((route) => ({ href: route.path, label: route.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow={admissionsCta.eyebrow}
        title={admissionsCta.title}
        description={admissionsCta.description}
        primaryAction={admissionsCta.primaryAction}
        secondaryAction={admissionsCta.secondaryAction}
        tone="mist"
      />

      <PageSection name="default" eyebrow="Admissions" title={["Everything you", "need to apply"]}>
        <QuickLinksGrid links={links} columns={3} />
      </PageSection>

      <PageSection name="default" bg="surface">
        <p data-anim="row" className="text-base text-muted-foreground">
          Have a question the pages above don&apos;t answer?{" "}
          <a href="/contact" className="font-semibold text-primary underline decoration-eit-accent decoration-2 underline-offset-4">
            {admissionsCta.contactAction.label}
          </a>
          .
        </p>
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
