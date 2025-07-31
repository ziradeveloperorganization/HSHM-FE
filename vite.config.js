import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 1025,
    strictPort: true,
    hmr: {
      clientPort: 1025,
      protocol: 'ws',
      host: 'localhost'
    }
  },
  preview: {
    port: 1025,
    strictPort: true
  }
});