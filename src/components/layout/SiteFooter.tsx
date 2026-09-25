import Link from "next/link";
import { footerColumns, getCopyright, legalLinks } from "@/data/site/footer";
import { siteConfig } from "@/data/site/site";
import { getLogoAssets } from "@/lib/assets";
import { getSocialLinks } from "@/lib/content";
import { BrandMark } from "./BrandMark";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const linkClass = "text-primary/75 underline-offset-4 hover:text-primary hover:underline";

export function SiteFooter() {
  const { contact, affiliations } = siteConfig;
  const hasContact = Boolean(contact.address || contact.phone || contact.email);

  return (
    <footer data-scroll-section="footer" className="border-t border-primary/10 bg-eit-surface text-primary">
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Logo variant="color" assets={getLogoAssets()} />
            <BrandMark className="size-9" />
          </div>

          <ul className="space-y-1 text-sm text-primary/70">
            {affiliations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {hasContact && (
            <address className="space-y-1 text-sm not-italic text-primary/70">
              {contact.address && <p>{contact.address}</p>}
              {contact.phone && (
                <p>
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </p>
              )}
            </address>
          )}

          <SocialLinks links={getSocialLinks()} variant="row" className="-ml-2" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.title} data-anim="row">
              <h2 className="text-sm font-bold text-primary">{column.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-primary/10">
        <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-primary/65 md:flex-row md:items-center md:justify-between">
          <p>{getCopyright(new Date().getFullYear())}</p>
          <nav aria-label="Legal and compliance">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline-offset-4 hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
