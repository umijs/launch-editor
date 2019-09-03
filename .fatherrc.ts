module.exports = {
  entry: ['src/index.ts'],
  target: 'node',
  disableTypeCheck: true,
  typescriptOpts: {
    check: false,
  },
  preCommit: {
    eslint: true,
    prettier: true,
  },
}
