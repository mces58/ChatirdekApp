module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/no-unresolved': ['error', { ignore: ['^src/'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'consistent-return': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '<THIRD_PARTY_MODULES>',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '^src/(.*)$',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '^(.*)/(?!generated)(.*)/(.*)$',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '^(.*)/generated/(.*)$',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '^[./]',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
