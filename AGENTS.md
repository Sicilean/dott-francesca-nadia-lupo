# Francesca Nadia Lupo

Sito Next.js. Sviluppo locale con `npm run dev`.

Il blog arriva da Sanity (`sanity/`). Lo studio è in `studio/` (`npm run studio`) e non fa parte del build Vercel. I percorsi (`/percorsi` e `/percorsi/[slug]`) sono dati in `lib/percorsi.ts`, non documenti Sanity.

`middleware.ts` mostra «In aggiornamento» solo su `francescanadialupo.it` e `www.francescanadialupo.it`. Il link `*.vercel.app` e localhost mostrano il sito completo. L’anteprima della pagina di attesa è `/in-aggiornamento`. `MAINTENANCE_MODE=false` la disattiva al deploy successivo. Tutto il sito è `noindex` finché è in lavorazione (`app/layout.tsx` e header nel middleware). Dettagli in `README.md`.

## Commit e deploy

- Remote: `https://github.com/Sicilean/dott-francesca-nadia-lupo.git`, branch `main`.
- Non committare `.env`, `.env.local`, token, né `commit-prefix.local`.
- Il tip commit usa autore `Sicilean <dev@sicilean.tech>` e subject `[rita] | ...`.
- Vercel è opt-in. Aggiungi `[vercel deploy francescanadialupo-site]` al body del tip solo quando viene chiesto il deploy. Senza quel tag `scripts/vercel-ignore-build-step.sh` salta la build.
