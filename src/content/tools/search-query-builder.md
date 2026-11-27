---
slug: "search-query-builder"
title: "Google Search Operators Query Builder (Free)"
description: "Free Google search operator builder: combine site:, intitle:, inurl:, filetype:, exact phrases and exclusions into queries for audits and outreach."
h1: "Search Query Builder: advanced Google operators made easy"
tier: "native"
component: "SearchQueryBuilder"
primaryKeyword: "google search operators"
cardText: "Combine site:, intitle:, inurl:, filetype: and 15 more operators into one query, then run it on Google."
upsellService: "technical-seo-audit"
order: 2
faq:
  - q: "Which Google search operators still work?"
    a: "site:, intitle:, inurl:, filetype:, exact phrase quotes, the minus sign, OR and allinanchor: still work reliably. link: and cache: have been retired by Google and are kept for reference only. inanchor: and daterange: work inconsistently."
  - q: "Is site: an accurate count of indexed pages?"
    a: "No. The number Google shows for site: is a rough estimate. Use Search Console's page indexing report for real figures, and site: to find examples of what is indexed."
  - q: "What is the difference between filetype: and ext:?"
    a: "They behave almost the same in Google today. Both restrict results to a file extension such as pdf, xlsx or docx."
  - q: "How do I find guest post opportunities?"
    a: "Combine your topic with an exact phrase such as \"write for us\" or \"guest post guidelines\", and exclude job boards with a minus sign."
  - q: "Does this tool send my queries anywhere?"
    a: "No. The query is assembled in your browser. When you click search, your browser opens Google directly."
---

## How to use the query builder

Fill in only the fields you need; empty fields are ignored. The generated query updates as you type and follows the same order every time: base query first, then each operator. When it looks right, click "Search on Google" to open it in a new tab, or "Copy query" to paste it into a report, a rank tracker or a spreadsheet of prospecting queries.

A few combinations we use every week:

- **Indexed duplicates:** `site:yourstore.com inurl:?sort=` shows sort-order URLs Google has indexed. Swap in `inurl:filter`, `inurl:page=` or your own parameter names.
- **Thin or test pages:** `site:yourdomain.com intitle:test` or `intitle:"untitled"` finds pages nobody meant to publish.
- **Documents:** `site:yourdomain.com filetype:pdf` lists PDFs that may be ranking instead of the HTML pages you want.
- **Outreach:** `"write for us" ecommerce -jobs` or `intitle:"resources" inurl:links your-topic` finds sites that accept contributions or keep link lists.
- **Competitor content:** `site:competitor.com intitle:guide` shows what a competitor has published on a topic.

## How to read the results

Operators return samples, not complete lists. Treat the results as evidence that a pattern exists. If `inurl:?sort=` returns any results at all, Google is indexing parameter URLs, and the fix applies to every one of them, not just the ten you can see.

Note that two operators in the list are legacy. Google retired `link:` and `cache:`; they are included because older playbooks use them, but they no longer return reliable data. For real backlink data, use the [Backlink Checker](/tools/backlink-checker/).

## How to act on what you find

Indexed filters, sort orders and internal search pages usually need canonical tags, noindex rules or crawl controls. Fixing those across a whole store is the core of our [technical SEO audit](/services/technical-seo-audit/), which turns findings like these into ranked, developer-ready tickets.

If your outreach queries turn up good prospects but you do not have the time to pursue them, [link building](/services/link-building/) is the service that takes it over. And if you want someone to review your findings with you, a single [SEO consulting](/services/seo-consulting/) session is often enough to agree priorities.
