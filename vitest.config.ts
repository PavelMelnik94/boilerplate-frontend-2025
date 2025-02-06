/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['configs/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.history/',
        'coverage/',
        '.prettierrc.js',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,ts}'],
    watch: true,
    reporters: ['verbose'],
  },
});
