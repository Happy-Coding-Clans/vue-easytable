<template>
    <div class="spreadsheet">
        <ve-table
            style="word-break: break-word"
            fixed-header
            :scroll-width="2000"
            :max-height="500"
            border-y
            :columns="columns"
            :table-data="tableData"
            row-key-field-name="rowKey"
            :virtual-scroll-option="virtualScrollOption"
            :cell-autofill-option="cellAutofillOption"
            :edit-option="editOption"
            :contextmenu-body-option="contextmenuBodyOption"
        />
    </div>
</template>

<script>
const COLUMN_KEYS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
export default {
    data() {
        return {
            // start row index
            startRowIndex: 0,
            virtualScrollOption: {
                // 是否开启
                enable: true,
                scrolling: this.scrolling,
            },
            cellAutofillOption: {
                directionX: true,
                directionY: true,
                beforeAutofill: ({
                    direction,
                    sourceSelectionRangeIndexes,
                    targetSelectionRangeIndexes,
                    sourceSelectionData,
                    targetSelectionData,
                }) => {},
                afterAutofill: ({
                    direction,
                    sourceSelectionRangeIndexes,
                    targetSelectionRangeIndexes,
                    sourceSelectionData,
                    targetSelectionData,
                }) => {},
            },
            // edit option 可控单元格编辑
            editOption: {
                beforeCellValueChange: ({ row, column, changeValue }) => {},
                afterCellValueChange: ({ row, column, changeValue }) => {},
            },
            contextmenuBodyOption: {
                // callback for all options
                callback: ({ type, selection }) => {},

                // contextmenus
                contextmenus: [
                    {
                        type: "INSERT_ROW_ABOVE",
                    },
                    {
                        type: "INSERT_ROW_BELOW",
                    },
                    {
                        type: "SEPARATOR",
                    },
                    {
                        type: "REMOVE_ROW",
                    },
                    {
                        type: "SEPARATOR",
                    },
                    {
                        type: "HIDE_COLUMN",
                    },
                ],
            },
            tableData: [],
        };
    },
    computed: {
        columns() {
            let columns = [
                {
                    field: "index",
                    key: "index",
                    // is operation column
                    operationColumn: true,
                    title: "#",
                    width: 30,
                    fixed: "left",
                    renderBodyCell: this.renderRowIndex,
                },
            ];
            columns = columns.concat(
                COLUMN_KEYS.map((keyValue) => {
                    return {
                        title: keyValue,
                        field: keyValue,
                        key: keyValue,
                        width: 50,
                        edit: true,
                    };
                }),
            );

            return columns;
        },
    },
    methods: {
        // render row index
        renderRowIndex({ row, column, rowIndex }) {
            return <span>{rowIndex + this.startRowIndex + 1}</span>;
        },
        scrolling({
            startRowIndex,
            visibleStartIndex,
            visibleEndIndex,
            visibleAboveCount,
            visibleBelowCount,
        }) {
            this.startRowIndex = startRowIndex;
        },
        initTableData() {
            let tableData = [];
            for (let i = 0; i < 100; i++) {
                let dataItem = {
                    rowKey: i,
                };

                COLUMN_KEYS.forEach((keyValue) => {
                    dataItem[keyValue] = "";
                });

                if (i === 1 || i === 3) {
                    dataItem["C"] = "YOU";
                    dataItem["D"] = "CAN";
                    dataItem["E"] = "TRY";
                    dataItem["F"] = "ENTER";
                    dataItem["G"] = "SOMET";
                    dataItem["G"] = "WORD";
                    dataItem["H"] = "!!!";
                }

                tableData.push(dataItem);
            }

            this.tableData = tableData;
        },
    },
    created() {
        this.initTableData();
    },
};
</script>
<style lang="less">
.spreadsheet {
    padding: 0 100px;
    margin: 30px 0;
}
</style>
