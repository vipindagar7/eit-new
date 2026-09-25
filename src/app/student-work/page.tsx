import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SmartImage } from "@/components/home/SmartImage";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { SectionNote } from "@/components/pages/SectionNote";
import { studentWorkSection } from "@/data/home/studentWork";
import { getProjects } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/student-work";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const projects = getProjects();

  return (
    <>
      <PageHero path={path} eyebrow={studentWorkSection.eyebrow} title={studentWorkSection.title} description={studentWorkSection.description} tone="butter" />

      <PageSection name="default">
        {projects.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id} data-anim="card" className="group overflow-hidden rounded-2xl border border-primary/10 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden [container-type:inline-size]">
                  <SmartImage image={project.image} accent={project.accent} sizes="(min-width: 1024px) 30vw, 90vw" />
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold text-primary">{project.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.team.join(", ")}
                    {project.year ? ` · ${project.year}` : ""}
                  </p>
                  {project.summary && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>}
                  {project.url && (
                    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      View project
                      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <SectionNote title="Student projects are being added">
            Work from classrooms, labs and clubs will appear here once submitted.
          </SectionNote>
        )}
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
