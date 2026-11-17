import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageIntro } from "@/components/site-chrome";
import { contactEmail } from "@/lib/contact";
import { legalUpdatedAt, professional } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "Il sito della Dott.ssa Francesca Nadia Lupo non usa cookie di profilazione né tracciamenti di terze parti.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <main>
      <PageIntro eyebrow="Cookie" title="Cookie policy">
        Questo sito non usa cookie di profilazione né strumenti di tracciamento di terze parti. Per questo non le
        chiediamo un consenso all’ingresso.
      </PageIntro>
      <section className="site-wrap pb-20 lg:grid lg:grid-cols-[160px_1fr] lg:gap-8 lg:pb-28">
        <div className="hidden lg:block" aria-hidden />
        <div className="legal-copy prose-copy max-w-3xl">
          <h2>Che cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file di testo che un sito salva nel browser. Alcuni servono al funzionamento del
            sito (cookie tecnici), altri a tracciare il comportamento per fini pubblicitari (cookie di profilazione).
            Solo questi ultimi richiedono il consenso preventivo.
          </p>

          <h2>Cookie usati da questo sito</h2>
          <ul>
            <li>
              <strong>Nessun cookie di profilazione o pubblicitario.</strong>
            </li>
            <li>
              <strong>Nessun cookie di terze parti.</strong> Caratteri tipografici e immagini sono serviti dal sito
              stesso o dalla rete di distribuzione dei contenuti, senza cookie.
            </li>
            <li>
              <strong>Statistiche senza cookie.</strong> Le visite sono contate in forma aggregata e anonima, senza
              salvare nulla nel browser e senza riconoscere chi torna sul sito.
            </li>
          </ul>
          <p>
            Solo chi gestisce i contenuti del sito, quando attiva l’anteprima degli articoli, riceve un cookie tecnico
            necessario a quella funzione. I visitatori non lo ricevono.
          </p>

          <h2>Link verso altri siti</h2>
          <p>
            Il sito contiene link a Google Maps (per le indicazioni verso gli studi) e alla pagina Facebook. Quando li
            apre lascia questo sito: valgono le informative e le cookie policy di quei servizi.
          </p>

          <h2>Come gestire i cookie</h2>
          <p>
            Può cancellare o bloccare i cookie dalle impostazioni del suo browser. Su questo sito non cambia nulla,
            perché non ne vengono installati per i visitatori.
          </p>

          <h2>Titolare e contatti</h2>
          <p>
            Titolare del trattamento è la {professional.honorific} {professional.name}. Per domande scriva a{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Il trattamento dei dati personali è descritto
            nell’<Link href="/privacy">informativa privacy</Link>.
          </p>

          <p className="legal-updated">Ultimo aggiornamento: {legalUpdatedAt}.</p>
        </div>
      </section>
    </main>
  );
}
