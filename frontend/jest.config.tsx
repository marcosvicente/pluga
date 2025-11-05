module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Or 'node' if testing Node.js applications
  transform: {
    // Use ts-jest to transform .ts and .tsx files
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Optional: If you have specific test file patterns
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  // Optional: If you use module aliases in your project
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Optional: Setup files for things like @testing-library/jest-dom
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};