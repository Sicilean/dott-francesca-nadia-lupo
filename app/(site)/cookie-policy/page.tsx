import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { PageIntro } from "@/components/site-chrome";
import { contactEmail } from "@/lib/contact";
import { legalUpdatedAt, professional } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description:
    "Quali cookie usa il sito della Dott.ssa Francesca Nadia Lupo: solo statistiche di Google Analytics, attive soltanto con il consenso del visitatore.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <main>
      <PageIntro eyebrow="Cookie" title="Cookie policy">
        Il sito usa cookie di statistica di Google Analytics solo se lei li accetta. Non ci sono cookie pubblicitari
        né di profilazione.
      </PageIntro>
      <section className="site-wrap pb-20 lg:grid lg:grid-cols-[160px_1fr] lg:gap-8 lg:pb-28">
        <div className="hidden lg:block" aria-hidden />
        <div className="legal-copy prose-copy max-w-3xl">
          <h2>Che cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file di testo che un sito salva nel browser. Alcuni servono al funzionamento del
            sito (cookie tecnici), altri misurano le visite (cookie di statistica) o tracciano il comportamento a fini
            pubblicitari (cookie di profilazione). I cookie non tecnici richiedono il consenso preventivo.
          </p>

          <h2>Cookie e strumenti usati da questo sito</h2>
          <ul>
            <li>
              <strong>Google Analytics 4 (solo con consenso).</strong> Fornito da Google Ireland Limited tramite
              Google Tag Manager. Serve a sapere, in forma aggregata, quante persone visitano il sito, quali pagine
              leggono e da dove arrivano. Installa i cookie <code>_ga</code> e <code>_ga_*</code>, con durata massima
              di 2 anni. Le funzioni pubblicitarie e la condivisione dei dati per la pubblicità sono disattivate. Finché
              non preme «Accetta», Google Analytics funziona in modalità senza cookie (Consent Mode) e non la
              riconosce.
            </li>
            <li>
              <strong>Statistiche senza cookie di Vercel.</strong> Il fornitore di hosting conta le visite in forma
              aggregata e anonima, senza salvare nulla nel browser e senza riconoscere chi torna sul sito.
            </li>
            <li>
              <strong>Memoria della sua scelta.</strong> La scelta su «Accetta» o «Rifiuta» resta salvata nel suo
              browser (archiviazione locale) per non ripresentarle il banner a ogni visita. È uno strumento tecnico.
            </li>
          </ul>
          <p>
            Solo chi gestisce i contenuti del sito, quando attiva l’anteprima degli articoli, riceve un cookie tecnico
            necessario a quella funzione. I visitatori non lo ricevono.
          </p>

          <h2>Come dare o revocare il consenso</h2>
          <p>
            Alla prima visita un banner le chiede se accettare o rifiutare i cookie di statistica. Può cambiare idea in
            qualsiasi momento con il pulsante «Preferenze cookie» in fondo a ogni pagina, oppure qui:{" "}
            <CookiePreferencesButton className="cursor-pointer text-primary underline underline-offset-[3px]" />. Se
            revoca il consenso, i cookie di Google Analytics vengono cancellati.
          </p>
          <p>
            Può anche cancellare o bloccare i cookie dalle impostazioni del suo browser, oppure installare il
            componente di disattivazione di Google Analytics (
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              tools.google.com/dlpage/gaoptout
            </a>
            ).
          </p>

          <h2>Trasferimento dei dati</h2>
          <p>
            I dati raccolti da Google Analytics possono essere trattati da Google LLC negli Stati Uniti. Google
            aderisce al Data Privacy Framework UE-USA. L’informativa di Google è su{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2>Link verso altri siti</h2>
          <p>
            Il sito contiene link a Google Maps (per le indicazioni verso gli studi) e alla pagina Facebook. Quando li
            apre lascia questo sito: valgono le informative e le cookie policy di quei servizi.
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
