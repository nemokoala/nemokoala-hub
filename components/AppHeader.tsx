"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "About", hash: "about" },
  { label: "Projects", hash: "projects" },
];

const navLinkClass =
  "rounded-md px-2.5 py-1.5 text-muted transition hover:text-fg sm:px-3";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-fg"
        >
          nemokoala
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            aria-label="포트폴리오"
            className="flex items-center text-sm font-medium"
          >
            {navItems.map((item) => (
              <Link
                key={item.hash}
                href={`${pathname === "/" ? "" : "/"}#${item.hash}`}
                className={navLinkClass}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/nemokoala"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              GitHub
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
