import Image from "next/image";
import type { ResolvedImage } from "@/types";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  image?: ResolvedImage;
  /** Pastel accent (hex) used for the fallback when the photograph does not exist yet. */
  accent: string;
  /** Big faint letters shown in the fallback, e.g. initials. */
  label?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Load eagerly. Only for the first visible image of a section. */
  eager?: boolean;
}

/** Fills its parent (which must be positioned) with the photograph, or a tinted placeholder until it exists. */
export function SmartImage({ image, accent, label, sizes, className, imageClassName, eager = false }: SmartImageProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {image?.ready ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={80}
          loading={eager ? "eager" : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div
          role={image ? "img" : undefined}
          aria-label={image?.alt}
          aria-hidden={image ? undefined : true}
          className="absolute inset-0 grid place-items-center"
          style={{
            background: `radial-gradient(80% 70% at 75% 15%, #ffffff66 0%, transparent 60%), linear-gradient(150deg, ${accent} 0%, ${accent}bb 55%, #536579 140%)`,
          }}
        >
          {label && (
            <span aria-hidden className="select-none text-[clamp(1rem,9cqw,8rem)] font-extrabold tracking-[-0.06em] text-primary/20">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
