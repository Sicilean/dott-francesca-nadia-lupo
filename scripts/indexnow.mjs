#!/usr/bin/env node
/**
 * Invia a IndexNow (Bing, Yandex, Seznam, Naver… e di riflesso la ricerca di ChatGPT/Copilot)
 * tutti gli URL della sitemap pubblica.
 *
 *   npm run indexnow                 # tutti gli URL della sitemap
 *   npm run indexnow -- /blog/slug   # solo gli URL indicati
 *
 * Va lanciato dopo il deploy, a sito pubblico (senza pagina di attesa).
 * La chiave è pubblica per design: il file public/<chiave>.txt ne dimostra il possesso.
 */

const SITE = "https://francescanadialupo.it";
const KEY = "caa131664ee801f75ae8a17c8a6d4fff";

const paths = process.argv.slice(2);
const urls = paths.length > 0 ? paths.map((p) => new URL(p, SITE).toString()) : await sitemapUrls();

if (urls.length === 0) {
  console.error("Nessun URL da inviare.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${response.status} ${response.statusText} — ${urls.length} URL`);
if (!response.ok && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Sitemap non raggiungibile: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
