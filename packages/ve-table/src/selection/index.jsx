import {
    clsName,
    isLastColumnByColKey,
    isLastRowByRowKey,
    getColKeysByRangeColKeys,
    isExistGivenFixedColKey,
    isExistNotFixedColKey,
    getLeftmostColKey,
    getColKeysByFixedType,
    getTotalWidthByColKeys,
    getPreviewColKey,
    getNextColKey,
} from "../util";
import {
    COMPS_NAME,
    EMIT_EVENTS,
    HOOKS_NAME,
    AUTOFILLING_DIRECTION,
    CURRENT_CELL_SELECTION_TYPES,
    COLUMN_FIXED_TYPE,
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
        cellSelectionRangeData: {
            type: Object,
            required: true,
        },
        isAutofillStarting: {
            type: Boolean,
            required: true,
        },
        currentCellSelectionType: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            // current cell
            currentCellEl: null,
            normalEndCellEl: null,
            autoFillEndCellEl: null,
            // cell selection rect
            cellSelectionRect: {
                // current cell element rect
                currentCellRect: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                },
                // normal end cell element rect
                normalEndCellRect: {
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

            const { currentCell, normalEndCell } = cellSelectionData;

            return {
                isLastColumn:
                    isLastColumnByColKey(currentCell.colKey, colgroups) ||
                    isLastColumnByColKey(normalEndCell.colKey, colgroups),
                isLastRow:
                    isLastRowByRowKey(currentCell.rowKey, allRowKeys) ||
                    isLastRowByRowKey(normalEndCell.rowKey, allRowKeys),
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
                            this.setSelectionPositions({
                                type: "normalEndCell",
                            });
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        this.setSelectionPositions({ type: "currentCell" });
                        this.setSelectionPositions({ type: "normalEndCell" });
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
                    // set current cell el
                    this.setCurrentCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "currentCell" });
                        // set cell selection range data
                        this.setCellSelectionRangeData();
                    });
                } else {
                    this.clearStartCellRect();
                    this.clearCellSelectionRangeData();
                }
            },
            deep: true,
            immediate: true,
        },
        // watch normal end cell
        "cellSelectionData.normalEndCell": {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    // set normal end cell el
                    this.setNormalEndCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "normalEndCell" });
                        // set cell selection range data
                        this.setCellSelectionRangeData();
                    });
                } else {
                    this.clearNormalEndCellRect();
                    this.clearCellSelectionRangeData();
                }
            },
            deep: true,
            immediate: true,
        },
        // watch autofill cell
        "cellSelectionData.autoFillEndCell": {
            handler: function (val) {
                const { rowKey, colKey } = val;
                if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                    this.setAutofillEndCellEl();
                    // wait for selection cell rendered
                    this.$nextTick(() => {
                        this.setSelectionPositions({ type: "autoFillEndCell" });
                    });
                } else {
                    this.clearAutofillEndCellRect();
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // set cell selection range data
        setCellSelectionRangeData() {
            const { currentCellSelectionType } = this;
            const { currentCell, normalEndCell } = this.cellSelectionData;
            const { currentCellRect, normalEndCellRect } =
                this.cellSelectionRect;

            let result = {
                leftColKey: "",
                rightColKey: "",
                topRowKey: "",
                bottomRowKey: "",
            };

            if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.SINGLE
            ) {
                result = {
                    leftColKey: currentCell.colKey,
                    rightColKey: currentCell.colKey,
                    topRowKey: currentCell.rowKey,
                    bottomRowKey: currentCell.rowKey,
                };
            } else {
                const leftmostColKey = getLeftmostColKey({
                    colgroups: this.colgroups,
                    colKeys: [currentCell.colKey, normalEndCell.colKey],
                });

                /*
                current cell col key is leftmost colKey
                需要用 colKey 的位置进行判断，不能根据当前单元格 left 值判断（固定列时）
                */
                if (leftmostColKey === currentCell.colKey) {
                    result.leftColKey = currentCell.colKey;
                    result.rightColKey = normalEndCell.colKey;
                } else {
                    result.leftColKey = normalEndCell.colKey;
                    result.rightColKey = currentCell.colKey;
                }

                // current cell top less than normal end cell top
                if (currentCellRect.top < normalEndCellRect.top) {
                    result.topRowKey = currentCell.rowKey;
                    result.bottomRowKey = normalEndCell.rowKey;
                } else {
                    result.topRowKey = normalEndCell.rowKey;
                    result.bottomRowKey = currentCell.rowKey;
                }
            }

            this.$emit(EMIT_EVENTS.CELL_SELECTION_RANGE_DATA_CHANGE, result);
        },
        // clear cell selection range data
        clearCellSelectionRangeData() {
            let result = {
                leftColKey: "",
                rightColKey: "",
                topRowKey: "",
                bottomRowKey: "",
            };
            this.$emit(EMIT_EVENTS.CELL_SELECTION_RANGE_DATA_CHANGE, result);
        },

        // get cell position
        getCellPosition({ cellEl, tableLeft, tableTop }) {
            const {
                left: cellLeft,
                top: cellTop,
                height: cellHeight,
                width: cellWidth,
            } = cellEl.getBoundingClientRect();

            if (cellHeight && cellWidth) {
                return {
                    left: cellLeft - tableLeft,
                    top: cellTop - tableTop,
                    width: cellWidth,
                    height: cellHeight,
                };
            } else {
                console.log("overflowViewport!!");
                return {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                };
            }
        },

        // set selection positions
        setSelectionPositions({ type }) {
            const {
                tableEl,
                currentCellEl,
                normalEndCellEl,
                autoFillEndCellEl,
            } = this;

            if (!tableEl) {
                return false;
            }

            const { left: tableLeft, top: tableTop } =
                tableEl.getBoundingClientRect();

            // set start cell position
            if (currentCellEl && type === "currentCell") {
                this.cellSelectionRect.currentCellRect = this.getCellPosition({
                    cellEl: currentCellEl,
                    tableLeft,
                    tableTop,
                });
            }

            if (normalEndCellEl && type === "normalEndCell") {
                this.cellSelectionRect.normalEndCellRect = this.getCellPosition(
                    {
                        cellEl: normalEndCellEl,
                        tableLeft,
                        tableTop,
                    },
                );
            }

            if (autoFillEndCellEl && type === "autoFillEndCell") {
                this.cellSelectionRect.autoFillEndCellRect =
                    this.getCellPosition({
                        cellEl: autoFillEndCellEl,
                        tableLeft,
                        tableTop,
                    });
            }
        },

        // clear end cell rect
        clearStartCellRect() {
            this.currentCellEl = null;
            this.cellSelectionRect.currentCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        // clear normal end cell rect
        clearNormalEndCellRect() {
            this.normalEndCellEl = null;
            this.cellSelectionRect.normalEndCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        // clear auto fill end cell rect
        clearAutofillEndCellRect() {
            this.autoFillEndCellEl = null;
            this.cellSelectionRect.autoFillEndCellRect = {
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
        getSelectionCurrent({ fixedType }) {
            let result = {
                selectionCurrent: null,
                autoFillArea: null,
            };

            const { cellSelectionRect, colgroups, cellSelectionData } = this;

            const { currentCellRect, normalEndCellRect } = cellSelectionRect;

            if (!currentCellRect.width) {
                return result;
            }

            const borders = {
                borderWidth: currentCellRect.width + 1,
                borderHeight: currentCellRect.height,

                topBorder: {
                    show: true,
                    width: 0,
                    height: 2,
                    top: currentCellRect.top - 1,
                    left: currentCellRect.left - 1,
                },
                rightBorder: {
                    show: true,
                    width: 2,
                    height: 0,
                    top: currentCellRect.top,
                    left: currentCellRect.left + currentCellRect.width - 2,
                },
                bottomBorder: {
                    show: true,
                    width: 0,
                    height: 2,
                    top: currentCellRect.top + currentCellRect.height - 2,
                    left: currentCellRect.left - 1,
                },
                leftBorder: {
                    show: true,
                    width: 2,
                    height: 0,
                    top: currentCellRect.top,
                    left: currentCellRect.left - 1,
                },
                corner: {
                    show: !normalEndCellRect.width,
                    top: 0,
                    left: 0,
                },
            };

            borders.corner.top = borders.bottomBorder.top - 3;
            borders.corner.left = borders.rightBorder.left - 3;

            // cell selection single autofill
            if (!normalEndCellRect.width) {
                result.autoFillArea = this.getSelectionAutofillArea({
                    areaPostions: borders,
                    fixedType,
                });
            }

            const totalColKeys = [cellSelectionData.currentCell.colKey];

            const fixedColKeys = getColKeysByFixedType({
                colKeys: totalColKeys,
                fixedType,
                colgroups,
            });

            result.selectionCurrent = this.getBorders({
                ...borders,
                showCorner: !normalEndCellRect.width,
                className: "selection-current",
                fixedType,
                totalColKeys,
                fixedColKeys,
            });

            return result;
        },

        /*
        get selection areas
        1、normal area
        2、auto fill area
        */
        getSelectionAreas({ fixedType }) {
            let result = {
                normalArea: null,
                autoFillArea: null,
            };

            const { currentCell, normalEndCell } = this.cellSelectionData;

            const { cellSelectionRect, cellSelectionRangeData, colgroups } =
                this;

            const { currentCellRect, normalEndCellRect } = cellSelectionRect;

            if (!currentCellRect.width || !normalEndCellRect.width) {
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

            const leftmostColKey = getLeftmostColKey({
                colgroups: this.colgroups,
                colKeys: [currentCell.colKey, normalEndCell.colKey],
            });

            // end cell column key right
            if (leftmostColKey === currentCell.colKey) {
                borders.borderWidth =
                    normalEndCellRect.left -
                    currentCellRect.left +
                    normalEndCellRect.width +
                    1;

                borders.topBorder.left = currentCellRect.left - 1;
                borders.bottomBorder.left = currentCellRect.left - 1;
                borders.leftBorder.left = currentCellRect.left - 1;
                borders.rightBorder.left =
                    normalEndCellRect.left + normalEndCellRect.width - 1;
            }
            // end cell column key left or equal
            else if (leftmostColKey === normalEndCell.colKey) {
                borders.borderWidth =
                    currentCellRect.left -
                    normalEndCellRect.left +
                    currentCellRect.width +
                    1;

                borders.topBorder.left = normalEndCellRect.left - 1;
                borders.rightBorder.left =
                    currentCellRect.left + currentCellRect.width - 1;
                borders.bottomBorder.left = normalEndCellRect.left - 1;
                borders.leftBorder.left = normalEndCellRect.left - 1;
            }

            // end cell below
            if (normalEndCellRect.top > currentCellRect.top) {
                borders.borderHeight =
                    normalEndCellRect.top -
                    currentCellRect.top +
                    normalEndCellRect.height;

                borders.topBorder.top = currentCellRect.top - 1;
                borders.rightBorder.top = currentCellRect.top;
                borders.bottomBorder.top =
                    normalEndCellRect.top + normalEndCellRect.height - 1;
                borders.leftBorder.top = currentCellRect.top;
            }
            // end cell above or equal
            else if (normalEndCellRect.top <= currentCellRect.top) {
                borders.borderHeight =
                    currentCellRect.top -
                    normalEndCellRect.top +
                    currentCellRect.height;

                borders.topBorder.top = normalEndCellRect.top - 1;
                borders.rightBorder.top = normalEndCellRect.top;
                borders.bottomBorder.top =
                    currentCellRect.top + currentCellRect.height - 1;
                borders.leftBorder.top = normalEndCellRect.top;
            }

            borders.corner.top = borders.bottomBorder.top - 4;
            borders.corner.left = borders.rightBorder.left - 4;

            if (normalEndCellRect.width) {
                result.autoFillArea = this.getSelectionAutofillArea({
                    areaPostions: borders,
                    fixedType,
                });
            }

            const { leftColKey, rightColKey } = cellSelectionRangeData;
            const totalColKeys = getColKeysByRangeColKeys({
                colKey1: leftColKey,
                colKey2: rightColKey,
                colgroups,
            });

            const fixedColKeys = getColKeysByFixedType({
                colKeys: totalColKeys,
                fixedType,
                colgroups,
            });

            result.normalArea = this.getBorders({
                ...borders,
                className: "selection-normal-area",
                fixedType,
                totalColKeys,
                fixedColKeys,
            });

            return result;
        },

        // get selection auto fill
        getSelectionAutofillArea({ areaPostions, fixedType }) {
            let result = null;

            const {
                cellSelectionRangeData,
                cellSelectionRect,
                cellSelectionData,
                isAutofillStarting,
                currentCellSelectionType,
                colgroups,
            } = this;

            if (!isAutofillStarting) {
                return result;
            }

            const { currentCellRect, autoFillEndCellRect } = cellSelectionRect;

            if (!currentCellRect.width || !autoFillEndCellRect.width) {
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

            const { currentCell, autoFillEndCell } = cellSelectionData;

            let { leftColKey, rightColKey } = cellSelectionRangeData;
            if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.SINGLE
            ) {
                leftColKey = currentCell.colKey;
                rightColKey = currentCell.colKey;
            }

            let leftmostColKey;
            if (leftColKey !== autoFillEndCell.colKey) {
                leftmostColKey = getLeftmostColKey({
                    colgroups,
                    colKeys: [leftColKey, autoFillEndCell.colKey],
                });
            }

            // autofilling direction
            let autofillingDirection;

            let rangeColKey1;
            let rangeColKey2;

            // auto fill end cell below
            if (autoFillEndCellRect.top > areaPostions.bottomBorder.top) {
                autofillingDirection = AUTOFILLING_DIRECTION.DOWN;

                rangeColKey1 = leftColKey;
                rangeColKey2 = rightColKey;

                borders.topBorder.show = false;

                borders.borderWidth = areaPostions.borderWidth;
                borders.borderHeight =
                    autoFillEndCellRect.top -
                    areaPostions.bottomBorder.top +
                    autoFillEndCellRect.height;

                borders.rightBorder.top = areaPostions.bottomBorder.top;
                borders.rightBorder.left = areaPostions.rightBorder.left;
                if (
                    currentCellSelectionType ===
                    CURRENT_CELL_SELECTION_TYPES.SINGLE
                ) {
                    borders.rightBorder.left++;
                }

                borders.leftBorder.top = areaPostions.bottomBorder.top;
                borders.leftBorder.left = areaPostions.leftBorder.left;

                borders.bottomBorder.top =
                    autoFillEndCellRect.top + autoFillEndCellRect.height - 1;
                borders.bottomBorder.left = areaPostions.bottomBorder.left;
            }
            // end cell above
            else if (autoFillEndCellRect.top < areaPostions.topBorder.top) {
                autofillingDirection = AUTOFILLING_DIRECTION.UP;

                rangeColKey1 = leftColKey;
                rangeColKey2 = rightColKey;

                borders.bottomBorder.show = false;

                borders.borderWidth = areaPostions.borderWidth;
                borders.borderHeight =
                    areaPostions.topBorder.top - autoFillEndCellRect.top;

                borders.topBorder.top = autoFillEndCellRect.top - 1;
                borders.topBorder.left = areaPostions.topBorder.left;

                borders.rightBorder.top = autoFillEndCellRect.top;
                borders.rightBorder.left = areaPostions.rightBorder.left;
                if (
                    currentCellSelectionType ===
                    CURRENT_CELL_SELECTION_TYPES.SINGLE
                ) {
                    borders.rightBorder.left++;
                }

                borders.leftBorder.top = autoFillEndCellRect.top;
                borders.leftBorder.left = areaPostions.leftBorder.left;
            }
            // auto fill end cell right
            else if (
                leftmostColKey === leftColKey &&
                !isEmptyValue(leftmostColKey)
            ) {
                autofillingDirection = AUTOFILLING_DIRECTION.RIGHT;

                rangeColKey1 = getNextColKey({
                    colgroups,
                    currentColKey: rightColKey,
                });
                rangeColKey2 = autoFillEndCell.colKey;

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
            else if (
                leftmostColKey === autoFillEndCell.colKey &&
                !isEmptyValue(leftmostColKey)
            ) {
                autofillingDirection = AUTOFILLING_DIRECTION.LEFT;

                rangeColKey1 = getPreviewColKey({
                    colgroups,
                    currentColKey: leftColKey,
                });
                rangeColKey2 = autoFillEndCell.colKey;

                borders.rightBorder.show = false;

                borders.borderWidth =
                    areaPostions.leftBorder.left - autoFillEndCellRect.left + 1;
                borders.borderHeight = areaPostions.borderHeight;

                borders.topBorder.top = areaPostions.topBorder.top;
                borders.topBorder.left = autoFillEndCellRect.left;

                borders.rightBorder.left = areaPostions.topBorder.left;

                borders.bottomBorder.top = areaPostions.bottomBorder.top;
                borders.bottomBorder.left = autoFillEndCellRect.left;

                borders.leftBorder.top = areaPostions.topBorder.top;
                borders.leftBorder.left = autoFillEndCellRect.left;
            } else {
                return result;
            }

            const totalColKeys = getColKeysByRangeColKeys({
                colKey1: rangeColKey1,
                colKey2: rangeColKey2,
                colgroups,
            });

            let fixedColKeys = getColKeysByFixedType({
                colKeys: totalColKeys,
                fixedType,
                colgroups,
            });

            result = this.getBorders({
                className: "selection-autofill-area",
                ...borders,
                fixedType,
                totalColKeys,
                fixedColKeys,
            });

            if (result) {
                this.dispatch(
                    COMPS_NAME.VE_TABLE,
                    EMIT_EVENTS.AUTOFILLING_DIRECTION_CHANGE,
                    autofillingDirection,
                );
            }

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
            fixedType,
            totalColKeys,
            fixedColKeys,
        }) {
            const { cornerCellInfo, colgroups } = this;

            let isRender = true;

            if (fixedType) {
                isRender = isExistGivenFixedColKey({
                    fixedType,
                    colKeys: totalColKeys,
                    colgroups,
                });
            }
            // middle normal area
            else {
                isRender = isExistNotFixedColKey({
                    colKeys: totalColKeys,
                    colgroups,
                });
            }

            if (!isRender) {
                return null;
            }

            // fixed columns total width
            let fixedColsTotalWidth = 0;
            if (fixedColKeys.length) {
                fixedColsTotalWidth = getTotalWidthByColKeys({
                    colKeys: fixedColKeys,
                    colgroups,
                });
            }

            if (fixedType) {
                borderWidth = fixedColsTotalWidth;
            }

            if (fixedType === COLUMN_FIXED_TYPE.LEFT) {
                if (totalColKeys.length !== fixedColKeys.length) {
                    rightBorder.show = false;
                    corner.show = false;
                }
            }

            if (fixedType === COLUMN_FIXED_TYPE.RIGHT) {
                if (totalColKeys.length !== fixedColKeys.length) {
                    leftBorder.show = false;
                }

                topBorder.left = rightBorder.left - borderWidth + 1;
                bottomBorder.left = rightBorder.left - borderWidth + 1;
            }

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
                    mouseup: (e) => {
                        this.dispatch(
                            COMPS_NAME.VE_TABLE,
                            EMIT_EVENTS.SELECTION_CORNER_MOUSEUP,
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

        // set normal end cell el
        setNormalEndCellEl() {
            const { cellSelectionData, tableEl } = this;

            const { rowKey, colKey } = cellSelectionData.normalEndCell;

            if (tableEl) {
                const normalEndCellEl = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );

                if (normalEndCellEl) {
                    this.normalEndCellEl = normalEndCellEl;
                }
            }
        },

        // set auto fill cell el
        setAutofillEndCellEl() {
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
        // fixed left
        const fixedLeftSelectionCurrent = this.getSelectionCurrent({
            fixedType: COLUMN_FIXED_TYPE.LEFT,
        });
        const fixedLeftSelectionArea = this.getSelectionAreas({
            fixedType: COLUMN_FIXED_TYPE.LEFT,
        });

        const fixedLeftAutoFillArea =
            fixedLeftSelectionCurrent.autoFillArea ||
            fixedLeftSelectionArea.autoFillArea;

        // normal
        const normalSelectionCurrent = this.getSelectionCurrent({
            fixedType: "",
        });
        const normalSelectionArea = this.getSelectionAreas({
            fixedType: "",
        });

        const normalAutoFillArea =
            normalSelectionCurrent.autoFillArea ||
            normalSelectionArea.autoFillArea;

        // fixed right
        const fixedRightSelectionCurrent = this.getSelectionCurrent({
            fixedType: COLUMN_FIXED_TYPE.RIGHT,
        });
        const fixedRightSelectionArea = this.getSelectionAreas({
            fixedType: COLUMN_FIXED_TYPE.RIGHT,
        });

        const fixedRightAutoFillArea =
            fixedRightSelectionCurrent.autoFillArea ||
            fixedRightSelectionArea.autoFillArea;

        return (
            <div class={clsName("selection-wrapper")}>
                <div class={clsName("selection-fixed-left")}>
                    {/* current */}
                    {fixedLeftSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {fixedLeftSelectionArea.normalArea}
                    {/* auto fill */}
                    {fixedLeftAutoFillArea}
                </div>
                <div class={clsName("selection-middle")}>
                    {/* current */}
                    {normalSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {normalSelectionArea.normalArea}
                    {/* auto fill */}
                    {normalAutoFillArea}
                </div>
                <div class={clsName("selection-fixed-right")}>
                    {/* current */}
                    {fixedRightSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {fixedRightSelectionArea.normalArea}
                    {/* auto fill */}
                    {fixedRightAutoFillArea}
                </div>
            </div>
        );
    },
};
