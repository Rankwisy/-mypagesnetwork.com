import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const faq = z.array(z.object({ q: z.string(), a: z.string() })).min(4).max(6);

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    name: z.string(),
    h1: z.string(),
    primaryKeyword: z.string(),
    order: z.number(),
    summary: z.string(),
    deliverables: z.array(z.string()).min(4),
    process: z.array(z.object({ title: z.string(), text: z.string() })).min(3).max(5),
    audience: z.array(z.string()).min(2),
    // Fill these in when pricing is decided; "TBD" renders as "On request".
    priceFrom: z.object({ audit: z.string(), project: z.string(), retainer: z.string() }),
    related: z.array(z.string()).min(2),
    tool: z.string(),
    faq,
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/tools" }),
  schema: z.object({
    slug: z.string(),
    title: z.string().max(60),
    description: z.string().max(155),
    h1: z.string(),
    tier: z.enum(["native", "landing"]),
    component: z.enum(["GoogleSearchSimulator", "SearchQueryBuilder", "AdsAbTest"]).optional(),
    primaryKeyword: z.string(),
    cardText: z.string(),
    upsellService: z.string(),
    order: z.number(),
    lang: z.literal("en").default("en"),
    faq,
  }),
});

export const collections = { services, tools };
