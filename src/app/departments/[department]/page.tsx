import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid, type QuickLink } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { getDepartment, departments } from "@/data/departments/departments";
import { hasRoute } from "@/data/site/routes";
import { getRouteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map((department) => ({ department: department.slug }));
}

export async function generateMetadata(props: PageProps<"/departments/[department]">): Promise<Metadata> {
  const { department } = await props.params;
  return getRouteMetadata(`/departments/${department}`);
}

export default async function Page(props: PageProps<"/departments/[department]">) {
  const { department: slug } = await props.params;
  const path = `/departments/${slug}`;
  if (!hasRoute(path)) notFound();

  const department = getDepartment(slug);
  if (!department) notFound();

  const sectionLinks: QuickLink[] = department.sections.map((section) => ({
    href: `${path}/${section.slug}`,
    label: section.title,
  }));

  if (department.journalPapersLegacyPath) {
    sectionLinks.push({ href: `/research/journal-papers/${department.slug}`, label: "Journal Papers" });
  }

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Departments"
        title={[department.name]}
        description={`Faculty, laboratories and academic resources for the ${department.shortName} department.`}
      />

      <PageSection name="default" eyebrow={department.shortName} title={["Department", "resources"]}>
        <SectionNote title="Department content is being finalised">
          The {department.name} department&apos;s overview, faculty profiles and lab details will appear here once
          supplied by the department. Use the links below to browse what is available.
        </SectionNote>
        <QuickLinksGrid links={sectionLinks} columns={3} className="mt-10" />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
