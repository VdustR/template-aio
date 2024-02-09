// eslint-disable-next-line import/newline-after-import -- rule conflict with simple-import-sort
import antfu from '@antfu/eslint-config'
// @ts-expect-error -- no types
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tsdoc from 'eslint-plugin-tsdoc'

export default antfu(
  {
    react: true,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      tsdoc,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'tsdoc/syntax': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
)
