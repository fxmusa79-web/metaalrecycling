import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function gitShort() {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}

const commit = gitShort()
const builtAt = new Date().toISOString()

const workerMeta = `/**
 * Generated at build/deploy time — do not edit by hand.
 * Overwritten by scripts/write-build-meta.mjs
 */
export const BUILD = {
  commit: ${JSON.stringify(commit)},
  builtAt: ${JSON.stringify(builtAt)},
}
`

writeFileSync(resolve(root, 'worker/src/build-meta.js'), workerMeta, 'utf8')

const publicMeta = `${JSON.stringify({ commit, builtAt }, null, 2)}\n`
writeFileSync(resolve(root, 'public/build-meta.json'), publicMeta, 'utf8')

console.log(`[build-meta] commit=${commit} builtAt=${builtAt}`)
