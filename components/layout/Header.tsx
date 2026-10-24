
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";
import { SITE } from "@/constants/site";

export function Header() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const menu = mobileMenuRef.current;

      if (menu && !menu.contains(event.target as Node)) {
        menu.open = false;
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="truncate font-semibold tracking-tight text-slate-900"
        >
          {SITE.name}
        </Link>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-6">
            {NAVIGATION.map((item) => {
              const hasChildren = "children" in item;

              return (
                <li key={item.href} className="group relative">
                  {hasChildren ? (
                    <button
                      type="button"
                      className="flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 focus:text-slate-950 focus:outline-none"
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span className="ml-1" aria-hidden="true">
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
                      <ul className="w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
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

        {/* Navegação mobile */}
        <details
          ref={mobileMenuRef}
          className="group relative md:hidden"
        >
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden"
            aria-label="Abrir ou fechar menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 group-open:hidden"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hidden h-5 w-5 group-open:block"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </summary>

          <nav
            aria-label="Navegação mobile"
            className="absolute right-0 top-12 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <ul className="p-2">
              {NAVIGATION.map((item) => {
                const hasChildren = "children" in item;

                if (!hasChildren) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    className="mt-1 border-t border-slate-100 pt-2"
                  >
                    <p className="px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>

                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMobileMenu}
                            className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
