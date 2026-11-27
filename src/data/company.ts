// Single source of truth for every legal mention on the site.
// Footer, /legal/, /contact/, /privacy/ and JSON-LD all read from here.
export const company = {
  legalName: "MYPAGES L.L.C.",
  brand: "MYPAGES",
  entityType: "Wyoming Limited Liability Company (single-member, member-managed)",
  jurisdiction: "Wyoming, USA",
  stateEntityId: "2026-002031872",
  formationDate: "2026-07-15",
  registeredAgent: "Northwest Registered Agent Service Inc",
  registeredOffice: {
    street: "30 N Gould St Ste N",
    city: "Sheridan",
    region: "WY",
    postalCode: "82801",
    country: "US",
  },
  phone: "+1 209-860-5481",
  email: "contact@mypagesnetwork.com", // placeholder, to be confirmed
  managingMember: "Abdelkrim Aridhi",
  ein: null as string | null, // deliberately not published; rendered only if set
  domain: "https://mypagesnetwork.com",
  affiliates: [
    {
      legalName: "MYPAGES LTD",
      jurisdiction: "England & Wales",
      companyNumber: "15725544",
      registeredOffice: "24-26 Arcadia Avenue, London N3 2JU, United Kingdom",
    },
  ],
  ecosystem: [
    { name: "Isearchtrends", url: "https://isearchtrends.com" },
    { name: "MyPages Agency", url: "https://mypages.agency" },
    { name: "Rankwise", url: "https://rankwise.eu" },
  ],
} as const;

export const officeOneLine = (() => {
  const o = company.registeredOffice;
  return `${o.street}, ${o.city}, ${o.region} ${o.postalCode}, ${o.country}`;
})();

export const phoneHref = `tel:${company.phone.replace(/[^+\d]/g, "")}`;
