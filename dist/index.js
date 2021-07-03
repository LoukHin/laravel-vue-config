"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.default = void 0;
class Configuration {
    constructor(options) {
        options = options || {};
        this.configs = options.configs;
    }
    _getValue(object, key) {
        // If the full key exists just return the value
        if (typeof object[key] !== 'undefined') {
            return object[key];
        }
        key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        key = key.replace(/^\./, ''); // strip a leading dot
        const parts = key.split('.');
        for (let i = 0, n = parts.length; i < n; ++i) {
            const currentKey = parts.slice(0, i + 1).join('.');
            const restOfTheKey = parts.slice(i + 1, parts.length).join('.');
            if (object[currentKey]) {
                return this._getValue(object[currentKey], restOfTheKey);
            }
        }
        return null;
    }
    get(key) {
        const config = this._getValue(this.configs, key);
        if (config === null) {
            return key;
        }
        return config;
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
function importConfigurations() {
    const configurations = {};
    const files = require.context('@config', true, /(fields|item)\.php$/);
    files.keys().forEach((file) => {
        var _a;
        const [_, key] = (_a = /\.\/([A-Za-z0-9-_]+).(?:php|json)/.exec(file)) !== null && _a !== void 0 ? _a : [];
        configurations[`${key}`] = files(file);
    });
    return configurations;
}
/**
 * Adds configurations to Vue.
 */
const Config = {
    install: (Vue) => {
        const configurations = new Configuration({
            configs: importConfigurations(),
        });
        // Defines a global configurations function
        const config = (key) => {
            return configurations.get(key);
        };
        Vue.mixin({
            methods: {
                config,
            },
        });
    },
};
exports.default = Config;
exports.Config = Config;
