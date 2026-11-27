// JSON-LD builders. Everything company-related comes from company.ts.
import { company } from "../data/company.ts";

const SITE = company.domain;
export const ORG_ID = `${SITE}/#organization`;
export const SITE_ID = `${SITE}/#website`;

export const abs = (path: string) => new URL(path, SITE).href;

export function organization() {
  const o = company.registeredOffice;
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: company.brand,
    legalName: company.legalName,
    url: `${SITE}/`,
    logo: abs("/icon-512.png"),
    image: abs("/og-default.png"),
    telephone: company.phone,
    email: company.email,
    foundingDate: company.formationDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: o.country,
    },
    areaServed: ["US", "EU", "GB"],
    sameAs: company.ecosystem.map((e) => e.url),
    ...(company.ein ? { taxID: company.ein } : {}),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE}/`,
    name: company.brand,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbs(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqPage(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function service(name: string, description: string, path: string) {
  return {
    "@type": "Service",
    name,
    description,
    url: abs(path),
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: ["US", "EU", "GB"],
  };
}

export function softwareApp(name: string, description: string, path: string) {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url: abs(path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  };
}
