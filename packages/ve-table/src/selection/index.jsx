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
            // area postion
            areaPostions: null,
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

        // get selection current
        getSelectionCurrent() {
            let result = null;

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!startCellRect.width) {
                return result;
            }

            const borderCollection = {
                borderWidth: startCellRect.width + 1,
                borderHeight: startCellRect.height,

                topBorder: {
                    width: 0,
                    height: 2,
                    top: startCellRect.top - 1,
                    left: startCellRect.left - 1,
                },
                rightBorder: {
                    width: 2,
                    height: 0,
                    top: startCellRect.top,
                    left: startCellRect.left + startCellRect.width - 2,
                },
                bottomBorder: {
                    width: 0,
                    height: 2,
                    top: startCellRect.top + startCellRect.height - 2,
                    left: startCellRect.left - 1,
                },
                leftBorder: {
                    width: 2,
                    height: 0,
                    top: startCellRect.top,
                    left: startCellRect.left - 1,
                },
                corner: {
                    top: 0,
                    left: 0,
                },
            };

            borderCollection.corner.top = borderCollection.bottomBorder.top - 3;
            borderCollection.corner.left =
                borderCollection.rightBorder.left - 3;

            result = this.getBorders({
                ...borderCollection,
                showCorner: !endCellRect.width,
                className: "selection-current",
            });

            return result;
        },

        // get selection area
        getSelectionArea() {
            let result = null;

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!startCellRect.width || !endCellRect.width) {
                return result;
            }

            const borderCollection = {
                borderWidth: 0,
                borderHeight: 0,

                topBorder: {
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                rightBorder: {
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                bottomBorder: {
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                leftBorder: {
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                corner: {
                    top: 0,
                    left: 0,
                },
            };

            // end cell right
            if (endCellRect.left > startCellRect.left) {
                borderCollection.borderWidth =
                    endCellRect.left -
                    startCellRect.left +
                    endCellRect.width +
                    1;
                borderCollection.topBorder.left = startCellRect.left - 1;
                borderCollection.rightBorder.left =
                    endCellRect.left + endCellRect.width - 1;
                borderCollection.bottomBorder.left = startCellRect.left - 1;
                borderCollection.leftBorder.left = startCellRect.left - 1;
            }
            // end cell left or equal
            else if (endCellRect.left <= startCellRect.left) {
                borderCollection.borderWidth =
                    startCellRect.left -
                    endCellRect.left +
                    startCellRect.width +
                    1;

                borderCollection.topBorder.left = endCellRect.left - 1;
                borderCollection.rightBorder.left =
                    startCellRect.left + startCellRect.width - 1;
                borderCollection.bottomBorder.left = endCellRect.left - 1;
                borderCollection.leftBorder.left = endCellRect.left - 1;
            }

            // end cell below
            if (endCellRect.top > startCellRect.top) {
                borderCollection.borderHeight =
                    endCellRect.top - startCellRect.top + endCellRect.height;

                borderCollection.topBorder.top = startCellRect.top - 1;
                borderCollection.rightBorder.top = startCellRect.top;
                borderCollection.bottomBorder.top =
                    endCellRect.top + endCellRect.height - 1;
                borderCollection.leftBorder.top = startCellRect.top;
            }
            // end cell above or equal
            else if (endCellRect.top <= startCellRect.top) {
                borderCollection.borderHeight =
                    startCellRect.top - endCellRect.top + startCellRect.height;

                borderCollection.topBorder.top = endCellRect.top - 1;
                borderCollection.rightBorder.top = endCellRect.top;
                borderCollection.bottomBorder.top =
                    startCellRect.top + startCellRect.height - 1;
                borderCollection.leftBorder.top = endCellRect.top;
            }

            borderCollection.corner.top = borderCollection.bottomBorder.top - 4;
            borderCollection.corner.left =
                borderCollection.rightBorder.left - 4;

            // set area positions
            this.areaPostions = borderCollection;

            result = this.getBorders({
                ...borderCollection,
                className: "selection-area",
            });

            return result;
        },

        // get selection auto fill
        getSelectionAutoFill() {
            let result = null;

            const {
                selectionRect,
                areaPostions,
                isCellSelectionCornerMousedown,
            } = this;

            if (!isCellSelectionCornerMousedown) {
                return result;
            }

            const { startCellRect, endCellRect, autoFillEndCellRect } =
                selectionRect;

            if (
                !startCellRect.width ||
                !endCellRect.width ||
                !autoFillEndCellRect.width
            ) {
                return result;
            }

            if (!areaPostions) {
                return result;
            }

            const borderCollection = {
                borderWidth: 0,
                borderHeight: 0,

                topBorder: {
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                rightBorder: {
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                bottomBorder: {
                    width: 0,
                    height: 1,
                    top: 0,
                    left: 0,
                },
                leftBorder: {
                    width: 1,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                corner: {
                    top: 0,
                    left: 0,
                },
            };

            // auto fill end cell right
            if (autoFillEndCellRect.left > areaPostions.rightBorder.left) {
                borderCollection.borderWidth =
                    autoFillEndCellRect.left -
                    areaPostions.rightBorder.left +
                    autoFillEndCellRect.width +
                    1;
                borderCollection.topBorder.left = areaPostions.rightBorder.left;
                borderCollection.rightBorder.left =
                    autoFillEndCellRect.left + autoFillEndCellRect.width;
                borderCollection.bottomBorder.left =
                    areaPostions.rightBorder.left;
                borderCollection.leftBorder.left =
                    areaPostions.leftBorder.left - 1;
            }
            // auto fill end cell left
            else if (autoFillEndCellRect.left < areaPostions.leftBorder.left) {
                borderCollection.borderWidth =
                    areaPostions.leftBorder.left - autoFillEndCellRect.left + 1;

                borderCollection.topBorder.left = autoFillEndCellRect.left - 1;
                borderCollection.rightBorder.left =
                    autoFillEndCellRect.left + autoFillEndCellRect.width - 1;
                borderCollection.bottomBorder.left =
                    autoFillEndCellRect.left - 1;
                borderCollection.leftBorder.left = autoFillEndCellRect.left - 1;
            }

            // auto fill end cell below
            if (autoFillEndCellRect.top > areaPostions.bottomBorder.top) {
                borderCollection.borderHeight =
                    autoFillEndCellRect.top -
                    areaPostions.topBorder.top +
                    autoFillEndCellRect.height;

                borderCollection.topBorder.top =
                    areaPostions.bottomBorder.top - 1;
                borderCollection.rightBorder.top =
                    areaPostions.bottomBorder.top;
                borderCollection.bottomBorder.top =
                    autoFillEndCellRect.top + autoFillEndCellRect.height - 1;
                borderCollection.leftBorder.top = areaPostions.bottomBorder.top;
            }
            // end cell above or equal
            else if (autoFillEndCellRect.top < areaPostions.topBorder.top) {
                borderCollection.borderHeight =
                    areaPostions.topBorder.top -
                    autoFillEndCellRect.top +
                    autoFillEndCellRect.height;

                borderCollection.topBorder.top = autoFillEndCellRect.top - 1;
                borderCollection.rightBorder.top = autoFillEndCellRect.top;
                borderCollection.bottomBorder.top = areaPostions.topBorder.top;
                borderCollection.leftBorder.top = areaPostions.topBorder.top;
            }

            result = this.getBorders({
                ...borderCollection,
                className: "selection-auto-fill",
                showCorner: false,
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
            showCorner = true,
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
                    // mouseup: (e) => {
                    //     console.log("corner mouseup");
                    // },
                },
            };

            return (
                <div class={clsName(className)}>
                    {/* top */}
                    <div
                        style={{
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
                            width: leftBorder.width + "px",
                            height: borderHeight + "px",
                            top: leftBorder.top + "px",
                            left: leftBorder.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* corner */}
                    {showCorner && <div {...cornerProps}></div>}
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

        // current column
        // getCurrentColumn(colKey) {
        //     let result = null;

        //     const { colgroups } = this;

        //     result = colgroups.find((x) => x.key === colKey);

        //     return result;
        // },
    },

    render() {
        const { isCellSelectionCornerMousedown } = this;

        const selectionCurrent = this.getSelectionCurrent();
        const selectionArea = this.getSelectionArea();

        let selectionAutoFill = null;
        if (isCellSelectionCornerMousedown) {
            selectionAutoFill = this.getSelectionAutoFill();
        }

        return (
            <div class={clsName("selection-wrapper")}>
                <div class={clsName("selection-fixed-left")}>
                    {/* current */}
                    {selectionCurrent}
                    {/* area */}
                    {selectionArea}
                    {/* auto fill */}
                    <div class={clsName("selection-auto-fill")}></div>
                </div>
                <div class={clsName("selection-middle")}>
                    {/* current */}
                    {selectionCurrent}
                    {/* area */}
                    {selectionArea}
                    {/* auto fill */}
                    {selectionAutoFill}
                </div>
                <div class={clsName("selection-fixed-right")}>
                    {/* current */}
                    {selectionCurrent}
                    {/* area */}
                    {selectionArea}
                    {/* auto fill */}
                    <div class={clsName("selection-auto-fill")}></div>
                </div>
            </div>
        );
    },
};
