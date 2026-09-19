import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'

const rootDir = dirname(fileURLToPath(import.meta.url))

function readBuildMeta() {
  const path = resolve(rootDir, 'public/build-meta.json')
  if (!existsSync(path)) {
    return { commit: 'dev', builtAt: new Date().toISOString() }
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return { commit: 'dev', builtAt: new Date().toISOString() }
  }
}

const buildMeta = readBuildMeta()

export default defineConfig({
  define: {
    __DMR_BUILD__: JSON.stringify(buildMeta),
  },
  build: {
    // Content-hashed filenames for JS/CSS (default Vite behavior)
    assetsDir: 'assets',
    cssCodeSplit: true,
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
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  plugins: [
    {
      name: 'dmr-build-meta',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `    <meta name="dmr-build" content="${buildMeta.commit}" />\n    <meta name="dmr-built-at" content="${buildMeta.builtAt}" />\n  </head>`
        )
      },
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})
