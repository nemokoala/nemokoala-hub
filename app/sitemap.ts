import type { MetadataRoute } from "next";
import { visibleProjects, projectCoverImage } from "@/data/projects";

const baseUrl = "https://nemokoala.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };

  const projectPages: MetadataRoute.Sitemap = visibleProjects.map((project) => {
    // 스크린샷이 아직 없는 프로젝트는 images 항목 자체를 넣지 않는다.
    const cover = projectCoverImage(project);

    return {
      url: `${baseUrl}/services/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      ...(cover ? { images: [`${baseUrl}${cover.src}`] } : {}),
    };
  });

  return [home, ...projectPages];
}
