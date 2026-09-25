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
  return departments.flatMap((department) =>
    department.sections.map((section) => ({ department: department.slug, section: section.slug })),
  );
}

export async function generateMetadata(props: PageProps<"/departments/[department]/[section]">): Promise<Metadata> {
  const { department, section } = await props.params;
  return getRouteMetadata(`/departments/${department}/${section}`);
}

export default async function Page(props: PageProps<"/departments/[department]/[section]">) {
  const { department: departmentSlug, section: sectionSlug } = await props.params;
  const path = `/departments/${departmentSlug}/${sectionSlug}`;
  if (!hasRoute(path)) notFound();

  const department = getDepartment(departmentSlug);
  const section = department?.sections.find((entry) => entry.slug === sectionSlug);
  if (!department || !section) notFound();

  const siblingLinks: QuickLink[] = department.sections
    .filter((entry) => entry.slug !== sectionSlug)
    .map((entry) => ({ href: `/departments/${department.slug}/${entry.slug}`, label: entry.title }));

  return (
    <>
      <PageHero
        path={path}
        eyebrow={department.name}
        title={[section.title]}
        description={`${section.title} for the ${department.shortName} department.`}
        secondaryAction={{ label: `Back to ${department.shortName}`, href: `/departments/${department.slug}` }}
      />

      <PageSection name="default" eyebrow={department.shortName} title={["More from this", "department"]}>
        <SectionNote title="This section is being finalised">
          {section.title} for {department.name} will appear here once supplied by the department.
        </SectionNote>
        {siblingLinks.length > 0 && <QuickLinksGrid links={siblingLinks} columns={3} className="mt-10" />}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
