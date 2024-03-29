const webpack = require('webpack');
module.exports = {
	entry: './src/main.tsx',
	output: {
		path: __dirname,
		filename: 'dist/main.js',
		libraryTarget: 'commonjs2'
	},
	externals: {
		assets: 'assets',
		scenegraph: 'scenegraph',
		application: 'application',
		commands: 'commands',
		clipboard: 'clipboard',
		cloud: 'cloud',
		uxp: 'uxp',
		viewport: 'viewport',
		interactions: 'interactions'
	},
	plugins: [new webpack.EnvironmentPlugin({ CI: '"false"' })],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'dist/assets',
							publicPath: 'assets'
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			}
		]
	},
	performance: { maxEntrypointSize: 10000000, maxAssetSize: 100000000 },
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	}
};
