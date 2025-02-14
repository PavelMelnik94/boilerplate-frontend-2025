/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["configs/setup-tests.ts"],
    fileParallelism: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "src/**/types.ts",
        "src/**/index.ts",
        "src/**/index.tsx",
        "src/**/*.d.ts",
        "src/**/config.ts",
        "src/**/example.ts",
        "src/**/*.types.ts",
        "src/**/*.types.tsx",
        "src/**/*.types.d.ts",
        "src/**/*.config.ts",
        "src/**/*.example.ts",
      ],
      ignoreEmptyLines: true,
      include: ["src/**/*.{js,ts,tsx}"],
    },

    include: ["src/**/*.{test,spec}.{js,ts,tsx}"],
    watch: true,
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
