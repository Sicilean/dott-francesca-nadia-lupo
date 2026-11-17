# Francesca Nadia Lupo

Sito Next.js. Sviluppo locale con `npm run dev`.

Il blog arriva da Sanity (`sanity/`). Lo studio Sanity è montato nel sito su `/studio` (`sanity.config.ts`, schemi in `studio/schemaTypes/`). I percorsi (`/percorsi` e `/percorsi/[slug]`) sono dati in `lib/percorsi.ts`, non documenti Sanity. Le loro foto stanno in `public/percorsi/`.

Il sito è online e indicizzabile: pagina di attesa e `proxy.ts` sono stati rimossi al lancio. `/studio` è `noindex`. SEO, dati strutturati e `llms.txt` sono descritti in `README.md`.

## Commit e deploy

- Remote: `https://github.com/Sicilean/dott-francesca-nadia-lupo.git`, branch `main`.
- Non committare `.env`, `.env.local`, token, né `commit-prefix.local`.
- Il tip commit usa autore `Sicilean <dev@sicilean.tech>` e subject `[rita] | ...`.
- Vercel è opt-in. Aggiungi `[vercel deploy francescanadialupo-site]` al body del tip solo quando viene chiesto il deploy. Senza quel tag `scripts/vercel-ignore-build-step.sh` salta la build.
