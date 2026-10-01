import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";
import { SITE } from "@/constants/site";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-slate-900"
        >
          {SITE.name}
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6">
            {NAVIGATION.map((item) => {
              const hasChildren = "children" in item;

              return (
                <li
                  key={item.href}
                  className="group relative"
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className="flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus:text-slate-950 focus:outline-none"
                      aria-haspopup="true"
                    >
                      {item.label}

                      <span
                        className="ml-1"
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasChildren && (
                    <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="w-52 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}