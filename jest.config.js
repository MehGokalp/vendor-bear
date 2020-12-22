module.exports = {
    "testEnvironment": "node",
    "collectCoverageFrom": [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/db/**",
        "!**/postman/**",
        "!**/config/**",
        "!**/coverage/**",
    ],
    "modulePathIgnorePatterns": [
        "config"
    ]
};