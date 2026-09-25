import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { departments } from "@/data/departments/departments";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/departments";

export const metadata = getRouteMetadata(path);

const departmentLinks: QuickLink[] = departments.map((department) => {
  const sectionTitles = department.sections.slice(0, 3).map((section) => section.title);
  const more = department.sections.length - sectionTitles.length;
  return {
    href: `/departments/${department.slug}`,
    label: department.name,
    description: sectionTitles.length > 0 ? `${sectionTitles.join(" · ")}${more > 0 ? ` +${more} more` : ""}` : department.shortName,
  };
});

export default function Page() {
  return (
    <>
      <PageHero
        path={path}
        eyebrow="Academics"
        title={["Seven departments,", "one campus"]}
        description="Engineering, computer applications, management and applied sciences — each department keeps its own faculty, laboratories and academic resources."
      />

      <PageSection name="default">
        <QuickLinksGrid links={departmentLinks} columns={3} />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
