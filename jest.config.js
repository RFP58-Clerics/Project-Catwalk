module.exports = {
  testUrl: 'http://localhost',
  testEnvironment: 'jest-environment-jsdom',
  // ... other options ...
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

// {
//   "jest": {
//     "coverageThreshold": {
//       "global": {
//         "branches": 80,
//         "functions": 80,
//         "lines": 80,
//         "statements": -10
//       }
//     }
//   }
// }
