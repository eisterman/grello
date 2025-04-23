import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

// noinspection JSCheckFunctionSignatures
export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  eslintConfigPrettier,
]);
