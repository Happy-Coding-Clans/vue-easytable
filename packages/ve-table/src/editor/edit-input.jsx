import { clsName, getFixedTotalWidthByColumnKey } from "../util";
import { COMPS_NAME, EMIT_EVENTS, HOOKS_NAME } from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import focus from "../../../src/directives/focus.js";
import { autoResize } from "../../../src/utils/auto-resize";
import { isEmptyValue } from "../../../src/utils/index.js";
import { getCaretPosition, setCaretPosition } from "../../../src/utils/dom";
import { debounce } from "lodash";

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
        // start input value every time
        inputStartValue: {
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
        cellSelectionData: {
            type: Object,
            required: true,
        },
        // editing cell
        editingCell: {
            type: Object,
            required: true,
        },
        // is editing cell
        isCellEditing: {
            type: Boolean,
            required: true,
        },
        // has horizontal scroll bar
        hasXScrollBar: {
            type: Boolean,
            required: true,
        },
        // has vertical scroll bar
        hasYScrollBar: {
            type: Boolean,
            required: true,
        },
        // has right fixed column
        hasRightFixedColumn: {
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
            // table element
            tableEl: null,
            // cell element
            cellEl: null,
            // auto resize
            autoResize: null,
            // is edit cell focus
            isEditCellFocus: false,
        };
    },
    computed: {
        // current column
        currentColumn() {
            let result = null;

            const { colgroups, cellSelectionData } = this;

            const { currentCell } = cellSelectionData;

            if (
                !isEmptyValue(currentCell.rowKey) &&
                !isEmptyValue(currentCell.colKey)
            ) {
                result = colgroups.find((x) => x.key === currentCell.colKey);
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
                    displayTextarea && !overflowViewport,
            };

            return result;
        },

        // container style
        containerStyle() {
            let result = {};

            const {
                displayTextarea,
                overflowViewport,
                textareaRect,
                currentColumn: column,
            } = this;

            const { top, left } = textareaRect;

            if (displayTextarea && !overflowViewport) {
                result = {
                    top: top + "px",
                    left: left + "px",
                    height: null,
                    // because @ve-fixed-body-cell-index: 10;
                    "z-index": column.fixed ? 10 : 0,
                    opacity: 1,
                };
            } else {
                result = {
                    top: top + "px",
                    left: left + "px",
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
    },

    watch: {
        parentRendered: {
            handler: function (val) {
                if (val) {
                    // fixed #471
                    this.setTableEl();

                    // add table container scroll hook
                    this.hooks.addHook(
                        HOOKS_NAME.TABLE_CONTAINER_SCROLL,
                        () => {
                            if (this.displayTextarea) {
                                if (!this.cellEl) {
                                    this.setCellEl();
                                }
                            }
                            this.debounceSetCellEl();
                            this.setTextareaPosition();
                            this.debounceSetTextareaPosition();
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        this.setTextareaPosition();
                    });
                }
            },
            immediate: true,
        },
        // cell selection key data
        "cellSelectionData.currentCell": {
            handler: function (val) {
                this.isEditCellFocus = false;

                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setTextareaPosition();
                        setTimeout(() => {
                            this.isEditCellFocus = true;
                        });
                    });
                }
            },
            deep: true,
            immediate: true,
        },
        // watch normal end cell
        "cellSelectionData.normalEndCell": {
            handler: function (val) {
                /*
                trigger editor(textarea) element select
                解决通过点击的区域选择，无法复制的问题
                */
                if (!isEmptyValue(val.colKey)) {
                    const textareaInputEl = this.$refs[this.textareaInputRef];
                    if (textareaInputEl) {
                        setTimeout(() => {
                            textareaInputEl.select();
                        });
                    }
                }
            },
            deep: true,
            immediate: true,
        },
        // is editing cell
        isCellEditing: {
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
        inputStartValue: {
            handler: function () {
                this.setRawCellValue();
            },
            immediate: true,
        },
    },

    methods: {
        // set table element
        setTableEl() {
            this.$nextTick(() => {
                const tableEl = this.$el.previousElementSibling;
                this.tableEl = tableEl;
            });
        },

        // set cell element
        setCellEl() {
            const { cellSelectionData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionData.currentCell;

            if (tableEl) {
                const cellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (cellEl) {
                    this.cellEl = cellEl;
                    this.overflowViewport = false;
                }
            }
        },

        // set textarea position
        setTextareaPosition() {
            const {
                hasXScrollBar,
                hasYScrollBar,
                scrollBarWidth,
                colgroups,
                hasRightFixedColumn,
                currentColumn: column,
                cellEl,
                tableEl,
            } = this;

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
                    if (hasYScrollBar) {
                        maxWidth -= scrollBarWidth;
                    }

                    /* 
                    If the right fixed column is included, the max width of the textarea needs to be subtracted from the sum of the right fixed columns
                    如果包含右固定列，编辑框最大宽度需要去减去右固定列之和的宽度
                    */
                    if (hasRightFixedColumn) {
                        if (column && !column.fixed) {
                            const rightFixedTotalWidth =
                                getFixedTotalWidthByColumnKey({
                                    colgroups,
                                    colKey: column.key,
                                    fixed: "right",
                                });
                            if (rightFixedTotalWidth) {
                                maxWidth -= rightFixedTotalWidth;
                            }
                        }
                    }

                    this.autoResize.init(
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
                    /*
                    存在以下可能：
                    1、虚拟滚动超出viewport
                    2、单元格被删除（通过右键菜单等方式）
                    */

                    // fixed #477
                    this.textareaRect = {
                        left: 0,
                        top: 0,
                    };
                    this.cellEl = null;
                    this.overflowViewport = true;
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
            if (this.autoResize) {
                this.autoResize.unObserve();
            }
        },

        // set raw cell value
        setRawCellValue() {
            this.rawCellValue = this.inputStartValue;
        },

        // textarea value change
        textareaValueChange(val) {
            this.$emit(EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE, val);
        },

        // textarea add new line
        textareaAddNewLine() {
            const { isCellEditing, editingCell } = this;

            if (isCellEditing) {
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
    created() {
        // debounce set textarea position
        this.debounceSetTextareaPosition = debounce(
            this.setTextareaPosition,
            210,
        );
        // debounce set cell el
        this.debounceSetCellEl = debounce(() => {
            if (this.displayTextarea) {
                if (!this.cellEl) {
                    this.setCellEl();
                }
            }
        }, 200);
    },
    mounted() {
        this.autoResize = autoResize();
    },
    destroyed() {
        this.textareaUnObserve();
    },
    render() {
        const {
            containerClass,
            containerStyle,
            textareaClass,
            rawCellValue,
            isCellEditing,
            isEditCellFocus,
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
                        focus: isEditCellFocus,
                    },
                },
            ],
            domProps: { value: rawCellValue },
            attrs: {
                tabindex: -1,
            },
            on: {
                input: (e) => {
                    if (isCellEditing) {
                        this.textareaValueChange(e.target.value);
                        this.rawCellValue = e.target.value;
                    }
                },
                click: () => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_CLICK);
                },
                copy: (e) => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_COPY, e);
                },
                paste: (e) => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_PASTE, e);
                },
                cut: (e) => {
                    this.$emit(EMIT_EVENTS.EDIT_INPUT_CUT, e);
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
