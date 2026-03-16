import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        moduleResolution: 'node',
      },
    }],
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/generated/'],
  // Uncomment to enable Prisma singleton mock globally for all tests:
  // setupFilesAfterFramework: ['<rootDir>/prisma/lib/singleton.ts'],
  // Minimum 100 runs for property-based tests (configured per-test via fc.assert numRuns)
};

export default config;
