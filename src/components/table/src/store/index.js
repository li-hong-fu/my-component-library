import Vue from "vue";

// 非常粗暴的用一个Vue实例，储存表头信息在全局中
const data = {
    columns: []
};

const store = new Vue({ data: data });

export { store };