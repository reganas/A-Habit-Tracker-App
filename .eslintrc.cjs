module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', '*.min.js'],
  extends: ['airbnb-base', 'plugin:vue/vue3-recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'no-param-reassign': 'off',
  },
};
