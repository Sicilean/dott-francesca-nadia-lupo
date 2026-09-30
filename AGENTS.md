# Francesca Nadia Lupo

Sito Next.js. Sviluppo locale con `npm run dev`.

Contenuti da Sanity (`sanity/`). Lo studio è in `studio/` (`npm run studio`) e non fa parte del build Vercel.

## Commit e deploy

- Remote: `https://github.com/Sicilean/dott-francesca-nadia-lupo.git`, branch `main`.
- Non committare `.env`, `.env.local`, token, né `commit-prefix.local`.
- Il tip commit usa autore `Sicilean <dev@sicilean.tech>` e subject `[rita] | ...`.
- Vercel è opt-in. Aggiungi `[vercel deploy francescanadialupo-site]` al body del tip solo quando viene chiesto il deploy. Senza quel tag `scripts/vercel-ignore-build-step.sh` salta la build.
