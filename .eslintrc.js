module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'import/prefer-default-export': 'warn',
    'no-param-reassign': 'warn',
    'no-underscore-dangle': 'off',
    'import/no-named-as-default': 'warn',
    'arrow-body-style': 'off', // this is eslint rule but affect prettier
    'no-plusplus': 'off',
    'spaced-comment': 'warn',
    'no-nested-ternary': 'off',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    // 'prettier/prettier': 'warn',
    'prettier/prettier': [
      'warn', // by default prettier gives us error , now it will gives us warning
      {
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        arrowParens: 'avoid',
        endOfLine: 'auto', // FIX 'LF','CR' problem
      },
    ],
  },
}
