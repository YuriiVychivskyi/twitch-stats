import globals from 'globals'

import baseConfig from './eslint-base.config.js'

export default [
  ...baseConfig,
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
