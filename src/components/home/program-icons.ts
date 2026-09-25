import { ChartColumn, Code, Cpu, GraduationCap, Laptop, Users, type LucideIcon } from "lucide-react";
import type { ProgramIconKey } from "@/data/programs/programs";

/** Icon per program key, so data files stay free of React components. */
export const programIcons: Record<ProgramIconKey, LucideIcon> = {
  cpu: Cpu,
  "graduation-cap": GraduationCap,
  code: Code,
  laptop: Laptop,
  chart: ChartColumn,
  users: Users,
};
