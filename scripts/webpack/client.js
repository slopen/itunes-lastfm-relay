const path = require ('path');
const env = require ('process-env');
const webpack = require ('webpack');
const CopyWebpackPlugin = require ('copy-webpack-plugin');
const UglifyJsPlugin = require ('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

const config = require ('config');
const projectRoot = path.resolve (__dirname, '../../');

const {PRODUCTION} = config;
const SRC_PATH = path.resolve (projectRoot, 'src');
const BUILD_PATH = path.resolve (projectRoot, 'build/client');
const MODULES_PATH = path.resolve (projectRoot, 'node_modules');

const NODE_ENV = env.get ('NODE_ENV') || 'development';

module.exports = {

	mode: NODE_ENV,

	entry: path.resolve (SRC_PATH, 'components/index.js'),

	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	performance: {
		hints: false
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			SRC_PATH,
			MODULES_PATH
		]
	},

	module: {
		rules: [
			{
				test: /\.(js|mjs)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.(png|jpg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(css|less)$/,
				use: ExtractTextPlugin.extract ({
					use: [
						{
							loader: 'css-loader',
							options: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
								sourceMap: !PRODUCTION
							}
						},
						'less-loader'
					]
				})
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
		noParse: /lie\.js|[\s\S]*.(svg|ttf|eot)/
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	plugins: [
		new ExtractTextPlugin ('styles.css'),
		new CopyWebpackPlugin ([
			{
				from: path.resolve (SRC_PATH, 'favicon.ico'),
				to: 'favicon.ico'
			},
			{
				from: path.resolve (SRC_PATH, 'images'),
				to: 'images'
			}
		]),
		new webpack.NoEmitOnErrorsPlugin (),
		new webpack.DefinePlugin ({
			'__DEV__': !PRODUCTION,
			'process.env': {
				'NODE_ENV': JSON.stringify (NODE_ENV),
				'ASSET_PATH': JSON.stringify ('/')
			}
		})
	].concat (PRODUCTION ? [
		new UglifyJsPlugin ({
			sourceMap: false,
			uglifyOptions: {
				warnings: false,
				output: {
					comments: false
				},
				compress: {
					conditionals: true,
					dead_code: true,
					evaluate: true,
					loops: true,
					passes: 3,
					booleans: true,
					unused: true,
					join_vars: true,
					collapse_vars: true,
					reduce_vars: true
				},
				mangle: false
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin
	] : []),

	stats: {
		children: false
	},

	devServer: {
		https: true,
		public: 'itunes-lastfm-relay',
		port: config.devPort,
		contentBase: BUILD_PATH,
		historyApiFallback: true,
		disableHostCheck: true,
		stats: 'minimal',
		hot: true,
		inline: true
	},

	cache: true,
	devtool: PRODUCTION ? false : 'source-map'

}
