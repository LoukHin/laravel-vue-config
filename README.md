<p align="center">
  <h1 align="center">Configurations for Vue and Laravel</h1>
<p>

This package allows to easily setup configurations with a Laravel application using Vue. It is modified from and based on [`laravel-vue-lang`](https://github.com/innocenzi/laravel-vue-lang/).

> This package is modified to fits my personal use, if your config is not the same as mine it might not work as expected

## Installation

```console
$ yarn add LoukHin/laravel-vue-config
```

### With the Laravel Mix extension

This package ships with a Laravel Mix extension. You can include it and call `.config()` on Mix.

Your `webpack.mix.js` should look like that:

```js
const mix = require('laravel-mix');
require('laravel-vue-config/mix');

mix
	// ...
	.config();
```

### Without the extension

If you prefer manual configuration, you will need to add a rule to load your translations, and a `@config` alias that point to your config directory. Your Mix configuration should look like this:

```js
const mix = require('laravel-mix');

mix
	// ...
	.webpackConfig({
		resolve: {
			alias: {
				'@config': path.resolve('./config'),
			},
		},
		module: {
			rules: [
				{
					test: /config.+\.(php)$/,
					loader: 'php-array-loader',
				},
			],
		},
	});
```

## Usage

Register the plugin in your Javascript:

```js
import { Config } from 'laravel-vue-config';

// Register the plugin
Vue.use(Config);

// Register Vue
const app = new Vue({
	el: '#app',
});
```

You can now use the following in any Vue file:

| Function name | Description                                                                                   | Arguments                                                   |
| ------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `config()`        | Configurations of the given `key` | `key: string` |


Example:

```html
<template>
	<div>
		<span>{{ config('messages.hello') }}</span>
	</div>
</template>

<script>
	export default {
		created() {
			console.log(this.config('messages.hello'));
		},
	};
</script>
```
