<template>
    <div class="date-picker" ref="picker">
        <!-- input -->
        <div class="date-editor">
            <span class="input_prefix">
                <svg class="input_icon icon-date" viewBox="0 0 1024 1024">
                    <path
                        d="M844.8 409.6h-665.6v100.7616a25.6 25.6 0 0 1-51.2 0V256A76.8 76.8 0 0 1 204.8 179.2h51.2v51.2H204.8a25.6 25.6 0 0 0-25.6 25.6v102.4h665.6V256a25.6 25.6 0 0 0-25.6-25.6h-51.2v-51.2h51.2A76.8 76.8 0 0 1 896 256v563.2a76.8 76.8 0 0 1-76.8 76.8H204.8A76.8 76.8 0 0 1 128 819.2v-181.6576a25.6 25.6 0 0 1 51.2 0V819.2a25.6 25.6 0 0 0 25.6 25.6h614.4a25.6 25.6 0 0 0 25.6-25.6V409.6zM614.4 179.2v51.2H409.6v-51.2h204.8zM332.8 512h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m307.2 0h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m-153.6 0h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m-153.6 153.6h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m307.2 0h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m-153.6 0h51.2a25.6 25.6 0 0 1 0 51.2h-51.2a25.6 25.6 0 0 1 0-51.2z m-153.6-563.2a25.6 25.6 0 0 1 25.6 25.6v153.6a25.6 25.6 0 0 1-51.2 0v-153.6a25.6 25.6 0 0 1 25.6-25.6z m358.4 0a25.6 25.6 0 0 1 25.6 25.6v153.6a25.6 25.6 0 0 1-51.2 0v-153.6a25.6 25.6 0 0 1 25.6-25.6z"
                        fill="#c0c4cc"
                    ></path>
                </svg>
            </span>
            <input
                class="input_inner"
                type="text"
                @focus="popoverOpen"
                :value="nowValue"
                placeholder="选择日期"
            />
            <i class="input_close" :class="nowValue ? 'active' : ''" @click="onEmpty">
                <svg class="input_icon" viewBox="0 0 1024 1024">
                    <path
                        d="M503.466667 533.333333L384 413.866667l29.866667-29.866667 119.466666 119.466667L652.8 384l29.866667 29.866667-119.466667 119.466666 119.466667 119.466667-29.866667 29.866667-119.466667-119.466667L413.866667 682.666667l-29.866667-29.866667 119.466667-119.466667z m29.866666 362.666667C332.8 896 170.666667 733.866667 170.666667 533.333333S332.8 170.666667 533.333333 170.666667 896 332.8 896 533.333333 733.866667 896 533.333333 896z m0-42.666667c174.933333 0 320-145.066667 320-320S708.266667 213.333333 533.333333 213.333333 213.333333 358.4 213.333333 533.333333 358.4 853.333333 533.333333 853.333333z"
                        fill="#c0c4cc"
                        p-id="2246"
                    ></path>
                </svg>
            </i>
        </div>

        <!-- popover -->
        <div class="date-popover" v-show="visible">
            <div class="date-popover_header">
                <button class="arrow-left-y" @click="onPrevYear"></button>
                <button class="arrow-left-m" @click="onPrevMonth"></button>
                <div>
                    <span class="arrow-year" @click="panelType = 'year'">{{ tmpYear }}年</span>
                    <span class="arrow-month" @click="panelType = 'month'">
                        {{ tmpMonth + 1 }}月
                    </span>
                </div>
                <button class="arrow-right-m" @click="onNextMonth"></button>
                <button class="arrow-right-y" @click="onNextYear"></button>
            </div>
            <div class="date-popover_content">
                <!-- 年面板 -->
                <table class="date-table type-year" v-show="panelType === 'year'">
                    <tbody>
                        <tr v-for="(item, index) in yearList" :key="index">
                            <td
                                :class="tmpYear === v ? 'current' : ''"
                                v-for="v in item"
                                :key="v"
                                @click="selectYear(v)"
                            >
                                <div class="cell">{{ v }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 月面板 -->
                <table class="date-table type-month" v-show="panelType === 'month'">
                    <tbody>
                        <tr v-for="(item, index) in monthList" :key="index">
                            <td
                                :class="tmpMonth === v.value ? 'current' : ''"
                                v-for="v in item"
                                :key="v.value"
                                @click="selectMonth(v)"
                            >
                                <div class="cell">{{ v.label }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 日面板 -->
                <table class="date-table type-date" v-show="panelType === 'date'">
                    <tbody>
                        <tr>
                            <th v-for="item in weekList" :key="item.value">{{ item.label }}</th>
                        </tr>
                        <tr class="date-table_row" v-for="(item, index) in dateList" :key="index">
                            <td
                                v-for="v in item"
                                :key="v.value"
                                :class="[
                                    { 'prev-month': v.previousMonth },
                                    { 'current-month': v.currentMonth },
                                    { 'next-month': v.nextMonth },
                                    { today: validateDate(v) }
                                ]"
                                @click="selectDate(v)"
                            >
                                <div>
                                    <span>{{ v.value }}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="date-popover_arrow"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyDatePicker',
    props: {
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        }
    },
    data() {
        return {
            visible: false,
            date: new Date().getDate(), // 当前日期
            tmpDate: '', // 可修改，当前选中的日
            month: new Date().getMonth(),
            tmpMonth: new Date().getMonth(), // 临时月份,可修改
            year: new Date().getFullYear(),
            tmpYear: new Date().getFullYear(), // 临时年份，可修改
            // 周
            weekList: [
                { label: '日', value: 0 },
                { label: '一', value: 1 },
                { label: '二', value: 2 },
                { label: '三', value: 3 },
                { label: '四', value: 4 },
                { label: '五', value: 5 },
                { label: '六', value: 6 }
            ],
            nowValue: null, // 当前选中日期值
            panelType: 'date' // 面板状态
        };
    },
    computed: {
        // 年
        yearList() {
            let startYear = this.tmpYear - (this.tmpYear % 10);
            let endYear = startYear + 9;
            let year = [];
            for (let i = startYear; i <= endYear; i++) {
                year.push(i);
            }

            return this.toMatrix(year, 4);
        },
        // 月
        monthList() {
            let month = [
                { label: '一月', value: 0 },
                { label: '二月', value: 1 },
                { label: '三月', value: 2 },
                { label: '四月', value: 3 },
                { label: '五月', value: 4 },
                { label: '六月', value: 5 },
                { label: '七月', value: 6 },
                { label: '八月', value: 7 },
                { label: '九月', value: 8 },
                { label: '十月', value: 9 },
                { label: '十一月', value: 10 },
                { label: '十二月', value: 11 }
            ];

            return this.toMatrix(month, 4);
        },
        // 日
        dateList() {
            // 获取当月的天数
            let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
            //先将当月的日期塞入dateList
            let dateList = Array.from({ length: currentMonthLength }, (val, index) => {
                return {
                    currentMonth: true,
                    tmpYear: this.tmpYear, // 当前年份
                    tmpMonth: this.tmpMonth, // 当前月份
                    value: index + 1
                };
            });
            // 获取当月1号的星期是为了确定在1号前需要插多少天
            let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
            // 确认上个月一共多少天
            let previousMongthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate();

            // 在1号前插入上个月日期
            for (let i = 0, len = startDay; i < len; i++) {
                dateList = [{ previousMonth: true, value: previousMongthLength - i }].concat(
                    dateList
                );
            }

            // 补全剩余位置
            for (let i = 1; i <= 42 - startDay - currentMonthLength; i++) {
                dateList[dateList.length] = { nextMonth: true, value: i };
            }

            return this.toMatrix(dateList, this.weekList.length);
        }
    },
    watch: {
        nowValue(newVal) {
            this.$emit('input', newVal);
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
            this.visible = true;
            this.panelType = 'date';
        },
        // 关闭popover
        popoverClose(e) {
            // Vue内部会自动帮我们修改this指向
            const { picker } = this.$refs;

            // 过滤掉弹出层和日期选择器内的元素
            if (picker.contains(e.target)) {
                return;
            }
            this.visible = false;
        },
        // 选择年
        selectYear(item) {
            this.tmpYear = item;
            this.panelType = 'month';
        },
        // 选择月
        selectMonth(item) {
            this.tmpMonth = item.value;
            this.panelType = 'date';
        },
        // 选择日
        selectDate(item) {
            // 赋值 当前 nowValue,用于控制样式突出显示当前月份日期
            this.newValue = item.value;
            // 选择上个月
            if (item.previousMonth) this.tmpMonth--;
            // 选择下个月
            if (item.nextMonth) this.tmpMonth++;
            // 获取选中日期的date
            let selectDay = new Date(this.tmpYear, this.tmpMonth, this.newValue);

            // 格式日期为字符串后，赋值给input
            this.nowValue = this.formatDate(selectDay.getTime());

            // 关闭面板
            this.visible = !this.visible;
        },
        // 上一年
        onPrevYear() {
            if (this.panelType === 'year') this.tmpYear -= 12;
            else this.tmpYear--;
        },
        // 下一年
        onNextYear() {
            if (this.panelType === 'year') this.tmpYear += 12;
            else this.tmpYear++;
        },
        // 上个月
        onPrevMonth() {
            if (this.panelType === 'year') {
                this.tmpYear--;
            } else {
                if (this.tmpMonth === 0) {
                    this.tmpYear--;
                    this.tmpMonth = 11;
                } else this.tmpMonth--;
            }
        },
        // 下个月
        onNextMonth() {
            if (this.panelType === 'year') {
                this.tmpYear++;
            } else {
                if (this.tmpMonth === 11) {
                    this.tmpYear++;
                    this.tmpMonth = 0;
                } else this.tmpMonth++;
            }
        },

        // 清空对话框
        onEmpty() {
            this.nowValue = null;
        },

        // 转换二维数组
        toMatrix(arr, n) {
            let len = arr.length;
            let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
            let res = [];

            for (let i = 0; i < lineNum; i++) {
                // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
                let temp = arr.slice(i * n, i * n + n);
                res.push(temp);
            }

            return res;
        },
        // 日期格式方法
        formatDate(date, fmt = this.format) {
            if (date === null || date === 'null') {
                return '--';
            }
            date = new Date(Number(date));
            var o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                S: date.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            }

            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }

            return fmt;
        },
        // 确认是否为当前年月日
        validateDate(item) {
            if (item.tmpYear && item.tmpMonth) {
                return (
                    item.tmpYear === this.year &&
                    item.tmpMonth === this.month &&
                    this.date === item.value
                );
            }
        }
    }
};
</script>

<style>
.date-picker {
    position: relative;
    display: inline-block;
}
/* input部分 */
.date-editor {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 220px;
}
.input_inner {
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
    padding-left: 30px;
    padding-right: 30px;
}
.input_inner:focus {
    outline: none;
    border-color: #409eff;
}
.input_inner:hover {
    cursor: pointer;
}
.input_inner::-webkit-input-placeholder {
    color: #c0c4cc;
}
.input_inner:-ms-input-placeholder {
    color: #c0c4cc;
}
.input_prefix {
    position: absolute;
    left: 5px;
    top: 10px;
}
.input_close {
    display: none;
    position: absolute;
    right: 5px;
    top: 10px;
    cursor: pointer;
}
.date-editor:hover .input_close.active {
    display: block;
}
.input_icon {
    width: 18px;
}

/* popover部分 */
.date-popover {
    z-index: 2022;
    position: absolute;
    top: 40px;
    left: 0;
    color: #606266;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    margin-top: 12px;
    padding: 0 12px 12px;
}
table {
    width: 100%;
}
/* 日期选择器头部 */
.date-popover .date-popover_header {
    margin: 12px;
    display: flex;
    align-items: center;
}
.date-popover .date-popover_header button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: relative;
    border: 0;
    background: transparent;
}
.date-popover .date-popover_header div {
    flex: 1;
}
.date-popover .date-popover_header span {
    font-size: 14px;
    padding: 0 5px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    color: #606266;
}
.date-popover .date-popover_header span:hover {
    color: #409eff;
}
button:hover::before,
button:hover::after {
    border-color: #409eff;
}
.arrow-left-y::before,
.arrow-left-m::before {
    content: '';
    width: 5px;
    height: 5px;
    border: solid #606266;
    border-width: 1px 0 0 1px;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 50%;
    top: 50%;
}
.arrow-left-y::after {
    content: '';
    width: 5px;
    height: 5px;
    border: solid #606266;
    border-width: 1px 0 0 1px;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 25%;
    top: 50%;
}
.arrow-right-m::before,
.arrow-right-y::before {
    content: '';
    width: 5px;
    height: 5px;
    border: solid #606266;
    border-width: 0 1px 1px 0;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 50%;
    top: 50%;
}
.arrow-right-y::after {
    content: '';
    width: 5px;
    height: 5px;
    border: solid #606266;
    border-width: 0 1px 1px 0;
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 25%;
    top: 50%;
}

/* 日期选择器内容 */
.date-popover_content {
    width: 300px;
    font-size: 12px;
}
/* 年/月 */
.type-year td,
.type-month td {
    text-align: center;
    padding: 20px 3px;
    cursor: pointer;
    width: 67px;
}
.type-year td:hover .cell,
.type-month td:hover .cell {
    color: #409eff;
}

.type-year td .cell,
.type-month td .cell {
    width: 48px;
    height: 32px;
    display: block;
    line-height: 32px;
    color: #606266;
    margin: 0 auto;
}
.type-year td.current .cell,
.type-month td.current .cell {
    color: #409eff;
    font-weight: 700;
}

/* 日 */
.type-date td.prev-month,
.type-date td.next-month {
    color: #c0c4cc;
}
.type-date td {
    width: 40px;
    height: 30px;
    padding: 4px 0;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
}
.type-date td div {
    height: 30px;
    padding: 3px 0;
    box-sizing: border-box;
}
.type-date td span {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}
.type-date .current-month:hover {
    color: #409eff;
}
.type-date .current-month.today {
    color: #409eff;
    font-weight: 700;
}

/* arrow */
.date-popover_arrow {
    position: absolute;
    top: -12px;
    left: 15%;
    transform: translate(-50%, 0);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid #e4e7ed;
}
.date-popover_arrow::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translate(-50%, 0);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid #fff;
    filter: drop-shadow(0 -1px 1px rgb(0 0 0 / 10%));
}
</style>
