module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  importOrder: [
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/lib/(.*)$',
    '^@/ui/(.*)$',
    ' ^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
