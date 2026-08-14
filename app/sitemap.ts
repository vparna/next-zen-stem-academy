import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.nextzenacademy.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/stem-labs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/summer-camps`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/hours`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/interest`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/campinterest`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/robotics-enrollment`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/campuses/future-expansion`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Add childcare program pages
  const programSlugs = [
    "little-blossoms",
    "tiny-explorers",
    "curious-cubs",
    "little-discoverers",
    "pre-k",
    "summer-camps",
  ];

  const programPages: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
    url: `${siteUrl}/programs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...programPages];
}
