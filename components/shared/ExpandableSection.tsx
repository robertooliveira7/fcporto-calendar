import type { ReactNode } from "react";

type ExpandableSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  link?: {
    label: string;
    href: string;
  };
};

export function ExpandableSection({
  title,
  description,
  children,
  link,
}: ExpandableSectionProps) {
  return (
    <section>
      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              {title}
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {link && (
              <a
                href={link.href}
                className="hidden text-xs font-semibold text-blue-700 transition-colors hover:text-blue-800 sm:inline"
              >
                {link.label} →
              </a>
            )}

            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-200 group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-700"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </summary>

        <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
          {children}

          {link && (
            <div className="mt-4 border-t border-slate-100 pt-3 sm:hidden">
              <a
                href={link.href}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800"
              >
                {link.label} →
              </a>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}