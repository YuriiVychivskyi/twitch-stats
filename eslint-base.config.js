import eslint from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

const baseConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: { prettier, '@typescript-eslint': tseslint.plugin },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
    ignores: ['node_modules'],
  },
])

export default baseConfig
