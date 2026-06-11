"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { projects } from "@/data/projects";

const webProjects = projects.filter((p) => p.category === "web");
const extensionProjects = projects.filter((p) => p.category === "extension");
import { useViewMode } from "@/hooks/useViewMode";

function linkWithView(href: string, mode: string) {
  return `${href}?view=${mode}`;
}

export function AppHeader() {
  const pathname = usePathname();
  const { mode, setMode, ready } = useViewMode();

  return (
    <header className="sticky top-0 z-30 border-b border-violet-100/70 bg-white/70 shadow-sm shadow-violet-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <Link
            href={linkWithView("/", mode)}
            className="text-base font-black tracking-wider text-violet-700 transition hover:text-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
          >
            NEMOKOALA
          </Link>

          <nav
            aria-label="서비스"
            className="scrollbar-hide flex max-w-full gap-1 overflow-x-auto text-sm font-bold text-zinc-600 dark:text-zinc-300"
          >
            <Link
              href={linkWithView("/", mode)}
              className={[
                "shrink-0 border-b-2 px-4 py-3 transition",
                pathname === "/"
                  ? "border-violet-600 text-violet-700 dark:border-violet-300 dark:text-violet-200"
                  : "border-transparent hover:border-violet-200 hover:text-violet-700 dark:hover:border-violet-700 dark:hover:text-violet-200",
              ].join(" ")}
            >
              서비스 모음
            </Link>
            {webProjects.map((project) => {
              const href = `/services/${project.id}`;
              const active = pathname === href;

              return (
                <Link
                  key={project.id}
                  href={linkWithView(href, mode)}
                  className={[
                    "shrink-0 border-b-2 px-4 py-3 transition",
                    active
                      ? "border-violet-600 text-violet-700 dark:border-violet-300 dark:text-violet-200"
                      : "border-transparent hover:border-violet-200 hover:text-violet-700 dark:hover:border-violet-700 dark:hover:text-violet-200",
                  ].join(" ")}
                >
                  {project.title}
                </Link>
              );
            })}

            {extensionProjects.length > 0 && (
              <>
                <span
                  className="mx-1 self-center text-zinc-300 dark:text-zinc-600"
                  aria-hidden
                >
                  /
                </span>
                {extensionProjects.map((project) => {
                  const href = `/services/${project.id}`;
                  const active = pathname === href;

                  return (
                    <Link
                      key={project.id}
                      href={linkWithView(href, mode)}
                      className={[
                        "shrink-0 border-b-2 px-4 py-3 transition",
                        active
                          ? "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300"
                          : "border-transparent hover:border-amber-200 hover:text-amber-700 dark:hover:border-amber-700 dark:hover:text-amber-300",
                      ].join(" ")}
                    >
                      {project.title}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <ThemeToggle />
          <ViewModeToggle mode={mode} onChange={setMode} disabled={!ready} />
        </div>
      </div>
    </header>
  );
}
