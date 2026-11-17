# Francesca Nadia Lupo

Sito vetrina della Dott.ssa Francesca Nadia Lupo. Il frontend pubblico è un'app Next.js (App Router) che legge i contenuti da Sanity. Lo studio Sanity è montato nel sito su `/studio`.

Repository: [Sicilean/dott-francesca-nadia-lupo](https://github.com/Sicilean/dott-francesca-nadia-lupo).

## Stack

- Next.js 16 e React 19, nella root del repository
- Tailwind CSS 4
- Sanity (`next-sanity`) per i contenuti pubblicati
- Sanity Studio 6 montato su `/studio` (`next-sanity` 13)

## Pagine

| Percorso | File |
| --- | --- |
| `/` | `app/(site)/page.tsx` |
| `/chi-sono` | `app/(site)/chi-sono/page.tsx` |
| `/percorsi` | `app/(site)/percorsi/page.tsx` |
| `/percorsi/[slug]` | `app/(site)/percorsi/[slug]/page.tsx` |
| `/blog` | `app/(site)/blog/page.tsx` |
| `/blog/[slug]` | `app/(site)/blog/[slug]/page.tsx` |
| `/privacy` | `app/(site)/privacy/page.tsx` |
| `/cookie-policy` | `app/(site)/cookie-policy/page.tsx` |
| `/studio` | `app/studio/[[...tool]]/page.tsx` (Sanity Studio) |

Il gruppo `(site)` non compare nell’URL. Header, footer e modale di contatto stanno in `components/site-frame.tsx`, montato da `app/(site)/layout.tsx`. La pagina di attesa è fuori da quel gruppo, quindi non ha navigazione. Uno slug sconosciuto passa da `app/(site)/[...slug]/page.tsx` e risponde 404 dentro il layout del sito.

Le query GROQ del blog stanno in `sanity/queries.ts`. Il client pubblico è in `sanity/client.ts` e usa la CDN Sanity. `sanity/live.ts` attiva l'anteprima live solo se è presente `SANITY_API_READ_TOKEN`.

I sei percorsi (terapia di gruppo, psicoterapia individuale, psicoterapia di coppia, sessuologia clinica, psico-cardiologia, psico-oncologia) non sono documenti Sanity. Testo, slug e percorso dell’immagine stanno in `lib/percorsi.ts`. Le foto, paesaggi e astratti da Pixabay, stanno in `public/percorsi/` e sono usate sia dalla griglia `/percorsi` sia dalla pagina di dettaglio. `generateStaticParams` pregenera gli slug conosciuti; uno slug assente risponde 404. Il corpo (paragrafo, titolo, elenco, citazione) è reso da `components/percorso-body.tsx`.

`lib/accent-title.tsx` spezza un titolo in parte principale e accento tipografico. Lo usano la pagina articolo e la pagina percorso.

Le sedi, il telefono e l’email stanno in `lib/contact.ts`. Le CTA, header e footer inclusi, aprono una modale (`components/contact-modal.tsx`) con telefono, email, Facebook e le quattro sedi. Non c’è un form: la dottoressa riceve solo per telefono ed email. Il footer elenca le quattro sedi. `/contatti` reindirizza alla home.

`components/text-motion.tsx` spezza i titoli grandi (hero, aperture di pagina, titoli di sezione) sulle righe già marcate da un a capo e le fa salire una alla volta, circa 1,15 secondi, con un breve ritardo tra le righe. La sottolineatura si disegna quando la riga è quasi arrivata. Sopratitoli e frasi brevi passano da una leggera sfocatura al fuoco. Con `prefers-reduced-motion: reduce` il testo resta fermo. I titoli delle schede in `/percorsi` non usano questa entrata, così lo spostamento a destra in hover resta indipendente.

## Sviluppo locale

```sh
npm install
cp .env.example .env.local
npm run dev
```

Il sito risponde su `http://localhost:3000`.

Variabili in `.env.local` (mai committare questo file):

| Variabile | Ruolo |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID progetto Sanity. Obbligatoria a build time. |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset, di solito `production`. Obbligatoria a build time. |
| `SANITY_API_READ_TOKEN` | Token viewer, solo server. Serve per bozze e live preview. |

Senza le due variabili `NEXT_PUBLIC_*`, `sanity/env.ts` interrompe il build.

Variabili opzionali (anche su Vercel):

| Variabile | Ruolo |
| --- | --- |
| `GOOGLE_SITE_VERIFICATION` | Valore del meta tag di Google Search Console. |
| `BING_SITE_VERIFICATION` | Valore del meta tag `msvalidate.01` di Bing Webmaster Tools. |

## SEO, IA e statistiche

- `app/sitemap.ts` elenca pagine, percorsi e articoli Sanity. `app/robots.ts` ammette tutti i crawler, compresi quelli delle IA, e indica la sitemap.
- `/llms.txt` e `/llms-full.txt` (`lib/llms.ts`) sono testi per le IA: profilo, percorsi, domande e risposte (`lib/faq.ts`), sedi e articoli. Riprendono solo contenuti già nel sito. Non sono collegati dalle pagine e inviano `X-Robots-Tag: noindex`, così non compaiono nei risultati di ricerca per le persone.
- Vercel Web Analytics e Speed Insights sono montati in `app/layout.tsx`. Non usano cookie. Vanno attivati dalla dashboard Vercel del progetto.
- Google Analytics 4 passa da Google Tag Manager (`GTM-5WL6HZJ3`, in `lib/site.ts`) con Consent Mode v2: `components/cookie-consent.tsx` carica il contenitore con i consensi negati e mostra il banner «Accetta / Rifiuta». La scelta resta in `localStorage` (`fnl-cookie-consent`); «Preferenze cookie» nel footer riapre il banner. Lo studio non carica GTM. Se cambiano i cookie o i fornitori, aggiorna `/cookie-policy` e `/privacy`.
- IndexNow: la chiave è `public/caa131664ee801f75ae8a17c8a6d4fff.txt`. Dopo un deploy a sito pubblico, `npm run indexnow` invia tutti gli URL della sitemap; `npm run indexnow -- /blog/slug` invia solo quelli indicati.

## Indicizzazione

Il sito è pubblico e indicizzabile (`robots` in `app/layout.tsx`, `app/robots.ts`). Restano fuori dai risultati di ricerca solo `/studio` (`noindex` e `Disallow`) e i testi per le IA `/llms.txt` e `/llms-full.txt` (header `noindex`, ma leggibili dai crawler). La pagina di attesa e `proxy.ts` sono stati rimossi al lancio.

Ogni pagina ha canonical, Open Graph e Twitter da `lib/metadata.ts`. L’immagine di anteprima predefinita è `app/opengraph-image.tsx`; percorsi e articoli usano la propria foto. I dati strutturati schema.org sono in `lib/structured-data.ts`: persona e sito su tutte le pagine (`app/(site)/layout.tsx`), `Service` e `BreadcrumbList` sui percorsi, `BlogPosting` e `BreadcrumbList` sugli articoli.

Il vecchio sito non ha URL archiviati né indicizzati. `app/(site)/[...slug]/page.tsx` reindirizza (308) gli indirizzi sconosciuti il cui ultimo segmento è lo slug di un percorso o di un articolo; il resto risponde 404. Se Search Console segnala altri vecchi URL in errore, aggiungili a `redirects()` in `next.config.ts`.

## Sanity Studio

Lo studio è dentro il sito: `http://localhost:3000/studio` in locale, `https://francescanadialupo.it/studio` online (raggiungibile anche durante la pagina di attesa). Si accede con l’account Sanity del progetto.

- Configurazione: `sanity.config.ts` (progetto `9rsacix1`, dataset `production`, `basePath: "/studio"`).
- Pagina: `app/studio/[[...tool]]/page.tsx` (`NextStudio`, `noindex`). È esclusa da `robots.txt` e dalle statistiche.
- Schemi: `studio/schemaTypes/`; struttura del menù: `studio/structure.ts`.
- Tipi TypeScript delle query: `npm run typegen` (usa `sanity.cli.ts`, scrive `sanity.types.ts`).
- Gli indirizzi autorizzati sono nelle impostazioni CORS del progetto Sanity: `http://localhost:3000`, `https://francescanadialupo.it`, `https://dott-francesca-nadia-lupo.vercel.app` (con credenziali). Un nuovo dominio va aggiunto lì.

`next.config.ts` disattiva la minificazione server di Turbopack: con Next 16.4 e `next-sanity` 13 rompeva il prerender di `<SanityLive />`.

## Git e commit

Il remote è `https://github.com/Sicilean/dott-francesca-nadia-lupo.git`, branch `main`.

I commit seguono la skill `/commit`:

- Tutti i commit del batch tranne l'ultimo usano l'identità Git della macchina.
- L'ultimo commit (tip) ha autore e committer `Sicilean <dev@sicilean.tech>`.
- Il subject del tip inizia con `[rita] | ` (etichetta in `.cursor/skills/lateral-thinking-engineering/commit/commit-prefix.local`, file locale e gitignored).

## Deploy Vercel

Il progetto Vercel builda solo il sito Next.js nella root. Un push su `main` non parte da solo.

La build parte solo se il messaggio del tip commit contiene il tag:

```text
[vercel deploy francescanadialupo-site]
```

`scripts/vercel-ignore-build-step.sh` è l'Ignored Build Step (`vercel.json`). Senza il tag lo script esce con codice 0 e Vercel salta la build. Con il tag esce con codice 1 e la build prosegue. Lo script legge solo il messaggio del commit più recente: un tag in un commit precedente non conta. Prima di ogni commit va detto esplicitamente se questo tag va aggiunto.

Il tag va nel body del tip, insieme a una modifica reale di file. Un commit vuoto con il solo tag non fa partire la build.

Vercel passa allo script solo l’inizio del messaggio (`VERCEL_GIT_COMMIT_MESSAGE` è troncato a circa 300 caratteri). Metti il tag nelle prime righe del body, subito dopo il subject: in fondo a un messaggio lungo viene tagliato e la build salta.
