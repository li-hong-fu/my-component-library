<script>
import { store } from './store';

export default {
    name: 'MyTable',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    created() {
        store.columns.length = 0;
    },
    render() {
        return (
            <div>
                {/* my-table-column默认插槽的内容，默认隐藏掉不显示 */}
                <div style={{ display: 'none' }}>{this.$slots.default}</div>
                <table cellspacing="0" cellpadding="0">
                    {/* 表头的渲染,遍历存储表头的数组渲染 */}
                    <thead>
                        <tr>
                            {store.columns.map((item) => (
                                <th>{item.label}</th>
                            ))}
                        </tr>
                    </thead>

                    {/* 表格内容渲染,
                        1.首选遍历传入的data数据源,
                        2.再根据表头中存储的方法，渲染每一个td的内容
                        3.如果表头中插槽有定义，就渲染插槽的内容
                    */}
                    <tbody>
                        {/*this.data.length > 0
                            ? this.data.map((item) => (
                                <tr>
                                    {store.columns.map((column) => {
                                        const columnData = { ...column };
                                        const data = {
                                            column: columnData,
                                            row: item
                                        };
                                        return <td>{column.renderCell(data)}</td>;
                                    })}
                                </tr>
                            ))
                            : '暂无列表信息'*/}
                        {this.data.map((item) => (
                            <tr>
                                {store.columns.map((column) => {
                                    const columnData = { ...column };
                                    const data = {
                                        column: columnData,
                                        row: item
                                    };
                                    return <td>{column.renderCell(data)}</td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};
</script>
