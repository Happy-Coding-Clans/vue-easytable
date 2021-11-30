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
        // all row keys
        allRowKeys: {
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
        // editing cell
        editingCell: {
            type: Object,
            required: true,
        },
        // is editing cell
        isEditingCell: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            // raw cell value
            rawCellValue: "",
            // display textarea
            displayTextarea: false,
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

        // is last edit row
        isLastEditRow() {
            let result = false;

            const { allRowKeys, cellSelectionKeyData } = this;

            if (allRowKeys.length && cellSelectionKeyData) {
                const { rowKey } = cellSelectionKeyData;
                result = allRowKeys[allRowKeys.length - 1] == rowKey;
            }

            return result;
        },

        // container style
        containerStyle() {
            let result = {};

            const { displayTextarea, cellElRect } = this;

            if (displayTextarea) {
                const { top, left } = cellElRect;

                result = {
                    top: top + "px",
                    left: left + "px",
                    height: null,
                    "z-index": 100,
                    opacity: 1,
                };
            } else {
                result = {
                    top: "-1px",
                    left: "-1px",
                    height: "1px",
                    "z-index": -1,
                    opacity: 0,
                };
            }

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

            const { allRowKeys, cellSelectionKeyData } = this;

            const { rowKey } = cellSelectionKeyData;

            const isLastRow = allRowKeys[allRowKeys.length - 1] == rowKey;

            const { cellElRect } = this;

            if (cellElRect) {
                let { height, width } = cellElRect;

                /* 
                解决表格最后一行 border-bottom 为0，导致编辑会使表格出滚动条
                */
                if (isLastRow) {
                    height -= 1;
                }

                result.height = height + "px";
                result.width = width + "px";
            }

            return result;
        },
    },

    watch: {
        // cell selection key data
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
        // is editing cell
        isEditingCell: {
            handler: function (val) {
                if (val) {
                    this.showTextarea();
                } else {
                    this.hideTextarea();
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
            // if (isInputKeyCode(event)) {
            //     this.showTextarea();
            // }
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
            this.setRawCellValue();
            this.displayTextarea = true;
        },

        // hide textarea
        hideTextarea() {
            this.displayTextarea = false;
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
            }
        },

        // set text area value by editor
        setTextareaValueByEditor(val) {
            this.rawCellValue = val;
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
        const {
            containerStyle,
            textareaClass,
            textareaStyle,
            rawCellValue,
            isEditingCell,
        } = this;

        const containerProps = {
            style: containerStyle,
            class: {
                [clsName("edit-input-container")]: true,
            },
        };

        const textareaProps = {
            class: textareaClass,
            style: textareaStyle,
            directives: [
                {
                    name: "focus",
                    value: {
                        focus: true,
                    },
                },
            ],
            domProps: { value: rawCellValue },
            attrs: {
                tabindex: -1,
            },
            on: {
                input: (e) => {
                    if (isEditingCell) {
                        this.$emit(
                            EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE,
                            e.target.value,
                        );
                    }
                },
                click: () => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_CLICK);
                },
                // dblclick: () => {
                // },
                blur: () => {
                    if (isEditingCell) {
                        this.$emit(EMIT_EVENTS.EDIT_INPUT_BLUR);
                    }
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
