import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true, // opens browser on dev start
  },
  resolve: {
    alias: {
      // Optional: if you use absolute imports like `@/components/...`
      // '@': path.resolve(__dirname, './src'),
    },
  },
});