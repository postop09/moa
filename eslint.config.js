/* eslint-disable @typescript-eslint/no-require-imports */
// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { defineConfig } = require('eslint/config');
const { configs } = require('typescript-eslint');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  ...configs.recommended,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'FunctionExpression',
          message:
            'function 표현식 대신 const name = () => {} 화살표 함수 형식을 사용하세요.',
        },
      ],
    },
  },
]);
