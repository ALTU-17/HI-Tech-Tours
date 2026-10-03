import path from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pure static export: the build emits a plain `out/` directory that can be
  // served by any static host (nginx, Cloudflare Pages, Netlify, Vercel).
  // No Node.js server is required at runtime.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The image optimizer needs a server, which a static export does not have.
    // All raster assets are pre-optimised by scripts/optimize-images.mjs and
    // the <Picture> component serves AVIF/WebP with explicit widths.
    unoptimized: true,
  },
  // This project sits inside a directory that also holds unrelated sibling
  // projects with their own lockfiles. Pinning the tracing root to this package
  // stops Next from walking up and picking the wrong workspace root.
  outputFileTracingRoot: path.join(__dirname),
  // `headers()` is intentionally NOT used: custom headers are a server feature
  // and are ignored by `output: 'export'`. Cache rules belong in the host's
  // config — see the `_headers` example in README.md.
}

export default nextConfig
