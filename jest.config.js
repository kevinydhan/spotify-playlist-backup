module.exports = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    '@/api/(.*)$': '<rootDir>/src/pages/api/$1',
    '@/controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '@/typings/(.*)$': '<rootDir>/src/typings/$1',
  },
}
