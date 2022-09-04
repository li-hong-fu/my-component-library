<template>
    <div id="app">
        <my-date-picker v-model="time" format="yyyy 年 MM 月 dd 日"></my-date-picker>
        <my-verify-input v-model="verifyInput"></my-verify-input>
        <my-cascader v-model="cascader" :options="options"></my-cascader>

        <my-table :data="tableData">
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

        <my-form ref="form" :model="form" :rules="rules">
            <my-form-item label="名称" prop="name">
                <my-input v-model="form.name"></my-input>
            </my-form-item>
            <my-form-item label="时间" prop="date">
                <my-input v-model="form.date"></my-input>
            </my-form-item>
            <my-form-item>
                <button @click="submitForm">提交</button>
            </my-form-item>
        </my-form>
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
            ],

            form: {
                name: '',
                date: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
            }
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
    },
    methods: {
        submitForm() {
            this.$refs['form'].validate((isValid) => {
                console.log(isValid);
            });
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
