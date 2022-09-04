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
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
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
        this.$on('validate', () => this.validate());
    },
    methods: {
        validate() {
            const value = this.form.model[this.prop];
            const rule = this.form.rules[this.prop];

            let validator = new schema({ [this.prop]: rule });

            return validator.validate({ [this.prop]: value }, (errors, fields) => {
                if (errors) {
                    this.errorMsg = errors[0].message;
                } else {
                    this.errorMsg = '';
                }
            });
        }
    }
};
</script>
