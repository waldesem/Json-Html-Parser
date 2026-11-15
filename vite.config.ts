import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import zipPack from 'vite-plugin-zip-pack'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    zipPack({
      outDir: 'json-html-parser',
      outFileName: 'json-html-parser.zip',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        popup: fileURLToPath(new URL('./popup.html', import.meta.url)),
      },
    },
  },
})
