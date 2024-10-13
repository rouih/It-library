export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
