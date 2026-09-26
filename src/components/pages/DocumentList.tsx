import { FileText, Download } from "lucide-react";
import type { SiteDocument } from "@/types";
import { cn } from "@/lib/utils";

interface DocumentListProps {
  documents: SiteDocument[];
  className?: string;
}

/**
 * A list of registered PDFs (approval letters, brochures, calendars, …). Every entry in
 * data/site/documents.ts is real — copied from the institute's own records — but most files
 * have not been uploaded to /public/documents yet (`available: false`), so an entry without its
 * file yet shows as a plain row rather than a dead download link.
 */
export function DocumentList({ documents, className }: DocumentListProps) {
  if (documents.length === 0) return null;
  return (
    <ul className={cn("divide-y divide-primary/10 border-y border-primary/10", className)}>
      {documents.map((document) => (
        <li key={document.id} data-anim="row" className="flex items-center justify-between gap-4 py-5">
          <span className="flex items-center gap-4">
            <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-eit-mist text-primary">
              <FileText aria-hidden className="size-5" />
            </span>
            <span className="text-base font-semibold text-primary">{document.title}</span>
          </span>
          {document.available ? (
            <a
              href={document.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
            >
              Download
              <Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          ) : (
            <span className="shrink-0 text-xs font-medium text-muted-foreground">PDF coming soon</span>
          )}
        </li>
      ))}
    </ul>
  );
}
