<template>
    <div class="spreadsheet">
        <div>
            {{ currentLocal["description"] }}
            <br />
            <br />
        </div>
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
            :contextmenu-header-option="contextmenuHeaderOption"
            :row-style-option="rowStyleOption"
        />
    </div>
</template>

<script>
import locale from "../comp/locale";
import I18nMixins from "../comp/mixins/i18n-mixins";

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
    mixins: [I18nMixins],

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
            // contextmenu header option
            contextmenuHeaderOption: {
                /*
                    before contextmenu show.
                    In this function,You can change the `contextmenu` options
                    */
                beforeShow: ({
                    isWholeColSelection,
                    selectionRangeKeys,
                    selectionRangeIndexes,
                }) => {
                    //
                },
                // after menu click
                afterMenuClick: ({
                    type,
                    selectionRangeKeys,
                    selectionRangeIndexes,
                }) => {
                    //
                },

                // contextmenus
                contextmenus: [
                    {
                        type: "CUT",
                    },
                    {
                        type: "COPY",
                    },
                    {
                        type: "SEPARATOR",
                    },
                    {
                        type: "EMPTY_COLUMN",
                    },
                    {
                        type: "SEPARATOR",
                    },
                    {
                        type: "LEFT_FIXED_COLUMN_TO",
                    },
                    {
                        type: "CANCLE_LEFT_FIXED_COLUMN_TO",
                    },
                    {
                        type: "RIGHT_FIXED_COLUMN_TO",
                    },
                    {
                        type: "CANCEL_RIGHT_FIXED_COLUMN_TO",
                    },
                ],
            },

            // contextmenu body option
            contextmenuBodyOption: {
                /*
                    before contextmenu show.
                    In this function,You can change the `contextmenu` options
                    */
                beforeShow: ({
                    isWholeRowSelection,
                    selectionRangeKeys,
                    selectionRangeIndexes,
                }) => {
                    console.log("---contextmenu body beforeShow--");
                    console.log("isWholeRowSelection::", isWholeRowSelection);
                    console.log("selectionRangeKeys::", selectionRangeKeys);
                    console.log(
                        "selectionRangeIndexes::",
                        selectionRangeIndexes,
                    );
                },
                // after menu click
                afterMenuClick: ({
                    type,
                    selectionRangeKeys,
                    selectionRangeIndexes,
                }) => {
                    console.log("---contextmenu body afterMenuClick--");
                    console.log("type::", type);
                    console.log("selectionRangeKeys::", selectionRangeKeys);
                    console.log(
                        "selectionRangeIndexes::",
                        selectionRangeIndexes,
                    );
                },

                // contextmenus
                contextmenus: [
                    {
                        type: "CUT",
                    },
                    {
                        type: "COPY",
                    },
                    {
                        type: "SEPARATOR",
                    },
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
                        type: "EMPTY_ROW",
                    },
                    {
                        type: "EMPTY_CELL",
                    },
                ],
            },
            rowStyleOption: {
                clickHighlight: false,
                hoverHighlight: false,
            },
            tableData: [],
        };
    },
    computed: {
        // current local
        currentLocal() {
            return locale[this.currentDocLang]["completeDemo"]["demo2"];
        },
        columns() {
            let columns = [
                {
                    field: "index",
                    key: "index",
                    // is operation column
                    operationColumn: true,
                    title: "",
                    width: 35,
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
            for (let i = 0; i < 5000; i++) {
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
                    dataItem["G"] = "SOME";
                    dataItem["H"] = "WORDS";
                    dataItem["I"] = "!!!";
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
