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
    <section className="mt-6">
      {link && (
        <div className="mb-4 flex justify-end">
          <a
            href={link.href}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            {link.label} →
          </a>
        </div>
      )}

      <details className="group rounded-xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <span className="text-xl text-slate-500 transition-transform group-open:rotate-180">
            ↓
          </span>
        </summary>

        <div className="border-t border-slate-100 p-6">
          {children}
        </div>
      </details>
    </section>
  );
}