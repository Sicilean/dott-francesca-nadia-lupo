import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactBand, PageIntro } from "@/components/site-chrome";
import { sanityFetch } from "@/sanity/live";
import { POSTS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Orizzonti psicologici",
  description:
    "Articoli, podcast e riflessioni di psicologia, relazioni e adolescenza della Dott.ssa Francesca Nadia Lupo.",
};

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });
  const featured = posts.find((post) => post.featured) ?? posts[0];

  return (
    <main>
      <PageIntro
        eyebrow="Orizzonti psicologici"
        title={
          <>
            Parole per
            <br />
            <span className="title-rule">
              <em>guardare oltre.</em>
            </span>
          </>
        }
      >
        Articoli, letture e conversazioni per avvicinare la psicologia alla vita quotidiana e aprire nuovi punti di
        vista.
      </PageIntro>
      <section className="site-wrap py-14 lg:py-24">
        {featured ? (
          <div className="bg-soft p-6 sm:p-8 md:p-12">
            <p className="eyebrow">In evidenza</p>
            <h2 className="section-title mt-5">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            {featured.author?.name ? (
              <p className="mt-4 text-sm font-semibold text-primary">{featured.author.name}</p>
            ) : null}
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              {featured.featuredExcerpt || featured.excerpt}
            </p>
          </div>
        ) : (
          <div className="bg-soft p-6 sm:p-8 md:p-12">
            <p className="eyebrow">In evidenza</p>
            <h2 className="section-title mt-5">I prossimi articoli arriveranno qui.</h2>
          </div>
        )}
        {posts.length > 0 ? (
          <div className="mt-16 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="post-row text-foreground">
                <div>
                  {post.category ? <p className="eyebrow">{post.category}</p> : null}
                  <h2 className="mt-2 font-fraunces text-2xl sm:text-3xl">{post.title}</h2>
                  {post.author?.name ? <p className="mt-2 text-sm text-primary">{post.author.name}</p> : null}
                  {post.excerpt ? <p className="mt-3 max-w-2xl text-muted-foreground">{post.excerpt}</p> : null}
                </div>
                <ArrowUpRight className="post-arrow" />
              </Link>
            ))}
          </div>
        ) : null}
      </section>
      <ContactBand />
    </main>
  );
}
