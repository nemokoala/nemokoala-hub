import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRightIcon, buttonClass } from "@/components/ui";
import { visibleProjects } from "@/data/projects";

export function HomeView() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        id="about"
        className="mx-auto w-full max-w-5xl scroll-mt-14 px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
      >
        <div className="fade-up max-w-2xl">
          <p className="text-sm font-medium text-accent">Frontend Developer</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            박재연
          </h1>
          <p className="mt-8 text-xl font-medium leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">
            복잡한 영상 편집 경험을 웹과 앱에서 구현합니다.
          </p>
          <p className="mt-4 text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
            약 1년 6개월 동안 AI 영상 생성 서비스와 웹 비디오 에디터를
            개발했습니다. 아래에는 직접 설계하고 운영해 온 개인 프로젝트를
            정리했습니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <a href="#projects" className={buttonClass.primary}>
              프로젝트 보기
              <ArrowRightIcon />
            </a>
            <a
              href="https://github.com/nemokoala"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass.secondary}
            >
              GitHub
            </a>
            <a href="mailto:fdxguy2@gmail.com" className={buttonClass.secondary}>
              Email
            </a>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto w-full max-w-5xl scroll-mt-14 px-5 pb-24 sm:px-8"
      >
        <div className="border-t border-line pt-16 sm:pt-20">
          <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            직접 설계하고 운영한 프로젝트의 구현 과정과 기술적 판단을
            정리했습니다.
          </p>
        </div>
        <div className="mt-6">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
