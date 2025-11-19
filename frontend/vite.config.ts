import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // allows access from Docker
    port: Number(process.env.FRONTEND_PORT) || 5173,
    watch: {
      usePolling: true,   // this forces Vite to use polling
      interval: 100       // check every 100ms
    }
  }
})
