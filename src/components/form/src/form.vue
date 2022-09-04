<template>
    <div class="hf-form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MyForm',
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
    provide() {
        return {
            form: this
        };
    },
    methods: {
        validate(cd) {
            let tasks = this.$children.filter((item) => item.prop).map((item) => item.validate());
            Promise.all(tasks)
                .then(function () {
                    cd(true);
                })
                .catch(function () {
                    cd(false);
                });
        }
    }
};
</script>
