import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getRoute } from "@/data/site/routes";

/** Builds the trail from the route registry, so labels always match the navigation. */
export function Breadcrumbs({ path }: { path: string }) {
  if (path === "/") return null;

  const segments = path.split("/").filter(Boolean);
  const trail = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return { href, label: getRoute(href)?.title ?? segment };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="underline-offset-4 hover:text-foreground hover:underline">
            Home
          </Link>
        </li>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight aria-hidden className="size-3.5 shrink-0" />
              {isLast ? (
                <span aria-current="page" className="font-semibold text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="underline-offset-4 hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
