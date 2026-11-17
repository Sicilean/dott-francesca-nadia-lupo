import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageIntro } from "@/components/site-chrome";
import { contactEmail, contactPhone, contactPhoneHref, sedi } from "@/lib/contact";
import { legalUpdatedAt, professional } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Informativa privacy",
  description:
    "Come vengono trattati i dati personali raccolti tramite il sito della Dott.ssa Francesca Nadia Lupo.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro eyebrow="Privacy" title="Informativa privacy">
        Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR) per chi visita il sito e
        per chi contatta la titolare tramite i recapiti indicati.
      </PageIntro>
      <section className="site-wrap pb-20 lg:grid lg:grid-cols-[160px_1fr] lg:gap-8 lg:pb-28">
        <div className="hidden lg:block" aria-hidden />
        <div className="legal-copy prose-copy max-w-3xl">
          <h2>1. Titolare del trattamento</h2>
          <p>
            Titolare del trattamento è la {professional.honorific} {professional.name}, psicologa e psicoterapeuta
            iscritta all’{professional.register} n. {professional.registerNumber}. Per qualsiasi richiesta sui dati
            personali può scrivere a <a href={`mailto:${contactEmail}`}>{contactEmail}</a> o telefonare al{" "}
            <a href={contactPhoneHref}>{contactPhone}</a>.
          </p>
          <p>Studi professionali:</p>
          <ul>
            {sedi.map((sede) => (
              <li key={sede.maps}>{sede.lines.join(", ")}</li>
            ))}
          </ul>

          <h2>2. Quali dati trattiamo</h2>
          <p>
            <strong>Dati di navigazione.</strong> I sistemi che fanno funzionare il sito registrano, come avviene per
            ogni sito web, alcuni dati tecnici: indirizzo IP, tipo di browser, pagina richiesta, data e ora. Servono a
            erogare le pagine e a proteggere il sito da abusi. Non sono usati per identificare chi visita.
          </p>
          <p>
            <strong>Statistiche di visita.</strong> Il fornitore di hosting conta le visite in forma aggregata e
            anonima, senza cookie. Solo se lei lo accetta dal banner, Google Analytics 4 raccoglie inoltre dati di
            utilizzo del sito (pagine viste, durata, provenienza, tipo di dispositivo) tramite cookie, con le funzioni
            pubblicitarie disattivate.
          </p>
          <p>
            <strong>Dati comunicati da lei.</strong> Il sito non ha moduli di contatto. Se scrive un’email o
            telefona, sono trattati i dati che sceglie di comunicare, ad esempio nome, recapiti e il contenuto della
            richiesta. Se decide di comunicare dati relativi alla salute, questi sono usati solo per rispondere alla
            sua richiesta.
          </p>

          <h2>3. Perché li trattiamo e su quale base</h2>
          <ul>
            <li>
              Rispondere alla sua richiesta di informazioni o di un primo colloquio: misure precontrattuali adottate
              su sua richiesta (art. 6.1.b GDPR) e, per eventuali dati relativi alla salute, il suo consenso
              esplicito (art. 9.2.a GDPR).
            </li>
            <li>
              Garantire il funzionamento e la sicurezza del sito e produrre statistiche anonime senza cookie:
              legittimo interesse del titolare (art. 6.1.f GDPR).
            </li>
            <li>
              Statistiche di Google Analytics: il suo consenso (art. 6.1.a GDPR), che può revocare in qualsiasi
              momento da «Preferenze cookie» in fondo alla pagina.
            </li>
            <li>Adempiere a obblighi di legge, quando previsti (art. 6.1.c GDPR).</li>
          </ul>
          <p>Il conferimento dei dati è facoltativo, ma senza un recapito non è possibile rispondere.</p>

          <h2>4. Per quanto tempo li conserviamo</h2>
          <p>
            Le richieste ricevute sono conservate per il tempo necessario a gestire la richiesta. I dati di navigazione
            sono conservati dai fornitori tecnici per il periodo necessario alla sicurezza del servizio.
          </p>

          <h2>5. Chi può trattare i dati</h2>
          <p>
            I dati sono trattati dalla titolare. Per far funzionare il sito ci si avvale di fornitori che agiscono come
            responsabili del trattamento:
          </p>
          <ul>
            <li>Vercel Inc., per l’hosting del sito, i dati di navigazione e le statistiche anonime;</li>
            <li>Google Ireland Limited, per Google Analytics e Google Tag Manager, solo con il suo consenso;</li>
            <li>Sanity AS, per la gestione dei contenuti e delle immagini del blog;</li>
            <li>il fornitore della casella di posta elettronica della titolare, che riceve le email.</li>
          </ul>
          <p>
            Alcuni di questi fornitori hanno sede fuori dall’Unione europea. In questi casi il trasferimento avviene
            con le garanzie previste dagli artt. 44–49 GDPR. I dati non sono venduti né ceduti a terzi per finalità
            di marketing.
          </p>

          <h2>6. I suoi diritti</h2>
          <p>
            In ogni momento può chiedere l’accesso ai suoi dati, la rettifica, la cancellazione, la limitazione del
            trattamento, la portabilità o opporsi al trattamento (artt. 15–22 GDPR). Può revocare il consenso senza
            che questo incida sulla liceità del trattamento già avvenuto. Basta scrivere a{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
          <p>
            Se ritiene che il trattamento violi la normativa, può proporre reclamo al Garante per la protezione dei
            dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
          </p>

          <h2>7. Cookie</h2>
          <p>
            Il sito usa cookie di statistica di Google Analytics solo con il suo consenso, e nessun cookie
            pubblicitario o di profilazione. I dettagli sono nella <Link href="/cookie-policy">cookie policy</Link>.
          </p>

          <p className="legal-updated">Ultimo aggiornamento: {legalUpdatedAt}.</p>
        </div>
      </section>
    </main>
  );
}
