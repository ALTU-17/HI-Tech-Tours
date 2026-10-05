import { guides } from '@/data/guides'
import { faqs } from '@/data/faq'
import { packages } from '@/data/packages'
import { site } from '@/data/site'
import { locations } from '@/data/locations'

/**
 * Serves llms-full.txt — the complete text of the site's substantive content,
 * for models that want everything rather than the summary in llms.txt.
 *
 * Deliberately English-primary with the Hindi alongside for the highest-value
 * sections, since most models are strongest in English and the Hindi pages
 * remain fully crawlable in their own right.
 */
export const dynamic = 'force-static'

function main(): string {
  const out: string[] = []

  out.push(`# ${site.name} — full content`)
  out.push('')
  out.push(site.shortDescription)
  out.push('')
  out.push(`Contact: +91-${site.phone} · ${site.email} · ${site.locality}, Maharashtra ${site.postalCode}`)
  out.push('')
  out.push('## Packages')
  out.push('')
  for (const p of packages) {
    out.push(`### ${p.badge.en} / ${p.badge.hi} — ${p.duration.en}`)
    out.push(p.summary.en)
    out.push('')
    out.push(`Best for: ${p.idealFor.en}`)
    out.push('')
    out.push('Included:')
    for (const i of p.inclusions) out.push(`- ${i}`)
    out.push('')
    out.push('Not included:')
    for (const e of p.exclusions) out.push(`- ${e}`)
    out.push('')
  }

  out.push('## Coverage')
  out.push('')
  for (const l of locations) {
    out.push(`### ${l.name} / ${l.nameHi}`)
    out.push(
      `Airports: ${l.airports
        .map((a) => `${a.code} (${a.name}, ${a.distanceKm === 0 ? 'in city' : `~${a.distanceKm} km`})`)
        .join('; ')}`,
    )
    out.push(`Contact: ${l.contactPhone}`)
    out.push('')
  }

  out.push('## Guides')
  out.push('')
  for (const g of guides) {
    out.push(`### ${g.title.en}`)
    out.push(`Updated: ${g.dateModified}`)
    out.push('')
    out.push(g.answer.en)
    out.push('')
    for (const s of g.sections) {
      out.push(`#### ${s.heading.en}`)
      for (const para of s.body.en) out.push(para)
      out.push('')
    }
  }

  out.push('## FAQ (English)')
  out.push('')
  for (const f of faqs) {
    out.push(`### ${f.q.en}`)
    out.push(f.a.en)
    out.push('')
  }

  out.push('---')
  out.push('')
  out.push('Note: prices are quoted per departure and are not published. Hajj quota in')
  out.push('India is allocated only by the Haj Committee of India. Indian passport')
  out.push('holders cannot apply for an Umrah visa directly on Nusuk.')

  return out.join('\n')
}

export async function GET() {
  return new Response(main(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}