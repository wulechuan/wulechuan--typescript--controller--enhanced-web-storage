module.exports = {
    root: true,

    env: {
        node: true,
        browser: true,
    },

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2020,
    },

    plugins: ['@typescript-eslint'],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],

    rules: {
        'no-console': 0,
        'no-debugger': 0,
        'no-multi-spaces': 0,
        quotes: ['error', 'single'],
        indent: ['error', 4, {
            SwitchCase: 1,
            MemberExpression: 1,
        }],
        'semi': [ 'error', 'never' ],
        'semi-spacing': [ 'error', {
            'before': false,
            'after': true,
        }],
        'no-trailing-spaces': ['error', {
            skipBlankLines: false,
            ignoreComments: false,
        }],
        'new-parens': [1],
        'func-names': [0, 'as-needed'],

        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'comma-spacing': ['error', {
            'before': false,
            'after': true,
        }],
        'key-spacing': [ 0, {
            'beforeColon': false,
            'afterColon': true,
        }],

        'prefer-const': 1,
        'prefer-destructuring': [0,
            {
                VariableDeclarator: {
                    array: true,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        '@typescript-eslint/no-explicit-any': [ 0 ],

        '@typescript-eslint/no-unused-vars': ['warn', {
            'args': 'none',
        }],

        'no-irregular-whitespace': 0,
    },
}
