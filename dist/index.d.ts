import { VueConstructor } from 'vue';
declare type ConfigFunction = (key: string) => string;
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
    install: (Vue: VueConstructor) => void;
};
export { Config as default, Config };
