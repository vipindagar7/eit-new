import { MapPin, Mail, Phone } from "lucide-react";
import { ScrollAnimator } from "@/components/animations/ScrollAnimator";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { QuickLinksGrid } from "@/components/pages/QuickLinksGrid";
import { SectionNote } from "@/components/pages/SectionNote";
import { siteConfig } from "@/data/site/site";
import { getSocialLinks } from "@/lib/content";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/contact";

export const metadata = getRouteMetadata(path);

export default function Page() {
  const { address, phone, email } = siteConfig.contact;
  const hasContactDetails = Boolean(address || phone || email);
  const social = getSocialLinks();

  const details = [
    address && { icon: MapPin, label: "Address", value: address },
    phone && { icon: Phone, label: "Phone", value: phone, href: `tel:${phone}` },
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
  ].filter((entry): entry is { icon: typeof MapPin; label: string; value: string; href?: string } => Boolean(entry));

  return (
    <>
      <PageHero
        path={path}
        eyebrow="Contact"
        title={["Get in touch", "with EIT"]}
        description="Questions about admissions, placements or anything else on campus — here's how to reach us."
        tone="sand"
      />

      <PageSection name="default">
        {hasContactDetails ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} data-anim="card" className="rounded-2xl border border-primary/10 bg-eit-surface p-6">
                <detail.icon aria-hidden className="size-6 text-eit-accent" />
                <p className="mt-4 text-sm font-semibold text-muted-foreground">{detail.label}</p>
                {detail.href ? (
                  <a href={detail.href} className="mt-1 block text-lg font-semibold text-primary hover:underline">
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-primary">{detail.value}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <SectionNote title="Contact details are being finalised">
            The institute&apos;s address, phone number and email will appear here once confirmed. In the meantime,
            reach out through the pages below.
          </SectionNote>
        )}

        {social.length > 0 && (
          <div data-anim="row" className="mt-10">
            <p className="mb-4 text-sm font-semibold text-muted-foreground">Follow EIT</p>
            <SocialLinks links={social} variant="row" />
          </div>
        )}
      </PageSection>

      <PageSection name="default" bg="surface" eyebrow="More" title={["Who to", "reach out to"]}>
        <QuickLinksGrid
          links={[
            { href: "/admissions", label: "Admissions enquiries", description: "Programs, eligibility, fees and the application process." },
            { href: "/placements/message-hod-tp", label: "Placement cell", description: "Message from the HoD and Training & Placement team." },
            { href: "/about/grievance-redressal", label: "Grievance Redressal", description: "Raise a concern with the grievance redressal committee." },
            { href: "/careers", label: "Careers at EIT", description: "Openings for faculty and staff." },
          ]}
          columns={2}
        />
      </PageSection>

      <ScrollAnimator />
    </>
  );
}
