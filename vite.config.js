import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  logLevel: 'info', // show startup info
  plugins: [react()],
  server: {
    port: 5173, // default Vite port
    strictPort: false, // allow fallback if busy
    host: true, // access via network IP
    open: true, // auto-open browser
    cors: true,
    proxy: {
      '/api': 'http://localhost:5000', // forwards all /api requests to your Node.js backend
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
