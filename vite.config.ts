import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import mixPlugin, { Adapter } from 'vite-plugin-mix'
const mix = (mixPlugin as unknown as Mix).default

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    mix({
      handler: './src/api/handler.ts',
    }),
    react(),
    eslint(),
  ],
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

interface MixConfig {
  handler: string
  adapter?: Adapter | undefined
}

type MixPlugin = (config: MixConfig) => Plugin

interface Mix {
  default: MixPlugin
}
