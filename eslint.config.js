import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import compat from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
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
      'src/**/*.d.ts',
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
      perfectionist: perfectionistPlugin,
      'jsx-a11y': a11yPlugin,
    },
    rules: {
      // Prettier (.prettierrc)
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 120,
          arrowParens: 'always',
          bracketSpacing: true,
          embeddedLanguageFormatting: 'auto',
          htmlWhitespaceSensitivity: 'css',
          insertPragma: false,
          bracketSameLine: false,
          jsxSingleQuote: false,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          requirePragma: false,
          useTabs: false,
        },
      ],

      // TypeScript
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-inferrable-types': 'error',

      // Import
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',

      // ESLint
      'no-console': 'error',

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

      // Compat
      'compat/compat': 'error',

      // Remove conflicting formatting rules
      'object-curly-newline': 'off',
      'array-element-newline': 'off',
      'array-bracket-newline': 'off',

      // Perfectionist
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'style',
            'side-effect',
            'unknown',
          ],
          internalPattern: ['^@/.*'],
          ignoreCase: true,
          sortSideEffects: true,
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
        },
      ],
      'perfectionist/sort-exports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

      // JSX-A11Y
      'jsx-a11y/alt-text': [
        'error',
        { elements: ['img', 'object', 'area', 'input[type="image"]'] },
      ],
      'jsx-a11y/anchor-has-content': ['error', { components: ['Link'] }],
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': [
        'error',
        {
          tabbable: [
            'button',
            'checkbox',
            'link',
            'searchbox',
            'spinbutton',
            'switch',
            'textbox',
          ],
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['CustomLabel'],
          labelAttributes: ['label'],
          controlComponents: ['CustomInput'],
          assert: 'both',
          depth: 3,
        },
      ],
      'jsx-a11y/media-has-caption': 'error',
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
      'jsx-a11y/no-redundant-roles': 'error',
    },
  },
];
