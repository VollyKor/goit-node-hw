module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    skipBlankLines: true,
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}
