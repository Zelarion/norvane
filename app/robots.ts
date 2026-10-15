import type { MetadataRoute } from "next";

// Concept project: keep it out of search results.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
