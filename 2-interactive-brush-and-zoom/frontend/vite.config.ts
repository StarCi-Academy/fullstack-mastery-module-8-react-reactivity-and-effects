import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Port must match playwright.config.ts webServer.port (3200)
    port: 3200,
    // Bind to localhost only; avoids Windows Defender firewall popup
    host: 'localhost',
    strictPort: true,
  },
})
