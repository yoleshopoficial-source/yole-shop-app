import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repositoryName = 'yole-shop-app'
const base = process.env.GITHUB_PAGES === 'true' ? `/${repositoryName}/` : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'YOLE SHOP APP',
        short_name: 'YOLE Shop',
        description: 'PWA profesional para gestión comercial.',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        icons: [],
      },
    }),
  ],
})
