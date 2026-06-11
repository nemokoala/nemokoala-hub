"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useViewMode } from "@/hooks/useViewMode";

const webProjects = projects.filter((p) => p.category === "web");
const extensionProjects = projects.filter((p) => p.category === "extension");

export function HomeView() {
  const { mode, ready } = useViewMode();

  const headerCopy =
    mode === "user"
      ? {
          title: "만든 서비스들",
          body: "필요한 서비스를 고르고 바로 사용해 보세요. 각 서비스는 상세 페이지에서 더 쉽게 살펴볼 수 있어요.",
        }
      : {
          title: "서비스 모음",
          body: "배포 URL, 기술 스택, GitHub 저장소를 한곳에서 정리했습니다. 링크로 이 모드를 공유할 수 있어요.",
        };

  return (
    <div
      className="relative flex min-h-dvh flex-1 flex-col"
      suppressHydrationWarning
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/20" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/15" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/12" />
      </div>

      <section className="border-b border-white/40 bg-white/45 py-10 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/50 sm:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-8">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="inline-flex w-fit items-center rounded-full border border-violet-200/80 bg-violet-50/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-800 shadow-sm dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-200">
              nemokoala
            </p>
            <h1 className="min-h-11 bg-linear-to-r from-violet-700 via-sky-600 to-emerald-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:min-h-13 sm:text-4xl dark:from-violet-300 dark:via-sky-300 dark:to-emerald-300">
              {headerCopy.title}
            </h1>
            <p className="min-h-22 text-base leading-relaxed text-zinc-700 sm:min-h-19 dark:text-zinc-300">
              {headerCopy.body}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-12 lg:px-8" aria-busy={!ready}>
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-violet-200/80 bg-violet-50/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-800 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-200">
            웹 서비스
          </span>
          <div className="h-px flex-1 bg-zinc-200/70 dark:bg-zinc-700/60" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {webProjects.map((project) => (
            <ProjectCard key={project.id} project={project} mode={mode} />
          ))}
        </div>

        {extensionProjects.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-200/80 bg-amber-50/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-200">
                확장프로그램
              </span>
              <div className="h-px flex-1 bg-zinc-200/70 dark:bg-zinc-700/60" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {extensionProjects.map((project) => (
                <ProjectCard key={project.id} project={project} mode={mode} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/30 bg-white/30 py-8 text-center text-sm text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-400">
        {mode === "user" ? (
          <p>문의나 제안이 있으면 각 서비스 안내를 참고해 주세요.</p>
        ) : (
          <p>
            데이터는 각 저장소 README를 참고해 구성했습니다.{" "}
            <a
              href="https://github.com/nemokoala"
              className="font-semibold text-violet-700 underline-offset-4 hover:underline dark:text-violet-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub @nemokoala
            </a>
          </p>
        )}
        <p className="mt-2">
          Contact:{" "}
          <a
            href="mailto:fdxguy2@gmail.com"
            className="font-semibold text-violet-700 underline-offset-4 hover:underline dark:text-violet-300"
          >
            fdxguy2@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
