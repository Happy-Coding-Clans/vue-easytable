import {
    clsName,
    isLastColumnByColKey,
    isLastRowByRowKey,
    getColKeysByRangeColKeys,
    isExistGivenFixedColKey,
    isExistNotFixedColKey,
    getLeftmostColKey,
    getRightmostColKey,
    getColKeysByFixedTypeWithinColKeys,
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
import { INSTANCE_METHODS } from "./constant";
import emitter from "../../../src/mixins/emitter";
import { isEmptyValue, isBoolean } from "../../../src/utils/index.js";
import { debounce } from "lodash";

export default {
    name: COMPS_NAME.VE_TABLE_SELECTION,
    mixins: [emitter],
    props: {
        tableEl: {
            type: HTMLTableElement,
            default: null,
        },
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
        // cell autofill option
        cellAutofillOption: {
            type: [Object, Boolean],
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
        // is scrolling
        showVirtualScrollingPlaceholder: {
            type: Boolean,
            default: false,
        },
        isVirtualScroll: {
            type: Boolean,
            default: false,
        },
        virtualScrollVisibleIndexs: {
            type: Object,
            required: true,
        },
        isCellEditing: {
            type: Boolean,
            default: false,
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
        // selection borders visibility
        selectionBordersVisibility() {
            let result = true;
            if (this.isVirtualScroll) {
                const {
                    showVirtualScrollingPlaceholder,
                    cellSelectionData,
                    virtualScrollVisibleIndexs,
                    currentCellSelectionType,
                } = this;

                if (showVirtualScrollingPlaceholder) {
                    result = false;
                } else {
                    const { currentCell, normalEndCell } = cellSelectionData;

                    if (
                        currentCellSelectionType ===
                        CURRENT_CELL_SELECTION_TYPES.SINGLE
                    ) {
                        if (
                            currentCell.rowIndex <
                                virtualScrollVisibleIndexs.start ||
                            currentCell.rowIndex >
                                virtualScrollVisibleIndexs.end
                        ) {
                            result = false;
                        }
                    }

                    if (
                        currentCellSelectionType ===
                        CURRENT_CELL_SELECTION_TYPES.RANGE
                    ) {
                        if (
                            (currentCell.rowIndex <
                                virtualScrollVisibleIndexs.start &&
                                normalEndCell.rowIndex <
                                    virtualScrollVisibleIndexs.start) ||
                            (currentCell.rowIndex >
                                virtualScrollVisibleIndexs.end &&
                                normalEndCell.rowIndex >
                                    virtualScrollVisibleIndexs.end)
                        ) {
                            result = false;
                        }
                    }
                }
            }
            return result;
        },
        // show corner
        showCorner() {
            let result = true;
            const { cellAutofillOption } = this;
            if (cellAutofillOption) {
                const { directionX, directionY } = this.cellAutofillOption;
                if (
                    isBoolean(directionY) &&
                    !directionY &&
                    isBoolean(directionX) &&
                    !directionX
                ) {
                    result = false;
                }
            } else {
                result = false;
            }

            return result;
        },
        // corner cell info
        cornerCellInfo() {
            const { allRowKeys, colgroups, cellSelectionRangeData } = this;

            const { rightColKey, bottomRowKey } = cellSelectionRangeData;

            let isLastColumn = false;
            if (isLastColumnByColKey(rightColKey, colgroups)) {
                isLastColumn = true;
            } else {
                const index = colgroups.findIndex((x) => x.key === rightColKey);
                // right col is right fixed and current col is not right fixed
                if (
                    colgroups[index + 1].fixed === COLUMN_FIXED_TYPE.RIGHT &&
                    colgroups[index].fixed !== COLUMN_FIXED_TYPE.RIGHT
                ) {
                    isLastColumn = true;
                }
            }

            let isLastRow = false;
            if (isLastRowByRowKey(bottomRowKey, allRowKeys)) {
                isLastRow = true;
            }

            return {
                isLastColumn,
                isLastRow,
            };
        },
        // is first selection row
        isFirstSelectionRow() {
            const { allRowKeys, cellSelectionRangeData } = this;
            return allRowKeys[0] === cellSelectionRangeData.topRowKey;
        },
        // is first selection column
        isFirstSelectionCol() {
            const { colgroups, cellSelectionRangeData } = this;
            return colgroups[0].key === cellSelectionRangeData.leftColKey;
        },
        // is first not fixed selection column
        isFirstNotFixedSelectionCol() {
            let result = false;

            const { colgroups, cellSelectionRangeData } = this;

            if (colgroups.find((x) => x.fixed === "left")) {
                const col = colgroups.find((x) => !x.fixed);
                if (col && col.field === cellSelectionRangeData.leftColKey) {
                    result = true;
                }
            }

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
                            this.setCellEls();
                            this.debounceSetCellEls();

                            this.resetCellPositions();
                            // debounce reset cell positions
                            this.debounceResetCellPositions();
                        },
                    );
                    // add table size change hook
                    this.hooks.addHook(HOOKS_NAME.TABLE_SIZE_CHANGE, () => {
                        // debounce reset cell positions
                        this.debounceResetCellPositions();
                    });
                    // add table td width change hook
                    this.hooks.addHook(
                        HOOKS_NAME.TABLE_CELL_WIDTH_CHANGE,
                        () => {
                            this.$nextTick(() => {
                                this.resetCellPositions();
                            });
                        },
                    );

                    // add clipboard cell value change hook
                    this.hooks.addHook(
                        HOOKS_NAME.CLIPBOARD_CELL_VALUE_CHANGE,
                        () => {
                            this.$nextTick(() => {
                                this.resetCellPositions();
                            });
                        },
                    );
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
                    this.setSelectionPositions({ type: "currentCell" });
                } else {
                    this[INSTANCE_METHODS.CLEAR_CURRENT_CELL_RECT]();
                }
                this.setCellSelectionRangeData();
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
                    this.setSelectionPositions({ type: "normalEndCell" });
                } else {
                    this[INSTANCE_METHODS.CLEAR_NORMAL_END_CELL_RECT]();
                }
                this.setCellSelectionRangeData();
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
                    this.setSelectionPositions({ type: "autoFillEndCell" });
                } else {
                    this.clearAutofillEndCellRect();
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        // reset cell position
        resetCellPositions() {
            const { currentCell, normalEndCell } = this.cellSelectionData;
            if (
                !isEmptyValue(currentCell.rowKey) &&
                !isEmptyValue(currentCell.colKey)
            ) {
                this.setSelectionPositions({
                    type: "currentCell",
                });
            }

            if (
                !isEmptyValue(normalEndCell.rowKey) &&
                !isEmptyValue(normalEndCell.colKey)
            ) {
                this.setSelectionPositions({
                    type: "normalEndCell",
                });
            }
        },

        // set cell els
        setCellEls() {
            if (this.isVirtualScroll && this.selectionBordersVisibility) {
                this.setCurrentCellEl();
                this.setNormalEndCellEl();
            }
        },

        // set cell selection range data
        setCellSelectionRangeData() {
            const { currentCellSelectionType } = this;
            const { currentCell, normalEndCell } = this.cellSelectionData;

            let result = {};

            if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.SINGLE
            ) {
                result = {
                    leftColKey: currentCell.colKey,
                    rightColKey: currentCell.colKey,
                    topRowKey: currentCell.rowKey,
                    bottomRowKey: currentCell.rowKey,
                };
            } else if (
                currentCellSelectionType === CURRENT_CELL_SELECTION_TYPES.RANGE
            ) {
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

                if (currentCell.rowIndex < normalEndCell.rowIndex) {
                    result.topRowKey = currentCell.rowKey;
                    result.bottomRowKey = normalEndCell.rowKey;
                } else {
                    result.topRowKey = normalEndCell.rowKey;
                    result.bottomRowKey = currentCell.rowKey;
                }
            } else {
                // clear
                result = {
                    leftColKey: "",
                    rightColKey: "",
                    topRowKey: "",
                    bottomRowKey: "",
                };
            }

            this.$emit(EMIT_EVENTS.CELL_SELECTION_RANGE_DATA_CHANGE, result);
        },

        // get cell position
        getCellPosition({ cellEl, tableLeft, tableTop }) {
            if (!this.selectionBordersVisibility) {
                return false;
            }

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
            }
        },

        // get cell position by column key
        getCellPositionByColKey({
            tableLeft,
            tableTop,
            colKey,
            isFirstRow,
            isLastRow,
        }) {
            if (!this.selectionBordersVisibility) {
                return false;
            }

            let cellEl;
            if (isFirstRow) {
                cellEl = this.getTableFirstRowCellByColKey(colKey);
            } else if (isLastRow) {
                cellEl = this.getTableLastRowCellByColKey(colKey);
            }

            if (!cellEl) {
                return;
            }

            const {
                left: cellLeft,
                top: cellTop,
                //height: cellHeight,
                width: cellWidth,
            } = cellEl.getBoundingClientRect();

            if (cellWidth) {
                return {
                    left: cellLeft - tableLeft,
                    top: cellTop - tableTop,
                    width: cellWidth,
                };
            }
        },

        // set selection positions
        setSelectionPositions({ type }) {
            const {
                allRowKeys,
                tableEl,
                currentCellEl,
                normalEndCellEl,
                autoFillEndCellEl,
                cellSelectionData,
                virtualScrollVisibleIndexs,
            } = this;

            // table empty
            if (allRowKeys.length === 0) {
                return false;
            }

            if (!tableEl) {
                return false;
            }

            const { left: tableLeft, top: tableTop } =
                tableEl.getBoundingClientRect();

            let isCurrentCellOverflow = false;
            let isNormalEndCellOverflow = false;
            // set current cell position
            if (type === "currentCell") {
                isCurrentCellOverflow = true;
                if (currentCellEl) {
                    const rect = this.getCellPosition({
                        cellEl: currentCellEl,
                        tableLeft,
                        tableTop,
                    });
                    if (rect) {
                        isCurrentCellOverflow = false;
                        this.cellSelectionRect.currentCellRect = rect;
                    }
                }
            }

            // set nromal end cell position`
            if (type === "normalEndCell") {
                isNormalEndCellOverflow = true;
                if (normalEndCellEl) {
                    const rect = this.getCellPosition({
                        cellEl: normalEndCellEl,
                        tableLeft,
                        tableTop,
                    });
                    if (rect) {
                        isNormalEndCellOverflow = false;
                        this.cellSelectionRect.normalEndCellRect = rect;
                    }
                }
            }

            // current cell overflow or normal end cell overflow && is virtual scroll
            if (
                (isCurrentCellOverflow || isNormalEndCellOverflow) &&
                this.isVirtualScroll
            ) {
                const { currentCell, normalEndCell } = cellSelectionData;
                // 弥补的
                let mackUpColKey;
                let mackUpRowIndex;

                if (isCurrentCellOverflow) {
                    mackUpColKey = currentCell.colKey;
                    mackUpRowIndex = currentCell.rowIndex;
                } else {
                    mackUpColKey = normalEndCell.colKey;
                    mackUpRowIndex = normalEndCell.rowIndex;
                }

                let mackUpRect;
                /* 
                当没有 currentCellRect 或 normalCellRect 时 进行纠正，否则只更新top值
                */
                if (
                    (isCurrentCellOverflow &&
                        !this.cellSelectionRect.currentCellRect.height) ||
                    (isNormalEndCellOverflow &&
                        !this.cellSelectionRect.normalEndCellRect.height)
                ) {
                    let mackUpRectParams = {
                        tableLeft,
                        tableTop,
                        colKey: mackUpColKey,
                    };
                    // 上方超出
                    if (mackUpRowIndex < virtualScrollVisibleIndexs.start) {
                        mackUpRect = this.getCellPositionByColKey({
                            ...mackUpRectParams,
                            isFirstRow: true,
                        });
                    }
                    // 下方超出
                    else if (mackUpRowIndex > virtualScrollVisibleIndexs.end) {
                        mackUpRect = this.getCellPositionByColKey({
                            ...mackUpRectParams,
                            isLastRow: true,
                        });
                    }
                }
                // 仅更新 top 值
                else {
                    // 上方超出
                    if (mackUpRowIndex < virtualScrollVisibleIndexs.start) {
                        mackUpRect = {
                            top: 0,
                        };
                    }
                    // 下方超出
                    else if (mackUpRowIndex > virtualScrollVisibleIndexs.end) {
                        mackUpRect = {
                            top: tableEl.clientHeight,
                        };
                    }
                }

                if (isCurrentCellOverflow) {
                    Object.assign(
                        this.cellSelectionRect.currentCellRect,
                        mackUpRect,
                    );
                } else {
                    Object.assign(
                        this.cellSelectionRect.normalEndCellRect,
                        mackUpRect,
                    );
                }
            }

            if (autoFillEndCellEl && type === "autoFillEndCell") {
                const rect = this.getCellPosition({
                    cellEl: autoFillEndCellEl,
                    tableLeft,
                    tableTop,
                });

                if (rect) {
                    this.cellSelectionRect.autoFillEndCellRect = rect;
                }
            }
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

            const fixedColKeys = getColKeysByFixedTypeWithinColKeys({
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

            const fixedColKeys = getColKeysByFixedTypeWithinColKeys({
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

            result.normalAreaLayer = this.getAreaLayer({
                ...borders,
                className: "selection-normal-area-layer",
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
                cellAutofillOption,
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

            let rightmostColKey;
            if (rightColKey !== autoFillEndCell.colKey) {
                rightmostColKey = getRightmostColKey({
                    colgroups,
                    colKeys: [rightColKey, autoFillEndCell.colKey],
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
                rightmostColKey === autoFillEndCell.colKey &&
                !isEmptyValue(rightmostColKey)
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

            const { directionX, directionY } = cellAutofillOption;
            if (isBoolean(directionX) && !directionX) {
                if (
                    autofillingDirection === AUTOFILLING_DIRECTION.LEFT ||
                    autofillingDirection === AUTOFILLING_DIRECTION.RIGHT
                ) {
                    return false;
                }
            }

            if (isBoolean(directionY) && !directionY) {
                if (
                    autofillingDirection === AUTOFILLING_DIRECTION.UP ||
                    autofillingDirection === AUTOFILLING_DIRECTION.DOWN
                ) {
                    return false;
                }
            }

            const totalColKeys = getColKeysByRangeColKeys({
                colKey1: rangeColKey1,
                colKey2: rangeColKey2,
                colgroups,
            });

            let fixedColKeys = getColKeysByFixedTypeWithinColKeys({
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
            const {
                cornerCellInfo,
                colgroups,
                isFirstSelectionRow,
                isFirstSelectionCol,
                isFirstNotFixedSelectionCol,
                showCorner,
            } = this;

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
                if (fixedType === COLUMN_FIXED_TYPE.LEFT) {
                    borderWidth += 1;
                }
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

            // solved first row、first column、first not fixed column selection border hidden
            if (isFirstSelectionRow) {
                topBorder.top += 1;
            }
            if (isFirstSelectionCol) {
                leftBorder.left += 1;
            }
            if (isFirstNotFixedSelectionCol) {
                leftBorder.left += 1;
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

            if (!showCorner) {
                corner.show = false;
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

        // get area rect
        getAreaLayer({
            borderWidth,
            borderHeight,
            topBorder,
            className,
            fixedType,
            totalColKeys,
            fixedColKeys,
        }) {
            const { colgroups } = this;

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
                if (fixedType === COLUMN_FIXED_TYPE.LEFT) {
                    borderWidth += 1;
                }
            }

            return (
                <div
                    class={clsName(className)}
                    style={{
                        top: topBorder.top + "px",
                        left: topBorder.left + "px",
                        width: borderWidth + "px",
                        height: borderHeight + "px",
                    }}
                ></div>
            );
        },

        /* 
        get table first row cell by col key
        用作跨页单元格选择，表格大小变化或者存在横向滚动条时，区域选择位置自动校准
        */
        getTableFirstRowCellByColKey(colKey) {
            let result = null;

            const { tableEl } = this;

            if (tableEl) {
                result = tableEl.querySelector(
                    `tbody.ve-table-body tr td[col-key="${colKey}"]`,
                );
            }
            return result;
        },

        /* 
        get table last row cell by col key
        用作跨页单元格选择，表格大小变化或者存在横向滚动条时，区域选择位置自动校准
        */
        getTableLastRowCellByColKey(colKey) {
            let result = null;

            const { tableEl } = this;

            if (tableEl) {
                result = tableEl.querySelector(
                    `tbody.ve-table-body tr:last-child td[col-key="${colKey}"]`,
                );
            }
            return result;
        },

        // get table el
        getTableCellEl({ rowKey, colKey }) {
            let result = null;

            const { tableEl } = this;

            if (tableEl) {
                result = tableEl.querySelector(
                    `tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`,
                );
            }
            return result;
        },

        // set current cell el
        setCurrentCellEl() {
            const { cellSelectionData } = this;

            const { rowKey, colKey } = cellSelectionData.currentCell;

            if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                const cellEl = this.getTableCellEl({
                    rowKey,
                    colKey,
                });
                if (cellEl) {
                    this.currentCellEl = cellEl;
                }
            }
        },

        // set normal end cell el
        setNormalEndCellEl() {
            const { cellSelectionData } = this;

            const { rowKey, colKey } = cellSelectionData.normalEndCell;

            if (!isEmptyValue(rowKey) && !isEmptyValue(colKey)) {
                const cellEl = this.getTableCellEl({
                    rowKey,
                    colKey,
                });
                if (cellEl) {
                    this.normalEndCellEl = cellEl;
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

        // clear current cell rect
        [INSTANCE_METHODS.CLEAR_CURRENT_CELL_RECT]() {
            this.currentCellEl = null;
            this.cellSelectionRect.currentCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },

        // clear normal end cell rect
        [INSTANCE_METHODS.CLEAR_NORMAL_END_CELL_RECT]() {
            this.normalEndCellEl = null;
            this.cellSelectionRect.normalEndCellRect = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            };
        },
    },

    created() {
        // debounce reset cell positions
        this.debounceResetCellPositions = debounce(
            this.resetCellPositions,
            210,
        );
        // debounce set cell els
        this.debounceSetCellEls = debounce(this.setCellEls, 200);
    },

    render() {
        if (!this.selectionBordersVisibility) {
            return null;
        }

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

        // middle
        const middleSelectionCurrent = this.getSelectionCurrent({
            fixedType: "",
        });
        const middleSelectionArea = this.getSelectionAreas({
            fixedType: "",
        });

        const middleAutoFillArea =
            middleSelectionCurrent.autoFillArea ||
            middleSelectionArea.autoFillArea;

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
            <div
                class={clsName("selection-wrapper")}
                style={{ visibility: this.isCellEditing ? "hidden" : "" }}
            >
                <div class={clsName("selection-fixed-left")}>
                    {/* current */}
                    {fixedLeftSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {fixedLeftSelectionArea.normalArea}
                    {/* auto fill */}
                    {fixedLeftAutoFillArea}
                    {/* area layer */}
                    {fixedLeftSelectionArea.normalAreaLayer}
                </div>
                <div class={clsName("selection-middle")}>
                    {/* current */}
                    {middleSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {middleSelectionArea.normalArea}
                    {/* auto fill */}
                    {middleAutoFillArea}
                    {/* area layer */}
                    {middleSelectionArea.normalAreaLayer}
                </div>
                <div class={clsName("selection-fixed-right")}>
                    {/* current */}
                    {fixedRightSelectionCurrent.selectionCurrent}
                    {/* area */}
                    {fixedRightSelectionArea.normalArea}
                    {/* auto fill */}
                    {fixedRightAutoFillArea}
                    {/* area layer */}
                    {fixedRightSelectionArea.normalAreaLayer}
                </div>
            </div>
        );
    },
};
