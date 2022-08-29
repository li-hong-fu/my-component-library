import MyDatePicker from './src/date-picker.vue';

MyDatePicker.install = function install(Vue) {
    Vue.component(MyDatePicker.name, MyDatePicker);
};

export default MyDatePicker;