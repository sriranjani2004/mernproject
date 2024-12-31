const globals = require('globals');

module.exports = {
  env: {
    node: true,
    browser: true,
  },
  globals: {
    ...globals,
    myGlobalVar: 'readonly',
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'warn',
  },
};
