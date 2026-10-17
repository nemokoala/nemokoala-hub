import { ProjectScreenshot } from "@/components/ProjectScreenshot";
import type { Project, ProjectAccent } from "@/data/projects";
import { projectCoverImage } from "@/data/projects";

type Props = {
  project: Project;
  /** card: 목록 썸네일, hero: 상세 상단 (비율은 같고 이미지 해상도만 다름) */
  variant?: "card" | "hero";
  eager?: boolean;
};

/**
 * 프로젝트마다 옅은 배경색 하나만 깔아 썸네일끼리 구분되게 한다.
 * 다크 모드는 페이지 배경보다 한 단계 밝은 회색에 색을 섞어야
 * 따뜻한 색이 갈색으로 탁해지지 않고, 어두운 앱 화면과도 구분된다.
 */
const tint: Record<ProjectAccent, string> = {
  violet: "bg-violet-100 dark:bg-[color-mix(in_oklab,#c4b5fd_13%,#1c1c20)]",
  sky: "bg-sky-100 dark:bg-[color-mix(in_oklab,#7dd3fc_12%,#1c1c20)]",
  emerald: "bg-emerald-100 dark:bg-[color-mix(in_oklab,#6ee7b7_11%,#1c1c20)]",
  rose: "bg-rose-100 dark:bg-[color-mix(in_oklab,#fda4af_12%,#1c1c20)]",
  amber: "bg-amber-100/70 dark:bg-[color-mix(in_oklab,#fcd34d_9%,#1c1c20)]",
};

const frameBase =
  "relative overflow-hidden rounded-lg bg-bg shadow-[0_12px_40px_-12px_rgb(0_0_0/0.25)] ring-1 ring-black/8 transition duration-500 ease-out motion-safe:group-hover:-translate-y-1 sm:rounded-xl dark:shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] dark:ring-white/12";

// 16:10 배경 안에서 상하좌우 여백이 거의 같도록 가운데에 둔다
const frameShape = {
  wide: "aspect-video w-[84%]",
  tall: "aspect-[3/4] w-[39%]",
};

const sizes = {
  card: "(max-width: 640px) 90vw, 26rem",
  hero: "(max-width: 1024px) 90vw, 54rem",
};

/** 실제 스크린샷을 색 배경 위 창 프레임에 얹은 대표 이미지 */
export function ProjectCover({ project, variant = "card", eager }: Props) {
  const cover = projectCoverImage(project);

  return (
    <div
      className={[
        "flex aspect-[16/10] w-full items-center justify-center overflow-hidden",
        tint[project.accent],
      ].join(" ")}
    >
      {cover ? (
        <div
          className={[frameBase, frameShape[project.coverLayout ?? "wide"]].join(
            " ",
          )}
        >
          <ProjectScreenshot
            src={cover.src}
            alt={cover.alt}
            variant="cover"
            sizes={sizes[variant]}
            eager={eager}
          />
        </div>
      ) : null}
    </div>
  );
}
