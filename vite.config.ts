import { defineConfig } from 'vite';

// Настройки для разных режимов сборки
const MODES = {
  DEV: 'development',
  PROD: 'production',
  ANALYZE: 'analyze',
} as const;

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  build: {
    sourcemap: mode === MODES.DEV,
    target: ['chrome100', 'firefox100', 'safari15', 'ios15'],
    minify: mode === MODES.PROD ? 'esbuild' : false,

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [],
          'vendor-utils': [],
          'vendor-ui': [],
        },
        chunkFileNames: mode === MODES.PROD ? 'assets/js/[name]-[hash].js' : 'assets/js/[name].js',
        entryFileNames: mode === MODES.PROD ? 'assets/js/[name]-[hash].js' : 'assets/js/[name].js',
        assetFileNames:
          mode === MODES.PROD ? 'assets/[ext]/[name]-[hash].[ext]' : 'assets/[ext]/[name].[ext]',
      },
      external: mode === MODES.PROD ? [] : [/node_modules/],
    },

    modulePreload: {
      polyfill: true,
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,

    assetsInlineLimit: 4096,
    emptyOutDir: true,
    cssTarget: ['chrome100', 'firefox100', 'safari15', 'ios15'],
  },

  optimizeDeps: {
    include: [],
    exclude: [],
  },

  server: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
  },

  preview: {
    port: 3000,
    strictPort: true,
    host: true,
    open: true,
  },

  esbuild: {
    target: ['chrome100', 'firefox100', 'safari15', 'ios15'],
    legalComments: 'none',
    treeShaking: true,
  },
}));
