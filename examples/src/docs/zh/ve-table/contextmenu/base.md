:::anchor 开启右键菜单

:::demo

```html
<template>
    <div>
        <div id="contextmenu-container" style="width:100%;height:300px;background:#666;">
            <ve-contextmenu
                eventTarget="#contextmenu-container"
                :show="showContextmenu"
                :options="options"
            ></ve-contextmenu>
        </div>

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
                showContextmenu: true,
                options: [
                    {
                        label: "菜单1",
                        type: "type1",
                    },
                    {
                        label: "菜单2",
                        type: "type2",
                        disabled: true,
                        children: [
                            {
                                label: "菜单2-1",
                                type: "type2-1",
                            },
                            {
                                label: "菜单2-2",
                                type: "type2-2",
                            },
                        ],
                    },
                    {
                        label: "菜单3",
                    },
                    {
                        label: "菜单4",
                        children: [
                            {
                                label: "菜单4-1",
                                children: [
                                    {
                                        label: "菜单4-1-1",
                                        disabled: true,
                                    },
                                    {
                                        label: "菜单4-2-2",
                                    },
                                ],
                            },
                            {
                                label: "菜单4-2",
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
