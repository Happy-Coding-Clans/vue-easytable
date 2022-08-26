import { getFixedTotalWidthByColumnKey, clsName } from "../util";
import { getValByUnit } from "../../../src/utils/index.js";

import { COMPS_NAME } from "../util/constant";
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
        // cell span option
        cellSpanOption: {
            type: Object,
            default: function () {
                return null;
            },
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
        cellSelectionData: {
            type: Object,
            default: function () {
                return null;
            },
        },
        // footer rows
        footerRows: {
            type: Array,
            default: function () {
                return [];
            },
        },
        // fixed footer
        fixedFooter: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        // is last left fixed column
        isLastLeftFixedColumn() {
            let result = false;

            const { colgroups, column } = this;

            const { fixed } = column;

            if (fixed === "left") {
                const { field } = column;
                const leftFixedColumns = colgroups.filter(
                    (x) => x.fixed === "left",
                );
                const index = leftFixedColumns.findIndex(
                    (x) => x.field === field,
                );

                if (index === leftFixedColumns.length - 1) {
                    result = true;
                }
            }
            return result;
        },
        // is first right fixed column
        isfirstRightFixedColumn() {
            let result = false;

            const { colgroups, column } = this;

            const { fixed } = column;

            if (fixed === "right") {
                const { field } = column;
                const leftFixedColumns = colgroups.filter(
                    (x) => x.fixed === "right",
                );

                if (leftFixedColumns[0].field === field) {
                    result = true;
                }
            }
            return result;
        },
    },
    methods: {
        /*
         * @getBodyTdClass
         * @desc  get body td class
         * @param {string} fixed - 固定方式
         */
        getBodyTdClass({ fixed }) {
            let result = {
                [clsName("footer-td")]: true,
            };

            const {
                cellStyleOption,
                rowData,
                column,
                rowIndex,
                cellSelectionData,
                rowKeyFieldName,
            } = this;

            // column fixed
            if (fixed) {
                result[clsName("fixed-left")] = fixed === "left";
                result[clsName("fixed-right")] = fixed === "right";
                result[clsName("last-left-fixed-column")] =
                    this.isLastLeftFixedColumn;
                result[clsName("first-right-fixed-column")] =
                    this.isfirstRightFixedColumn;
            }

            // cell style option
            if (
                cellStyleOption &&
                typeof cellStyleOption.footerCellClass === "function"
            ) {
                const customClass = cellStyleOption.footerCellClass({
                    row: rowData,
                    column,
                    rowIndex,
                });
                if (customClass) {
                    result[customClass] = true;
                }
            }
            // cell selection option
            if (cellSelectionData) {
                const { rowKey, colKey } = cellSelectionData.currentCell;
                if (
                    rowData[rowKeyFieldName] === rowKey &&
                    column["key"] === colKey
                ) {
                    result[clsName("cell-selection")] = true;
                }
            }

            return result;
        },

        /*
         * @getBodyTdStyle
         * @desc  get body td style
         * @param {any} key - column key
         * @param {string} align - 居中方式
         * @param {bool} fixed - 固定方式
         */
        getBodyTdStyle({ key, align, fixed }) {
            let result = {};

            const { colgroups, rowIndex, footerRows } = this;

            // text align
            result["text-align"] = align || "center";

            // fixed left total width or right total width
            if (fixed) {
                let totalWidth = 0;
                // column index
                const columnIndex = colgroups.findIndex((x) => x.key === key);
                if (
                    (fixed === "left" && columnIndex > 0) ||
                    (fixed === "right" && columnIndex < colgroups.length - 1)
                ) {
                    totalWidth = getFixedTotalWidthByColumnKey({
                        colgroups,
                        colKey: key,
                        fixed,
                    });

                    totalWidth = getValByUnit(totalWidth);
                }

                result["left"] = fixed === "left" ? totalWidth : "";
                result["right"] = fixed === "right" ? totalWidth : "";
            }

            // footer rows th fixed bottom
            if (this.fixedFooter) {
                let rowHeight = 0;
                if (rowIndex !== footerRows.length - 1) {
                    rowHeight = footerRows.reduce(
                        (total, currentVal, index) => {
                            return index > rowIndex
                                ? currentVal.rowHeight + total
                                : total;
                        },
                        0,
                    );
                }
                rowHeight = getValByUnit(rowHeight);

                result["bottom"] = rowHeight;
            }

            return result;
        },

        // get render content
        getRenderContent(h) {
            let content = null;

            const { column, rowData, rowIndex } = this;

            // has render function
            if (typeof column.renderFooterCell === "function") {
                const renderResult = column.renderFooterCell(
                    {
                        row: rowData,
                        column,
                        rowIndex,
                    },
                    h,
                );

                content = renderResult;
            } else {
                content = rowData[column.field];
            }
            return content;
        },

        // get cell span
        getCellSpan() {
            const { cellSpanOption, rowData, column, rowIndex } = this;
            let rowspan = 1;
            let colspan = 1;

            if (cellSpanOption) {
                const { footerCellSpan } = cellSpanOption;

                if (typeof footerCellSpan === "function") {
                    const result = footerCellSpan({
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
        },
        // dblclick
        cellDblclick(e, fn) {
            fn && fn(e);
        },
        // contextmenu
        cellContextmenu(e, fn) {
            fn && fn(e);
        },
        // mouseenter
        cellMouseenter(e, fn) {
            fn && fn(e);
        },
        // mouseleave
        cellMouseleave(e, fn) {
            fn && fn(e);
        },
        // mousemove
        cellMousemove(e, fn) {
            fn && fn(e);
        },
        // mouseover
        cellMouseover(e, fn) {
            fn && fn(e);
        },
        // mousedown
        cellMousedown(e, fn) {
            fn && fn(e);
        },
        // mouseup
        cellMouseup(e, fn) {
            fn && fn(e);
        },
    },
    render(h) {
        const { column, rowData, rowIndex, eventCustomOption } = this;

        const { rowspan, colspan } = this.getCellSpan();
        if (!rowspan || !colspan) {
            return null;
        }

        // custom on cell event
        let customEvents = {};
        if (eventCustomOption) {
            const { footerCellEvents } = eventCustomOption;
            customEvents = footerCellEvents
                ? footerCellEvents({ row: rowData, column, rowIndex })
                : {};
        }

        const {
            click,
            dblclick,
            contextmenu,
            mouseenter,
            mouseleave,
            mousemove,
            mouseover,
            mousedown,
            mouseup,
        } = customEvents;

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
            mousemove: (e) => {
                this.cellMousemove(e, mousemove);
            },
            mouseover: (e) => {
                this.cellMouseover(e, mouseover);
            },
            mousedown: (e) => {
                this.cellMousedown(e, mousedown);
            },
            mouseup: (e) => {
                this.cellMouseup(e, mouseup);
            },
        };

        // td props
        const tdProps = {
            class: this.getBodyTdClass(column),
            style: this.getBodyTdStyle(column),
            attrs: {
                rowspan,
                colspan,
            },
            on: events,
        };

        return (
            <td {...tdProps}>
                {/* other cell content */}
                {this.getRenderContent(h)}
            </td>
        );
    },
};
