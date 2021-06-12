module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'no-unused-vars': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
