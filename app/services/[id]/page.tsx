import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import {
  getProjectById,
  projectCoverImage,
  projects,
} from "@/data/projects";
import { resolveViewMode } from "@/lib/viewMode";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string | string[] }>;
};

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

export default async function ServiceDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const { view } = await searchParams;
  return <ProjectDetailView project={project} mode={resolveViewMode(view)} />;
}
