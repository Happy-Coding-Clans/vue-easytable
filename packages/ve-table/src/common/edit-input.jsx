import { clsName } from "../util";
import { COMPS_NAME, EMIT_EVENTS } from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import focus from "../../../src/directives/focus.js";
import { isInputKeyCode } from "../../../src/utils/event-key-codes";
import { isEmptyValue } from "../../../src/utils/index.js";

export default {
    name: COMPS_NAME.VE_TABLE_EDIT_INPUT,
    directives: {
        focus: focus,
    },
    mixins: [emitter],
    props: {
        value: {
            type: [String, Number],
            required: true,
        },
        rowKeyFieldName: {
            type: String,
            default: null,
        },
        // table data
        tableData: {
            type: Array,
            required: true,
        },
        colgroups: {
            type: Array,
            required: true,
        },
        // cell selection option
        cellSelectionKeyData: {
            type: Object,
            required: true,
        },
        // edit option
        editOption: {
            type: Object,
            default: function () {
                return null;
            },
        },

        // is editing focus cell
        // isEditingFocusCell: {
        //     type: Boolean,
        //     required: true,
        // },
    },
    data() {
        return {
            // raw cell value
            rawCellValue: "",
            // opacity
            opacity: 0,
            // cell element rect
            cellElRect: {
                height: 1,
                left: 0,
                top: 0,
                width: 0,
                // x: 0,
                // y: 0,
            },
        };
    },
    customOption: {
        // cell element
        cellEl: null,
    },
    computed: {
        // current column
        currentColumn() {
            let result = null;

            const { colgroups, cellSelectionKeyData } = this;

            if (cellSelectionKeyData) {
                result = colgroups.find(
                    (x) => x.key === cellSelectionKeyData.colKey,
                );
            }

            return result;
        },

        // show cell input
        // showCellInput() {
        //     let result = false;

        //     const {
        //         cellSelectionKeyData,
        //         currentRowKey,
        //         editOption,
        //         currentColumn: column,
        //     } = this;

        //     if (column.edit && editOption) {
        //         if (cellSelectionKeyData && editOption) {
        //             const { rowKey, colKey } = cellSelectionKeyData;

        //             const { fullRowEdit } = editOption;

        //             if (fullRowEdit) {
        //                 if (currentRowKey === rowKey) {
        //                     result = true;
        //                 }
        //             } else {
        //                 if (
        //                     currentRowKey === rowKey &&
        //                     column["key"] === colKey
        //                 ) {
        //                     result = true;
        //                 }
        //             }
        //         }
        //     }

        //     return result;
        // },

        // container style
        containerStyle() {
            let result = {};

            const { opacity, cellElRect } = this;

            if (cellElRect) {
                const { top, left } = cellElRect;

                result.top = top + "px";
                result.left = left + "px";
            }

            result.opacity = opacity;

            return result;
        },

        // textarea class
        textareaClass() {
            let result = null;

            result = {
                [clsName("edit-input")]: true,
            };

            return result;
        },

        // textarea style
        textareaStyle() {
            let result = {};

            const { cellElRect } = this;

            if (cellElRect) {
                const { height, width } = cellElRect;

                result.height = height + "px";
                result.width = width + "px";
            }

            return result;
        },
    },

    watch: {
        // tableData:{
        //     handler: function (val) {
        //     },
        //     deep: true,
        //     immediate: true,
        // },
        cellSelectionKeyData: {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.getCellEl();
                    this.setTextareaPosition();
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // deal key down event
        dealKeydownEvent(event) {
            // event.stopPropagation();
            // event.preventDefault();
            const { keyCode } = event;

            if (isInputKeyCode(keyCode)) {
                this.showTextarea();
            }
        },

        // get cell element
        getCellEl() {
            const { cellSelectionKeyData } = this;

            const { rowKey, colKey } = cellSelectionKeyData;

            const tableEl = this.$el.previousElementSibling;
            if (tableEl) {
                const cellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (cellEl) {
                    this.$options.customOption.cellEl = cellEl;
                }
            }
        },

        // set textarea position
        setTextareaPosition() {
            // await cell section rendering
            setTimeout(() => {
                const { cellEl } = this.$options.customOption;

                if (cellEl) {
                    const tableEl = this.$el.previousElementSibling;
                    if (tableEl) {
                        const { left: tableLeft, top: tableTop } =
                            tableEl.getBoundingClientRect();

                        const { left, top, height, width } =
                            cellEl.getBoundingClientRect();

                        this.cellElRect = {
                            left: left - tableLeft,
                            top: top - tableTop,
                            height,
                            width,
                        };
                    }
                }
            });
        },

        // show textarea
        showTextarea() {
            console.log(1);
            this.setRawCellValue();
            this.opacity = 1;
        },

        // hide textarea
        hideTextarea() {
            this.opacity = 0;
        },

        // set raw cell value
        setRawCellValue() {
            const {
                tableData,
                rowKeyFieldName,
                cellSelectionKeyData,
                currentColumn: column,
            } = this;

            const { rowKey } = cellSelectionKeyData;

            const rowData = tableData.find((x) => x[rowKeyFieldName] == rowKey);

            if (rowData && column) {
                this.rawCellValue = rowData[column.field];
                this.initTextareaValue = rowData[column.field];
            }
        },
    },

    mounted() {
        // add key down event listener
        this.$el
            .querySelector(`.${clsName("edit-input")}`)
            .addEventListener("keydown", this.dealKeydownEvent);
    },

    destroyed() {
        // remove key down event listener
        this.$el
            .querySelector(`.${clsName("edit-input")}`)
            .removeEventListener("keydown", this.dealKeydownEvent);
    },

    render() {
        const { initTextareaValue } = this;

        const containerProps = {
            style: this.containerStyle,
            class: {
                [clsName("edit-input-container")]: true,
            },
        };

        const textareaProps = {
            class: this.textareaClass,
            style: this.textareaStyle,
            directives: [
                {
                    name: "focus",
                    value: {
                        focus: true,
                    },
                },
            ],
            domProps: { value: initTextareaValue },
            attrs: {
                tabindex: -1,
            },
            on: {
                input: (e) => {
                    // ??
                    this.rawCellValue = e.target.value;
                },
                click: () => {
                    this.dispatch(
                        COMPS_NAME.VE_TABLE,
                        EMIT_EVENTS.BODY_TD_EDIT_CELL_INPUT_VALUE_CLICK,
                    );
                },
                dblclick: () => {
                    this.showTextarea();
                },
                blur: () => {
                    this.hideTextarea();

                    this.dispatch(
                        COMPS_NAME.VE_TABLE,
                        EMIT_EVENTS.BODY_TD_EDIT_CELL_INPUT_BLUR,
                    );
                },
            },
        };

        return (
            <div {...containerProps}>
                <textarea {...textareaProps}></textarea>
            </div>
        );
    },
};
