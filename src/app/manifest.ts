import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

// Required by `output: 'export'`.
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: 'हज उमरा सर्विस',
    description: site.shortDescription,
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#04180f',
    theme_color: '#0b5d3b',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['travel', 'lifestyle', 'business'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    shortcuts: [
      { name: 'Call the office', url: `tel:+91${site.phone}` },
      { name: 'Umrah packages', url: '/en/umrah-packages' },
      { name: 'Contact', url: '/en/contact' },
    ],
  }
}