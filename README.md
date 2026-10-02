# Francesca Nadia Lupo

Sito vetrina della Dott.ssa Francesca Nadia Lupo. Il frontend pubblico è un'app Next.js (App Router) che legge i contenuti da Sanity. Lo studio Sanity vive in `studio/` ed è un'app separata: non viene buildata da Vercel.

Repository: [Sicilean/dott-francesca-nadia-lupo](https://github.com/Sicilean/dott-francesca-nadia-lupo).

## Stack

- Next.js 15 e React 19, nella root del repository
- Tailwind CSS 4
- Sanity (`next-sanity`) per i contenuti pubblicati
- Sanity Studio 6 in `studio/`

## Pagine

| Percorso | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/chi-sono` | `app/chi-sono/page.tsx` |
| `/percorsi` | `app/percorsi/page.tsx` |
| `/percorsi/[slug]` | `app/percorsi/[slug]/page.tsx` |
| `/blog` | `app/blog/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` |

Le query GROQ del blog stanno in `sanity/queries.ts`. Il client pubblico è in `sanity/client.ts` e usa la CDN Sanity. `sanity/live.ts` attiva l'anteprima live solo se è presente `SANITY_API_READ_TOKEN`.

I sei percorsi (terapia di gruppo, psicoterapia individuale, psicoterapia di coppia, sessuologia clinica, psico-cardiologia, psico-oncologia) non sono documenti Sanity. Testo, slug e immagine stanno in `lib/percorsi.ts`. La griglia `/percorsi` e la pagina di dettaglio leggono da lì. `generateStaticParams` pregenera gli slug conosciuti; uno slug assente risponde 404. Il corpo (paragrafo, titolo, elenco, citazione) è reso da `components/percorso-body.tsx`. Le immagini referenziate stanno in `public/`.

`lib/accent-title.tsx` spezza un titolo in parte principale e accento tipografico. Lo usano la pagina articolo e la pagina percorso.

Le sedi, il telefono e l’email stanno in `lib/contact.ts`. Il form si apre in una modale (`components/contact-modal.tsx`) dalle CTA, header e footer inclusi. Il footer elenca le tre sedi. `/contatti` reindirizza alla home.

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

## Sanity Studio

```sh
npm install --prefix studio
npm run studio
```

Lo studio usa il progetto `9rsacix1` e il dataset `production` (`studio/sanity.config.ts`). Gli schemi dei documenti sono in `studio/schemaTypes/`. Il deploy dello studio è `npm run deploy --prefix studio` (`sanity deploy`), separato dal deploy Vercel del sito.

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

`scripts/vercel-ignore-build-step.sh` è l'Ignored Build Step (`vercel.json`). Senza il tag lo script esce con codice 0 e Vercel salta la build. Con il tag esce con codice 1 e la build prosegue. Prima di ogni commit va detto esplicitamente se questo tag va aggiunto.

Il tag va nel body del tip, insieme a una modifica reale di file. Un commit vuoto con il solo tag non fa partire la build.
