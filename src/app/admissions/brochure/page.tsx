import { ComingSoon } from "@/components/sections/ComingSoon";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/admissions/brochure";

export const metadata = getRouteMetadata(path);

export default function Page() {
  return <ComingSoon path={path} />;
}
