import { buildLlmsTxt } from '@/data/feed'

/**
 * Serves llms.txt (llmstxt.org) at the site root.
 *
 * Generated from the same data as the site so it can never contradict the
 * pages. Prerendered to a static file by `output: 'export'`.
 */
export const dynamic = 'force-static'

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}