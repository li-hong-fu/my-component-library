import MyFormItem from '../form/src/form-item.vue';

MyFormItem.install = function install(Vue) {
    Vue.component(MyFormItem.name, MyFormItem);
};

export default MyFormItem;