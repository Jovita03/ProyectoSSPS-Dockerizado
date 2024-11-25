import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_API_BASE_URL: '/'
    }
  },
  server: {
    host: '0.0.0.0', // Escuchar en todas las interfaces
    port: 3000,
    proxy: {
      '/auth': {
        target: 'http://auth-service',  // Sin el puerto
        changeOrigin: true,
      },
      '/usuarios': {
        target: 'http://user-service',  // Sin el puerto
        changeOrigin: true,
      },
      '/publicaciones': {
        target: 'http://publication-service',  // Sin el puerto
        changeOrigin: true,
      },
      '/quizzes': {
        target: 'http://quizzes-service',  // Sin el puerto
        changeOrigin: true,
      },
      '/temas': {
        target: 'http://topic-service',  // Sin el puerto
        changeOrigin: true,
      },
    }
  }
})