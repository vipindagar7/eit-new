import { ComingSoon } from "@/components/sections/ComingSoon";
import { getRouteMetadata } from "@/lib/metadata";

const path = "/campus-life/library";

export const metadata = getRouteMetadata(path);

export default function Page() {
  return <ComingSoon path={path} />;
}
