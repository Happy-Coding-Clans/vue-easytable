import {
    PREFIX_CLS,
    CONTEXTMENU_TYPES,
    COLUMN_FIXED_TYPE,
    AUTOFILLING_DIRECTION,
} from "./constant";
import { MOUSE_EVENT_CLICK_TYPE } from "../../../src/utils/constant";
import { isEmptyValue, isEmptyArray } from "../../../src/utils/index";
import { getRandomId } from "../../../src/utils/random";

/**
 * @clsName
 * @desc  get class name
 * @param {string} cls - class
 */
export function clsName(cls) {
    return PREFIX_CLS + cls;
}

/**
 * @getRowKey
 * @desc  get row key
 * @param {Object} rowData - rowData
 * @param {string} rowKeyFieldName - row key field name
 */
export function getRowKey(rowData, rowKeyFieldName) {
    let result = null;

    if (rowData && rowKeyFieldName) {
        result = rowData[rowKeyFieldName];
    }
    return result;
}

/**
 * @getColumnByColkey
 * @desc  get column by col key
 * @param {string} colKey - column key
 */
export function getColumnByColkey(colKey, colgroups) {
    if (colKey) {
        return colgroups.find((x) => x.key === colKey);
    }
    return null;
}

/**
 * @isLastColumnByColKey
 * @desc is last column by column key
 * @param {string} colKey - column key
 */
export function isLastColumnByColKey(colKey, colgroups) {
    if (!isEmptyValue(colKey) && !isEmptyArray(colgroups)) {
        return colgroups[colgroups.length - 1].key === colKey;
    }
    return false;
}

/**
 * @isOperationColumn
 * @desc is operation column
 * @param {string} colKey - column key
 * @param {arrat<object>} colgroups - column key
 */
export function isOperationColumn(colKey, colgroups) {
    if (!isEmptyValue(colKey) && !isEmptyArray(colgroups)) {
        const firstCol = colgroups[0];
        if (firstCol.key === colKey && firstCol.operationColumn) {
            return true;
        }
    }
    return false;
}

/**
 * @isLastRowByRowKey
 * @desc is last row by row key
 * @param {string} rowKey - row key
 */
export function isLastRowByRowKey(rowKey, allRowKeys) {
    if (!isEmptyValue(rowKey) && !isEmptyArray(allRowKeys)) {
        return allRowKeys[allRowKeys.length - 1] === rowKey;
    }
    return false;
}

/**
 * @getDomResizeObserverCompKey
 * @desc  get dom resize observer comp key
 * @param {Any} originalKey - original key
 * @param {Number} columnsOptionResetTime - columns option change time
 */
export function getDomResizeObserverCompKey(
    originalKey,
    columnsOptionResetTime,
) {
    let result = originalKey;

    if (result || result == 0) {
        result = originalKey + "@" + columnsOptionResetTime;
    }

    return result;
}

/**
 * @recursiveRemoveColumnByKey
 * @desc recursive remove column key
 * @param {object} columns - deep clone column
 * @param {any} key - column key
 */
export function recursiveRemoveColumnByKey(columns, key) {
    return columns.filter((item) => {
        if ("children" in item) {
            item.children = recursiveRemoveColumnByKey(item.children, key);
        }
        return item.key !== key;
    });
}

/**
 * @getFixedTotalWidthByColumnKey
 * @desc  get fixed total width by column key
 * @param {object} colgroups - columns info
 * @param {any} colKey - column key
 * @param {string} fixed - left|right
 */
export function getFixedTotalWidthByColumnKey({ colgroups, colKey, fixed }) {
    const currentIndex = colgroups.findIndex((x) => x.key === colKey);

    let result = 0;

    if (fixed === COLUMN_FIXED_TYPE.LEFT) {
        // 只计算左列固定的
        result = colgroups.reduce((total, currentVal, index) => {
            return index < currentIndex &&
                currentVal.fixed == COLUMN_FIXED_TYPE.LEFT
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    } else if (fixed === COLUMN_FIXED_TYPE.RIGHT) {
        // 只计算右列固定的
        result = colgroups.reduce((total, currentVal, index) => {
            return index > currentIndex &&
                currentVal.fixed == COLUMN_FIXED_TYPE.RIGHT
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    }

    return result;
}

/**
 * @getNotFixedTotalWidthByColumnKey
 * @desc  get not fixed total width by column key
 * @param {object} colgroups - 列信息
 * @param {any} colKey - column key
 * @param {string} direction - left|right
 */
export function getNotFixedTotalWidthByColumnKey({ colgroups, colKey, fixed }) {
    const currentIndex = colgroups.findIndex((x) => x.key === colKey);

    let result = 0;

    if (fixed === COLUMN_FIXED_TYPE.LEFT) {
        // 只计算左侧非固定列
        result = colgroups.reduce((total, currentVal, index) => {
            return index < currentIndex && !currentVal.fixed
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    } else if (fixed === COLUMN_FIXED_TYPE.RIGHT) {
        // 只计算右侧非固定列
        result = colgroups.reduce((total, currentVal, index) => {
            return index > currentIndex && !currentVal.fixed
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    }

    return result;
}

/**
 * @getTotalWidthByColKeys
 * @desc get total width by collumn keys
 * @param {array<T>} colKeys
 * @param {array<object>} colgroups
 * @return {number} width
 */
export function getTotalWidthByColKeys({ colKeys, colgroups }) {
    let result = colgroups.reduce((total, currentVal, index) => {
        return colKeys.indexOf(currentVal.key) > -1
            ? currentVal._realTimeWidth + total
            : total;
    }, 0);

    return result;
}

/**
 * @initGroupColumns
 * @desc  int group columns
 * @param {array} cloneColumns - clone columns
 * @return {
   isGroupHeader,
   colgroups,
   groupColumns
}
 */
export function initGroupColumns(cloneColumns) {
    let colgroups = [];
    let groupColumns = [];

    // set column level
    let maxLevel = 1;
    const setColumnLevel = (column, parent) => {
        if (parent) {
            column._level = parent._level + 1;
            if (maxLevel < column._level) {
                maxLevel = column._level;
            }
        }
        if (column.children) {
            column.children.forEach((item) => {
                item.fixed = column.fixed;
                setColumnLevel(item, column);
            });
        }
    };
    cloneColumns.forEach((column) => {
        column._level = 1;
        setColumnLevel(column);
    });

    // set colspan and rowspan and keys
    const setColspanAndRowspanAndKeys = (column) => {
        if (column.children) {
            let keys = "";
            let colspan = 0;
            column.children.forEach((item) => {
                setColspanAndRowspanAndKeys(item);

                colspan += item._colspan;
                keys += item._keys.endsWith("|")
                    ? item._keys
                    : item._keys + "|";
            });
            column._keys = keys;
            column._colspan = colspan;
            column._rowspan = 1;
        } else {
            column._keys = column.key;
            column._colspan = 1;
            column._rowspan = maxLevel - column._level + 1;
        }
    };

    cloneColumns.forEach((column) => {
        setColspanAndRowspanAndKeys(column);
    });

    // init groupColumns
    for (let i = 0; i < maxLevel; i++) {
        groupColumns.push([]);
    }
    // set colgroups and groupColumns
    const setColgroupsAndGroupColumns = (column) => {
        // column has children || column key is not empty
        if (!isEmptyArray(column.children) || !isEmptyValue(column.key)) {
            // set groupColumns
            const { ...groupColumn } = column;
            groupColumns[column._level - 1].push(groupColumn);

            if (column.children) {
                column.children.forEach((item) => {
                    setColgroupsAndGroupColumns(item);
                });
            } else {
                // set colgroups
                const { ...colgroup } = column;
                colgroup._realTimeWidth = colgroup.width;
                colgroups.push(colgroup);
            }
        }
    };

    cloneColumns.forEach((column) => {
        setColgroupsAndGroupColumns(column);
    });

    return {
        // set is group header
        isGroupHeader: maxLevel > 1,
        // set colgroups
        colgroups,
        // set groupColumns
        groupColumns,
    };
}

// get header contextmenu option collection
export function getHeaderContextmenuOptionCollection(t) {
    return [
        {
            type: CONTEXTMENU_TYPES.SEPARATOR,
        },
        {
            label: t("cut"),
            type: CONTEXTMENU_TYPES.CUT,
        },
        {
            label: t("copy"),
            type: CONTEXTMENU_TYPES.COPY,
        },
        // {
        //     label: t("paste"),
        //     type: CONTEXTMENU_TYPES.PASTE,
        // },
        {
            label: t("removeColumn"),
            type: CONTEXTMENU_TYPES.REMOVE_COLUMN,
        },
        {
            label: t("emptyColumn"),
            type: CONTEXTMENU_TYPES.EMPTY_COLUMN,
        },
        {
            label: t("hideColumn"),
            type: CONTEXTMENU_TYPES.HIDE_COLUMN,
        },
        {
            label: t("leftFixedColumnTo"),
            type: CONTEXTMENU_TYPES.LEFT_FIXED_COLUMN_TO,
        },
        {
            label: t("cancelLeftFixedColumnTo"),
            type: CONTEXTMENU_TYPES.CANCEL_LEFT_FIXED_COLUMN_TO,
        },
        {
            label: t("rightFixedColumnTo"),
            type: CONTEXTMENU_TYPES.RIGHT_FIXED_COLUMN_TO,
        },
        {
            label: t("cancelRightFixedColumnTo"),
            type: CONTEXTMENU_TYPES.CANCEL_RIGHT_FIXED_COLUMN_TO,
        },
    ];
}

// get body contextmenu option collection
export function getBodyContextmenuOptionCollection(t) {
    return [
        {
            type: CONTEXTMENU_TYPES.SEPARATOR,
        },
        {
            label: t("cut"),
            type: CONTEXTMENU_TYPES.CUT,
            disable: false,
        },
        {
            label: t("copy"),
            type: CONTEXTMENU_TYPES.COPY,
            disable: false,
        },
        // {
        //     label: t("paste"),
        //     type: CONTEXTMENU_TYPES.PASTE,
        // },
        {
            label: t("insertRowAbove"),
            type: CONTEXTMENU_TYPES.INSERT_ROW_ABOVE,
            disable: false,
        },
        {
            label: t("insertRowBelow"),
            type: CONTEXTMENU_TYPES.INSERT_ROW_BELOW,
            disable: false,
        },
        {
            label: t("removeRow"),
            type: CONTEXTMENU_TYPES.REMOVE_ROW,
            disable: false,
        },
        {
            label: t("emptyRow"),
            type: CONTEXTMENU_TYPES.EMPTY_ROW,
            disable: false,
        },
        {
            label: t("removeColumn"),
            type: CONTEXTMENU_TYPES.REMOVE_COLUMN,
            disable: false,
        },
        {
            label: t("emptyCell"),
            type: CONTEXTMENU_TYPES.EMPTY_CELL,
            disable: false,
        },
    ];
}

// create empty row data
export function createEmptyRowData({ colgroups, rowKeyFieldName }) {
    let rowData = {
        [rowKeyFieldName]: getRandomId(),
    };

    colgroups.forEach((column) => {
        if (column.field) {
            rowData[column.field] = "";
        }
    });

    return rowData;
}

//  empty row data
// export function emptyRowData({ rowData, rowKeyFieldName }) {
//     Object.keys(rowData).forEach((key) => {
//         if (key !== rowKeyFieldName) {
//             rowData[key] = "";
//         }
//     });

//     return rowData;
// }

// is contextmenu panel clicked
export function isContextmenuPanelClicked(event) {
    let result = false;
    const contextmenuPanelEls = document.querySelectorAll(
        ".ve-contextmenu-popper",
    );
    [].forEach.call(contextmenuPanelEls, function (el) {
        if (el.contains(event.target)) {
            result = true;
        }
    });

    return result;
}

/**
 * @getColKeysByHeaderColumn
 * @desc
 * @param {object} headerColumnItem
 * @param {any} colKey2
 * @return Array<colKeys>
 */
export function getColKeysByHeaderColumn({ headerColumnItem }) {
    let result = null;

    const { _keys } = headerColumnItem;

    result = _keys.split("|");
    if (result.length > 1) {
        result = result.slice(0, result.length - 1);
    }

    return result;
}

/**
 * @getColKeysByRangeColKeys
 * @desc  get col keys by range col keys
 * @param {any} colKey1
 * @param {any} colKey2
 * @return Array<colKeys>
 */
export function getColKeysByRangeColKeys({ colKey1, colKey2, colgroups }) {
    let result = null;

    const index1 = colgroups.findIndex((x) => x.key === colKey1);
    const index2 = colgroups.findIndex((x) => x.key === colKey2);

    if (index1 !== -1 && index1 !== -1) {
        const beginIndex = index1 < index2 ? index1 : index2;
        const endIndex = index1 < index2 ? index2 : index1;
        result = colgroups.slice(beginIndex, endIndex + 1).map((x) => x.key);
    }

    return result;
}

/**
 * @getColKeysByFixedType
 * @desc  get col keys by fixed type
 * @param {array<T>} colKeys
 * @param {string} fixedType - fixed type
 * @param {array<object>} colgroups
 * @return {array} colKeys
 */
export function getColKeysByFixedType({ colKeys, fixedType, colgroups }) {
    let result = null;

    if (Array.isArray(colKeys)) {
        result = colgroups
            .filter((x) => colKeys.indexOf(x.key) > -1 && x.fixed === fixedType)
            .map((x) => x.key);
    }

    return result;
}

/**
 * @getRowKeysByRangeRowKeys
 * @desc get row keys by range row keys
 * @param {any} topRowKey - top row key
 * @param {any} bottomRowKey - bottom row key
 * @return Array<colKeys>
 */
export function getRowKeysByRangeRowKeys({
    topRowKey,
    bottomRowKey,
    allRowKeys,
}) {
    let result = null;

    const beginIndex = allRowKeys.findIndex((x) => x === topRowKey);
    const endIndex = allRowKeys.findIndex((x) => x === bottomRowKey);

    if (beginIndex !== -1 && endIndex !== -1) {
        result = allRowKeys.slice(beginIndex, endIndex + 1);
    }

    return result;
}

/**
 * @isCellInSelectionRange
 * @desc is cell in selection range
 * @param {object} cellData - cell data
 * @param {object} cellSelectionRangeData
 * @param {array<object>} colgroups
 * @param {array<object>} allRowKeys
 * @return {Array<colKeys>}
 */
export function isCellInSelectionRange({
    cellData,
    cellSelectionRangeData,
    colgroups,
    allRowKeys,
}) {
    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;

    const colKeys = getColKeysByRangeColKeys({
        colKey1: leftColKey,
        colKey2: rightColKey,
        colgroups,
    });
    const rowKeys = getRowKeysByRangeRowKeys({
        topRowKey,
        bottomRowKey,
        allRowKeys,
    });

    if (
        colKeys.indexOf(cellData.colKey) > -1 &&
        rowKeys.indexOf(cellData.rowKey) > -1
    ) {
        return true;
    }
    return false;
}

/**
 * @isClearSelectionByBodyCellRightClick
 * @desc is clear selection by body cell click
 * @param {number} mouseEventClickType
 * @param {object} cellData - cell data
 * @param {object} cellSelectionRangeData
 * @param {array<object>} colgroups
 * @param {array<object>} allRowKeys
 * @return {bool}
 */
export function isClearSelectionByBodyCellRightClick({
    mouseEventClickType,
    cellData,
    cellSelectionData,
    cellSelectionRangeData,
    colgroups,
    allRowKeys,
}) {
    let result = true;
    if (mouseEventClickType === MOUSE_EVENT_CLICK_TYPE.RIGHT_MOUSE) {
        const { normalEndCell } = cellSelectionData;
        if (normalEndCell.rowIndex > -1) {
            result = !isCellInSelectionRange({
                cellData,
                cellSelectionRangeData,
                colgroups,
                allRowKeys,
            });
        }
    }
    return result;
}

/**
 * @getSelectionRangeKeys
 * @desc get selection range keys
 * @param {object} cellSelectionRangeData
 * @return Array<colKeys>
 */
export function getSelectionRangeKeys({ cellSelectionRangeData }) {
    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;
    return {
        startColKey: leftColKey,
        endColKey: rightColKey,
        startRowKey: topRowKey,
        endRowKey: bottomRowKey,
    };
}

/**
 * @getSelectionRangeIndexes
 * @desc get selection range indexes
 * @param {object} cellSelectionRangeData
 * @param {array<object>} colgroups
 * @param {array<object>} allRowKeys
 * @return Array<colKeys>
 */
export function getSelectionRangeIndexes({
    cellSelectionRangeData,
    colgroups,
    allRowKeys,
}) {
    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;
    return {
        startColIndex: colgroups.findIndex((x) => x.key === leftColKey),
        endColIndex: colgroups.findIndex((x) => x.key === rightColKey),
        startRowIndex: allRowKeys.indexOf(topRowKey),
        endRowIndex: allRowKeys.indexOf(bottomRowKey),
    };
}

/**
 * @getSelectionRangeData
 * @desc get selection range data
 * @param {object} cellSelectionRangeData
 * @param {string} resultType "normal": contains key/value ; "flat":only contains value
 * @param {array<object>} tableData
 * @param {array<object>} colgroups
 * @param {array<object>} allRowKeys
 * @return Array<colKeys>
 */
export function getSelectionRangeData({
    cellSelectionRangeData,
    resultType = "normal",
    tableData,
    colgroups,
    allRowKeys,
}) {
    let result = null;

    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;

    const startColIndex = colgroups.findIndex((x) => x.key === leftColKey);
    const endColIndex = colgroups.findIndex((x) => x.key === rightColKey);
    const startRowIndex = allRowKeys.indexOf(topRowKey);
    const endRowIndex = allRowKeys.indexOf(bottomRowKey);

    const fieldNames = colgroups
        .slice(startColIndex, endColIndex + 1)
        .map((x) => x.field);

    if (resultType === "normal") {
        result = tableData
            .slice(startRowIndex, endRowIndex + 1)
            .map((rowData) => {
                let newRow = {};

                fieldNames.forEach((fieldName) => {
                    newRow[fieldName] = rowData[fieldName] ?? "";
                });

                return newRow;
            });
    } else {
        result = tableData
            .slice(startRowIndex, endRowIndex + 1)
            .map((rowData) => {
                let newRow = [];

                fieldNames.forEach((fieldName) => {
                    newRow.push(rowData[fieldName] ?? "");
                });

                return newRow;
            });
    }

    return result;
}

/**
 * @isExistFixedColKey
 * @desc is exist given fixed col key
 * @param {string} fixedType - fixed type
 * @param {array<T>} colKeys
 * @param {array<object>} colgroups
 * @return bool
 */
export function isExistGivenFixedColKey({ fixedType, colKeys, colgroups }) {
    let result = false;
    if (Array.isArray(colKeys)) {
        result = colgroups.some((x) => {
            return colKeys.indexOf(x.key) > -1 && x.fixed === fixedType;
        });
    }
    return result;
}

/**
 * @isExistNotFixedColKey
 * @desc is exist not fixed col key
 * @param {array<T>} colKeys
 * @param {array<object>} colgroups
 * @return bool
 */
export function isExistNotFixedColKey({ colKeys, colgroups }) {
    let result = false;
    if (Array.isArray(colKeys)) {
        result = colgroups.filter(
            (x) => !x.fixed && colKeys.indexOf(x.key) > -1,
        ).length;
    }
    return result;
}

/**
 * @getLeftmostOrRightmostColKey
 * @desc get leftmost or rightmost column key
 * @param {string} type
 * @param {array<object>} colgroups
 * @param {array<any>} colKeys
 * @return colKey
 */
function getLeftmostOrRightmostColKey({ type, colgroups, colKeys }) {
    let result = null;

    if (Array.isArray(colKeys) && colKeys.length) {
        let mostObj = {
            colKey: null,
            colIndex: null,
        };
        colKeys.forEach((colKey) => {
            const colIndex = colgroups.findIndex((x) => x.key === colKey);

            if (colIndex === -1) {
                console.error(
                    `getLeftmostOrRightmostColKey error:: can't find colKey:${colKey}`,
                );
                return false;
            }

            if (isEmptyValue(mostObj.colKey)) {
                mostObj = {
                    colKey,
                    colIndex: colIndex,
                };
            } else {
                if (type === "leftmost") {
                    if (colIndex < mostObj.colIndex) {
                        mostObj = {
                            colKey,
                            colIndex: colIndex,
                        };
                    }
                } else if (type === "rightmost") {
                    if (colIndex > mostObj.colIndex) {
                        mostObj = {
                            colKey,
                            colIndex: colIndex,
                        };
                    }
                }
            }
        });

        result = mostObj.colKey;
    }

    return result;
}

/**
 * @getLeftmostColKey
 * @desc get leftmost column key
 * @param {array<object>} colgroups
 * @param {array<any>} colKeys
 * @return colKey
 */
export function getLeftmostColKey({ colgroups, colKeys }) {
    return getLeftmostOrRightmostColKey({
        type: "leftmost",
        colgroups,
        colKeys,
    });
}

/**
 * @getRightmostColKey
 * @desc get rightmost column key
 * @param {array<object>} colgroups
 * @param {array<any>} colKeys
 * @return colKey
 */
export function getRightmostColKey({ colgroups, colKeys }) {
    return getLeftmostOrRightmostColKey({
        type: "rightmost",
        colgroups,
        colKeys,
    });
}

/**
 * @getPreviewColKey
 * @desc get preview column key
 * @param {array<object>} colgroups
 * @param {any} currentColKey
 * @return colKey
 */
export function getPreviewColKey({ colgroups, currentColKey }) {
    let result = null;

    if (!isEmptyValue(currentColKey)) {
        const index = colgroups.findIndex((x) => x.key === currentColKey);
        if (index === 0) {
            result = currentColKey;
        } else if (index > 0) {
            result = colgroups[index - 1].key;
        }
    }
    return result;
}

/**
 * @getNextColKey
 * @desc get next column key
 * @param {array<object>} colgroups
 * @param {any} currentColKey
 * @return colKey
 */
export function getNextColKey({ colgroups, currentColKey }) {
    let result = null;

    if (!isEmptyValue(currentColKey)) {
        const index = colgroups.findIndex((x) => x.key === currentColKey);
        if (index === colgroups.length - 1) {
            result = currentColKey;
        } else if (index < colgroups.length - 1) {
            result = colgroups[index + 1].key;
        }
    }
    return result;
}

/***
 * @cellAutofill
 * @desc cell auto fill
 * @param {bool} isReplaceData
 * @param {array<object>} tableData
 * @param {array<any>} allRowKeys
 * @param {array<object>} colgroups
 * @param {string} direction
 * @param {string} rowKeyFieldName
 * @param {object} nextCurrentCell next current cell
 * @param {object} nextNormalEndCell next normal end cell
 * @return autofillChangeDatas
 */
export function cellAutofill({
    isReplaceData,
    tableData,
    allRowKeys,
    colgroups,
    direction,
    rowKeyFieldName,
    cellSelectionRangeData,
    nextCurrentCell,
    nextNormalEndCell,
}) {
    let cellSelectionTableData = [];

    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;

    // source selection range
    let sourceSelectionRangeIndexes = {
        startRowIndex: -1,
        endRowIndex: -1,
        startColIndex: -1,
        endColIndex: -1,
    };
    // target selection range
    let targetSelectionRangeIndexes = {
        startRowIndex: -1,
        endRowIndex: -1,
        startColIndex: -1,
        endColIndex: -1,
    };

    sourceSelectionRangeIndexes.startRowIndex = allRowKeys.indexOf(topRowKey);
    sourceSelectionRangeIndexes.endRowIndex = allRowKeys.indexOf(bottomRowKey);
    sourceSelectionRangeIndexes.startColIndex = colgroups.findIndex(
        (x) => x.key === leftColKey,
    );
    sourceSelectionRangeIndexes.endColIndex = colgroups.findIndex(
        (x) => x.key === rightColKey,
    );

    cellSelectionTableData = tableData.slice(
        sourceSelectionRangeIndexes.startRowIndex,
        sourceSelectionRangeIndexes.endRowIndex + 1,
    );

    if (direction === AUTOFILLING_DIRECTION.UP) {
        //
        targetSelectionRangeIndexes.startRowIndex = allRowKeys.indexOf(
            nextCurrentCell.rowKey,
        );
        targetSelectionRangeIndexes.endRowIndex =
            sourceSelectionRangeIndexes.startRowIndex - 1;
        targetSelectionRangeIndexes.startColIndex =
            sourceSelectionRangeIndexes.startColIndex;
        targetSelectionRangeIndexes.endColIndex =
            sourceSelectionRangeIndexes.endColIndex;

        if (isReplaceData) {
            let cellSelectionTableDataRowIndex =
                cellSelectionTableData.length - 1;
            for (
                let rowIndex = targetSelectionRangeIndexes.endRowIndex;
                rowIndex >= targetSelectionRangeIndexes.startRowIndex;
                rowIndex--
            ) {
                for (
                    let colIndex = targetSelectionRangeIndexes.startColIndex;
                    colIndex <= targetSelectionRangeIndexes.endColIndex;
                    colIndex++
                ) {
                    const fieldName = colgroups[colIndex].field;

                    // repeat autofill cell selection data
                    if (cellSelectionTableDataRowIndex < 0) {
                        cellSelectionTableDataRowIndex =
                            cellSelectionTableData.length - 1;
                    }
                    tableData[rowIndex][fieldName] =
                        cellSelectionTableData[cellSelectionTableDataRowIndex][
                            fieldName
                        ];
                }

                --cellSelectionTableDataRowIndex;
            }
        }
    } else if (direction === AUTOFILLING_DIRECTION.DOWN) {
        //
        targetSelectionRangeIndexes.startRowIndex =
            sourceSelectionRangeIndexes.endRowIndex + 1;
        targetSelectionRangeIndexes.endRowIndex = allRowKeys.indexOf(
            nextNormalEndCell.rowKey,
        );
        targetSelectionRangeIndexes.startColIndex =
            sourceSelectionRangeIndexes.startColIndex;
        targetSelectionRangeIndexes.endColIndex =
            sourceSelectionRangeIndexes.endColIndex;

        if (isReplaceData) {
            let cellSelectionTableDataRowIndex = 0;
            for (
                let rowIndex = targetSelectionRangeIndexes.startRowIndex;
                rowIndex <= targetSelectionRangeIndexes.endRowIndex;
                rowIndex++
            ) {
                for (
                    let colIndex = targetSelectionRangeIndexes.startColIndex;
                    colIndex <= targetSelectionRangeIndexes.endColIndex;
                    colIndex++
                ) {
                    const fieldName = colgroups[colIndex].field;

                    // repeat autofill cell selection data
                    if (
                        cellSelectionTableDataRowIndex >
                        cellSelectionTableData.length - 1
                    ) {
                        cellSelectionTableDataRowIndex = 0;
                    }
                    tableData[rowIndex][fieldName] =
                        cellSelectionTableData[cellSelectionTableDataRowIndex][
                            fieldName
                        ];
                }

                ++cellSelectionTableDataRowIndex;
            }
        }
    } else if (direction === AUTOFILLING_DIRECTION.LEFT) {
        //
        targetSelectionRangeIndexes.startRowIndex =
            sourceSelectionRangeIndexes.startRowIndex;
        targetSelectionRangeIndexes.endRowIndex =
            sourceSelectionRangeIndexes.endRowIndex;
        targetSelectionRangeIndexes.startColIndex = colgroups.findIndex(
            (x) => x.key === nextCurrentCell.colKey,
        );
        targetSelectionRangeIndexes.endColIndex =
            sourceSelectionRangeIndexes.startColIndex - 1;

        if (isReplaceData) {
            let cellSelectionTableDataRowIndex = 0;
            for (
                let rowIndex = targetSelectionRangeIndexes.startRowIndex;
                rowIndex <= targetSelectionRangeIndexes.endRowIndex;
                rowIndex++
            ) {
                let cellSelectionTableDataColIndex =
                    sourceSelectionRangeIndexes.endColIndex;

                for (
                    let colIndex = targetSelectionRangeIndexes.endColIndex;
                    colIndex >= targetSelectionRangeIndexes.startColIndex;
                    colIndex--
                ) {
                    const fieldName = colgroups[colIndex].field;

                    // repeat autofill cell selection data
                    if (
                        cellSelectionTableDataColIndex <
                        sourceSelectionRangeIndexes.startColIndex
                    ) {
                        cellSelectionTableDataColIndex =
                            sourceSelectionRangeIndexes.endColIndex;
                    }

                    tableData[rowIndex][fieldName] =
                        cellSelectionTableData[cellSelectionTableDataRowIndex][
                            colgroups[cellSelectionTableDataColIndex].field
                        ];
                    --cellSelectionTableDataColIndex;
                }
                ++cellSelectionTableDataRowIndex;
            }
        }
    } else if (direction === AUTOFILLING_DIRECTION.RIGHT) {
        //
        targetSelectionRangeIndexes.startRowIndex =
            sourceSelectionRangeIndexes.startRowIndex;
        targetSelectionRangeIndexes.endRowIndex =
            sourceSelectionRangeIndexes.endRowIndex;
        targetSelectionRangeIndexes.startColIndex =
            sourceSelectionRangeIndexes.endColIndex + 1;
        targetSelectionRangeIndexes.endColIndex = colgroups.findIndex(
            (x) => x.key === nextNormalEndCell.colKey,
        );

        if (isReplaceData) {
            let cellSelectionTableDataRowIndex = 0;
            for (
                let rowIndex = targetSelectionRangeIndexes.startRowIndex;
                rowIndex <= targetSelectionRangeIndexes.endRowIndex;
                rowIndex++
            ) {
                let cellSelectionTableDataColIndex =
                    sourceSelectionRangeIndexes.startColIndex;

                for (
                    let colIndex = targetSelectionRangeIndexes.startColIndex;
                    colIndex <= targetSelectionRangeIndexes.endColIndex;
                    colIndex++
                ) {
                    const fieldName = colgroups[colIndex].field;

                    // repeat autofill cell selection data
                    if (
                        cellSelectionTableDataColIndex >
                        sourceSelectionRangeIndexes.startColIndex +
                            (sourceSelectionRangeIndexes.endColIndex -
                                sourceSelectionRangeIndexes.startColIndex)
                    ) {
                        cellSelectionTableDataColIndex =
                            sourceSelectionRangeIndexes.startColIndex;
                    }

                    tableData[rowIndex][fieldName] =
                        cellSelectionTableData[cellSelectionTableDataRowIndex][
                            colgroups[cellSelectionTableDataColIndex].field
                        ];
                    ++cellSelectionTableDataColIndex;
                }
                ++cellSelectionTableDataRowIndex;
            }
        }
    }

    let response = {
        direction,
        sourceSelectionRangeIndexes,
        targetSelectionRangeIndexes,
        sourceSelectionData: [],
        targetSelectionData: [],
    };

    const sourceFieldNames = colgroups
        .slice(
            sourceSelectionRangeIndexes.startColIndex,
            sourceSelectionRangeIndexes.endColIndex + 1,
        )
        .map((x) => x.field);
    response.sourceSelectionData = tableData
        .slice(
            sourceSelectionRangeIndexes.startRowIndex,
            sourceSelectionRangeIndexes.endRowIndex + 1,
        )
        .map((rowData) => {
            let newData = {
                [rowKeyFieldName]: rowData[rowKeyFieldName],
            };
            sourceFieldNames.forEach((fieldName) => {
                newData[fieldName] = rowData[fieldName];
            });
            return newData;
        });

    const targetFieldNames = colgroups
        .slice(
            targetSelectionRangeIndexes.startColIndex,
            targetSelectionRangeIndexes.endColIndex + 1,
        )
        .map((x) => x.field);
    response.targetSelectionData = tableData
        .slice(
            targetSelectionRangeIndexes.startRowIndex,
            targetSelectionRangeIndexes.endRowIndex + 1,
        )
        .map((rowData) => {
            let newData = {
                [rowKeyFieldName]: rowData[rowKeyFieldName],
            };
            targetFieldNames.forEach((fieldName) => {
                newData[fieldName] = rowData[fieldName];
            });
            return newData;
        });

    return response;
}
