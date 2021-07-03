import { VueConstructor } from 'vue'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

type ConfigFunction = (key: string) => string

interface ConfigurationObject {
	[key: string]: any
}

interface ConfigOptions {
	configs: any
}

class Configuration {
	configs: any

	constructor (options: ConfigOptions) {
        options = options || {}
        this.configs = options.configs
    }

	_getValue (object: ConfigurationObject, key: string): any {
        // If the full key exists just return the value
        if (typeof object[key] !== 'undefined') {
            return object[key]
        }

        key = key.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
        key = key.replace(/^\./, '')           // strip a leading dot

        const parts = key.split('.')

        for (let i = 0, n = parts.length; i < n; ++i) {
            const currentKey = parts.slice(0, i + 1).join('.')
            const restOfTheKey = parts.slice(i + 1, parts.length).join('.')

            if (object[currentKey]) {
                return this._getValue(object[currentKey], restOfTheKey)
            }
        }

        return null
    }

	get (key: string): string {
		const config = this._getValue(this.configs, key)

        return config
    }
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * Imports configurations from the configured alias.
 */
function importConfigurations(): ConfigurationObject {
	const configurations: ConfigurationObject = {}
	const files = require.context('@config', true, /(fields|item)\.php$/)

	files.keys().forEach((file: string) => {
		const [_, key] = /\.\/([A-Za-z0-9-_]+).(?:php|json)/.exec(file) ?? []

		configurations[`${key}`] = files(file)
	})

	return configurations
}

/*
 |--------------------------------------------------------------------------
 | Vue plugin
 |--------------------------------------------------------------------------
 */

/**
 * Augments vue.
 */
declare module 'vue/types/vue' {
	interface Vue {
		config: ConfigFunction
	}
}

/**
 * Adds configurations to Vue.
 */
const Config = {
	install: (Vue: VueConstructor) => {
		const configurations = new Configuration({
			configs: importConfigurations(),
		})

		// Defines a global configurations function
		const config: ConfigFunction = (key) => {
			return configurations.get(key)
		}

		Vue.mixin({
			methods: {
				config,
			},
		})
	},
}

export { Config as default, Config }
