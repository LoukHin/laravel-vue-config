const mix = require('laravel-mix');
const path = require('path');

class ConfigExtension {
	register(config) {
		this.config = config || './config';
	}

	webpackRules() {
		return {
			test: /config[\\\/].+\.(php)$/,
			loader: 'php-array-loader',
		}
	}

	webpackConfig(webpackConfig) {
		webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
		webpackConfig.resolve.alias['@config'] = path.resolve('./config');
	}
}

mix.extend('config', new ConfigExtension());
