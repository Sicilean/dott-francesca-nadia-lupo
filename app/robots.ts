import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Tutti i crawler sono ammessi, compresi quelli dei motori di ricerca con IA
 * e degli assistenti (ChatGPT, Claude, Perplexity, Gemini, Apple, Meta…),
 * così il sito può essere letto e citato nelle risposte generate.
 * Lo studio resta escluso.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

const disallow = ["/studio"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
