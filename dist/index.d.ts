import { VueConstructor } from 'vue';
declare type ConfigFunction = (key: string) => string;
interface ImportOptions {
    search?: RegExp;
}
/**
 * Augments vue.
 */
declare module 'vue/types/vue' {
    interface Vue {
        config: ConfigFunction;
    }
}
/**
 * Adds configurations to Vue.
 */
declare const Config: {
    install: (Vue: VueConstructor, options: ImportOptions) => void;
};
export { Config as default, Config };
