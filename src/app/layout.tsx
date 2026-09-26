import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageCurlTransition } from "@/components/layout/PageCurlTransition";
import { siteConfig } from "@/data/site/site";
import { ALLOW_INDEXING, BRAND_COLOR, DEFAULT_TITLE, SITE_URL, TITLE_TEMPLATE } from "@/lib/constants";
import { fontSans, fontScript } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  // Placeholder pages must not be indexed. Flip NEXT_PUBLIC_ALLOW_INDEXING at launch.
  robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  width: "device-width",
  initialScale: 1,
};

/*
 * suppressHydrationWarning on <html> and <body>: browser extensions and remote-preview frames add attributes
 * (for example __gcrremoteframetoken) before React loads. That is not an app bug, so React should not warn about it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontScript.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        {/*
         * A fixed, top-1/2-right-2 social "rail" used to live here on every page. It's removed per
         * usability audit #26/#27: as a page-wide fixed element it sat near the scrollbar (risking
         * accidental interaction while scrolling) and, on the homepage specifically, its light glass
         * pill competed with the hero's "Apply Now" CTA for attention right where a first-time visitor's
         * eye lands. The same links are already reachable from the footer and the mobile menu
         * (SocialLinks variant="row"), so nothing is lost — just one redundant, more intrusive copy.
         */}
        <SkipToContent />
        <CustomCursor />
        <PageCurlTransition />
        <SiteHeader />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
