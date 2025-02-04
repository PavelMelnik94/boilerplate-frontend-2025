import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: mode === 'development',
    target: ['chrome60', 'firefox60', 'safari12', 'ios12'],
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [],
        },
      },
    },
    modulePreload: {
      polyfill: true,
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  optimizeDeps: {
    include: [],
    exclude: [],
  },
}));