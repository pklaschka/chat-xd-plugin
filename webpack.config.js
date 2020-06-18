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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
};
