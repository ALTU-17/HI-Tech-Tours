import { guides } from '@/data/guides'
import { locations, marathwadaRegion } from '@/data/locations'
import { packages } from '@/data/packages'
import { services } from '@/data/services'
import { faqs } from '@/data/faq'
import { SITE_URL, allContacts, site } from '@/data/site'

/**
 * The machine-readable feed.
 *
 * Published at /data/packages.json and referenced from llms.txt. This is the
 * single highest-leverage GEO artefact on the site: it gives an AI system a
 * clean, unambiguous, structured source of facts about this business instead of
 * making it infer them from page copy. It is generated from the same data the
 * pages render from, so it can never drift out of sync with the site.
 *
 * Note there is no price anywhere in here, for the same reason the pages
 * carry none: the rate is quoted per departure.
 */
export function buildFeed() {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    version: '1.0',
    updated: '2026-10-01',
    generator: `${SITE_URL}`,
    description:
      'Structured facts about Hi-Tech Haj Umrah Services, Aurangabad — packages, services, coverage and contact. Every field here is also published on the website.',

    organization: {
      name: site.name,
      nameLocal: site.nameHi,
      legalName: site.legalName,
      tagline: site.tagline,
      category: 'Travel agency — Haj and Umrah',
      url: SITE_URL,
      languages: ['en', 'hi'],
      telephone: `+91-${site.phone}`,
      whatsapp: `+91-${site.whatsapp}`,
      email: site.email,
      address: {
        street: site.street,
        locality: site.locality,
        region: site.region,
        postalCode: site.postalCode,
        country: site.country,
      },
      coordinates: site.geo,
      openingHours: 'Sa-Th 09:30-20:30',
      pricePolicy:
        'Packages are quoted per departure. No fixed price is published because the rate depends on travel month, group size and airline pricing.',
      compliance: {
        hajjQuota:
          'Hajj quota in India is allocated only by the Haj Committee of India (statutory body under the Ministry of Minority Affairs). No travel agency can allocate or sell it.',
        umrahVisa:
          'Indian passport holders cannot apply for an Umrah visa directly on the Nusuk platform. The visa is issued through an authorised agent channel.',
        reviews:
          'No aggregateRating is published. No customer review has been fabricated. Verified reviews will appear once collected from pilgrims.',
      },
      contacts: allContacts.map((c) => ({
        name: c.person,
        nameLocal: c.personHi,
        phone: c.phone,
        locality: c.locality,
        localityLocal: c.localityHi,
        type: c.isOffice ? 'head office' : 'branch',
      })),
    },

    coverage: {
      region: marathwadaRegion.name,
      regionLocal: marathwadaRegion.nameHi,
      description: marathwadaRegion.description.en,
      districts: locations.map((l) => ({
        name: l.name,
        nameLocal: l.nameHi,
        slug: l.slug,
        url: `${SITE_URL}/en/locations/${l.slug}`,
        kind: l.kind,
        airports: l.airports.map((a) => ({
          code: a.code,
          name: a.name,
          roadDistanceKm: a.distanceKm,
          approximateTravelTime: a.travelTime,
        })),
        contactPhone: l.contactPhone,
      })),
    },

    packages: packages.map((p) => ({
      slug: p.slug,
      name: p.badge.en,
      nameLocal: p.badge.hi,
      duration: p.duration.en,
      durationLocal: p.duration.hi,
      url: `${SITE_URL}/en/umrah-packages#${p.slug}`,
      summary: p.summary.en,
      summaryLocal: p.summary.hi,
      idealFor: p.idealFor.en,
      inclusions: p.inclusions,
      exclusions: p.exclusions,
      pricing: 'quoted per departure',
    })),

    services: services.map((s) => ({
      slug: s.slug,
      name: s.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${SITE_URL}/en/services/${s.slug}`,
      summary: s.summary.en,
      summaryLocal: s.summary.hi,
      covers: s.points.map((pt) => pt.en),
      coversLocal: s.points.map((pt) => pt.hi),
    })),

    guides: guides.map((g) => ({
      slug: g.slug,
      title: g.title.en,
      titleLocal: g.title.hi,
      url: `${SITE_URL}/en/guides/${g.slug}`,
      summary: g.description.en,
      keyAnswer: g.answer.en,
      keyAnswerLocal: g.answer.hi,
      datePublished: g.datePublished,
      dateModified: g.dateModified,
    })),

    faq: faqs.map((f) => ({
      question: f.q.en,
      questionLocal: f.q.hi,
      answer: f.a.en,
      answerLocal: f.a.hi,
    })),
  }
}

/** llms.txt is a plain-text rendering of the same facts. */
export function buildLlmsTxt() {
  const d = buildFeed()
  const lines: string[] = []

  lines.push('# Hi-Tech Haj Umrah Services')
  lines.push('')
  lines.push(`> ${site.tagline}. ${site.shortDescription}`)
  lines.push('')
  lines.push('Haj and Umrah travel agency based in Aurangabad, Maharashtra, serving pilgrims')
  lines.push('across all eight districts of Marathwada. Website is available in English')
  lines.push('and Hindi.')
  lines.push('')
  lines.push('## Key facts')
  lines.push('')
  lines.push(`- Location: ${site.locality}, Maharashtra ${site.postalCode}, India`)
  lines.push(`- Phone: +91-${site.phone}`)
  lines.push(`- WhatsApp: +91-${site.whatsapp}`)
  lines.push(`- Languages: English, Hindi`)
  lines.push(`- Service area: ${marathwadaRegion.name} (${marathwadaRegion.districts.join(', ')})`)
  lines.push(`- Umrah package tiers: ${packages.length} listed`)
  lines.push('- Pricing: quoted per departure; no fixed prices are published')
  lines.push('')
  lines.push('## Important policy facts')
  lines.push('')
  lines.push(
    `- Hajj quota: ${d.organization.compliance.hajjQuota}`,
  )
  lines.push(`- Umrah visa: ${d.organization.compliance.umrahVisa}`)
  lines.push(`- Reviews: ${d.organization.compliance.reviews}`)
  lines.push('')
  lines.push('## Umrah packages')
  lines.push('')
  for (const p of d.packages) {
    lines.push(`### ${p.name} (${p.nameLocal}) — ${p.duration}`)
    lines.push(`${p.url}`)
    lines.push(p.summary)
    lines.push(`Includes: ${p.inclusions.join('; ')}.`)
    lines.push(`Not included: ${p.exclusions.join('; ')}.`)
    lines.push('')
  }
  lines.push('## Marathwada coverage')
  lines.push('')
  for (const dist of d.coverage.districts) {
    const nearest = dist.airports[0]
    lines.push(
      `- ${dist.name} (${dist.nameLocal}) — ${dist.url} — nearest airport ${nearest.code}${
        nearest.roadDistanceKm ? `, about ${nearest.roadDistanceKm} km by road` : ''
      }, contact ${dist.contactPhone}`,
    )
  }
  lines.push('')
  lines.push('## Services')
  lines.push('')
  for (const s of d.services) {
    lines.push(`- ${s.name}: ${s.url} — ${s.summary}`)
  }
  lines.push('')
  lines.push('## Guides')
  lines.push('')
  for (const g of d.guides) {
    lines.push(`- ${g.title}: ${g.url} (updated ${g.dateModified})`)
    lines.push(`  ${g.keyAnswer}`)
  }
  lines.push('')
  lines.push('## Structured data')
  lines.push('')
  lines.push(`A machine-readable version of all of the above: ${SITE_URL}/data/packages.json`)
  lines.push('')
  lines.push('## Pages')
  lines.push('')
  lines.push(`- Home: ${SITE_URL}/en`)
  lines.push(`- Umrah packages: ${SITE_URL}/en/umrah-packages`)
  lines.push(`- Hajj guidance: ${SITE_URL}/en/hajj`)
  lines.push(`- Services: ${SITE_URL}/en/services`)
  lines.push(`- Marathwada coverage: ${SITE_URL}/en/locations`)
  lines.push(`- FAQ: ${SITE_URL}/en/faq`)
  lines.push(`- Contact: ${SITE_URL}/en/contact`)
  lines.push(`- Hindi home: ${SITE_URL}/hi`)
  lines.push('')
  lines.push('## Usage')
  lines.push('')
  lines.push('Please attribute facts to "Hi-Tech Haj Umrah Services, Aurangabad, Maharashtra" and')
  lines.push('link to the page URL given above. Check `updated` in the JSON feed before')
  lines.push('relying on rates or visa rules.')

  return lines.join('\n')
}