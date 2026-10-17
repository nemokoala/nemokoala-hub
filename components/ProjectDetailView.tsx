import Link from "next/link";
import { PingLink } from "@/components/PingLink";
import { ProjectCover } from "@/components/ProjectCover";
import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  buttonClass,
} from "@/components/ui";
import type { Project } from "@/data/projects";
import {
  projectBody,
  projectCategoryLabel,
  projectCoverImage,
  projectLiveAction,
  projectLiveLabel,
  visibleProjects,
} from "@/data/projects";

type Props = {
  project: Project;
};

/** 왼쪽에 섹션 이름, 오른쪽에 본문을 두는 문서형 섹션 */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-line py-12 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 sm:py-14">
      <h2 className="text-sm font-semibold text-fg md:sticky md:top-20 md:self-start">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={["space-y-2.5", className].join(" ")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7">
          <span
            className="mt-[13px] size-1 shrink-0 rounded-full bg-subtle"
            aria-hidden
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetailView({ project }: Props) {
  const { lead, bullets } = projectBody(project);
  const cover = projectCoverImage(project);
  const otherProjects = visibleProjects.filter(
    (item) => item.id !== project.id,
  );
  const hasArchitecture =
    Boolean(project.architectureIntro) ||
    (project.architecture?.length ?? 0) > 0 ||
    (project.architectureGroups?.length ?? 0) > 0 ||
    Boolean(project.architectureImage);

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header className="fade-up pt-10 sm:pt-14">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
          >
            <ArrowLeftIcon className="size-3.5" />
            프로젝트 목록
          </Link>

          <div className="mt-12 max-w-3xl">
            <p className="text-sm font-medium text-accent">
              {projectCategoryLabel(project)}
              {project.professional ? " · Work Project" : null}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-muted">{project.tagline}</p>

            {project.liveUrl || project.repoUrl ? (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {project.liveUrl ? (
                  <PingLink
                    pingInfo={{
                      project: project.title,
                      action: projectLiveAction(project),
                    }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass.primary}
                  >
                    {projectLiveLabel(project)}
                    <ArrowUpRightIcon />
                  </PingLink>
                ) : null}
                {project.repoUrl ? (
                  <PingLink
                    pingInfo={{ project: project.title, action: "GitHub" }}
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass.secondary}
                  >
                    GitHub
                    <ArrowUpRightIcon />
                  </PingLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        {cover ? (
          <div className="mt-12 overflow-hidden rounded-2xl sm:mt-14">
            <ProjectCover project={project} variant="hero" eager />
          </div>
        ) : null}

        <div className="mt-12 sm:mt-16">
          <Section title="개요">
            <p className="text-[17px] leading-8 text-fg">{lead}</p>
          </Section>

          {bullets.length > 0 ? (
            <Section title="주요 기능">
              <BulletList items={bullets} className="text-base text-fg" />
            </Section>
          ) : null}

          <Section title="기술 스택">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-surface px-2.5 py-1 text-sm text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Section>

          {hasArchitecture ? (
            <Section title="아키텍처">
              {project.architectureIntro ? (
                <p className="text-base leading-7 text-fg">
                  {project.architectureIntro}
                </p>
              ) : null}

              {project.architectureImage ? (
                <figure className="mt-8 first:mt-0">
                  <div className="overflow-hidden rounded-xl border border-line">
                    <ProjectScreenshot
                      src={project.architectureImage.src}
                      alt={project.architectureImage.alt}
                      variant="diagram"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-subtle">
                    {project.architectureImage.alt}
                  </figcaption>
                </figure>
              ) : null}

              {project.architecture && project.architecture.length > 0 ? (
                <BulletList
                  items={project.architecture}
                  className="mt-8 text-base text-fg first:mt-0"
                />
              ) : null}

              {project.architectureGroups &&
              project.architectureGroups.length > 0 ? (
                <div className="mt-10 space-y-10 first:mt-0">
                  {project.architectureGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-base font-semibold text-fg">
                        {group.title}
                      </h3>
                      <BulletList
                        items={group.items}
                        className="mt-3 text-[15px] text-muted"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </Section>
          ) : null}

          {project.challenges && project.challenges.length > 0 ? (
            <Section title="문제 · 해결">
              <ol className="space-y-10">
                {project.challenges.map((item, index) => (
                  <li key={item.problem} className="flex gap-4 sm:gap-5">
                    <span className="w-6 shrink-0 pt-px font-mono text-sm leading-7 text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold leading-7 text-fg">
                        {item.problem}
                      </p>
                      <p className="mt-2 text-[15px] leading-7 text-muted">
                        {item.solution}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          ) : null}

          {project.roadmap && project.roadmap.length > 0 ? (
            <Section title="향후 계획">
              <p className="text-sm leading-6 text-subtle">
                아직 개발하지 않았지만, 현재 한계를 인지하고 다음 단계로
                고려하는 항목입니다.
              </p>
              <ul className="mt-6 space-y-6">
                {project.roadmap.map((item) => (
                  <li key={item.title}>
                    <p className="text-base font-semibold leading-7 text-fg">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-7 text-muted">
                      {item.reason}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* 상단 대표 이미지는 잘라서 보여 주므로, 갤러리에는 원본 비율로 전부 둔다 */}
          {project.images.length > 0 ? (
            <Section title="스크린샷">
              <ScreenshotCarousel
                images={project.images}
                label={`${project.title} 스크린샷`}
              />
            </Section>
          ) : null}
        </div>
      </article>

      {otherProjects.length > 0 ? (
        <section className="mt-8 border-t border-line bg-surface/60">
          <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
            <h2 className="text-sm font-semibold text-fg">다른 프로젝트</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-bg px-5 py-4 transition hover:border-subtle/60"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-fg">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted">
                      {item.tagline}
                    </span>
                  </span>
                  <ArrowRightIcon className="size-4 shrink-0 text-subtle transition group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
