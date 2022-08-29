<template>
    <div class="hf-verify-code">
        <input
            type="text"
            v-for="i in inputNums"
            :key="i"
            @keyup="onInput($event, i)"
            @focus="onDel($event, i)"
            :value="code[i - 1]"
            :class="{ success: code[i - 1] }"
        />
    </div>
</template>

<script>
export default {
    name: 'MyVerifyInput',
    props: {
        inputNums: {
            type: Number,
            default: 6
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            code: this.value.split('')
        };
    },
    watch: {
        value(newVal) {
            this.code = newVal.split('');
        },
        code(newVal) {
            this.$emit('input', newVal.join(''));
        }
    },
    methods: {
        onInput(e, index) {
            let ele = e.target;
            let siblingsNode = ele.parentNode.children;
            // value值只能输入数字，并且是个位数
            let value = ele.value.replace(/[^\d]/g, '').slice(-1);
            // 当前input赋值
            this.$set(this.code, index - 1, value);
            if (index >= siblingsNode.length - 1) {
                index = siblingsNode.length - 1;
            }

            if (value) {
                // 聚焦到下一个input
                siblingsNode[index].focus();
            }
        },
        onDel(e, index) {
            let ele = e.target;
            let siblingsNode = ele.parentNode.children;
            let that = this;

            if (!e.data) {
                // 绑定键盘监听事件
                ele.addEventListener('keyup', function (e) {
                    let k = e.keyCode || e.which;
                    // 监听退格键
                    if (k === 8) {
                        // 退格删除input中的值
                        that.$delete(that.code, index - 1);
                        if (index <= 2) {
                            index = 2;
                        }
                        // 退格到上一个input
                        siblingsNode[index - 2].focus();
                        return false;
                    }
                });
            }
        }
    }
};
</script>

<style>
.hf-verify-code input {
    border: 1px solid #eee;
    font-size: 14px;
    margin-left: 2px;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
}
.hf-verify-code input:first {
    margin-left: 0;
}
.hf-verify-code input:focus {
    outline: none;
}
.hf-verify-code input.success {
    border-color: #67c23a;
    border-width: 1px;
    transition: border-color 0.5s;
    outline: none;
}
</style>
