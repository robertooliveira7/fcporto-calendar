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
            {NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
