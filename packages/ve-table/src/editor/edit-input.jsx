import { clsName } from "../util";
import { COMPS_NAME, EMIT_EVENTS, HOOKS_NAME } from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import focus from "../../../src/directives/focus.js";
import { autoResize } from "../../../src/utils/auto-resize";
import { isEmptyValue } from "../../../src/utils/index.js";
import { getCaretPosition, setCaretPosition } from "../../../src/utils/dom";

export default {
    name: COMPS_NAME.VE_TABLE_EDIT_INPUT,
    directives: {
        focus: focus,
    },
    mixins: [emitter],
    props: {
        parentRendered: {
            type: Boolean,
            required: true,
        },
        hooks: {
            type: Object,
            required: true,
        },
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
        // has horizontal scroll bar
        hasXScrollBar: {
            type: Boolean,
            required: true,
        },
        scrollBarWidth: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            textareaInputRef: "textareaInputRef",
            // raw cell value
            rawCellValue: "",
            // display textarea
            displayTextarea: false,
            // virtual scroll overflowViewport
            overflowViewport: false,
            // textarea element rect
            textareaRect: {
                left: 0,
                top: 0,
            },
        };
    },
    customOption: {
        // table element
        tableEl: null,
        // cell element
        cellEl: null,
        // auto resize
        autoResize: null,
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

        // container class
        containerClass() {
            let result = null;

            const { displayTextarea, overflowViewport } = this;

            result = {
                [clsName("edit-input-container")]: true,
                [clsName("edit-input-container-show")]:
                    displayTextarea && overflowViewport,
            };

            return result;
        },

        // container style
        containerStyle() {
            let result = {};

            const {
                displayTextarea,
                textareaRect,
                currentColumn: column,
            } = this;

            if (displayTextarea) {
                const { top, left } = textareaRect;

                result = {
                    top: top + "px",
                    left: left + "px",
                    height: null,
                    // because @ve-fixed-body-cell-index: 1;
                    "z-index": column.fixed ? 1 : 0,
                };
            } else {
                result = {
                    height: null,
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
    },

    watch: {
        parentRendered: {
            handler: function (val) {
                if (val) {
                    // add table container scroll hook
                    this.hooks.addHook(
                        HOOKS_NAME.TABLE_CONTAINER_SCROLL,
                        () => {
                            /*
                            Solve the problem that virtual scrolling editing cells cannot be located after scrolling
                            解决虚拟滚动编辑单元格滚动后无法定位的问题
                            */
                            if (this.displayTextarea) {
                                if (!this.$options.customOption.cellEl) {
                                    this.setCellEl();
                                }
                                this.setTextareaPosition();
                            }
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        this.setTableEl();
                        this.setTextareaPosition();
                    });
                }
            },
            immediate: true,
        },
        // cell selection key data
        cellSelectionKeyData: {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setTextareaPosition();
                    });
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
        dealKeydownEvent() {
            //
        },

        // set table element
        setTableEl() {
            const tableEl = this.$el.previousElementSibling;
            this.$options.customOption.tableEl = tableEl;
        },

        // set cell element
        setCellEl() {
            const { cellSelectionKeyData } = this;

            const { tableEl } = this.$options.customOption;

            const { rowKey, colKey } = cellSelectionKeyData;

            if (tableEl) {
                const cellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (cellEl) {
                    this.$options.customOption.cellEl = cellEl;
                    this.overflowViewport = true;
                }
            }
        },

        // set textarea position
        setTextareaPosition() {
            const { cellEl, tableEl } = this.$options.customOption;
            const { hasXScrollBar, scrollBarWidth } = this;

            if (cellEl && tableEl) {
                const {
                    left: tableLeft,
                    top: tableTop,
                    right: tableRight,
                    bottom: tableBottom,
                } = tableEl.getBoundingClientRect();

                const {
                    left: cellLeft,
                    top: cellTop,
                    height: cellHeight,
                    width: cellWidth,
                    right: cellRight,
                    bottom: cellBottom,
                } = cellEl.getBoundingClientRect();

                if (cellHeight && cellWidth) {
                    let maxHeight = cellHeight + tableBottom - cellBottom;
                    let maxWidth = cellWidth + tableRight - cellRight;

                    // has horizontal scroll bar
                    if (hasXScrollBar) {
                        maxHeight -= scrollBarWidth;
                    }

                    // has vertical scroll bar
                    // if (hasYScrollBar) {
                    //     maxWidth -= scrollBarWidth;
                    // }

                    this.$options.customOption.autoResize.init(
                        this.$refs[this.textareaInputRef],
                        {
                            minHeight: Math.min(cellHeight, maxHeight),
                            maxHeight: maxHeight, // TEXTAREA should never be higher than visible part of the viewport (should not cover the scrollbar)
                            minWidth: Math.min(cellWidth, maxWidth),
                            maxWidth: maxWidth, // TEXTAREA should never be wider than visible part of the viewport (should not cover the scrollbar)
                        },
                        true, // observe textarea change\cut\paste etc.
                    );

                    this.textareaRect = {
                        left: cellLeft - tableLeft,
                        top: cellTop - tableTop,
                    };
                } else {
                    // 虚拟滚动会消失的问题
                    this.$options.customOption.cellEl = null;
                    this.overflowViewport = false;
                }
            }
        },

        // show textarea
        showTextarea() {
            this.setRawCellValue();
            this.displayTextarea = true;
        },

        // hide textarea
        hideTextarea() {
            this.displayTextarea = false;
            this.textareaUnObserve();
        },

        // textarea unObserve
        textareaUnObserve() {
            if (this.$options.customOption.autoResize) {
                this.$options.customOption.autoResize.unObserve();
            }
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

        // textarea value change
        textareaValueChange(val) {
            this.$emit(EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE, val);
        },

        // textarea add new line
        textareaAddNewLine() {
            const { isEditingCell, editingCell } = this;

            if (isEditingCell) {
                const textareaInputEl = this.$refs[this.textareaInputRef];

                const caretPosition = getCaretPosition(textareaInputEl);

                let value = editingCell.row[editingCell.colKey];
                // solve error of number slice method
                value += "";

                const newValue = `${value.slice(
                    0,
                    caretPosition,
                )}\n${value.slice(caretPosition)}`;

                // 直接更新 textarea 值
                textareaInputEl.value = newValue;

                // 手动赋值不会触发textarea 文本变化事件,需要手动更新 editingCell 值
                this.textareaValueChange(newValue);

                setCaretPosition(textareaInputEl, caretPosition + 1);
            }
        },
    },

    mounted() {
        // add key down event listener
        this.$el
            .querySelector(`.${clsName("edit-input")}`)
            .addEventListener("keydown", this.dealKeydownEvent);

        this.$options.customOption.autoResize = autoResize();
    },

    destroyed() {
        // remove key down event listener
        this.$el
            .querySelector(`.${clsName("edit-input")}`)
            .removeEventListener("keydown", this.dealKeydownEvent);

        this.textareaUnObserve();
    },

    render() {
        const {
            containerClass,
            containerStyle,
            textareaClass,
            rawCellValue,
            isEditingCell,
        } = this;

        const containerProps = {
            style: containerStyle,
            class: containerClass,
        };

        const textareaProps = {
            ref: this.textareaInputRef,
            class: textareaClass,
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
                        this.textareaValueChange(e.target.value);
                        this.rawCellValue = e.target.value;
                    }
                },
                click: () => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_CLICK);
                },
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
