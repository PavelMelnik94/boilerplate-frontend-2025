import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import compat from 'eslint-plugin-compat';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
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
      compat,
      prettier: prettierPlugin,
      perfectionist: perfectionistPlugin,
      'eslint-comments': eslintCommentsPlugin,
    },
    rules: {
      // Prettier configuration
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
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          requirePragma: false,
          useTabs: false,
        },
      ],

      // Filename conventions
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          ignore: [
            // For single-word class files with capital letter
            '^[A-Z][a-z0-9]*\\.(ts|tsx|js|jsx)$',
            // For single-word test files
            '^[A-Z][a-z0-9]*\\.(test|spec)\\.(ts|tsx|js|jsx)$',
            // For PascalCase components
            '^[A-Z][a-zA-Z0-9]*\\.(tsx|jsx)$',
            // For component test files
            '^[A-Z][a-zA-Z0-9]*\\.(test|spec)\\.(tsx|jsx)$',
          ],
        },
      ],

      // Date handling rules
      // Enforces using Date.now() instead of new Date() for timestamps
      'unicorn/prefer-date-now': 'error',

      // Performance rules
      // Ensures correct collection size checks
      'sonarjs/no-collection-size-mischeck': 'error',
      // Removes unnecessary jumps (break/continue/return) at the end of blocks
      'sonarjs/no-redundant-jump': 'error',
      // Suggests immediate value return instead of variable creation
      'sonarjs/prefer-immediate-return': 'error',
      // Suggests using object literals instead of Object.create(null)
      'sonarjs/prefer-object-literal': 'error',
      // Suggests using Set.has instead of Array.includes for large collections
      'unicorn/prefer-set-has': 'error',
      // Suggests using includes instead of indexOf for element checking
      'unicorn/prefer-includes': 'error',

      // Modern JavaScript rules
      // Suggests using optional catch binding
      'unicorn/prefer-optional-catch-binding': 'error',
      // Enforces using slice instead of substr/substring
      'unicorn/prefer-string-slice': 'error',
      // Suggests using spread instead of Array.from
      'unicorn/prefer-spread': 'error',
      // Suggests using ternary operator for simple if statements
      'unicorn/prefer-ternary': 'error',
      // Enforces using Number static properties instead of globals
      'unicorn/prefer-number-properties': 'error',

      // Error handling rules
      // Prevents throwing non-Error objects
       "no-throw-literal": "off",
      "@typescript-eslint/only-throw-error": "error",
      // Enforces using TypeError for type errors
      'unicorn/prefer-type-error': 'error',
      // Sets standard error name in catch blocks
      'unicorn/catch-error-name': ['error', { name: 'error' }],

      // Import rules
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',    // Node.js built-in modules
            'external',   // External packages
            'internal',   // Internal modules (aliases)
            'parent',     // Parent directory imports
            'sibling',    // Same directory imports
            'index',      // Index file imports
            'object',     // Object imports
            'type'        // Type imports
          ],
          'pathGroups': [
            {
              'pattern': '@/**',
              'group': 'internal',
              'position': 'after'
            }
          ],
          'newlines-between': 'always'
        }
      ],
      // Prevents default exports for better maintainability
      'import/no-default-export': 'error',
      // Prevents circular dependencies
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      // Prevents self-imports
      'import/no-self-import': 'error',
      // Removes unnecessary path segments
      'import/no-useless-path-segments': 'error',

      // TypeScript type rules
      // Enforces using 'import type' for type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      // Enforces consistent type exports
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
      // Enforces using property signatures in interfaces
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      // Prevents type import side effects
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Enforces consistent generic constructor usage
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],

      // Security rules
      // Detects possible timing attacks
      'security/detect-possible-timing-attacks': 'error',
      // Checks for unsafe regular expressions
      'security/detect-non-literal-regexp': 'error',
      // Detects potentially unsafe regular expressions
      'security/detect-unsafe-regex': 'error',
      // Detects unsafe buffer operations
      'security/detect-buffer-noassert': 'error',
      // Warns about potential object injection vulnerabilities
      'security/detect-object-injection': 'warn',

      // Comment rules
      // TypeScript comment configurations
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description', // Allows @ts-expect-error with description
          'ts-ignore': true,                           // Disallows @ts-ignore
          'ts-nocheck': true,                          // Disallows @ts-nocheck
          'ts-check': false,                           // Allows @ts-check
          minimumDescriptionLength: 10                 // Minimum description length
        }
      ],
      // Prevents unlimited eslint-disable comments
      'eslint-comments/no-unlimited-disable': 'error',
      // Prevents unused eslint-disable comments
      'eslint-comments/no-unused-disable': 'error',

      // Async code rules
      // Ensures await is only used with Promises
      '@typescript-eslint/await-thenable': 'error',
      // Requires Promise handling
      '@typescript-eslint/no-floating-promises': 'error',
      // Prevents Promise misuse
      '@typescript-eslint/no-misused-promises': 'error',
      // Requires async keyword for Promise-returning functions
      '@typescript-eslint/promise-function-async': 'error',
      // Disables base rule
      'no-return-await': 'off',
      // Requires return await consistently
      '@typescript-eslint/return-await': ['error', 'always'],
    },
  },
  {
    // Tests override
    files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-nested-callbacks': 'off',
    },
  },
];
