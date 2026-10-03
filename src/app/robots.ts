import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/data/site'

// Required by `output: 'export'` so the file is prerendered, not served at runtime.
export const dynamic = 'force-static'

/**
 * robots.txt.
 *
 * AI crawlers are explicitly allowed and named. Blocking them is a decision some
 * sites make, but for a business whose entire value is being found by people
 * searching in Hindi and Marathwada, being quotable by assistants is the point
 * — the GEO layer on this site only pays off if those crawlers can read it.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'Bingbot',
    'DuckAssistBot',
    'cohere-ai',
    'Meta-ExternalAgent',
    'YouBot',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Named explicitly for clarity, even though `*` already covers them —
      // it makes the intent legible to anyone reading robots.txt.
      ...aiAgents.map((agent) => ({ userAgent: agent, allow: '/' as const })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}