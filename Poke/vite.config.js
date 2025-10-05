import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'vm1.test',
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});