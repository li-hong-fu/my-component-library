import Cascader from './src/cascader.vue';

Cascader.install = function install(Vue) {
    Vue.component(Cascader.name, Cascader);
};

export default Cascader;