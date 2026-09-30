import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactBand, PageIntro } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Percorsi e aree di intervento",
  description:
    "Psicoterapia individuale e di coppia, sessuologia clinica, psico-cardiologia, psico-oncologia e terapia di gruppo a Milano.",
};

const areas = [
  ["Psicoterapia individuale", "Uno spazio personale per attraversare difficoltà, cambiamenti e domande che chiedono ascolto."],
  ["Psicoterapia di coppia", "Un percorso per comprendere le dinamiche della relazione e riaprire possibilità di dialogo."],
  ["Sessuologia clinica", "Consulenza e terapia per vivere la dimensione affettiva e sessuale con maggiore consapevolezza."],
  ["Psico-cardiologia", "Supporto psicologico per persone con patologie cardiovascolari e per i loro familiari."],
  ["Psico-oncologia", "Accompagnamento nelle diverse fasi della malattia oncologica, per la persona e per chi le è vicino."],
  ["Terapia di gruppo", "Il gruppo come luogo protetto di confronto, riconoscimento e trasformazione condivisa."],
] as const;

export default function PercorsiPage() {
  return (
    <main>
      <PageIntro eyebrow="Percorsi" title={<>Ogni storia chiede<br /><span className="title-rule"><em>uno spazio diverso.</em></span></>}>
        Le aree di intervento riflettono una formazione ampia e un approccio costruito intorno alla persona, non a un
        protocollo uguale per tutti.
      </PageIntro>
      <section className="site-wrap py-14 lg:py-24">
        <div className="areas-grid">
          {areas.map(([title, text], index) => (
            <article key={title} className={`area-card area-card-${index + 1}`}>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link href="/contatti" className="text-link">
                Parliamone <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
