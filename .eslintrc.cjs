/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import-alias'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'import-alias/import-alias': [
      'error',
      {
        relativeDepth: 1,
        aliases: [
          { alias: '@src/', matcher: '^src' },
          { alias: '@server/src/', matcher: '^server' },
          { alias: '@shared/types', matcher: '^shared/types' },
          { alias: '@shared/dto', matcher: '^shared/dto' },
          { alias: '@shared/constants', matcher: '^shared/constants' },
        ],
      },
    ],
  },
}
