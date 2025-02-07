import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import compat from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

import globals from 'globals';

export default [
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      'coverage/*',
      'build/*',
      'public/*',
      'scripts/*',
      'test/*',
      'tmp/*',
      'vendor/*',
      'app/*',
      'vite.config.ts',
      'vitest.config.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: ['tsconfig.json'],
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
    settings: {
      // Configure browser targets for compat plugin
      polyfills: [],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
      compat: compat,
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // TypeScript
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-inferrable-types': 'error',

      // Import
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',

      // Sonarjs
      ...sonarjsPlugin.configs.recommended.rules,
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/no-inverted-boolean-check': 'error',
      'sonarjs/no-one-iteration-loop': 'error',

      // Unicorn
      ...unicornPlugin.configs.recommended.rules,
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/filename-case': 'off',

      // Promise
      ...promisePlugin.configs.recommended.rules,
      'promise/always-return': 'error',
      'promise/no-nesting': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in-promise': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/param-names': 'error',

      // Security
      ...securityPlugin.configs.recommended.rules,
      'security/detect-object-injection': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-non-literal-require': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',

      // Compat - Browser compatibility checking
      'compat/compat': 'error',

      // Formatting
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'array-element-newline': ['error', { multiline: true, minItems: 3 }],
      'array-bracket-newline': ['error', { multiline: true, minItems: 3 }],

      'no-console': 'error',
    },
  },
];
