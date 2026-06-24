import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Dependencies dan internal tools
    'node_modules/**',
    '.kiro/**',
    // Prisma generated output — tidak perlu di-lint
    'generated/**',
    'prisma/lib/singleton.ts',
    // Third-party UI library components — tidak perlu di-lint
    'components/reactbits/**',
  ]),
])

export default eslintConfig
