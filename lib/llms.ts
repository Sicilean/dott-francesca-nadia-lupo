import { client } from "@/sanity/client";
import { SITEMAP_POSTS_QUERY } from "@/sanity/queries";
import { contactEmail, contactFacebookHref, contactPhone, sedi } from "@/lib/contact";
import { faqs } from "@/lib/faq";
import { getPercorsi, type PercorsoBlock } from "@/lib/percorsi";
import { professional, siteUrl } from "@/lib/site";

/**
 * Testi per i modelli linguistici (formato https://llmstxt.org).
 * Riprendono solo contenuti già pubblicati nel sito: non aggiungere informazioni nuove qui.
 */

type Post = { slug: string; title: string; excerpt?: string | null };

async function getPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(SITEMAP_POSTS_QUERY).catch(() => []);
}

function header() {
  const name = `${professional.honorific} ${professional.name}`;
  return [
    `# ${name} — ${professional.jobTitle}`,
    "",
    `> ${professional.summary} Iscritta all’${professional.register} dal ${professional.registerSince}, n. ${professional.registerNumber}. Riceve ${professional.audience} a Milano, Opera (MI) e Piacenza.`,
    "",
  ];
}

function contacts() {
  return [
    "## Contatti",
    "",
    `- Telefono: ${contactPhone}`,
    `- Email: ${contactEmail}`,
    `- Facebook: ${contactFacebookHref}`,
    "- Non è presente un modulo di contatto: si contatta per telefono o email.",
    "",
    "## Studi",
    "",
    ...sedi.map((sede) => `- ${sede.city}: ${sede.lines.join(", ")}`),
    "",
  ];
}

export async function buildLlmsTxt() {
  const posts = await getPosts();
  return [
    ...header(),
    "## Pagine principali",
    "",
    `- [Chi sono](${siteUrl}/chi-sono): formazione, iscrizione all’Ordine, esperienze cliniche e di ricerca.`,
    `- [Percorsi](${siteUrl}/percorsi): le sei aree di intervento.`,
    ...getPercorsi().map((p) => `- [${p.title}](${siteUrl}/percorsi/${p.slug}): ${p.excerpt}`),
    `- [Orizzonti psicologici](${siteUrl}/blog): articoli di psicologia.`,
    "",
    ...contacts(),
    "## Domande e risposte",
    "",
    ...faqs.map((faq) => `- ${faq.question} ${faq.answer}`),
    "",
    ...(posts.length > 0
      ? [
          "## Articoli",
          "",
          ...posts.map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt}` : ""}`),
          "",
        ]
      : []),
    "## Optional",
    "",
    `- [Testo completo per le IA](${siteUrl}/llms-full.txt): profilo, percorsi completi e domande frequenti in un unico file.`,
    `- [Informativa privacy](${siteUrl}/privacy)`,
    "",
  ].join("\n");
}

export async function buildLlmsFullTxt() {
  const posts = await getPosts();
  return [
    ...header(),
    "## Profilo professionale",
    "",
    `- ${professional.degree}.`,
    `- Iscrizione: ${professional.register}, dal ${professional.registerSince}, n. ${professional.registerNumber}.`,
    `- ${professional.specialization}.`,
    ...professional.qualifications.map((q) => `- ${q}.`),
    ...professional.experience.map((e) => `- ${e}.`),
    `- Dal 2008 svolge attività clinica con ${professional.audience}, occupandosi di ${professional.areasTreated.join(", ")}.`,
    `- Pagina: ${siteUrl}/chi-sono`,
    "",
    ...contacts(),
    "## Percorsi",
    "",
    ...getPercorsi().flatMap((p) => [
      `### ${p.title}`,
      "",
      `URL: ${siteUrl}/percorsi/${p.slug}`,
      "",
      ...p.body.flatMap(renderBlock),
    ]),
    "## Domande e risposte",
    "",
    ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    ...(posts.length > 0
      ? [
          "## Articoli",
          "",
          ...posts.map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt}` : ""}`),
          "",
        ]
      : []),
  ].join("\n");
}

function renderBlock(block: PercorsoBlock): string[] {
  switch (block.type) {
    case "paragraph":
      return [block.text, ""];
    case "heading":
      return [`#### ${block.text}`, ""];
    case "list":
      return [...block.items.map((item) => `- ${item}`), ""];
    case "quote":
      return [`> ${block.text} (${block.cite})`, ""];
  }
}

export function textResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Per le IA, non per i risultati di ricerca delle persone.
      "X-Robots-Tag": "noindex",
    },
  });
}
