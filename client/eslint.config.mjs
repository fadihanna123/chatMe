import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import dtslint from 'eslint-plugin-dtslint';
import editorconfig from 'eslint-plugin-editorconfig';
import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import html from 'eslint-plugin-html';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['projects/**/*']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.html'],
    plugins: { html },
  },
  {
    files: ['**/*.ts'],
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
    ),

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.html'],

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:editorconfig/all',
      'prettier'
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      dtslint,
      editorconfig,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'at-rule-no-unknown': 0,
      'dtslint/expect-deprecation': 'error',
      'dtslint/expect-type': 'error',
      'dtslint/no-typo': 'error',
    },
  },
]);
