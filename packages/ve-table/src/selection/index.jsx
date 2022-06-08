import { clsName, getFixedTotalWidthByColumnKey } from "../util";
import { COMPS_NAME, EMIT_EVENTS, HOOKS_NAME } from "../util/constant";
import emitter from "../../../src/mixins/emitter";
import { isEmptyValue } from "../../../src/utils/index.js";

export default {
    name: COMPS_NAME.VE_TABLE_SELECTION,
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
        cellSelectionKeyData: {
            type: Object,
            default: function () {
                return null;
            },
        },
        cellSelectionEndCell: {
            type: Object,
            default: function () {
                return null;
            },
        },
    },

    data() {
        return {
            // as current cell
            startCellEl: null,
            endCellEl: null,
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
            },
        };
    },

    computed: {
        // start cell style
        startCellStyle() {
            return {};
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
                            if (!this.startCellEl) {
                                this.setStartCellEl();
                            }
                            this.setSelectionPositions();
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        this.setSelectionPositions();
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
                    this.setStartCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions();
                    });
                }
            },
            deep: true,
            immediate: true,
        },
        cellSelectionEndCell: {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setEndCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions();
                    });
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // set selection positions
        setSelectionPositions() {
            const { tableEl, startCellEl, endCellEl, cellSelectionOption } =
                this;

            if (!tableEl) {
                return false;
            }

            const { type: cellSelectionType } = cellSelectionOption;

            const {
                left: tableLeft,
                top: tableTop,
                right: tableRight,
                bottom: tableBottom,
            } = tableEl.getBoundingClientRect();

            // set start cell position
            if (startCellEl) {
                const {
                    left: cellLeft,
                    top: cellTop,
                    height: cellHeight,
                    width: cellWidth,
                    right: cellRight,
                    bottom: cellBottom,
                } = startCellEl.getBoundingClientRect();

                this.selectionRect.startCellRect = {
                    left: cellLeft - tableLeft,
                    top: cellTop - tableTop,
                    width: cellWidth,
                    height: cellHeight,
                };
            }

            if (cellSelectionType === "range" && endCellEl) {
                const {
                    left: cellLeft,
                    top: cellTop,
                    height: cellHeight,
                    width: cellWidth,
                } = endCellEl.getBoundingClientRect();

                this.selectionRect.endCellRect = {
                    left: cellLeft - tableLeft,
                    top: cellTop - tableTop,
                    width: cellWidth,
                    height: cellHeight,
                };
            }
        },

        // get selection current
        getSelectionCurrent() {
            let result = null;

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!startCellRect.width) {
                return result;
            }

            result = (
                <div class={clsName("selection-current")}>
                    {/* top */}
                    <div
                        style={{
                            width: startCellRect.width + "px",
                            height: "2px",
                            top: startCellRect.top + "px",
                            left: startCellRect.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* right */}
                    <div
                        style={{
                            width: "2px",
                            height: startCellRect.height + "px",
                            top: startCellRect.top + "px",
                            left:
                                startCellRect.left +
                                startCellRect.width -
                                2 +
                                "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* bottom */}
                    <div
                        style={{
                            width: startCellRect.width + "px",
                            height: "2px",
                            top:
                                startCellRect.top +
                                startCellRect.height -
                                2 +
                                "px",
                            left: startCellRect.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* left */}
                    <div
                        style={{
                            width: "2px",
                            height: startCellRect.height + "px",
                            top: startCellRect.top + "px",
                            left: startCellRect.left + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* corner */}
                    {!endCellRect.width && (
                        <div
                            style={{
                                top:
                                    startCellRect.top +
                                    startCellRect.height -
                                    5 +
                                    "px",
                                left:
                                    startCellRect.left +
                                    startCellRect.width -
                                    5 +
                                    "px",
                            }}
                            class={clsName("selection-corner")}
                        ></div>
                    )}
                </div>
            );

            return result;
        },

        // get selection area
        getSelectionArea() {
            let result = null;

            const { selectionRect } = this;

            const { startCellRect, endCellRect } = selectionRect;

            if (!endCellRect.width) {
                return result;
            }

            let borderWidth = 0;
            let borderHeight = 0;

            let topBorderTop = 0;
            let topBorderLeft = 0;

            let rightBorderTop = 0;
            let rightBorderLeft = 0;

            let bottomBorderTop = 0;
            let bottomBorderLeft = 0;

            let leftBorderTop = 0;
            let leftBorderLeft = 0;

            // end cell right
            if (endCellRect.left > startCellRect.left) {
                borderWidth =
                    endCellRect.left - startCellRect.left + endCellRect.width;
                topBorderLeft = startCellRect.left;
                rightBorderLeft = endCellRect.left + endCellRect.width;
                bottomBorderLeft = startCellRect.left;
                leftBorderLeft = startCellRect.left;
            }
            // end cell left or equal
            else if (endCellRect.left <= startCellRect.left) {
                borderWidth =
                    startCellRect.left - endCellRect.left + startCellRect.width;

                topBorderLeft = endCellRect.left;
                rightBorderLeft = startCellRect.left + startCellRect.width;
                bottomBorderLeft = endCellRect.left;
                leftBorderLeft = endCellRect.left;
            }

            // end cell below
            if (endCellRect.top > startCellRect.top) {
                borderHeight =
                    endCellRect.top - startCellRect.top + endCellRect.height;

                topBorderTop = startCellRect.top;
                rightBorderTop = startCellRect.top;
                bottomBorderTop = endCellRect.top + endCellRect.height;
                leftBorderTop = startCellRect.top;
            }
            // end cell above or equal
            else if (endCellRect.top <= startCellRect.top) {
                borderHeight =
                    startCellRect.top - endCellRect.top + startCellRect.height;

                topBorderTop = endCellRect.top;
                rightBorderTop = endCellRect.top;
                bottomBorderTop = startCellRect.top + startCellRect.height;
                leftBorderTop = endCellRect.top;
            }

            result = (
                <div class={clsName("selection-area")}>
                    {/* top */}
                    <div
                        style={{
                            width: borderWidth + "px",
                            height: "1px",
                            top: topBorderTop + "px",
                            left: topBorderLeft + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* right */}
                    <div
                        style={{
                            width: "1px",
                            height: borderHeight + "px",
                            top: rightBorderTop + "px",
                            left: rightBorderLeft - 1 + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* bottom */}
                    <div
                        style={{
                            width: borderWidth + "px",
                            height: "1px",
                            top: bottomBorderTop - 1 + "px",
                            left: bottomBorderLeft + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* left */}
                    <div
                        style={{
                            width: "1px",
                            height: borderHeight + "px",
                            top: leftBorderTop + "px",
                            left: leftBorderLeft + "px",
                        }}
                        class={clsName("selection-border")}
                    ></div>
                    {/* corner */}
                    <div
                        style={{
                            top: bottomBorderTop - 5 + "px",
                            left: rightBorderLeft - 5 + "px",
                        }}
                        class={clsName("selection-corner")}
                    ></div>
                </div>
            );

            return result;
        },

        // set start cell el
        setStartCellEl() {
            const { cellSelectionKeyData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionKeyData;

            if (tableEl) {
                const startCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (startCellEl) {
                    this.startCellEl = startCellEl;
                    //this.overflowViewport = false;
                }
            }
        },

        // set end cell el
        setEndCellEl() {
            const { cellSelectionEndCell, tableEl } = this;

            const { rowKey, colKey } = cellSelectionEndCell;

            if (tableEl) {
                const endCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (endCellEl) {
                    this.endCellEl = endCellEl;
                    //this.overflowViewport = false;
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
        // const { selectionRect } = this;
        // const { startCellRect, endCellRect } = selectionRect;

        const selectionCurrent = this.getSelectionCurrent();
        const selectionArea = this.getSelectionArea();

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
                    <div class={clsName("selection-auto-fill")}></div>
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
