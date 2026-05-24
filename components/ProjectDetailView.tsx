"use client";

import Link from "next/link";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import type { Project, ProjectAccent } from "@/data/projects";
import { projectBodyForMode, projects } from "@/data/projects";
import { useViewMode } from "@/hooks/useViewMode";

type Props = {
  project: Project;
};

const accentClass: Record<
  ProjectAccent,
  {
    text: string;
    bg: string;
    button: string;
    dot: string;
    screenshotBorder: string;
  }
> = {
  violet: {
    text: "text-violet-700 dark:text-violet-300",
    bg: "from-violet-500/18 via-fuchsia-400/10 to-transparent dark:from-violet-500/20",
    button:
      "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-fuchsia-500",
    dot: "bg-violet-500 dark:bg-violet-300",
    screenshotBorder:
      "border-violet-200/90 dark:border-violet-500/35 shadow-violet-500/10",
  },
  sky: {
    text: "text-sky-700 dark:text-sky-300",
    bg: "from-sky-500/18 via-cyan-400/10 to-transparent dark:from-sky-500/20",
    button:
      "bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-500 hover:to-blue-500",
    dot: "bg-sky-500 dark:bg-sky-300",
    screenshotBorder: "border-sky-200/90 dark:border-sky-500/35 shadow-sky-500/10",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    bg: "from-emerald-500/18 via-teal-400/10 to-transparent dark:from-emerald-500/20",
    button:
      "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-500 hover:to-teal-500",
    dot: "bg-emerald-500 dark:bg-emerald-300",
    screenshotBorder:
      "border-emerald-200/90 dark:border-emerald-500/35 shadow-emerald-500/10",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-300",
    bg: "from-rose-500/16 via-orange-400/10 to-transparent dark:from-rose-500/18",
    button:
      "bg-linear-to-r from-rose-600 to-orange-500 text-white shadow-lg shadow-rose-500/25 hover:from-rose-500 hover:to-orange-400",
    dot: "bg-rose-500 dark:bg-rose-300",
    screenshotBorder: "border-rose-200/90 dark:border-rose-500/35 shadow-rose-500/10",
  },
};

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function ProjectDetailView({ project }: Props) {
  const { mode } = useViewMode();
  const { lead, bullets } = projectBodyForMode(project, mode);
  const a = accentClass[project.accent];
  const otherProjects = projects.filter((item) => item.id !== project.id);

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col overflow-hidden">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b ${a.bg}`}
        aria-hidden
      />

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <Link
            href={`/?view=${mode}`}
            className="text-sm font-bold text-zinc-500 transition hover:text-violet-700 dark:text-zinc-400 dark:hover:text-violet-300"
          >
            서비스 모음으로 돌아가기
          </Link>

          <p className={`mt-8 text-sm font-black uppercase tracking-[0.24em] ${a.text}`}>
            {mode === "user" ? "Service Guide" : "Developer Brief"}
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-xl font-semibold text-zinc-700 dark:text-zinc-300">
            {project.tagline}
          </p>
          <p className="mt-8 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {lead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${a.button}`}
            >
              서비스 열기
              <ExternalLinkIcon />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-5 py-3 text-sm font-bold text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              GitHub 보기
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/70 bg-white/65 p-6 shadow-xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            핵심 정보
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className={`mt-2 size-2 shrink-0 rounded-full ${a.dot}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {project.images.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            스크린샷
          </h2>
          <div className="mt-4 grid gap-4">
            {project.images.map((image) => (
              <figure
                key={image.src}
                className={[
                  "overflow-hidden rounded-2xl border-2 bg-white/50 shadow-lg dark:bg-zinc-900/40",
                  a.screenshotBorder,
                ].join(" ")}
              >
                <figcaption className="flex items-center gap-3 border-b border-zinc-200/80 bg-white/90 px-5 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/85">
                  <span
                    className={`size-2 shrink-0 rounded-full ${a.dot}`}
                    aria-hidden
                  />
                  <span
                    className={`text-base font-black tracking-tight ${a.text}`}
                  >
                    {image.alt}
                  </span>
                </figcaption>
                <ProjectScreenshot
                  src={image.src}
                  alt={image.alt}
                  accent={project.accent}
                  variant="detail"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-6 pb-14 lg:px-8">
        <div className="border-t border-zinc-200/70 pt-8 dark:border-white/10">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            기술 스택
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-zinc-200/70 bg-white/65 px-3 py-1.5 text-sm font-bold text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          다른 서비스
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {otherProjects.map((item) => (
            <Link
              key={item.id}
              href={`/services/${item.id}?view=${mode}`}
              className="rounded-2xl border border-white/70 bg-white/55 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-zinc-900/55 dark:hover:bg-zinc-900"
            >
              <span className="text-base font-black text-zinc-900 dark:text-zinc-50">
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                {item.tagline}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
