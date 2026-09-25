import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: the EIT mark on navy. Generated at build time, no image file needed. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17324D" }}>
        <svg width="120" height="120" viewBox="0 0 48 48">
          <g transform="translate(9 0) skewX(-10)">
            <rect x="6" y="12" width="10" height="30" rx="4" fill="#FFFFFF" />
            <rect x="19" y="5" width="10" height="37" rx="4" fill="#52BCBD" />
            <rect x="32" y="18" width="10" height="24" rx="4" fill="#E79BB2" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
