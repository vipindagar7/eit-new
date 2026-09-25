import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { journalPaperDepartments } from "@/data/departments/departments";
import { hasRoute } from "@/data/site/routes";
import { getRouteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalPaperDepartments.map((department) => ({ department: department.slug }));
}

export async function generateMetadata(props: PageProps<"/research/journal-papers/[department]">): Promise<Metadata> {
  const { department } = await props.params;
  return getRouteMetadata(`/research/journal-papers/${department}`);
}

export default async function Page(props: PageProps<"/research/journal-papers/[department]">) {
  const { department } = await props.params;
  const path = `/research/journal-papers/${department}`;
  if (!hasRoute(path)) notFound();

  return <ComingSoon path={path} />;
}
