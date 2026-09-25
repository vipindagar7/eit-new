import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site/site";
import type { LogoAssets } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Files found in /public/images/logo (resolved on the server). Text wordmark when empty. */
  assets?: LogoAssets;
  /**
   * color    – for light backgrounds
   * white    – for dark backgrounds (footer)
   * adaptive – follows the navbar state (white over the hero, colour once it turns solid)
   */
  variant?: "color" | "white" | "adaptive";
  /** Visibility classes for the institute name next to the "EIT" wordmark. */
  nameClassName?: string;
  className?: string;
  onClick?: () => void;
}

const logoImage = "h-10 w-auto max-w-none";

export function Logo({
  assets,
  variant = "color",
  nameClassName = "hidden sm:flex",
  className,
  onClick,
}: LogoProps) {
  const label = `${siteConfig.name}, ${siteConfig.city} — home`;
  const hasImage = Boolean(assets?.color || assets?.light);
  const whiteSrc = assets?.light ?? assets?.color;
  // A colour-only logo is turned white with a filter when no white version exists.
  const whiteNeedsFilter = !assets?.light;

  let mark: React.ReactNode;

  if (hasImage) {
    const white = whiteSrc && (
      <Image
        src={whiteSrc}
        alt=""
        width={200}
        height={56}
        className={cn(logoImage, whiteNeedsFilter && "brightness-0 invert")}
      />
    );
    const color = (assets?.color ?? whiteSrc) && (
      <Image src={(assets?.color ?? whiteSrc) as string} alt="" width={200} height={56} className={logoImage} />
    );

    if (variant === "white") mark = white;
    else if (variant === "color") mark = color;
    else {
      mark = (
        <span className="grid">
          <span className="col-start-1 row-start-1 transition-opacity duration-300 group-data-[solid=true]/nav:opacity-0">
            {white}
          </span>
          <span className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 group-data-[solid=true]/nav:opacity-100">
            {color}
          </span>
        </span>
      );
    }
  } else {
    const tone = variant === "white" ? "text-white" : variant === "color" ? "text-primary" : "text-current";
    mark = (
      <>
        <span className={cn("text-[1.75rem] font-extrabold leading-none tracking-[-0.04em]", tone)}>
          {siteConfig.acronym}
        </span>
        <span aria-hidden className={cn("h-8 w-px bg-eit-accent", nameClassName.replaceAll("flex", "block"))} />
        <span className={cn("flex-col whitespace-nowrap text-[0.8125rem] font-semibold leading-tight", tone, nameClassName)}>
          <span>{siteConfig.name}</span>
          <span className="font-medium opacity-75">{siteConfig.city}</span>
        </span>
      </>
    );
  }

  return (
    <Link
      href="/"
      aria-label={label}
      onClick={onClick}
      className={cn("inline-flex items-center gap-3", className)}
    >
      {mark}
    </Link>
  );
}
