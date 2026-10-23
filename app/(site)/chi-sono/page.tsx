import type { Metadata } from "next";
import Image from "next/image";
import { ContactBand, PageIntro } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Formazione, esperienza e approccio della Dott.ssa Francesca Nadia Lupo, psicologa e psicoterapeuta a Milano.",
};

export default function ChiSonoPage() {
  return (
    <main>
      <PageIntro eyebrow="Chi sono" title={<>La cura nasce<br /><span className="title-rule"><em>dall’ascolto.</em></span></>}>
        Psicologa, Psicoterapeuta ad orientamento psicoanalitico individuale e di gruppo, specialista in sessuologia
        clinica e terapia di coppia.
      </PageIntro>
      <section className="site-wrap grid gap-10 py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12 lg:py-24">
        <div className="space-y-10">
          <div>
            <p className="eyebrow">Formazione e metodo</p>
            <h2 className="section-title mt-4">Uno sguardo clinico, una relazione umana.</h2>
          </div>
          <div className="prose-copy">
            <p>
              Ha conseguito master in ambiti quali la Psico-Oncologia, la Psico-Cardiologia e l’applicazione delle
              ipnosuggestioni nella patologia organica. La Dottoressa Francesca Nadia Lupo ha conseguito la Laurea in
              Psicologia clinica e di comunità presso l’Università degli Studi di Palermo nel 1999. È iscritta,
              all’Ordine Degli Psicologi della Lombardia dal 2004 n.03/8054. Nel 2008 si è specializzata con lode in
              Psicoterapia individuale e di gruppo ad indirizzo psicoanalitico presso la COIRAG Scuola di
              Specializzazione in Psicoterapia Psicoanalitica Milano.
            </p>
            <p>
              Titolo della tesi:{" "}
              <strong className="thesis-title">
                “Nel gruppo di pazienti oncologici: quale rispecchiamento? frammenti di uno specchio…”
              </strong>
              .
            </p>
            <p>
              Ha frequentato il Corso di formazione in Sessuologia Clinica dell’AISPA di Milano che le ha permesso di
              approfondire le problematiche della persona inerenti la sessualità e la coppia. È abilitata all’esercizio
              dell’E.M.D.R. (Eye Movement Desensitization and Reprocessing), trattamento di comprovata efficacia per il
              Disturbo da stress post-traumatico e problemi legati ad esperienze traumatiche o emotivamente stressanti.
            </p>
            <p>
              È in formazione continua con corsi di approfondimento e aggiornamento relativi alla Psicotraumatologia
              organizzati dall’Associazione EMDR Italia, alla Psiconcologia organizzati dall’Associazione S.I.P.O.
              (Società Italiana di Psiconcologia) alla Sessuologia organizzati dalla A.I.S.P.A. (Associazione Italiana
              Sessuologia Psicologia Applicata).
            </p>
          </div>
          <blockquote className="pull-quote">
            “Dare forma alle parole permette di guardare ciò che viviamo da una prospettiva nuova.”
          </blockquote>
        </div>
        <div className="portrait-slot portrait-photo lg:order-first">
          <Image
            src="/foto-sito.jpg"
            alt="Dott.ssa Francesca Nadia Lupo"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
      </section>
      <section className="site-wrap grid gap-10 py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-12 lg:py-24">
        <div className="space-y-10">
          <div>
            <p className="eyebrow">Esperienze professionali</p>
            <h2 className="section-title mt-4">
              Clinica, formazione
              <br />
              <em>e ricerca.</em>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              Ha lavorato presso l’Istituto Europeo di Oncologia maturando un’esperienza decennale in ambito della
              Psico-Oncologia. Ha ricoperto il ruolo di Responsabile del Servizio di Psicologia Clinica presso Il Centro
              Cardiologico Monzino dove svolgeva mansioni di responsabilità relative all’area clinica, di formazione e
              di ricerca scientifica.
            </p>
            <p>
              Negli anni in qualità di docente ha organizzato corsi dedicati a temi psicologici in relazione alla
              patologia oncologica, cardiologica, alla sessualità e master universitari presso l’Università degli Studi
              di Milano. Vanta numerose pubblicazioni relative a studi scientifici redatti dalla rivista internazionale{" "}
              <i>“Palliative and Supportive Care”</i>, dal Congresso Mondiale IPOS (International Psyco-oncology
              Society) e dalla Società Italiana di Psico-oncologia SIPO.
            </p>
            <p>È co-fondatrice dello Studio di Psicoterapia Polispecialistico ConTesto (Opera).</p>
            <p>
              È fondatrice del progetto <i>“Dalla Cura al Prendersi Cura”</i> che ha lo scopo di valorizzare la
              collaborazione tra lo psicologo e il medico di famiglia per una dimensione di cura globale: lo psicologo e
              il medico possono lavorare insieme per ascoltare la complessità della persona.
            </p>
            <p>
              Dal 2008 ad oggi svolge attività clinica rivolgendosi ad adulti e coppia occupandosi di disturbi
              dell’umore, disturbo d’ansia, disturbi del comportamento alimentare, traumi psicologici, crisi di coppia,
              disturbi della sfera sessuale, dipendenze da gioco d’azzardo e dipendenze affettive.
            </p>
          </div>
        </div>
        <div className="portrait-slot" aria-hidden />
      </section>
      <ContactBand />
    </main>
  );
}
