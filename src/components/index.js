import DatePicker from "./date-picker/index.js";
import VerifyInput from "./verify-input/index.js";
import Cascader from './cascader/index.js';
import Table from './table/index.js';
import TableColumn from './table-column/index';

const components = [
    DatePicker, VerifyInput, Cascader,
    Table, TableColumn
];

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

export default {
    install,
    DatePicker,
    VerifyInput,
    Cascader,
    Table,
    TableColumn
};