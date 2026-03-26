import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // allow LAN access
    port: 8080, // optional: specify port
    proxy: {
      '/api': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        secure: true, // ensure HTTPS works
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
