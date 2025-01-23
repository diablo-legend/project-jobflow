import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    mimeTypes: {
      'application/javascript': ['.js', '.jsx'],
    },
  },
  
  export default defineConfig({
    base: '/',
  });