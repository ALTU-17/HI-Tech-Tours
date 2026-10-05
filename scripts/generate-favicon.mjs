/**
 * One-off generator for `src/app/favicon.ico`.
 *
 * Browsers request `/favicon.ico` unconditionally, while `metadata.icons` only
 * advertises `/icon.svg`. Under `output: 'export'` no dynamic route can answer
 * the bare request, so the file must exist on disk. Next.js treats
 * `app/favicon.ico` as a metadata file and emits it verbatim.
 *
 * Run with: node scripts/generate-favicon.mjs
 */
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SIZE = 32
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/app/favicon.ico')

// Same palette as public/icon.svg.
const BG = [6, 46, 34, 255]
const GOLD = [201, 162, 39, 255]
const CREAM = [251, 247, 239, 255]
const CLEAR = [0, 0, 0, 0]