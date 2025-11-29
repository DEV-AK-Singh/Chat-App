import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "DAMRU",
        name: "DAMRU - Secure Encrypted Messaging",
        description: "End-to-end encrypted messaging, voice & video calls with military-grade security",
        icons: [
          {
            src: "logo.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png"
          },
          {
            src: "logo.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "logo.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        orientation: "portrait-primary",
        categories: ["communication", "social", "productivity"],
        lang: "en-US",
        scope: "/",
        screenshots: [
          {
            src: "screenshot1.png",
            type: "image/png",
            sizes: "1280x720",
            form_factor: "wide"
          },
          {
            src: "screenshot2.png",
            type: "image/png",
            sizes: "750x1334",
            form_factor: "narrow"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
