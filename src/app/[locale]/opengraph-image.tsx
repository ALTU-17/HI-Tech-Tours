import { ImageResponse } from 'next/og'

import { site } from '@/data/site'
import { locales } from '@/i18n'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Required by `output: 'export'` — without it the generated PNG route is
// treated as dynamic and cannot be prerendered.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/**
 * Social sharing card.
 *
 * Generated at build time by Satori and prerendered to a static PNG — no image
 * CDN, no runtime cost. Rendered for both locales so a Hindi link does not
 * share an English-looking card.
 *
 * The background is drawn in CSS here rather than as an image: at 1200×630 an
 * inline pattern costs nothing and keeps the asset fully reproducible.
 */
export default async function OpengraphImage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as never) ? params.locale : 'en'
  const isHi = locale === 'hi'

  const headline = isHi
    ? { top: 'उमराह के सपनों को', bottom: 'हक़ीक़त में बदलें' }
    : { top: 'Turn the dream of Umrah', bottom: 'into something real' }

  const eyebrow = isHi ? 'जालना, मराठवाड़ा से हज व उमरा' : 'Haj & Umrah from Jalna, Marathwada'
  const tagline = isHi ? 'मराठवाड़ा की हज व उमरा सेवा' : 'Marathwada’s Haj & Umrah desk'
  const wordmark = isHi ? 'हज उमरा सर्विस' : 'HAJ UMRAH SERVICES'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#04180f',
          backgroundImage:
            'linear-gradient(135deg, rgba(11,93,59,0.55) 0%, rgba(4,24,15,0) 55%), radial-gradient(circle at 85% 15%, rgba(201,162,39,0.22) 0%, rgba(4,24,15,0) 60%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row: badge + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <g fill="none" stroke="#C9A227" strokeWidth="2.4" opacity="0.95">
              <path d="M32 6 L58 32 L32 58 L6 32 Z" />
              <circle cx="32" cy="32" r="25" opacity="0.4" />
            </g>
            <rect x="21" y="21" width="22" height="22" rx="2" fill="#FBF7EF" />
            <rect x="21" y="29" width="22" height="3.4" fill="#C9A227" />
            <rect x="32" y="21" width="3.4" height="22" fill="#C9A227" opacity="0.6" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, color: '#FBF7EF', letterSpacing: '2px' }}>
              HI-TECH
            </span>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 600,
                color: '#F0D98A',
                letterSpacing: '4px',
                marginTop: '4px',
              }}
            >
              {wordmark}
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#6FD4A8',
              letterSpacing: '4px',
              marginBottom: '22px',
            }}
          >
            {eyebrow.toUpperCase()}
          </span>
          <span
            style={{ fontSize: '68px', fontWeight: 700, color: '#FBF7EF', lineHeight: 1.05, maxWidth: '980px' }}
          >
            {headline.top}
          </span>
          <span
            style={{
              fontSize: '68px',
              fontWeight: 700,
              color: '#C9A227',
              lineHeight: 1.05,
              maxWidth: '980px',
            }}
          >
            {headline.bottom}
          </span>
        </div>

        {/* Footer row: gold rule + tagline + phone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(201,162,39,0.4)',
            paddingTop: '26px',
          }}
        >
          <span style={{ fontSize: '22px', color: 'rgba(251,247,239,0.72)' }}>{tagline}</span>
          <span style={{ fontSize: '26px', fontWeight: 700, color: '#F0D98A' }}>
            +91 {site.phone}
          </span>
        </div>
      </div>
    ),
    size,
  )
}