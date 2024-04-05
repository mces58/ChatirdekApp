module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb',
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
    'no-use-before-define': ['error', { variables: false }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'arrow-body-style': ['error', 'always'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': ['error', { ignore: ['^src/'] }],
    'import/extensions': ['error', 'never'],
    'react/style-prop-object': ['error', { allow: ['StatusBar', 'style', 'styleSheet'] }],
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
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before',
          },
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
