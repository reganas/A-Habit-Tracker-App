import { config } from '@vue/test-utils';

// Global test configuration
config.global.stubs = {
  // Add any global component stubs here
};

// eslint configuration
/* eslint import/no-extraneous-dependencies: [
  "error",
  {
    "devDependencies": [
      "tests/**",
      "vite.config.js",
      "playwright.config.ts",
      "vitest.config.ts"
    ]
  }
] */
