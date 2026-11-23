import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'assets-src', 'Server/node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, __SITE_URL__: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Node-side files: build config, scripts, API functions, local server
    files: ['vite.config.js', 'scripts/**', 'api/**', 'Server/**'],
    languageOptions: { globals: globals.node },
  },
  {
    // Constants and helpers sharing a file with components only affects Fast Refresh in dev
    files: ['src/**/*.{js,jsx}'],
    rules: { 'react-refresh/only-export-components': 'warn' },
  },
])
