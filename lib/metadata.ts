import type { Metadata } from "next";
import { siteName } from "@/lib/site";

/** Immagine generata da `app/opengraph-image.tsx`. */
const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Dott.ssa Francesca Nadia Lupo, psicologa e psicoterapeuta a Milano",
};

type PageMetaInput = {
  title: string;
  description: string;
  /** Percorso canonico, es. "/chi-sono". */
  path: string;
  /** Titolo per anteprime social, se diverso da quello della scheda. */
  socialTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
};

/**
 * Metadata di una pagina: canonical, Open Graph e Twitter coerenti.
 * Senza `images` usa l’immagine generata da `app/opengraph-image.tsx`.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  type = "website",
  publishedTime,
  images,
}: PageMetaInput): Metadata {
  const ogTitle = socialTitle ?? `${title} — ${siteName}`;
  const ogImages = images ?? [defaultImage];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName,
      locale: "it_IT",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
