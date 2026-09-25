import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site/site";
import { BRAND_COLOR } from "@/lib/constants";

/** Web app manifest: lets the site be installed to a home screen with the EIT icon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.acronym,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: BRAND_COLOR,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
