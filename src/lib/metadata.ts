import type { Metadata } from "next";
import { getRoute } from "@/data/site/routes";
import { siteConfig } from "@/data/site/site";

/**
 * Per-route metadata derived from the route registry.
 * Throws for an unregistered path so a typo fails the build instead of shipping a bad title.
 */
export function getRouteMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) {
    throw new Error(`getRouteMetadata: "${path}" is not in the route registry (data/site/routes.ts)`);
  }

  if (path === "/") {
    return { alternates: { canonical: "/" } };
  }

  return {
    title: route.title,
    description: `${route.title} at ${siteConfig.name}, ${siteConfig.city}.`,
    alternates: { canonical: path },
  };
}
