import { buildFeed } from '@/data/feed'

/**
 * Serves the GEO feed at /data/packages.json.
 *
 * This is a Route Handler rather than a file in /public because the content is
 * generated from the same TypeScript data as the pages. It cannot drift out of
 * sync with the site, and regenerating it is just a rebuild.
 *
 * With `output: 'export'` Next prerenders GET handlers to a static file at
 * build time, so this stays a fully static, zero-cost endpoint.
 */
export const dynamic = 'force-static'

export async function GET() {
  return new Response(JSON.stringify(buildFeed(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}