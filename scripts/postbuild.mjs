/**
 * Post-build asset fixup.
 *
 * `next build --output export` emits generated metadata images as
 * extensionless files (`out/en/opengraph-image`). The bytes are a valid PNG,
 * but a static host has no extension to map to a MIME type and will serve it as
 * `application/octet-stream` — which Facebook and X both refuse to render. The
 * pages also need a stable, cacheable filename rather than one carrying a
 * build hash.
 *
 * This copies them to `out/og-<locale>.png`, which is the exact URL the page
 * metadata already points at, with a correct `.png` extension and therefore a
 * correct Content-Type on any host.
 */
import { copyFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const OUT = join(process.cwd(), 'out')
const LOCALES = ['en', 'hi']

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function copyIfPresent(from, to, label) {
  if (!(await exists(from))) {
    console.warn(`  ! ${label}: expected ${from} to exist — skipped`)
    return false
  }
  await copyFile(from, to)
  const { statSync } = await import('node:fs')
  const { size } = statSync(to)
  console.log(`  ✓ ${label} → ${to.replace(OUT + '/', '')} (${Math.round(size / 1024)} KB)`)
  return true
}

console.log('postbuild: renaming generated metadata images…')

let allOk = true
for (const locale of LOCALES) {
  const ok = await copyIfPresent(
    join(OUT, locale, 'opengraph-image'),
    join(OUT, `og-${locale}.png`),
    `og:image [${locale}]`,
  )
  allOk = allOk && ok
}

if (!allOk) {
  console.error('postbuild: some images were not generated — social previews will 404.')
  process.exitCode = 1
}

console.log('postbuild: done.')