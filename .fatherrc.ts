module.exports = {
  entry: ['src/index.ts'],
  target: 'node',
  cjs: { type: 'rollup' },
  disableTypeCheck: true,
  typescriptOpts: {
    check: false,
  },
  preCommit: {
    eslint: true,
    prettier: true,
  },
}
