<template>
    <div class="hf-cascader" ref="cascader">
        <!-- input -->
        <div class="hf-cascader-editor" :class="visible ? 'is_focus' : ''">
            <input
                type="text"
                class="hf-input_inner"
                readonly="readonly"
                autocomplete="off"
                :aria-expanded="visible"
                placeholder="请选择"
                :value="inputVal"
                @click="popoverOpen"
            />
            <i class="hf-input_icon hf-icon-arrow_down">
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
            <my-cascader-item
                :options="options"
                :selectData="selectData"
                :level="0"
                @change="onChange"
            ></my-cascader-item>
        </div>
    </div>
</template>

<script>
import MyCascaderItem from './cascader-item.vue';

export default {
    name: 'MyCascader',
    components: {
        MyCascaderItem
    },
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            visible: false,
            selectData: []
        };
    },
    computed: {
        inputVal() {
            return this.selectData.map((item) => item.label).join(' / ');
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
        // 点击事件
        onChange(value, index) {
            console.log(value);
            this.selectData[index] = value;
            this.selectData.splice(index, 1, value); //触发更新

            // $emit方法把选择的值传递给父组件
            let selectArr = this.selectData.map((item) => item.value);
            this.$emit('input', selectArr);

            if (!value.children) this.visible = false;
        }
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
.hf-cascader-editor .hf-icon-arrow_down {
    right: 10px;
    top: 15px;
    transition: 0.3s;
}
.hf-cascader-editor .hf-input_icon .hf-input_suff {
    width: 12px;
}
.hf-cascader-editor.is_focus .hf-icon-arrow_down {
    transform: rotate(180deg);
}

/* 弹出层 */
.hf-cascader-popover {
    position: absolute;
    margin: 5px 0;
    font-size: 14px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
