import { cn } from "@/lib/utils";

/**
 * The EIT mark: three slanted bars of different heights, the same shape language as the split photograph in the
 * About section. It is used as the section marker, in the footer, and (as icon.svg / apple-icon) as the app icon.
 * Each bar carries `data-brand-bar` so the scroll animator can grow them in as their section arrives.
 * To use an official mark instead, replace this component and `src/app/icon.svg`.
 */
export function BrandMark({ className }: { className?: string }) {
  const bar = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" className={cn("shrink-0", className)}>
      <g transform="translate(9 0) skewX(-10)">
        <rect data-brand-bar x="6" y="12" width="10" height="30" rx="4" fill="#17324D" style={bar} />
        <rect data-brand-bar x="19" y="5" width="10" height="37" rx="4" fill="#52BCBD" style={bar} />
        <rect data-brand-bar x="32" y="18" width="10" height="24" rx="4" fill="#E79BB2" style={bar} />
      </g>
    </svg>
  );
}
