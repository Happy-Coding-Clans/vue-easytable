// COVERAGE
const COVERAGE = process.env.COVERAGE;

module.exports = {
    setupFiles: ["./tests/unit/setup.js"],
    moduleFileExtensions: ["js", "jsx", "json", "vue", "md", "jpg"],
    transform: {
        ".*\\.(vue|md)$": "<rootDir>/node_modules/vue-jest",
        "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
    },
    // 支持源代码中相同的 `@` -> `packages` 别名
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/packages/$1",
        "^ve-table/(.*)$": "<rootDir>/$1" // map webpack externals comps
    },
    snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
    coverageDirectory: "tests/unit/coverage",
    collectCoverage: COVERAGE === "true",
    collectCoverageFrom: [
        "packages/ve-*/**/*.{jsx,js,vue}",
        "!packages/ve-*/src/util/*",
        "!packages/ve-checkbox-group/**",
        "!**/node_modules/**"
    ]
};
