import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, PageIntro } from "@/components/site-chrome";
import { PercorsoBody } from "@/components/percorso-body";
import { accentTitle } from "@/lib/accent-title";
import { getPercorso, getPercorsi } from "@/lib/percorsi";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPercorsi().map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getPercorso(slug);

  if (!area) return { title: "Percorso" };

  return {
    title: area.title,
    description: area.excerpt,
  };
}

export default async function PercorsoPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getPercorso(slug);

  if (!area) notFound();

  return (
    <main>
      <PageIntro
        eyebrow="Percorsi"
        title={accentTitle(area.title, { withRule: false })}
        breadcrumb={
          <nav aria-label="Percorso" className="crumbs">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/percorsi">Percorsi</Link>
              </li>
              <li aria-current="page">{area.title}</li>
            </ol>
          </nav>
        }
      >
        <p>{area.excerpt}</p>
      </PageIntro>
      <article className="site-wrap grid gap-8 py-14 lg:grid-cols-[160px_1fr] lg:py-20">
        <div className="hidden lg:block" aria-hidden />
        <div>
          <img src={area.image} alt="" className="mb-10 h-auto w-full" />
          <PercorsoBody blocks={area.body} />
          <p className="mt-14">
            <Link href="/percorsi" className="text-sm font-semibold text-primary">
              Torna ai percorsi
            </Link>
          </p>
        </div>
      </article>
      <ContactBand />
    </main>
  );
}
