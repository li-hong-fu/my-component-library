<template>
    <div class="hf-cascader-panel">
        <div class="hf-cascader-menu cascader-left">
            <ul class="hf-cascader-menu_list">
                <li
                    class="hf-cascader-menu_item"
                    v-for="(item, index) in options"
                    :key="index"
                    :class="{ is_active: selectIndex == index }"
                    @click="select(item, index)"
                >
                    <i class="hf-icon-check" v-if="selectIndex == index && !item.children">
                        <svg class="hf-cascader-node_prefix" viewBox="0 0 1024 1024">
                            <path
                                d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                            ></path>
                        </svg>
                    </i>
                    <span class="hf-cascader-label">{{ item.label }}</span>
                    <i class="hf-icon-arrow_right" v-if="item.children">
                        <svg class="hf-cascader-node_prefix" viewBox="0 0 1024 1024">
                            <path
                                d="M709.845333 250.346667a22.4 22.4 0 0 1 0.533334-30.848 20.48 20.48 0 0 1 29.717333 0.64l272.426667 292.693333-272.426667 292.650667a20.458667 20.458667 0 0 1-29.717333 0.64c-8.32-8.32-8.746667-21.973333-0.533334-30.848l242.346667-262.464-242.346667-262.464z"
                            ></path>
                        </svg>
                    </i>
                </li>
            </ul>
        </div>
        <div class="hf-cascader-menu cascader-right" v-if="list && list.length > 0">
            <!-- 递归组件 -->
            <my-cascader-item
                :options="list"
                :selectData="selectData"
                :level="level + 1"
                @change="change"
            ></my-cascader-item>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyCascaderItem',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        selectData: {
            type: Array,
            default: () => []
        },
        level: {
            type: Number
        }
    },
    data() {
        return {
            selectIndex: null
        };
    },
    computed: {
        list() {
            return this.selectData[this.level] && this.selectData[this.level].children;
        }
    },
    methods: {
        select(item, index) {
            this.selectIndex = index;
            this.selectData.splice(this.level + 1); // 删除下级级联
            this.$emit('change', item, this.level);
        },
        // 递归组件的点击事件
        change(item, index) {
            this.$emit('change', item, index);
        }
    }
};
</script>

<style>
[class*='hf-icon-'],
[class^='hf-icon-'] {
    font-family: element-icons !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.hf-cascader-panel {
    display: flex;
}
.hf-cascader-menu {
    flex: 1;
    height: 204px;
}
.hf-cascader-menu_list {
    list-style-type: none;
    min-width: 180px;
    min-height: 100%;
    box-sizing: border-box;
    padding: 6px 0;
    color: #606266;
    border-right: 1px solid #e4e7ed;
}
.hf-cascader-menu_item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30px 0 20px;
    height: 34px;
    line-height: 34px;
    outline: none;
    cursor: pointer;
}
.hf-cascader-menu_item:hover {
    background: #f5f7fa;
}
.hf-cascader-menu_item.is_active {
    color: #409eff;
    font-weight: 700;
}
.hf-cascader-label {
    flex: 1;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hf-icon-arrow_right {
    position: absolute;
    right: 12px;
    display: flex;
}
.hf-cascader-node_prefix {
    width: 18px;
    fill: #c0c4cc;
}
.hf-cascader-menu_item.is_active .hf-cascader-node_prefix {
    fill: #409eff;
}
.hf-icon-check {
    position: absolute;
    left: 10px;
}
.hf-icon-check .hf-cascader-node_prefix {
    width: 12px;
}
</style>
