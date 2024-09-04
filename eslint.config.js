import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default ts.config(
	{
		files: ['**/*.js', '**/*.ts', '**/*.svelte'],
		extends: [js.configs.recommended, ...ts.configs.recommended, prettier],
		languageOptions: {
			parser: ts.parser,
			parserOptions: {
				sourceType: 'module',
				extraFileExtensions: ['.svelte'],
				project: './tsconfig.eslint.json'
			},
			globals: { ...globals.browser, ...globals.node }
		},
		rules: { 'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }] }
	},
	{
		files: ['**/*.svelte'],
		extends: [...svelte.configs['flat/recommended'], ...svelte.configs['flat/prettier']],
		languageOptions: {
			globals: globals.browser,
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				project: './tsconfig.eslint.json'
			}
		}
	},
	{
		ignores: ['.svelte-kit', 'node_modules', 'static']
	}
);
