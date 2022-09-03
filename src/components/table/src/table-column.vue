<script>
import { store } from './store';

export default {
    name: 'MyTableColumn',
    props: ['prop', 'label'],
    created() {
        let item = {
            prop: this.prop,
            label: this.label
        };

        item.renderCell = (data) => {
            let children = null;
            // 表头是否有默认插槽内容
            if (this.$scopedSlots.default) {
                // 含有内容，使用作用域插槽方式，将每一行的数据传到外面
                // 等效于<slot :row="data.row"></slot>
                children = this.$scopedSlots.default(data);
            } else {
                // 根据表头的属性，数组某一项的键对应的值
                const { row, column } = data;

                children = row[column.prop];
            }
            return <div>{children}</div>;
        };
        store.columns.push(item);
    },

    render(h) {
        return h('div', this.$slots.default);
    }
};
</script>
