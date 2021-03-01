module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    '@/api/(.*)$': '<rootDir>/src/pages/api/$1',
    '@/components/(.*)$': '<rootDir>/src/components/$1',
    '@/controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '@/theme/(.*)$': '<rootDir>/src/theme/$1',
    '@/typings/(.*)$': '<rootDir>/src/typings/$1',
    '@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}
