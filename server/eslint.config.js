import globals from 'globals'

import baseConfig from '../eslint-base.config.js'

export default [
  ...baseConfig,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
