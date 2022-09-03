import MyTableColumn from '../table/src/table-column.vue';

MyTableColumn.install = function install(Vue) {
    Vue.component(MyTableColumn.name, MyTableColumn);
};

export default MyTableColumn;