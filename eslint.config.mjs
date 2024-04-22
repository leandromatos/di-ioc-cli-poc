import { flatConfig } from '@leandromatos/eslint-config'

export default [
  ...flatConfig,
  {
    ignores: ['lib/*'],
  },
]
