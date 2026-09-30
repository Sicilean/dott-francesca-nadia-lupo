import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactBand, PageIntro } from "@/components/site-chrome";
import { getPercorsi } from "@/lib/percorsi";

export const metadata: Metadata = {
  title: "Percorsi e aree di intervento",
  description:
    "Psicoterapia individuale e di coppia, sessuologia clinica, psico-cardiologia, psico-oncologia e terapia di gruppo a Milano.",
};

export default function PercorsiPage() {
  const areas = getPercorsi();

  return (
    <main>
      <PageIntro eyebrow="Percorsi" title={<>Ogni storia chiede<br /><span className="title-rule"><em>uno spazio diverso.</em></span></>}>
        Le aree di intervento riflettono una formazione ampia e un approccio costruito intorno alla persona, non a un
        protocollo uguale per tutti.
      </PageIntro>
      <section className="site-wrap py-14 lg:py-24">
        <div className="areas-grid">
          {areas.map((area) => (
            <article key={area.slug} className="area-card">
              <Link href={`/percorsi/${area.slug}`} aria-labelledby={`percorso-${area.slug}`}>
                <div className="area-card-art" aria-hidden>
                  <img src={area.image} alt="" />
                </div>
                <div className="area-card-copy">
                  {area.featured ? <p className="eyebrow">In evidenza</p> : null}
                  <h2 id={`percorso-${area.slug}`}>{area.title}</h2>
                  <p>{area.excerpt}</p>
                  <span className="text-link">
                    Parliamone <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
