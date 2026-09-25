import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Page-width wrapper. Every layout component uses this so gutters stay aligned. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10", className)} {...props} />;
}
