import {
    clsName,
    getFixedTotalWidthByColumnKey,
    isLastColumnByColKey,
    isLastRowByRowKey,
} from "../util";
import {
    COMPS_NAME,
    EMIT_EVENTS,
    HOOKS_NAME,
    CELL_SELECTION_TYPES,
} from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import { isEmptyValue } from "../../../src/utils/index.js";

export default {
    name: COMPS_NAME.VE_TABLE_SELECTION,
    mixins: [emitter],
    props: {
        allRowKeys: {
            type: Array,
            required: true,
        },
        colgroups: {
            type: Array,
            required: true,
        },
        parentRendered: {
            type: Boolean,
            required: true,
        },
        hooks: {
            type: Object,
            required: true,
        },
        rowKeyFieldName: {
            type: String,
            default: null,
        },
        cellSelectionOption: {
            type: Object,
            default: function () {
                return null;
            },
        },
        cellSelectionData: {
            type: Object,
            required: true,
        },
        isCellSelectionCornerMousedown: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            // current cell
            currentCellEl: null,
            endCellEl: null,
            autoFillEndCellEl: null,
            // selection rect
            selectionRect: {
                // start cell element rect
                startCellRect: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                },
                // end cell element rect
                endCellRect: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                },
                // auto fill end cell element rect
                autoFillEndCellRect: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                },
            },
        };
    },

    computed: {
        // corner cell info
        cornerCellInfo() {
            const { allRowKeys, colgroups, cellSelectionData } = this;

            const { currentCell, endCell } = cellSelectionData;

            return {
                isLastColumn:
                    isLastColumnByColKey(currentCell.colKey, colgroups) ||
                    isLastColumnByColKey(endCell.colKey, colgroups),
                isLastRow:
                    isLastRowByRowKey(currentCell.rowKey, allRowKeys) ||
                    isLastRowByRowKey(endCell.rowKey, allRowKeys),
            };
        },
    },

    watch: {
        parentRendered: {
            handler: function (val) {
                if (val) {
                    this.setTableEl();

                    // add table container scroll hook
                    this.hooks.addHook(
                        HOOKS_NAME.TABLE_CONTAINER_SCROLL,
                        () => {
                            if (!this.currentCellEl) {
                                this.setCurrentCellEl();
                            }
                            this.setSelectionPositions({ type: "currentCell" });
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        this.setSelectionPositions({ type: "currentCell" });
                    });
                }
            },
            immediate: true,
        },
        // watch current cell
        "cellSelectionData.currentCell": {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setCurrentCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "currentCell" });
                    });
                } else {
                    this.clearStartCellRect();
                }
            },
            deep: true,
            immediate: true,
        },
        // watch current cell
        "cellSelectionData.endCell": {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setEndCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "endCell" });
                    });
                } else {
                    this.clearEndCellRect();
                }
            },
            deep: true,
            immediate: true,
        },
        // watch current cell
        "cellSelectionData.autoFillEndCell": {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setAutoFillEndCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "autoFillEndCell" });
                    });
                } else {
                    this.clearAutoFillEndCellRect();
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // get cell position
        getCellPosition({ cellEl, tableLeft, tableTop }) {
            const {
                left: cellLeft,
                top: cellTop,
                height: cellHeight,
                width: cellWidth,
            } = cellEl.getBoundingClientRect();

            return {
                left: cellLeft - tableLeft,
                top: cellTop - tableTop,
                width: cellWidth,
                height: cellHeight,
            };
        },

        // set selection positions
        setSelectionPositions({ type }) {
            const {
                tableEl,
                currentCellEl,
                endCellEl,
                autoFillEndCellEl,
                // cellSelectionOption,
                // isCellSelectionCornerMousedown,
            } = this;

            if (!tableEl) {
                return false;
            }

            const {
                left: tableLeft,
                top: tableTop,
                // right: tableRight,
                // bottom: tableBottom,
            } = tableEl.getBoundingClientRect();

            // set start cell position
            if (currentCellEl && type === "currentCell") {
                this.selectionRect.startCellRect = this.getCellPosition({
                    cellEl: currentCellEl,
                    tableLeft,
                    tableTop,
                });
            }

            if (endCellEl && type === "endCell") {
                this.selectionRect.endCellRect = this.getCellPosition({
                    cellEl: endCellEl,
                    tableLeft,
                    tableTop,
                });
            }

            if (autoFillEndCellEl && type === "autoFillEndCell") {
                this.selectionRect.autoFillEndCellRect = this.getCellPosition({
                    cellEl: autoFillEndCellEl,
                    tableLeft,
                    tableTop,
                });
            }
        },

        // clear end cell rect
        clearStartCellRect() {
            this.currentCellEl = null;
            this.selectionRect.startCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        // clear end cell rect
        clearEndCellRect() {
            this.endCellEl = null;
            this.selectionRect.endCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        // clear auto fill end cell rect
        clearAutoFillEndCellRect() {
            this.autoFillEndCellEl = null;
            this.selectionRect.autoFillEndCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        /*
        get selection current
        1、selection current
        2、auto fill area
        */
        getSelectionCurrent() {
            let result = {
                selectionCurrent: null,
                autoFillArea: null,
            };

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!startCellRect.width) {
                return result;
            }

            const borders = {
                borderWidth: startCellRect.width + 1,
                borderHeight: startCellRect.height,

                topBorder: {
                    show: true,
                    width: 0,
                    height: 2,
                    top: startCellRect.top - 1,
                    left: startCellRect.left - 1,
                },
                rightBorder: {
                    show: true,
                    width: 2,
                    height: 0,
                    top: startCellRect.top,
                    left: startCellRect.left + startCellRect.width - 2,
                },
                bottomBorder: {
                    show: true,
                    width: 0,
                    height: 2,
                    top: startCellRect.top + startCellRect.height - 2,
                    left: startCellRect.left - 1,
                },
                leftBorder: {
                    show: true,
                    width: 2,
                    height: 0,
                    top: startCellRect.top,
                    left: startCellRect.left - 1,
                },
                corner: {
                    show: !endCellRect.width,
                    top: 0,
                    left: 0,
                },
            };

            borders.corner.top = borders.bottomBorder.top - 3;
            borders.corner.left = borders.rightBorder.left - 3;

            result.selectionCurrent = this.getBorders({
                ...borders,
                showCorner: !endCellRect.width,
                className: "selection-current",
            });

            if (!endCellRect.width) {
                result.autoFillArea = this.getSelectionAutoFillArea(borders);
            }

            return result;
        },

        /*
        get selection areas
        1、normal area
        2、auto fill area
        */
        getSelectionAreas() {
            let result = {
                normalArea: null,
                autoFillArea: null,
            };

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!startCellRect.width || !endCellRect.width) {
                return result;
            }

            const borders = {
                borderWidth: 0,
                borderHeight: 0,

                topBorder: {
                    show: true,
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                rightBorder: {
                    show: true,
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                bottomBorder: {
                    show: true,
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                leftBorder: {
                    show: true,
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                corner: {
                    show: true,
                    top: 0,
                    left: 0,
                },
            };

            // end cell right
            if (endCellRect.left > startCellRect.left) {
                borders.borderWidth =
                    endCellRect.left -
                    startCellRect.left +
                    endCellRect.width +
                    1;
                borders.topBorder.left = startCellRect.left - 1;
                borders.rightBorder.left =
                    endCellRect.left + endCellRect.width - 1;
                borders.bottomBorder.left = startCellRect.left - 1;
                borders.leftBorder.left = startCellRect.left - 1;
            }
            // end cell left or equal
            else if (endCellRect.left <= startCellRect.left) {
                borders.borderWidth =
                    startCellRect.left -
                    endCellRect.left +
                    startCellRect.width +
                    1;

                borders.topBorder.left = endCellRect.left - 1;
                borders.rightBorder.left =
                    startCellRect.left + startCellRect.width - 1;
                borders.bottomBorder.left = endCellRect.left - 1;
                borders.leftBorder.left = endCellRect.left - 1;
            }

            // end cell below
            if (endCellRect.top > startCellRect.top) {
                borders.borderHeight =
                    endCellRect.top - startCellRect.top + endCellRect.height;

                borders.topBorder.top = startCellRect.top - 1;
                borders.rightBorder.top = startCellRect.top;
                borders.bottomBorder.top =
                    endCellRect.top + endCellRect.height - 1;
                borders.leftBorder.top = startCellRect.top;
            }
            // end cell above or equal
            else if (endCellRect.top <= startCellRect.top) {
                borders.borderHeight =
                    startCellRect.top - endCellRect.top + startCellRect.height;

                borders.topBorder.top = endCellRect.top - 1;
                borders.rightBorder.top = endCellRect.top;
                borders.bottomBorder.top =
                    startCellRect.top + startCellRect.height - 1;
                borders.leftBorder.top = endCellRect.top;
            }

            borders.corner.top = borders.bottomBorder.top - 4;
            borders.corner.left = borders.rightBorder.left - 4;

            result.normalArea = this.getBorders({
                ...borders,
                className: "selection-normal-area",
            });

            if (endCellRect.width) {
                result.autoFillArea = this.getSelectionAutoFillArea(borders);
            }

            return result;
        },

        // get selection auto fill
        getSelectionAutoFillArea(areaPostions) {
            let result = null;

            const { selectionRect, isCellSelectionCornerMousedown } = this;

            if (!isCellSelectionCornerMousedown) {
                return result;
            }

            const { startCellRect, autoFillEndCellRect } = selectionRect;

            if (!startCellRect.width || !autoFillEndCellRect.width) {
                return result;
            }

            if (!areaPostions) {
                return result;
            }

            const borders = {
                borderWidth: 0,
                borderHeight: 0,

                topBorder: {
                    show: true,
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                rightBorder: {
                    show: true,
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                bottomBorder: {
                    show: true,
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                leftBorder: {
                    show: true,
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                corner: {
                    show: false,
                    top: 0,
                    left: 0,
                },
            };

            // auto fill end cell below
            if (autoFillEndCellRect.top > areaPostions.bottomBorder.top) {
                borders.topBorder.show = false;

                borders.borderWidth = areaPostions.borderWidth;
                borders.borderHeight =
                    autoFillEndCellRect.top -
                    areaPostions.bottomBorder.top +
                    autoFillEndCellRect.height;

                borders.rightBorder.top = areaPostions.bottomBorder.top;
                borders.rightBorder.left = areaPostions.rightBorder.left;

                borders.leftBorder.top = areaPostions.bottomBorder.top;
                borders.leftBorder.left = areaPostions.leftBorder.left;

                borders.bottomBorder.top =
                    autoFillEndCellRect.top + autoFillEndCellRect.height - 1;
                borders.bottomBorder.left = areaPostions.bottomBorder.left;
            }
            // end cell above
            else if (autoFillEndCellRect.top < areaPostions.topBorder.top) {
                borders.bottomBorder.show = false;

                borders.borderWidth = areaPostions.borderWidth;
                borders.borderHeight =
                    areaPostions.topBorder.top - autoFillEndCellRect.top;

                borders.topBorder.top = autoFillEndCellRect.top - 1;
                borders.topBorder.left = areaPostions.topBorder.left;

                borders.rightBorder.top = autoFillEndCellRect.top;
                borders.rightBorder.left = areaPostions.rightBorder.left;

                borders.leftBorder.top = autoFillEndCellRect.top;
                borders.leftBorder.left = areaPostions.leftBorder.left;
            }
            // auto fill end cell right
            else if (autoFillEndCellRect.left > areaPostions.rightBorder.left) {
                borders.leftBorder.show = false;

                borders.borderWidth =
                    autoFillEndCellRect.left -
                    areaPostions.rightBorder.left +
                    autoFillEndCellRect.width +
                    1;
                borders.borderHeight = areaPostions.borderHeight;

                borders.topBorder.top = areaPostions.topBorder.top;
                borders.topBorder.left = areaPostions.rightBorder.left - 1;

                borders.rightBorder.top = areaPostions.topBorder.top;
                borders.rightBorder.left =
                    autoFillEndCellRect.left + autoFillEndCellRect.width - 1;

                borders.bottomBorder.top = areaPostions.bottomBorder.top;
                borders.bottomBorder.left = areaPostions.rightBorder.left - 1;
            }
            // auto fill end cell left
            else if (autoFillEndCellRect.left < areaPostions.leftBorder.left) {
                borders.rightBorder.show = false;

                borders.borderWidth =
                    areaPostions.leftBorder.left - autoFillEndCellRect.left + 1;
                borders.borderHeight = areaPostions.borderHeight;

                borders.topBorder.top = areaPostions.topBorder.top;
                borders.topBorder.left = autoFillEndCellRect.left;

                borders.bottomBorder.top = areaPostions.bottomBorder.top;
                borders.bottomBorder.left = autoFillEndCellRect.left;

                borders.leftBorder.top = areaPostions.topBorder.top;
                borders.leftBorder.left = autoFillEndCellRect.left;
            }

            result = this.getBorders({
                ...borders,
                className: "selection-auto-fill-area",
            });

            return result;
        },

        // get borders
        getBorders({
            borderWidth,
            borderHeight,
            topBorder,
            rightBorder,
            bottomBorder,
            leftBorder,
            corner,
            className,
        }) {
            const { cornerCellInfo } = this;

            let cornerTop = corner.top;
            let cornerLeft = corner.left;
            let cornerBorderRightWidth = "1px";
            let cornerBorderBottomtWidth = "1px";

            if (cornerCellInfo.isLastRow) {
                cornerTop -= 3;
                cornerBorderBottomtWidth = "0px";
            }

            if (cornerCellInfo.isLastColumn) {
                cornerLeft -= 3;
                cornerBorderRightWidth = "0px";
            }

            // corner props
            const cornerProps = {
                class: clsName("selection-corner"),
                style: {
                    display: corner.show ? "block" : "none",
                    top: cornerTop + "px",
                    left: cornerLeft + "px",
                    borderWidth: `1px ${cornerBorderRightWidth} ${cornerBorderBottomtWidth} 1px`,
                },
                on: {
                    mousedown: (e) => {
                        this.dispatch(
                            COMPS_NAME.VE_TABLE,
                            EMIT_EVENTS.SELECTION_CORNER_MOUSEDOWN,
                            {
                                event: e,
                            },
                        );
                    },
                },
            };

            return (
                <div class={clsName(className)}>
                    {/* top */}
                    <div
                        style={{
                            display: topBorder.show ? "block" : "none",
                            width: borderWidth + "px",
                            height: topBorder.height + "px",
                            top: topBorder.top + "px",
                            left: topBorder.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* right */}
                    <div
                        style={{
                            display: rightBorder.show ? "block" : "none",
                            width: rightBorder.width + "px",
                            height: borderHeight + "px",
                            top: rightBorder.top + "px",
                            left: rightBorder.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* bottom */}
                    <div
                        style={{
                            display: bottomBorder.show ? "block" : "none",
                            width: borderWidth + "px",
                            height: bottomBorder.height + "px",
                            top: bottomBorder.top + "px",
                            left: bottomBorder.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* left */}
                    <div
                        style={{
                            display: leftBorder.show ? "block" : "none",
                            width: leftBorder.width + "px",
                            height: borderHeight + "px",
                            top: leftBorder.top + "px",
                            left: leftBorder.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* corner */}
                    {<div {...cornerProps}></div>}
                </div>
            );
        },

        // set start cell el
        setCurrentCellEl() {
            const { cellSelectionData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionData.currentCell;

            if (tableEl) {
                const currentCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (currentCellEl) {
                    this.currentCellEl = currentCellEl;
                }
            }
        },

        // set end cell el
        setEndCellEl() {
            const { cellSelectionData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionData.endCell;

            if (tableEl) {
                const endCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (endCellEl) {
                    this.endCellEl = endCellEl;
                }
            }
        },

        // set auto fill cell el
        setAutoFillEndCellEl() {
            const { cellSelectionData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionData.autoFillEndCell;

            if (tableEl) {
                const autoFillEndCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (autoFillEndCellEl) {
                    this.autoFillEndCellEl = autoFillEndCellEl;
                }
            }
        },

        // set table element
        setTableEl() {
            this.$nextTick(() => {
                const tableEl = this.$el.previousElementSibling;
                this.tableEl = tableEl;
            });
        },
    },

    render() {
        const selectionCurrent = this.getSelectionCurrent();
        const selectionArea = this.getSelectionAreas();

        const autoFillArea =
            selectionCurrent.autoFillArea || selectionArea.autoFillArea;

        return (
            <div class={clsName("selection-wrapper")}>
                <div class={clsName("selection-fixed-left")}>
                    {/* current */}
                    {selectionCurrent.selectionCurrent}
                    {/* area */}
                    {selectionArea.normalArea}
                    {/* auto fill */}
                    {autoFillArea}
                </div>
                <div class={clsName("selection-middle")}>
                    {/* current */}
                    {selectionCurrent.selectionCurrent}
                    {/* area */}
                    {selectionArea.normalArea}
                    {/* auto fill */}
                    {autoFillArea}
                </div>
                <div class={clsName("selection-fixed-right")}>
                    {/* current */}
                    {selectionCurrent.selectionCurrent}
                    {/* area */}
                    {selectionArea.normalArea}
                    {/* auto fill */}
                    {autoFillArea}
                </div>
            </div>
        );
    },
};
