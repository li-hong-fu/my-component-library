import MyForm from './src/form.vue';

MyForm.install = function install(Vue) {
    Vue.component(MyForm.name, MyForm);
};

export default MyForm;