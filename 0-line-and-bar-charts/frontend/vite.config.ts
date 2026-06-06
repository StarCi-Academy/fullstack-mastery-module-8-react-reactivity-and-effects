import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // fixed port so the Playwright config (baseURL: http://localhost:3200) always finds the server
  server: {
    port: 3200,
    strictPort: true,
  },
})
