module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2017
	},
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 0,
		'no-console': 'off',
		'no-undef': 'off'
	}
};
