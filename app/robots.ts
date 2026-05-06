import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://bryangradi.com/sitemap.xml",
    host: "https://bryangradi.com",
  };
}
