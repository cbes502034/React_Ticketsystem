const globals = require('globals');

module.exports = [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        React: 'readonly',
        JSX: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: { 
          jsx: true 
        }
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]; 