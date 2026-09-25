import { socialLabels, type SocialLink } from "@/data/site/social";
import { cn } from "@/lib/utils";
import { socialPaths } from "./social-paths";

export function SocialIcon({ platform, className }: { platform: SocialLink["platform"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={cn("size-[1.15rem] fill-current", className)}>
      <path d={socialPaths[platform]} />
    </svg>
  );
}

interface SocialLinksProps {
  links: SocialLink[];
  /**
   * rail – fixed glass pill on the right edge of wide screens
   * row  – plain row of round buttons (footer, menu)
   */
  variant?: "rail" | "row";
  className?: string;
}

/** Social icons. Renders nothing when there are no links. Sample links (href "#") are opened in the same tab and do nothing. */
export function SocialLinks({ links, variant = "row", className }: SocialLinksProps) {
  if (links.length === 0) return null;

  const button =
    "group/social relative grid size-10 place-items-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white";

  const items = links.map((link) => {
    const label = socialLabels[link.platform];
    const isSample = link.href === "#";
    return (
      <li key={link.platform}>
        <a
          href={link.href}
          {...(isSample ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          aria-label={isSample ? `${label} (sample link)` : `EIT on ${label}`}
          data-cursor=""
          className={button}
        >
          <SocialIcon platform={link.platform} />
          {variant === "rail" && (
            <span className="pointer-events-none absolute right-full mr-3 translate-x-1 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-all group-hover/social:translate-x-0 group-hover/social:opacity-100 group-focus-visible/social:translate-x-0 group-focus-visible/social:opacity-100">
              {label}
            </span>
          )}
        </a>
      </li>
    );
  });

  if (variant === "rail") {
    return (
      <nav
        aria-label="Social media"
        className={cn(
          "fixed top-1/2 right-2 z-40 hidden -translate-y-1/2 min-[1360px]:block",
          className,
        )}
      >
        <ul className="flex flex-col gap-1 rounded-full border border-white/60 bg-white/45 p-1.5 shadow-[0_18px_40px_-20px_rgba(23,50,77,0.55)] backdrop-blur-xl backdrop-saturate-150">
          {items}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Social media" className={className}>
      <ul className="flex flex-wrap gap-2">{items}</ul>
    </nav>
  );
}
