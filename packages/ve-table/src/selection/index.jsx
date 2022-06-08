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

            const borderCollection = {
                borderWidth: startCellRect.width,
                borderHeight: startCellRect.height,

                topBorder: {
                    width: 0,
                    height: 2,
                    top: startCellRect.top,
                    left: startCellRect.left,
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
                    left: startCellRect.left,
                },
                leftBorder: {
                    width: 2,
                    height: 0,
                    top: startCellRect.top,
                    left: startCellRect.left,
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
            });

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
                    endCellRect.left - startCellRect.left + endCellRect.width;
                borderCollection.topBorder.left = startCellRect.left;
                borderCollection.rightBorder.left =
                    endCellRect.left + endCellRect.width - 1;
                borderCollection.bottomBorder.left = startCellRect.left;
                borderCollection.leftBorder.left = startCellRect.left;
            }
            // end cell left or equal
            else if (endCellRect.left <= startCellRect.left) {
                borderCollection.borderWidth =
                    startCellRect.left - endCellRect.left + startCellRect.width;

                borderCollection.topBorder.left = endCellRect.left;
                borderCollection.rightBorder.left =
                    startCellRect.left + startCellRect.width - 1;
                borderCollection.bottomBorder.left = endCellRect.left;
                borderCollection.leftBorder.left = endCellRect.left;
            }

            // end cell below
            if (endCellRect.top > startCellRect.top) {
                borderCollection.borderHeight =
                    endCellRect.top - startCellRect.top + endCellRect.height;

                borderCollection.topBorder.top = startCellRect.top;
                borderCollection.rightBorder.top = startCellRect.top;
                borderCollection.bottomBorder.top =
                    endCellRect.top + endCellRect.height - 1;
                borderCollection.leftBorder.top = startCellRect.top;
            }
            // end cell above or equal
            else if (endCellRect.top <= startCellRect.top) {
                borderCollection.borderHeight =
                    startCellRect.top - endCellRect.top + startCellRect.height;

                borderCollection.topBorder.top = endCellRect.top;
                borderCollection.rightBorder.top = endCellRect.top;
                borderCollection.bottomBorder.top =
                    startCellRect.top + startCellRect.height - 1;
                borderCollection.leftBorder.top = endCellRect.top;
            }

            borderCollection.corner.top = borderCollection.bottomBorder.top - 4;
            borderCollection.corner.left =
                borderCollection.rightBorder.left - 4;

            result = this.getBorders({ ...borderCollection });

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
        }) {
            return (
                <div class={clsName("selection-area")}>
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
                    {showCorner && (
                        <div
                            style={{
                                top: corner.top + "px",
                                left: corner.left + "px",
                            }}
                            class={clsName("selection-corner")}
                        ></div>
                    )}
                </div>
            );
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
