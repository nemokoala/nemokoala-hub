import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { getProjectById, projectCoverImage, projects } from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

// 아래 목록에 없는 id 는 요청 시 렌더링하지 않고 바로 404 로 응답한다.
// (기본값 true 면 없는 id 도 200 으로 not-found 본문을 내려 soft 404 가 된다.)
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "서비스를 찾을 수 없음 — nemokoala",
    };
  }

  const title = `${project.title} — ${project.tagline}`;
  const url = `/services/${project.id}`;
  const cover = projectCoverImage(project);

  return {
    title: `${project.title} — nemokoala`,
    description: project.userSummary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: project.userSummary,
      url,
      siteName: "nemokoala",
      type: "website",
      locale: "ko_KR",
      images: [{ url: cover.src, alt: cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.userSummary,
      images: [cover.src],
    },
  };
}

// searchParams 를 읽지 않아야 generateStaticParams 의 경로들이 실제로 정적 생성된다.
export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
