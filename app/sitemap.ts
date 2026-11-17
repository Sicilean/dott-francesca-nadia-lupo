import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { SITEMAP_POSTS_QUERY } from "@/sanity/queries";
import { getPercorsi } from "@/lib/percorsi";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client
    .fetch<{ slug: string; updatedAt?: string | null }[]>(SITEMAP_POSTS_QUERY)
    .catch(() => []);

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/chi-sono`, changeFrequency: "yearly", priority: 0.9 },
    { url: `${siteUrl}/percorsi`, changeFrequency: "yearly", priority: 0.9 },
    ...getPercorsi().map((p) => ({
      url: `${siteUrl}/percorsi/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return pages;
}
