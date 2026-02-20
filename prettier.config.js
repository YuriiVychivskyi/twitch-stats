/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrderSeparation: true,
  importOrderSortSpecifiers: false,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  tailwindFunctions: ['tv'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
