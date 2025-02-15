import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  stylistic: true,

  type: 'app', // 'app' | 'lib'
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },

  html: true,

  ...compat.config({

    settings: {
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
  }),

})
