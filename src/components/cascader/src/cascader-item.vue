<template>
    <ul class="cascader-list">
        <li
            v-for="(item, index) in options"
            :key="index"
            :class="{ selected: selectIndex == index }"
        >
            <div @click="onSelect(item, index)">{{ item.label }}</div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MyCascaderItem',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectIndex: null
        };
    },
    methods: {
        onSelect(item, index) {
            // this.selected = item;
            this.selectIndex = index;
            this.$emit('select', item, index);
        }
    }
};
</script>
