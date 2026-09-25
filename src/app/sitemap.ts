import type { MetadataRoute } from "next";
import { allRoutes } from "@/data/site/routes";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: route.path === "/" ? 1 : 0.6,
  }));
}
