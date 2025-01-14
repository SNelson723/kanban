import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ['default'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      enabled: true,
      reportOnFailure: true,
      exclude: ['tailwind.config.js', 'vite.config.mjs', '.eslint.config.js'],
    },
    global: true,
    environment: 'happy-dom',
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    setupFiles: './setupTests.js'
  }
})
