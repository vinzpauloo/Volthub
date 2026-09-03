import type { MetadataRoute } from "next";
import { resources } from "./(home)/components/homeData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.volthub.ph";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services/charging-operation", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services/ev-charging", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services/solar-installation", priority: 0.9, changeFrequency: "weekly" },
  { path: "/app", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/ev-charger-roi-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/roi-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/packages", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectors", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sectors/residential", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectors/commercial", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sectors/industrial", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sectors/rural-projects", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sectors/smart-cities", priority: 0.6, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.6, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = resources
    .filter((resource) => resource.slug)
    .map((resource) => ({
      url: `${siteUrl}/blog/${resource.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...routes, ...blogRoutes];
}
