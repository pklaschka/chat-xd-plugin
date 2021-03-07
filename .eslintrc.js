module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:jsdoc/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2017
	},
	plugins: ['prettier', '@typescript-eslint', 'eslint-plugin-tsdoc', 'jsdoc'],
	rules: {
		'no-unused-vars': 0,
		'no-console': 'off',
		'no-undef': 'off',
		'tsdoc/syntax': 'error',
		'prettier/prettier': 'warn',
		'@typescript-eslint/no-inferrable-types': 0,
		'jsdoc/check-tag-names': 0, // done by tsdoc checker
		'jsdoc/require-jsdoc': [
			'error',
			{
				contexts: [
					'TSInterfaceDeclaration',
					'TSTypeAliasDeclaration',
					'TSEnumDeclaration'
				]
			}
		],
		'jsdoc/require-description': 1,
		'jsdoc/require-param-description': 'error',
		'jsdoc/require-hyphen-before-param-description': 'error',
		'jsdoc/no-types': 'error',
		'jsdoc/require-throws': 'error',
		'jsdoc/require-param-type': 0,
		'jsdoc/require-property-type': 0,
		'jsdoc/require-returns-type': 0,
		'jsdoc/require-example': 2,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/ban-ts-comment': 0,
		'tsdoc-escape-greater-than': 0
	},
	ignorePatterns: ['node_modules', 'dist', 'coverage', '.nyc_output']
};
