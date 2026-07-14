import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";

const BASE = "https://elvisfernandes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${BASE}/atlas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${BASE}/practice/ai-for-product-designers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${BASE}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
