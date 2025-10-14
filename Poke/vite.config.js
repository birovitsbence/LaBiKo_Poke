// fontos: vitest/config
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 80,
    allowedHosts: ['vm1.test']
  },
  test: {
    environment: 'jsdom',
    globals: true,                    // describe/it/expect globálisan
    coverage: { provider: 'v8', reporter: ['text', 'html'] }
  }
})
