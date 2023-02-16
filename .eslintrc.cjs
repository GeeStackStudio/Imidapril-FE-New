module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    "overrides": [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                // this setting is required to use rules that require type information
                project: './tsconfig.json',
            },
            rules: {
                '@typescript-eslint/prefer-nullish-coalescing': 'error',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 0,
        'react/no-inline-styles': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'import/no-duplicates': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        'react/jsx-no-target-blank': 0,
        'react/prop-types': 0,
        'react/display-name': 0,
        "react/react-in-jsx-scope": "off",
        "catch-error-name": "off",
    },
    settings: {
        react: {
            version: "detect"
        }
    }
}
