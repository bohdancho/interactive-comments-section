import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), eslint()],
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
