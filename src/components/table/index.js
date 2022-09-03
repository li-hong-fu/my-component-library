// 渲染表格是先挂载my-table-column组件，再挂载my-table组件。
// 每次创建my-table-column组件时，需要将表头信息全部保存下来，并创建一个渲染表格每一项数据的方法，若表头函数插槽内容存在，将数据通过作用域插槽传递到外层
// 最后在my-table组件，渲染table表格

import MyTable from './src/table.vue';

MyTable.install = function install(Vue) {
    Vue.component(MyTable.name, MyTable);
};

export default MyTable;