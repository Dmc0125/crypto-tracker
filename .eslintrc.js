module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
};
