import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      'linebreak-style': ['error', 'windows'],
      '@typescript-eslint/no-explicit-any': 'off',
      'react/prop-types': 'off',
    },
  },
];
