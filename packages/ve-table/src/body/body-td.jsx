import BodyCheckboxContent from "./body-checkbox-content";
import BodyRadioContent from "./body-radio-content";
import ExpandTrIcon from "./expand-tr-icon";
import { clsName } from "../util";
import { isNumber, isBoolean } from "../../../src/utils/index.js";

import {
    COMPS_NAME,
    COLUMN_TYPES,
    EXPAND_TRIGGER_TYPES,
    EMIT_EVENTS,
    COMPS_CUSTOM_ATTRS,
} from "../util/constant";
import emitter from "../../../src/mixins/emitter";

export default {
    name: COMPS_NAME.VE_TABLE_BODY_TD,
    mixins: [emitter],
    props: {
        rowData: {
            type: Object,
            required: true,
        },
        column: {
            type: Object,
            required: true,
        },
        columnCollection: {
            type: Array,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        colgroups: {
            type: Array,
            required: true,
        },

        rowKeyFieldName: {
            type: String,
            default: null,
        },
        /*
        expand
        */
        // expand row option
        expandOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // is expand row
        isExpandRow: {
            type: Boolean,
            required: true,
        },
        // expanded row keys
        expandedRowkeys: {
            type: Array,
            default: function () {
                return [];
            },
        },

        /*
        checkbox
        */
        // checkbox option
        checkboxOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        internalCheckboxSelectedRowKeys: {
            type: Array,
            default: function () {
                return null;
            },
        },

        /*
        radio
        */
        radioOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        internalRadioSelectedRowKey: {
            type: [String, Number],
            default: null,
        },
        // cell style option
        cellStyleOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // event custom option
        eventCustomOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell selection key data
        cellSelectionKeyData: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // cell span option
        cellSpanOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // edit opttion
        editOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },
    data() {
        return {
            // 原始单元格数据
            rawCellValue: "",
        };
    },
    computed: {
        /*
        current column collection item
        1、Cache the style、class of each column
        */
        currentColumnCollectionItem() {
            const { columnCollection, column } = this;
            return columnCollection.find((x) => x.colKey === column.key);
        },

        // current row key
        currentRowKey() {
            const { rowData, rowKeyFieldName } = this;
            return rowData[rowKeyFieldName];
        },
    },
    watch: {
        // watch row data
        rowData: {
            handler(rowData) {
                const column = this.column;
                if (column) {
                    this.rawCellValue = rowData[column.field];
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        /*
         * @bodyTdStyle
         * @desc body td style
         */
        bodyTdStyle() {
            const { currentColumnCollectionItem } = this;

            let result = {};

            if (currentColumnCollectionItem) {
                result = Object.assign(
                    result,
                    currentColumnCollectionItem.style,
                );
            }

            return result;
        },

        /*
         * @bodyTdClass
         * @desc body td class
         */
        bodyTdClass() {
            const { currentColumnCollectionItem } = this;

            const { fixed } = this.column;

            let result = {
                [clsName("body-td")]: true,
            };

            const {
                cellStyleOption,
                rowData,
                column,
                rowIndex,
                cellSelectionKeyData,
                currentRowKey,
            } = this;

            // column fixed
            if (fixed) {
                result[clsName("fixed-left")] = fixed === "left";
                result[clsName("fixed-right")] = fixed === "right";
            }

            // cell style option
            if (
                cellStyleOption &&
                typeof cellStyleOption.bodyCellClass === "function"
            ) {
                const customClass = cellStyleOption.bodyCellClass({
                    row: rowData,
                    column,
                    rowIndex,
                });
                if (customClass) {
                    result[customClass] = true;
                }
            }

            // cell selection option
            if (cellSelectionKeyData) {
                const { rowKey, colKey } = cellSelectionKeyData;
                if (currentRowKey === rowKey && column["key"] === colKey) {
                    result[clsName("cell-selection")] = true;
                }
            }

            if (currentColumnCollectionItem) {
                result = Object.assign(
                    result,
                    currentColumnCollectionItem.class,
                );
            }

            return result;
        },

        // get ellipsis content style
        getEllipsisContentStyle() {
            let result = {};

            const { ellipsis } = this.column;

            if (ellipsis) {
                const { lineClamp } = ellipsis;

                let _lineClamp = isNumber(lineClamp) ? lineClamp : 1;
                result["-webkit-line-clamp"] = _lineClamp;
            }

            return result;
        },

        // get render content
        getRenderContent(h) {
            let content = null;

            const { column, rowData, rowIndex, rawCellValue } = this;

            // has render function
            if (typeof column.renderBodyCell === "function") {
                const renderResult = column.renderBodyCell(
                    {
                        row: rowData,
                        column,
                        rowIndex,
                    },
                    h,
                );

                content = renderResult;
            } else {
                content = rawCellValue;
            }

            // ellipisis
            if (column.ellipsis) {
                const { showTitle } = column.ellipsis;

                // default true
                const isShowTitle = isBoolean(showTitle) ? showTitle : true;

                content = (
                    <span
                        title={isShowTitle ? content : ""}
                        style={this.getEllipsisContentStyle()}
                        class={clsName("body-td-span-ellipsis")}
                    >
                        {content}
                    </span>
                );
            }

            return content;
        },

        // get chcekbox content
        getCheckboxContent() {
            if (this.column.type === COLUMN_TYPES.CHECKBOX) {
                // checkbox content props
                const checkboxProps = {
                    props: {
                        column: this.column,
                        checkboxOption: this.checkboxOption,
                        rowKey: this.rowData[this.rowKeyFieldName],
                        internalCheckboxSelectedRowKeys:
                            this.internalCheckboxSelectedRowKeys,
                    },
                };

                return <BodyCheckboxContent {...checkboxProps} />;
            }
            return null;
        },

        // get radio content
        getRadioContent() {
            if (this.column.type === COLUMN_TYPES.RADIO) {
                // radio props
                const radioProps = {
                    props: {
                        column: this.column,
                        radioOption: this.radioOption,
                        rowKey: this.rowData[this.rowKeyFieldName],
                        internalRadioSelectedRowKey:
                            this.internalRadioSelectedRowKey,
                    },
                };

                return <BodyRadioContent {...radioProps} />;
            }
            return null;
        },

        // get cell span
        getCellSpan() {
            const { cellSpanOption, rowData, column, rowIndex } = this;
            let rowspan = 1;
            let colspan = 1;

            if (cellSpanOption) {
                const { bodyCellSpan } = cellSpanOption;

                if (typeof bodyCellSpan === "function") {
                    const result = bodyCellSpan({
                        row: rowData,
                        column,
                        rowIndex,
                    });

                    if (typeof result === "object") {
                        rowspan = result.rowspan;
                        colspan = result.colspan;
                    }
                }
            }

            return { rowspan, colspan };
        },
        // cell click
        cellClick(e, fn) {
            fn && fn(e);

            const { column, expandOption, rowData } = this;

            this.dispatch(COMPS_NAME.VE_TABLE, EMIT_EVENTS.BODY_TD_CLICK, {
                rowData,
                column,
            });

            if (column.type !== COLUMN_TYPES.EXPAND) {
                return false;
            }

            if (expandOption) {
                const eventTargetName = e.target.nodeName;

                const trigger = expandOption.trigger;

                // expand row by click icon
                if (!trigger || trigger === EXPAND_TRIGGER_TYPES.ICON) {
                    if (eventTargetName !== "TD") {
                        e.stopPropagation();
                        this.$emit(EMIT_EVENTS.EXPAND_ROW_CHANGE);
                    }
                }
                // expand row by click cell(td)
                else if (trigger === EXPAND_TRIGGER_TYPES.CELL) {
                    e.stopPropagation();
                    this.$emit(EMIT_EVENTS.EXPAND_ROW_CHANGE);
                }
            }
        },
        // dblclick
        cellDblclick(e, fn) {
            fn && fn(e);

            const { column, rowData } = this;

            this.dispatch(
                COMPS_NAME.VE_TABLE,
                EMIT_EVENTS.BODY_TD_DOUBLE_CLICK,
                {
                    rowData,
                    column,
                },
            );
        },
        // contextmenu
        cellContextmenu(e, fn) {
            fn && fn(e);

            const { column, rowData } = this;

            this.dispatch(
                COMPS_NAME.VE_TABLE,
                EMIT_EVENTS.BODY_TD_CONTEXTMENU,
                {
                    rowData,
                    column,
                },
            );
        },
        // mouseenter
        cellMouseenter(e, fn) {
            fn && fn(e);
        },
        // mouseleave
        cellMouseleave(e, fn) {
            fn && fn(e);
        },
    },
    render(h) {
        const {
            column,
            cellClick,
            rowData,
            isExpandRow,
            expandOption,
            expandedRowkeys,
            rowKeyFieldName,
            eventCustomOption,
            rowIndex,
        } = this;

        // expand icon props
        const expandIconProps = {
            props: {
                rowData,
                column,
                expandOption,
                expandedRowkeys,
                rowKeyFieldName,
                cellClick,
            },
        };

        const { rowspan, colspan } = this.getCellSpan();
        if (!rowspan || !colspan) {
            return null;
        }

        // custom on cell event
        let customEvents = {};
        if (eventCustomOption) {
            const { bodyCellEvents } = eventCustomOption;

            customEvents = bodyCellEvents
                ? bodyCellEvents({ row: rowData, column, rowIndex })
                : {};
        }

        const { click, dblclick, contextmenu, mouseenter, mouseleave } =
            customEvents;

        const events = {
            click: (e) => {
                this.cellClick(e, click);
            },
            dblclick: (e) => {
                this.cellDblclick(e, dblclick);
            },
            contextmenu: (e) => {
                this.cellContextmenu(e, contextmenu);
            },
            mouseenter: (e) => {
                this.cellMouseenter(e, mouseenter);
            },
            mouseleave: (e) => {
                this.cellMouseleave(e, mouseleave);
            },
        };

        // td props
        const tdProps = {
            class: this.bodyTdClass(),
            style: this.bodyTdStyle(),
            attrs: {
                rowspan,
                colspan,
                [COMPS_CUSTOM_ATTRS.BODY_COLUMN_KEY]: column.key,
            },
            on: events,
        };

        return (
            <td {...tdProps}>
                {/* expadn tr icon */}
                {isExpandRow && <ExpandTrIcon {...expandIconProps} />}
                {/* checkbox content */}
                {this.getCheckboxContent()}
                {/* radio content */}
                {this.getRadioContent()}
                {/* other cell content */}
                {this.getRenderContent(h)}
            </td>
        );
    },
};
