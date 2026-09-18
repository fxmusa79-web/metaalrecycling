import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        'metaal-inkoop': resolve(rootDir, 'metaal-inkoop.html'),
        recycling: resolve(rootDir, 'recycling.html'),
        demontage: resolve(rootDir, 'demontage.html'),
        materialen: resolve(rootDir, 'materialen.html'),
        werkgebied: resolve(rootDir, 'werkgebied.html'),
        'over-ons': resolve(rootDir, 'over-ons.html'),
        faq: resolve(rootDir, 'faq.html'),
        contact: resolve(rootDir, 'contact.html'),
      },
    },
  },
})
