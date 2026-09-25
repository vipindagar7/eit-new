import { getLogoAssets } from "@/lib/assets";
import { getSocialLinks } from "@/lib/content";
import { Navbar } from "./Navbar";

/** Server wrapper: resolves which logo files exist, then renders the interactive navbar. */
export function SiteHeader() {
  return <Navbar logoAssets={getLogoAssets()} social={getSocialLinks()} />;
}
