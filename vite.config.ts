import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Устанавливаем относительный путь для корректной работы всех путей
  server: {
    port: 3000,
    strictPort: true,
    mimeTypes: {
      'application/javascript': ['.js', '.jsx'], // Явно указываем MIME-типы
    },
  },
});