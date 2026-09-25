"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResolvedProgram } from "@/data/programs/programs";
import { cn } from "@/lib/utils";
import { programIcons } from "./program-icons";

interface ProgramsStripProps {
  programs: ResolvedProgram[];
  active: number;
  onSelect: (index: number) => void;
  allHref: string;
  allLabel: string;
}

/** One-line index of every program under the carousel. Doubles as the keyboard-friendly way to pick one. */
export function ProgramsStrip({ programs, active, onSelect, allHref, allLabel }: ProgramsStripProps) {
  return (
    <nav aria-label="All programs" data-anim="strip" className="mt-10 border-t pt-8 lg:mt-14">
      <ol className="-mx-5 flex items-stretch overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10 2xl:mx-0 2xl:overflow-visible 2xl:px-0 2xl:pb-0">
        {programs.map((program, index) => {
          const Icon = programIcons[program.icon];
          const isActive = index === active;

          return (
            <li key={program.slug} className={cn("shrink-0 2xl:flex-1", index > 0 && "border-l")}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? "true" : undefined}
                className="group flex w-full items-center gap-4 px-5 py-2 text-left first:pl-0 2xl:px-6 2xl:first:pl-0"
              >
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-xl border transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-white text-primary group-hover:bg-eit-mist/60",
                  )}
                >
                  <Icon aria-hidden className="size-6" />
                </span>
                <span>
                  <span className="block font-semibold text-primary">{program.name}</span>
                  <span className="block whitespace-nowrap text-sm text-muted-foreground">{program.category}</span>
                </span>
              </button>
            </li>
          );
        })}

        <li className="shrink-0 border-l pl-6">
          <Link
            href={allHref}
            className="flex h-full min-w-32 flex-col justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            {allLabel}
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </li>
      </ol>
    </nav>
  );
}
