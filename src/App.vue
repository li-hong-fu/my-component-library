<template>
    <div id="app">
        <my-date-picker v-model="time" format="yyyy 年 MM 月 dd 日"></my-date-picker>
        <my-verify-input v-model="verifyInput"></my-verify-input>
        <my-cascader :options="options"></my-cascader>
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
            ]
        };
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
    text-align: center;
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
