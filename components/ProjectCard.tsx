import Link from "next/link";
import { PingLink } from "@/components/PingLink";
import { ProjectCover } from "@/components/ProjectCover";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui";
import type { Project } from "@/data/projects";
import {
  projectBody,
  projectCategoryLabel,
  projectLiveAction,
  projectLiveLabel,
} from "@/data/projects";

type Props = {
  project: Project;
};

const externalLinkClass =
  "relative z-10 inline-flex items-center gap-1 text-muted transition hover:text-fg";

export function ProjectCard({ project }: Props) {
  const { lead } = projectBody(project);
  const href = `/services/${project.id}`;

  return (
    <article className="group relative grid gap-6 border-b border-line py-10 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-10 sm:py-12">
      <div className="overflow-hidden rounded-2xl">
        <ProjectCover project={project} />
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="text-xs font-medium text-subtle">
          {projectCategoryLabel(project)}
          {project.professional ? " · Work" : null}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">
          {/* 카드 전체를 클릭 영역으로 쓰되, 안쪽 외부 링크는 z-10 으로 위에 둔다 */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-[15px] text-muted">{project.tagline}</p>
        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-muted">
          {lead}
        </p>
        <p className="mt-4 text-sm leading-6 text-subtle">
          {project.stack.join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <span className="inline-flex items-center gap-1 text-fg transition group-hover:text-accent">
            자세히 보기
            <ArrowRightIcon className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
          {project.liveUrl ? (
            <PingLink
              pingInfo={{
                project: project.title,
                action: projectLiveAction(project),
              }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              {projectLiveLabel(project)}
              <ArrowUpRightIcon className="size-3.5" />
            </PingLink>
          ) : null}
          {project.repoUrl ? (
            <PingLink
              pingInfo={{ project: project.title, action: "GitHub" }}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              GitHub
              <ArrowUpRightIcon className="size-3.5" />
            </PingLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
