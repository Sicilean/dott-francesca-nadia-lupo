import { contactEmail, contactFacebookHref, contactPhoneHref, sedi } from "@/lib/contact";
import { getPercorsi, type Percorso } from "@/lib/percorsi";
import { professional, siteName, siteUrl } from "@/lib/site";

/**
 * Dati strutturati schema.org. Solo informazioni già pubblicate nel sito.
 * La persona ha un @id stabile, così pagine diverse si riferiscono alla stessa entità.
 */

export const personId = `${siteUrl}/#persona`;
export const websiteId = `${siteUrl}/#sito`;

const telephone = contactPhoneHref.replace("tel:", "");

function postalAddress(lines: readonly string[]) {
  const [street, cityLine] = lines;
  const match = cityLine.match(/^(\d{5})\s+(.+?)(?:\s*\((\w+)\))?$/);
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    postalCode: match?.[1],
    addressLocality: match?.[2] ?? cityLine,
    ...(match?.[3] ? { addressRegion: match[3] } : {}),
    addressCountry: "IT",
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: professional.name,
    honorificPrefix: professional.honorific,
    jobTitle: professional.jobTitle,
    description: professional.summary,
    url: `${siteUrl}/chi-sono`,
    image: `${siteUrl}/foto-sito.jpg`,
    email: contactEmail,
    telephone,
    sameAs: [contactFacebookHref],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Università degli Studi di Palermo" },
      { "@type": "EducationalOrganization", name: "COIRAG Scuola di Specializzazione in Psicoterapia Psicoanalitica Milano" },
    ],
    memberOf: { "@type": "Organization", name: professional.register },
    identifier: {
      "@type": "PropertyValue",
      propertyID: `Iscrizione ${professional.register}`,
      value: professional.registerNumber,
    },
    knowsAbout: [...getPercorsi().map((p) => p.title), "EMDR", ...professional.areasTreated],
    workLocation: sedi.map((sede) => ({
      "@type": "Place",
      name: `Studio di ${sede.city}`,
      address: postalAddress(sede.lines),
      hasMap: sede.maps,
    })),
  };
}

export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        inLanguage: "it-IT",
        about: { "@id": personId },
        publisher: { "@id": personId },
      },
      personSchema(),
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function percorsoSchema(percorso: Percorso) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: percorso.title,
    description: percorso.excerpt,
    url: `${siteUrl}/percorsi/${percorso.slug}`,
    image: `${siteUrl}${percorso.image}`,
    serviceType: percorso.title,
    provider: { "@id": personId },
    areaServed: ["Milano", "Opera", "Piacenza"].map((name) => ({ "@type": "City", name })),
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  authorName?: string | null;
  imageUrl?: string | null;
}) {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    url,
    mainEntityOfPage: url,
    inLanguage: "it-IT",
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
    author: post.authorName ? { "@type": "Person", name: post.authorName } : { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": websiteId },
  };
}
