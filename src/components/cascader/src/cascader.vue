<template>
    <div class="hf-cascader" ref="cascader">
        <!-- input -->
        <div class="hf-cascader-editor">
            <input
                type="text"
                class="hf-input_inner"
                readonly="readonly"
                autocomplete="off"
                aria-expanded="false"
                placeholder="请选择"
                @click="popoverOpen"
            />
            <i class="hf-input_icon icon-arrow-down">
                <svg class="hf-input_suff" viewBox="0 0 1024 1024">
                    <path
                        d="M483.072 714.496l30.165333 30.208 415.957334-415.829333a42.837333 42.837333 0 0 0 0-60.288 42.538667 42.538667 0 0 0-60.330667-0.042667l-355.541333 355.413333-355.242667-355.413333a42.496 42.496 0 0 0-60.288 0 42.837333 42.837333 0 0 0-0.085333 60.330667l383.701333 383.872 1.706667 1.749333z"
                        fill="#c0c4cc"
                    ></path>
                </svg>
            </i>
        </div>
        <!-- popover -->
        <div class="hf-cascader-popover" v-show="visible">
            <my-cascader-item :options="options" @select="onSelect"></my-cascader-item>
            <!-- <ul class="cascader-list_left">
                <li v-for="(item, index) in options" :key="index">
                    <div @click="onSelect(item)">{{ item.label }}</div>
                </li>
            </ul>
            <ul class="cascader-list_right" v-if="list.length > 0">
                <li v-for="(item, index) in list" :key="index">
                    <div>{{ item.label }}</div>
                </li>
            </ul> -->
        </div>
    </div>
</template>

<script>
import clickOutside from './outside';
import MyCascaderItem from './cascader-item.vue';

export default {
    name: 'MyCascader',
    components: {
        MyCascaderItem
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            visible: false,
            selected: [],
            nowValue: null // 当前选中值
        };
    },
    computed: {
        list() {
            return this.selected.children ? this.selected.children : [];
        }
    },
    mounted() {
        document.body.addEventListener('click', this.popoverClose);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.popoverClose);
    },
    methods: {
        // 打开popover
        popoverOpen() {
            this.visible = !this.visible;
        },
        // 关闭popover
        popoverClose(e) {
            // Vue内部会自动帮我们修改this指向
            const { cascader } = this.$refs;

            // 过滤掉弹出层和日期选择器内的元素
            if (cascader.contains(e.target)) {
                return;
            }
            this.visible = false;
        },
        onSelect(item, index) {
            console.log(item, index);
            // this.selected = item;
        }
    },
    directives: {
        clickOutside: clickOutside
    }
};
</script>

<style>
input::-webkit-input-placeholder {
    color: #c0c4cc;
}
input:-ms-input-placeholder {
    color: #c0c4cc;
}
input:focus {
    outline: none;
    border-color: #409eff;
}
input:hover {
    cursor: pointer;
}
.hf-cascader {
    position: relative;
    display: inline-block;
}
.hf-cascader-editor {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 220px;
}
.hf-cascader-editor .hf-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    padding-left: 15px;
    padding-right: 30px;
}
.hf-cascader-editor:hover .hf-input_inner {
    border-color: #c0c4cc;
}
.hf-cascader-editor.is-focus .hf-input_inner {
    border-color: #409eff;
}
.hf-cascader-editor .hf-input_icon {
    position: absolute;
    cursor: pointer;
    display: flex;
}
.hf-cascader-editor .icon-arrow-down {
    right: 10px;
    top: 15px;
}
.hf-cascader-editor .hf-input_icon .hf-input_suff {
    width: 12px;
}
</style>
