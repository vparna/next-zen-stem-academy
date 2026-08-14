import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://www.nextzenacademy.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/api/", "/login", "/signup", "/forgot-password", "/reset-password", "/mobile/", "/checkout", "/payment"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
