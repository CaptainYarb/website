'use strict';

var path = require('path');

var webpack = require("webpack"),
	OptimizeJsPlugin = require("optimize-js-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	CompressionPlugin = require("compression-webpack-plugin"),
	BrotliPlugin = require('brotli-webpack-plugin');

var config = {
	profile: true,
	context: path.join(__dirname, '/assets'),
	entry: {
		vendor: [
			"./js/app.js",
			"./css/style.css"
		],
	},
	output: {
		path: path.join(__dirname, "/build/assets/"),
		filename: "[name].bundle.js",
		crossOriginLoading: 'anonymous'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor"),
		new webpack.ProvidePlugin({
			'THREE': './libs/three.min.js'
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': process.env.NODE_ENV
			}
		}),
		new ExtractTextPlugin('[name].bundle.css'),
	],
	module: {
		rules: [
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/font-woff"
						}
					}
				]
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/octet-stream"
						}
					}
				]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/octet-stream"
						}
					}
				]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/octet-stream"
						}
					}
				]
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader"
					}
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "image/svg+xml"
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								importLoaders: 1
							},
						},
						{
							loader: 'postcss-loader'
						}
					]
				})
			}
		]
	}
};

if(process.env.NODE_ENV === 'production'){
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			drop_console: true
		}
	}));
	config.plugins.push(new OptimizeJsPlugin({
		sourceMap: false
	}));
	config.plugins.push(new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "zopfli",
		test: /\.(js|css)$/,
		minRatio: 0,
		verbose: true
	}));
	config.plugins.push(new BrotliPlugin({
		asset: '[path].br[query]',
		test: /\.(js|css|html|svg)$/,
		threshold: 10240,
		minRatio: 0.8
	}));
}

module.exports = config;