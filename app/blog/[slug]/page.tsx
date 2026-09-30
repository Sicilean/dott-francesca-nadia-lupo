import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, PageIntro } from "@/components/site-chrome";
import { PostBody, PostImage } from "@/components/post-body";
import { accentTitle } from "@/lib/accent-title";
import { sanityFetch } from "@/sanity/live";
import { POST_QUERY } from "@/sanity/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } });

  if (!post) return { title: "Articolo" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } });

  if (!post) notFound();

  const date = formatDate(post.publishedAt);

  return (
    <main>
      <PageIntro
        eyebrow={post.category || "Orizzonti psicologici"}
        title={accentTitle(post.title ?? "")}
        breadcrumb={
          <nav aria-label="Percorso" className="crumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Orizzonti</Link>
              </li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>
        }
      >
        {post.excerpt ? <p>{post.excerpt}</p> : null}
        <p className="mt-6 text-sm leading-6">
          {post.author?.name ? <span className="font-semibold text-primary">{post.author.name}</span> : null}
          {post.author?.name && date ? <span aria-hidden> · </span> : null}
          {date}
        </p>
      </PageIntro>
      <article className="site-wrap grid gap-8 py-14 lg:grid-cols-[160px_1fr] lg:py-20">
        <div className="hidden lg:block" aria-hidden />
        <div>
          <PostImage value={post.mainImage} priority />
          <PostBody value={post.body} />
          <p className="mt-14">
            <Link href="/blog" className="text-sm font-semibold text-primary">
              Torna agli articoli
            </Link>
          </p>
        </div>
      </article>
      <ContactBand />
    </main>
  );
}
