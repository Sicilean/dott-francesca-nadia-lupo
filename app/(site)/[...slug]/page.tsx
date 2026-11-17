import { notFound, permanentRedirect } from "next/navigation";
import { getPercorso } from "@/lib/percorsi";
import { client } from "@/sanity/client";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const POST_EXISTS_QUERY = `defined(*[_type == "post" && slug.current == $slug][0]._id)`;

/**
 * Percorsi sconosciuti. I vecchi link del sito precedente non sono noti (né archiviati né indicizzati),
 * quindi si recuperano quelli con lo slug di un percorso o di un articolo (es. /psico-oncologia,
 * /viaggio-dentro-l-adolescenza/) con un redirect 308. Tutto il resto risponde 404.
 */
export default async function UnknownPage({ params }: PageProps) {
  const { slug } = await params;
  const last = slug.filter(Boolean).at(-1)?.toLowerCase();

  if (last) {
    if (getPercorso(last)) permanentRedirect(`/percorsi/${last}`);
    const isPost = await client.fetch<boolean>(POST_EXISTS_QUERY, { slug: last }).catch(() => false);
    if (isPost) permanentRedirect(`/blog/${last}`);
  }

  notFound();
}
