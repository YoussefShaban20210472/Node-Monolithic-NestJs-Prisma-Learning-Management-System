import './bootstrap.js';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['dist/test/**/*.e2e-spec.js'],
    testTimeout: 6000,
  },
});
