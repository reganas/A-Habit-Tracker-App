module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', '*.min.js'],
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'vite.config.js',
          'playwright.config.ts',
          'vitest.config.ts',
          '**/*.config.js',
          '**/*.config.ts',
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.test.tsx',
          '**/*.spec.tsx',
        ],
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['^@vitejs/'] }],
  },
};
