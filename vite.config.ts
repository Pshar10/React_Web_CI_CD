import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // changed from '/React_Web_CI_CD/' to '/' for custom domain root
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});