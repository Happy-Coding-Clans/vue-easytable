:::anchor 开启右键菜单

:::demo

```html
<template>
    <div>
        <ve-contextmenu></ve-contextmenu>

        <!-- <el-cascader-panel :options="options"></el-cascader-panel> -->

        <!-- <ve-table
            row-key-field-name="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :row-style-option="rowStyleOption"
            border-y
            :contextmenu-option="contextmenuOption"
        /> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {
                        value: "zhinan",
                        label: "指南",
                        children: [
                            {
                                value: "shejiyuanze",
                                label: "设计原则",
                                children: [
                                    {
                                        value: "yizhi",
                                        label: "一致",
                                    },
                                    {
                                        value: "fankui",
                                        label: "反馈",
                                    },
                                    {
                                        value: "xiaolv",
                                        label: "效率",
                                    },
                                    {
                                        value: "kekong",
                                        label: "可控",
                                    },
                                ],
                            },
                            {
                                value: "daohang",
                                label: "导航",
                                children: [
                                    {
                                        value: "cexiangdaohang",
                                        label: "侧向导航",
                                    },
                                    {
                                        value: "dingbudaohang",
                                        label: "顶部导航",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: "zujian",
                        label: "组件",
                        children: [
                            {
                                value: "basic",
                                label: "Basic",
                                children: [
                                    {
                                        value: "layout",
                                        label: "Layout 布局",
                                    },
                                    {
                                        value: "color",
                                        label: "Color 色彩",
                                    },
                                    {
                                        value: "typography",
                                        label: "Typography 字体",
                                    },
                                    {
                                        value: "icon",
                                        label: "Icon 图标",
                                    },
                                    {
                                        value: "button",
                                        label: "Button 按钮",
                                    },
                                ],
                            },
                            {
                                value: "form",
                                label: "Form",
                                children: [
                                    {
                                        value: "radio",
                                        label: "Radio 单选框",
                                    },
                                    {
                                        value: "checkbox",
                                        label: "Checkbox 多选框",
                                    },
                                    {
                                        value: "input",
                                        label: "Input 输入框",
                                    },
                                    {
                                        value: "input-number",
                                        label: "InputNumber 计数器",
                                    },
                                    {
                                        value: "select",
                                        label: "Select 选择器",
                                    },
                                    {
                                        value: "cascader",
                                        label: "Cascader 级联选择器",
                                    },
                                    {
                                        value: "switch",
                                        label: "Switch 开关",
                                    },
                                    {
                                        value: "slider",
                                        label: "Slider 滑块",
                                    },
                                    {
                                        value: "time-picker",
                                        label: "TimePicker 时间选择器",
                                    },
                                    {
                                        value: "date-picker",
                                        label: "DatePicker 日期选择器",
                                    },
                                    {
                                        value: "datetime-picker",
                                        label: "DateTimePicker 日期时间选择器",
                                    },
                                    {
                                        value: "upload",
                                        label: "Upload 上传",
                                    },
                                    {
                                        value: "rate",
                                        label: "Rate 评分",
                                    },
                                    {
                                        value: "form",
                                        label: "Form 表单",
                                    },
                                ],
                            },
                            {
                                value: "data",
                                label: "Data",
                                children: [
                                    {
                                        value: "table",
                                        label: "Table 表格",
                                    },
                                    {
                                        value: "tag",
                                        label: "Tag 标签",
                                    },
                                    {
                                        value: "progress",
                                        label: "Progress 进度条",
                                    },
                                    {
                                        value: "tree",
                                        label: "Tree 树形控件",
                                    },
                                    {
                                        value: "pagination",
                                        label: "Pagination 分页",
                                    },
                                    {
                                        value: "badge",
                                        label: "Badge 标记",
                                    },
                                ],
                            },
                            {
                                value: "notice",
                                label: "Notice",
                                children: [
                                    {
                                        value: "alert",
                                        label: "Alert 警告",
                                    },
                                    {
                                        value: "loading",
                                        label: "Loading 加载",
                                    },
                                    {
                                        value: "message",
                                        label: "Message 消息提示",
                                    },
                                    {
                                        value: "message-box",
                                        label: "MessageBox 弹框",
                                    },
                                    {
                                        value: "notification",
                                        label: "Notification 通知",
                                    },
                                ],
                            },
                            {
                                value: "navigation",
                                label: "Navigation",
                                children: [
                                    {
                                        value: "menu",
                                        label: "NavMenu 导航菜单",
                                    },
                                    {
                                        value: "tabs",
                                        label: "Tabs 标签页",
                                    },
                                    {
                                        value: "breadcrumb",
                                        label: "Breadcrumb 面包屑",
                                    },
                                    {
                                        value: "dropdown",
                                        label: "Dropdown 下拉菜单",
                                    },
                                    {
                                        value: "steps",
                                        label: "Steps 步骤条",
                                    },
                                ],
                            },
                            {
                                value: "others",
                                label: "Others",
                                children: [
                                    {
                                        value: "dialog",
                                        label: "Dialog 对话框",
                                    },
                                    {
                                        value: "tooltip",
                                        label: "Tooltip 文字提示",
                                    },
                                    {
                                        value: "popover",
                                        label: "Popover 弹出框",
                                    },
                                    {
                                        value: "card",
                                        label: "Card 卡片",
                                    },
                                    {
                                        value: "carousel",
                                        label: "Carousel 走马灯",
                                    },
                                    {
                                        value: "collapse",
                                        label: "Collapse 折叠面板",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: "ziyuan",
                        label: "资源",
                        children: [
                            {
                                value: "axure",
                                label: "Axure Components",
                            },
                            {
                                value: "sketch",
                                label: "Sketch Templates",
                            },
                            {
                                value: "jiaohu",
                                label: "组件交互文档",
                            },
                        ],
                    },
                ],
                // contextmenu option
                contextmenuOption: {
                    body: {
                        // enable context menu
                        enable: true,

                        //  callback for all options
                        callback: () => {},

                        /*
                        context menus

                        you can sort context menu

                        contextMenuType:
                        insertRowAbove、insertRowBelow、removeCurrentRow、separatorLine

                        */
                        contextMenus: ["insertRowAbove", "b"],

                        // custom context menu
                        contextMenus2: [
                            {
                                type: "insertRowAbove",
                                // callback
                                callback: ({ event }) => {},
                                // support jsx
                                name: (h) => {
                                    return <span>在上方新增行</span>;
                                },
                                icon: (h) => {
                                    return <i>1</i>;
                                },
                                disabled: () => {
                                    //
                                    return false;
                                },
                                hidden: () => {
                                    //
                                    return false;
                                },
                            },
                            {
                                type: "customType1",
                                // callback
                                callback: ({ event }) => {},
                                // support jsx
                                name: (h) => {
                                    return <span>自定义</span>;
                                },
                                disabled: () => {
                                    //
                                    return false;
                                },
                                hidden: () => {
                                    //
                                    return false;
                                },
                            },
                        ],
                    },
                },
                rowStyleOption: {
                    clickHighlight: false,
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 50,
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return ++rowIndex;
                        },
                    },
                    {
                        field: "name",
                        key: "name",
                        title: "Name",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "number",
                        key: "number",
                        title: "Number",
                        align: "right",
                        width: "30%",
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        align: "left",
                        width: "40%",
                    },
                ],
                // table data
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        number: "32",
                        address: "No.1 Century Avenue, Shanghai",
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        number: "676",
                        address: "No.1 Century Avenue, Beijing",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        number: "76",
                        address: "No.1 Century Avenue, Chongqing",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        number: "7797",
                        address: "No.1 Century Avenue, Xiamen",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        number: "8978",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowKey: 4,
                    },
                ],
            };
        },

        methods: {},
    };
</script>
```

:::
