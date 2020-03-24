module.exports = {
    extends: 'eslint-config-airbnb-base',
    "rules": {
        'no-console': 0,
        'import/prefer-default-export': 0,
    },
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module'
    },
    env: {
        browser: true,
    }
};