import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pin port in source so `npm run dev` works the same on Win/Linux without CLI flags
  server: {
    port: 3200,
    strictPort: true,
  },
})
