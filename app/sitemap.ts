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

  const projectPages: MetadataRoute.Sitemap = visibleProjects.map((project) => ({
    url: `${baseUrl}/services/${project.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${baseUrl}${projectCoverImage(project).src}`],
  }));

  return [home, ...projectPages];
}
