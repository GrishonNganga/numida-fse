import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { UserConfigExport } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
    }
  }
} as UserConfigExport);
