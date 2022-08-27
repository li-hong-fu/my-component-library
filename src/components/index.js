import DatePicker from "./date-picker/index.js";
import VerifyInput from "./verify-input/index.js";
import Cascader from './cascader/index.js';

const components = [
    DatePicker, VerifyInput, Cascader
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
    Cascader
};