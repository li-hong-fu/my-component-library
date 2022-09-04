<template>
    <div class="hf-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MyForm',
    // 把form实例提供出去，以便后代组件使用它的数据模型和校验规则
    provide() {
        return {
            form: this
        };
    },
    props: {
        model: {
            type: Object,
            required: true,
            default: () => {}
        },
        rules: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        // 全局校验
        validate(cd) {
            // 不是所有项都需要校验，formItem有prop属性才需要校验
            // tasks是promise数组
            let tasks = this.$children.filter((item) => item.prop).map((item) => item.validate());
            // 所有需要验证的formItem必须全部通过,整个表单才能验证通过
            let state = tasks.every((item) => item === true);
            cd(state);
        }
    }
};
</script>
