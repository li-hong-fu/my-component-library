<template>
    <div id="app">
        <my-date-picker v-model="time" format="yyyy 年 MM 月 dd 日"></my-date-picker>
        <my-verify-input v-model="verifyInput"></my-verify-input>
        <my-cascader v-model="cascader" :options="options"></my-cascader>

        <my-table :data="tableData" style="width: 100%">
            <my-table-column prop="name" label="姓名"></my-table-column>
            <my-table-column prop="date" label="日期"></my-table-column>
            <my-table-column prop="address" label="地址"></my-table-column>
            <my-table-column prop="opreation" label="操作">
                <template slot-scope="{ row }">
                    <button>编辑</button>
                    <button>删除</button>
                </template>
            </my-table-column>
        </my-table>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
            time: '',
            verifyInput: '',
            cascader: '',
            options: [
                {
                    value: 'zhinan',
                    label: '数码',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '手机',
                            children: [
                                {
                                    value: 'yizhi',
                                    label: '苹果'
                                },
                                {
                                    value: 'fankui',
                                    label: '华为'
                                },
                                {
                                    value: 'xiaolv',
                                    label: '三星'
                                },
                                {
                                    value: 'kekong',
                                    label: '小米'
                                }
                            ]
                        },
                        {
                            value: '',
                            label: '笔记本电脑',
                            children: [
                                {
                                    value: 'cexiangdaohang',
                                    label: 'Macbook Pro'
                                },
                                {
                                    value: 'dingbudaohang',
                                    label: 'iMac'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'zujian',
                    label: '家电',
                    children: [
                        {
                            value: 'basic',
                            label: '空调',
                            children: [
                                {
                                    value: 'layout',
                                    label: '格力'
                                },
                                {
                                    value: 'color',
                                    label: '美的'
                                }
                            ]
                        },
                        {
                            value: 'basic',
                            label: '洗衣机',
                            children: [
                                {
                                    value: 'layout',
                                    label: '西门子'
                                },
                                {
                                    value: 'color',
                                    label: '松下'
                                }
                            ]
                        }
                    ]
                }
            ],

            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        };
    },
    watch: {
        time(val) {
            // console.log(val);
        },
        verifyInput(val) {
            // console.log(val, 2);
        },
        cascader(val) {
            // console.log(val, 3);
        }
    }
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
html,
body,
#app {
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #2c3e50;
}
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
