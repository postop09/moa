// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import { configs } from 'typescript-eslint';

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  ...configs.recommended,
  {
    ignores: ['dist/*'],
  },
]);
