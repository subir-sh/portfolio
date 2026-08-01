import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative paths work on both custom-domain and project GitHub Pages deployments.
  base: './',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
