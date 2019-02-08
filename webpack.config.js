// External dependencies.
const MiniCssExtractPlugin  = require( 'mini-css-extract-plugin' );
const WebpackNotifierPlugin = require( 'webpack-notifier' );
const UglifyJsPlugin        = require( 'uglifyjs-webpack-plugin' );

module.exports = env => {

	// Build configuration.
	let config = {
		entry: './assets/src/index.js',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							[
								require( 'babel-preset-env' ),
								{
									modules: false,
									targets: { browsers: [ 'extends @wordpress/browserslist-config' ] },
								}
							],
						],
						plugins: [
							require( 'babel-plugin-transform-react-jsx' ),
							require( 'babel-plugin-transform-class-properties' ),
							require( 'babel-plugin-transform-object-rest-spread' ),
						],
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							query: {
								outputStyle: 'compressed',
							},
						},
					],
				}
			]
		},
		resolve: {
			extensions: ['*', '.js', '.jsx']
		},
		output: {
			path: __dirname,
			filename: 'assets/dist/blocks.js',
			publicPath: '/',
			libraryTarget: 'this',
		},
		optimization: {
			minimize: true,
			minimizer: [
				new UglifyJsPlugin( {
					uglifyOptions: {
						output: {
							comments: false,
							beautify: false,
						},
					}
				} )
			],
		},
		plugins: [
			new MiniCssExtractPlugin( {
				filename: 'assets/dist/editor.css',
			} ),
		],
		externals: {
			'react': 'React',
			'react-dom': 'ReactDOM',
			wp: 'wp',
		},
		performance: {
			hints: false,
		},
	};

	// Notification for dev.
	if ( 'development' === env ) {
		config.plugins.push( new WebpackNotifierPlugin( {
			title: 'Gumponents',
			alwaysNotify: true,
		} ) );
	}

	return config;

};
