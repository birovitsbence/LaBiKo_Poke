import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'vitest.config.js',
        'vite.config.js',
        'tailwind.config.js',
        'postcss.config.js'
      ]
    }
  }
})
