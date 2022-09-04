import MyInput from './src/input.vue';

MyInput.install = function install(Vue) {
    Vue.component(MyInput.name, MyInput);
};

export default MyInput;