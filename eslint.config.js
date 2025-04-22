import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            js,
            prettier,
        },
        extends: ['js/recommended'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/prop-types': 'warn',
            'react/jsx-no-target-blank': 'warn',
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    printWidth: 100,
                    tabWidth: 4,
                },
            ],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: globals.browser,
        },
    },
]);
