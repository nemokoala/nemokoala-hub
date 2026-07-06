import Link from "next/link";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import type { Project, ProjectAccent } from "@/data/projects";
import { projectBodyForMode, projectCoverImage } from "@/data/projects";
import type { ViewMode } from "@/lib/viewMode";

type Props = {
  project: Project;
  mode: ViewMode;
};

const accentClass: Record<
  ProjectAccent,
  {
    topBar: string;
    bullet: string;
    primaryBtn: string;
    chip: string;
    cardShadow: string;
    ringHover: string;
  }
> = {
  violet: {
    topBar: "from-violet-500 via-fuchsia-500 to-pink-400",
    bullet: "bg-violet-500 dark:bg-fuchsia-400",
    primaryBtn:
      "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-500 hover:to-fuchsia-500 dark:from-violet-500 dark:to-fuchsia-600",
    chip: "border border-violet-200/80 bg-violet-50/90 text-violet-900 dark:border-violet-500/30 dark:bg-violet-950/60 dark:text-violet-100",
    cardShadow: "shadow-violet-500/12 hover:shadow-violet-500/20",
    ringHover: "hover:ring-violet-300/50 dark:hover:ring-violet-500/30",
  },
  sky: {
    topBar: "from-sky-400 via-blue-500 to-cyan-400",
    bullet: "bg-sky-500 dark:bg-cyan-400",
    primaryBtn:
      "bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/30 hover:from-sky-500 hover:to-blue-500 dark:from-sky-500 dark:to-blue-600",
    chip: "border border-sky-200/80 bg-sky-50/90 text-sky-950 dark:border-sky-500/30 dark:bg-sky-950/60 dark:text-sky-100",
    cardShadow: "shadow-sky-500/12 hover:shadow-sky-500/20",
    ringHover: "hover:ring-sky-300/50 dark:hover:ring-sky-500/30",
  },
  emerald: {
    topBar: "from-emerald-400 via-teal-500 to-cyan-400",
    bullet: "bg-emerald-500 dark:bg-teal-400",
    primaryBtn:
      "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-500 hover:to-teal-500 dark:from-emerald-500 dark:to-teal-600",
    chip: "border border-emerald-200/80 bg-emerald-50/90 text-emerald-950 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-100",
    cardShadow: "shadow-emerald-500/12 hover:shadow-emerald-500/20",
    ringHover: "hover:ring-emerald-300/50 dark:hover:ring-emerald-500/30",
  },
  rose: {
    topBar: "from-rose-400 via-orange-400 to-amber-400",
    bullet: "bg-rose-500 dark:bg-orange-400",
    primaryBtn:
      "bg-linear-to-r from-rose-600 to-orange-500 text-white shadow-lg shadow-rose-500/30 hover:from-rose-500 hover:to-orange-400 dark:from-rose-500 dark:to-orange-500",
    chip: "border border-rose-200/80 bg-rose-50/90 text-rose-950 dark:border-rose-500/30 dark:bg-rose-950/60 dark:text-rose-100",
    cardShadow: "shadow-rose-500/12 hover:shadow-rose-500/20",
    ringHover: "hover:ring-rose-300/50 dark:hover:ring-rose-500/30",
  },
  amber: {
    topBar: "from-amber-400 via-orange-400 to-yellow-300",
    bullet: "bg-amber-500 dark:bg-yellow-400",
    primaryBtn:
      "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:from-amber-400 hover:to-orange-400 dark:from-amber-500 dark:to-orange-500",
    chip: "border border-amber-200/80 bg-amber-50/90 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/60 dark:text-amber-100",
    cardShadow: "shadow-amber-500/12 hover:shadow-amber-500/20",
    ringHover: "hover:ring-amber-300/50 dark:hover:ring-amber-500/30",
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

export function ProjectCard({ project, mode }: Props) {
  const { lead, bullets } = projectBodyForMode(project, mode);
  const showDevChrome = mode === "developer";
  const a = accentClass[project.accent];
  const cover = projectCoverImage(project);

  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur-md transition duration-300 dark:border-white/10 dark:bg-zinc-900/65",
        a.cardShadow,
        "ring-1 ring-black/5 dark:ring-white/10",
        "hover:-translate-y-0.5 hover:ring-2",
        a.ringHover,
      ].join(" ")}
    >
      {cover ? (
        <div className="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-white/50 dark:border-white/10">
          <ProjectScreenshot
            src={cover.src}
            alt={cover.alt}
            accent={project.accent}
            variant="card"
          />
        </div>
      ) : (
        <div
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-linear-to-r opacity-95",
            a.topBar,
          ].join(" ")}
          aria-hidden
        />
      )}
      <Link
        href={`/services/${project.id}?view=${mode}`}
        aria-label={`${project.title} 자세히 보기`}
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      />
      <div className="pointer-events-none relative z-20 flex flex-wrap items-start justify-between gap-3 pt-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 transition group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
            {project.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {project.tagline}
          </p>
        </div>
        <div className="pointer-events-none relative z-20 flex shrink-0 flex-wrap justify-end gap-2">
          {showDevChrome ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              GitHub
              <ExternalLinkIcon className="opacity-70" />
            </a>
          ) : null}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
              a.primaryBtn,
            ].join(" ")}
          >
            {project.category === "extension"
              ? mode === "user"
                ? "설치하기"
                : "Open VSX"
              : project.category === "desktop"
                ? mode === "user"
                  ? "다운로드"
                  : "Releases"
                : mode === "user"
                  ? "바로 가기"
                  : "사이트"}
            <ExternalLinkIcon className="opacity-90" />
          </a>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {lead}
      </p>

      <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-800 dark:text-zinc-200">
        {bullets.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className={["mt-2 size-1.5 shrink-0 rounded-full", a.bullet].join(
                " ",
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {showDevChrome ? (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-200/60 pt-4 dark:border-zinc-700/60">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={[
                "rounded-lg px-2.5 py-1 text-xs font-semibold backdrop-blur-sm",
                a.chip,
              ].join(" ")}
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      <span className="mt-6 inline-flex w-fit items-center text-sm font-bold text-violet-700 underline-offset-4 transition group-hover:underline dark:text-violet-300">
        자세히 보기
      </span>
    </article>
  );
}
