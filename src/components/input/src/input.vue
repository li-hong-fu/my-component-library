<template>
    <div class="hf-input">
        <template>
            <input
                type="text"
                class="hf-input_inner"
                v-bind="$attrs"
                :value="value"
                @input="inputHandler"
            />
        </template>
    </div>
</template>

<script>
export default {
    name: 'MyInput',
    props: {
        value: [String, Number]
    },
    methods: {
        inputHandler(e) {
            this.$emit('input', e.target.value);
            // 通知校验
            this.$parent.$emit('validate');
        }
    }
};
</script>
