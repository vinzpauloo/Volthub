import type { MetadataRoute } from "next";
import { resources } from "./(home)/components/homeData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volthub.ph";

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/case-studies",
  "/contact",
  "/insights",
  "/partners",
  "/pricing",
  "/products",
  "/sectors",
  "/sectors/commercial",
  "/sectors/industrial",
  "/sectors/residential",
  "/sectors/rural-projects",
  "/sectors/smart-cities",
  "/services",
  "/services/ev-charging",
  "/services/solar-installation",
  "/solutions",
  "/tools/ev-charger-roi-calculator",
  "/tools/roi-calculator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const blogRoutes = resources
    .filter((resource) => resource.slug)
    .map((resource) => ({
      url: `${siteUrl}/blog/${resource.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...blogRoutes];
}
