import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react()],
});
