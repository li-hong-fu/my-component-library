<template>
    <div id="app">
        <my-date-picker v-model="time" format="yyyy 年 MM 月 dd 日"></my-date-picker>
        <my-verify-input></my-verify-input>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
            time: ''
        };
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
