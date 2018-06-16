const path = require ('path');
const env = require ('process-env');
const webpack = require ('webpack');
const nodeExternals = require ('webpack-node-externals');

const config = require ('config');
const projectRoot = path.resolve (__dirname, '../../');

const {PRODUCTION} = config;
const SRC_PATH = path.resolve (projectRoot, 'src');
const BUILD_PATH = path.resolve (projectRoot, 'build/server');
const MODULES_PATH = path.resolve (projectRoot, 'node_modules');

const NODE_ENV = env.get ('NODE_ENV') || 'development';

module.exports = {

	mode: NODE_ENV,

	target: 'node',
	externals: [nodeExternals ()],
	node: {
		__dirname: false,
		__filename: false
	},

	entry: [
		'regenerator-runtime/runtime',
		path.resolve (SRC_PATH, 'server/index.js')
	],

	output: {
		path: BUILD_PATH,
		filename: 'index.js'
	},

	performance: {
		hints: false
	},

	resolve: {
		extensions: ['.js'],
		modules: [
			SRC_PATH,
			MODULES_PATH
		]
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|less)$/,
				use: [
					'css-loader',
					'less-loader'
				]
			}
		],
		noParse: /lie\.js|[\s\S]*.(svg|ttf|eot)/
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin (),
		new webpack.DefinePlugin ({
			'__DEV__': !PRODUCTION,
			'process.env': {
				'NODE_ENV': JSON.stringify (NODE_ENV),
				'ASSET_PATH': JSON.stringify ('/')
			}
		})
	],

	stats: false,

	cache: true,
	devtool: PRODUCTION ? false : 'source-map'

}
