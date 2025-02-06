import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import compat from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import optimizeRegexPlugin from 'eslint-plugin-optimize-regex';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

import globals from 'globals';

export default [
  {
    ignores: ['dist/*', 'node_modules/*', 'coverage/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'optimize-regex': optimizeRegexPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
      compat: compat,
    },
    rules: {
      // TypeScript
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      // Import
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],

      // Optimize regex
      'optimize-regex/optimize-regex': 'warn',

      // Sonarjs
      ...sonarjsPlugin.configs.recommended.rules,
      'sonarjs/cognitive-complexity': ['error', 15],

      // Unicorn
      ...unicornPlugin.configs.recommended.rules,
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',

      // Promise
      ...promisePlugin.configs.recommended.rules,

      // Security
      ...securityPlugin.configs.recommended.rules,

      // Compat - Browser compatibility checking
      'compat/compat': 'error',
    },
    settings: {
      // Configure browser targets for compat plugin
      polyfills: [],
    },
  },
];
