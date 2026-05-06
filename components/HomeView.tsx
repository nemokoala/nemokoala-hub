"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { projects } from "@/data/projects";
import { useViewMode } from "@/hooks/useViewMode";
import { VIEW_MODE_QUERY_KEY } from "@/lib/viewMode";

export function HomeView() {
  const { mode, setMode, ready } = useViewMode();

  const headerCopy =
    mode === "user"
      ? {
          title: "만든 서비스들",
          body: "필요한 것만 골라 써 보세요. 각 카드의 「바로 가기」로 실제 서비스로 이동합니다.",
        }
      : {
          title: "서비스 모음",
          body: "배포 URL·기술 스택·GitHub 저장소를 한곳에서 정리해 두었습니다. 링크로 이 모드를 공유할 수 있어요.",
        };

  return (
    <div
      className="relative flex min-h-full flex-1 flex-col"
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

      <header className="border-b border-white/40 bg-white/45 py-10 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/50 sm:py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
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
          <div className="flex min-w-0 flex-col items-stretch gap-2 sm:items-end">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              보기 방식
            </span>
            <ViewModeToggle mode={mode} onChange={setMode} disabled={!ready} />
            {mode === "developer" ? (
              <p className="max-w-[16rem] text-right text-[11px] leading-snug text-zinc-500 dark:text-zinc-500">
                URL 예:{" "}
                <code className="rounded bg-zinc-200/80 px-1 py-0.5 text-[10px] dark:bg-zinc-800">
                  ?{VIEW_MODE_QUERY_KEY}=user
                </code>{" "}
                ·{" "}
                <code className="rounded bg-zinc-200/80 px-1 py-0.5 text-[10px] dark:bg-zinc-800">
                  ?{VIEW_MODE_QUERY_KEY}=developer
                </code>
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2" aria-busy={!ready}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} mode={mode} />
          ))}
        </div>
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
      </footer>
    </div>
  );
}
