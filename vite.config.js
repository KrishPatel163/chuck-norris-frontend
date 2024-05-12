import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://chuck-norris-backend-1.onrender.com'
    }
  },
  plugins: [react()],
})
