import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  esbuild: {
    legalComments: 'none',
  },
  plugins: [react(), tailwindcss(), svgr(), tsconfigPaths()],
  base: '/',
  server: {
    host: true,
    port: 3001,
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
})
