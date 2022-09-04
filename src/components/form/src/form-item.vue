<template>
    <div class="hf-form-item">
        <label v-if="label">{{ label }}</label>
        <!-- input插槽 -->
        <slot></slot>

        <!-- 校验错误信息 -->
        <p v-if="errorMsg">{{ errorMsg }}</p>
    </div>
</template>

<script>
import schema from 'async-validator';
export default {
    name: 'MyFormItem',
    // 注入form,使用form提供的数据模型model和效验规则rules
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
        // 用于获取指定字段值和校验规则
        prop: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            errorMsg: ''
        };
    },
    mounted() {
        // 监听input组件的this.$parent.$emit('validate')
        this.$on('validate', () => this.validate());
    },
    methods: {
        // 效验
        validate() {
            let state = false;
            // 获取值和效验规则
            const value = this.form.model[this.prop];
            const rule = this.form.rules[this.prop];
            // 创建schema实例 { username:rules }
            const validator = new schema({ [this.prop]: rule });
            // 执行校验，校验对象回调函数
            validator.validate({ [this.prop]: value }, (errors, fields) => {
                // formItem验证不通过返回提示消息
                errors ? (this.errorMsg = errors[0].message) : (this.errorMsg = '');
                // 返回formItem是否验证通过
                errors ? (state = false) : (state = true);
            });

            return state;
        }
    }
};
</script>
