'use strict';

module.exports = {
	plugins: [
		require('postcss-import')({
			path: [
				"./assets/css/"
			]
		}),
		require('postcss-cssnext')(),
		require('postcss-plugin-context')({
			normalize: require('postcss-normalize')()
		})
	]
};