import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from '@nabla/vite-plugin-eslint';
// Build mode constants definition
const MODES = {
  DEV: 'development',
  PROD: 'production',
  ANALYZE: 'analyze',
} as const;

export default defineConfig(({ mode }) => {
  // Base path for the application
  // *ANCHOR -  - replace <repo-name> with your repository name
  // Use '/' for localhost and '/<repo-name>/' for GitHub Pages
  const base = mode === MODES.PROD ? '/boilerplate-frontend-2025/' : '/';

  return {
    base,
    plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] }), eslintPlugin()],
    // Resolve configuration
    // Sets up path aliases for simplified imports
    resolve: {
      alias: {
        '@': '/src',
      },
    },

    // Build configuration
    // Controls how the application is built for production
    build: {
      sourcemap: mode === MODES.DEV,
      target: ['chrome100', 'firefox100', 'safari15', 'ios15'],
      minify: mode === MODES.PROD ? 'esbuild' : false,

      // Rollup specific options
      // Configures how the code is bundled and split
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            'vendor-react': [],
            'vendor-utils': [],
            'vendor-ui': [],
          },
          // Output file naming patterns based on build mode
          chunkFileNames:
            mode === MODES.PROD
              ? 'assets/js/[name]-[hash].js'
              : 'assets/js/[name].js',
          entryFileNames:
            mode === MODES.PROD
              ? 'assets/js/[name]-[hash].js'
              : 'assets/js/[name].js',
          assetFileNames:
            mode === MODES.PROD
              ? 'assets/[ext]/[name]-[hash].[ext]'
              : 'assets/[ext]/[name].[ext]',
        },
        // External dependencies configuration
        external: mode === MODES.PROD ? [] : [/node_modules/],
      },

      // Module and asset handling configuration
      // Controls how modules and assets are processed during build
      modulePreload: {
        polyfill: true,
      },
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,

      // Asset optimization settings
      // Defines how assets are optimized and handled
      assetsInlineLimit: 4096,
      emptyOutDir: true,
      cssTarget: ['chrome120', 'firefox120', 'safari17', 'ios15'],
    },

    // Dependency optimization configuration
    // Controls how dependencies are pre-bundled
    optimizeDeps: {
      include: [],
      exclude: [],
    },

    // Development server configuration
    // Settings for the development server
    server: {
      port: 3010,
      strictPort: true,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    // Preview server configuration
    // Settings for previewing production builds
    preview: {
      port: 3011,
      strictPort: true,
      host: true,
      open: true,
    },

    // ESBuild configuration
    // Low-level build tool settings
    esbuild: {
      target: ['chrome100', 'firefox100', 'safari15', 'ios15'],
      legalComments: 'none',
      treeShaking: true,
    },
  };
});
