import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/muar/dist/',
  server: {
    proxy: {
      '/api.php': {
        target: 'http://localhost/muar/api.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\.php/, '')
      },
      '/auth_api.php': {
        target: 'http://localhost/muar/auth_api.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth_api\.php/, '')
      }
    }
  }
})
