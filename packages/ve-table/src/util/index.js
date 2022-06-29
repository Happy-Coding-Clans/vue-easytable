import { PREFIX_CLS, CONTEXTMENU_TYPES, COLUMN_FIXED_TYPE } from "./constant";
import { isEmptyValue, isEmptyArray } from "../../../src/utils/index";
import { getRandomId } from "../../../src/utils/random";

/*
 * @clsName
 * @desc  get class name
 * @param {string} cls - class
 */
export function clsName(cls) {
    return PREFIX_CLS + cls;
}

/*
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

/*
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

/*
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

/*
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

/*
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

/*
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

/*
 * @getFixedTotalWidthByColumnKey
 * @desc  get fixed total width by column key
 * @param {object} colgroups - columns info
 * @param {any} colKey - column key
 * @param {string} fixed - left|right
 */
export function getFixedTotalWidthByColumnKey({ colgroups, colKey, fixed }) {
    const currentIndex = colgroups.findIndex((x) => x.key === colKey);

    let result = 0;

    if (fixed === "left") {
        // 只计算左列固定的
        result = colgroups.reduce((total, currentVal, index) => {
            return index < currentIndex && currentVal.fixed == "left"
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    } else if (fixed === "right") {
        // 只计算右列固定的
        result = colgroups.reduce((total, currentVal, index) => {
            return index > currentIndex && currentVal.fixed == "right"
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    }

    return result;
}

/*
 * @getNotFixedTotalWidthByColumnKey
 * @desc  get not fixed total width by column key
 * @param {object} colgroups - 列信息
 * @param {any} colKey - column key
 * @param {string} direction - left|right
 */
export function getNotFixedTotalWidthByColumnKey({
    colgroups,
    colKey,
    direction,
}) {
    const currentIndex = colgroups.findIndex((x) => x.key === colKey);

    let result = 0;

    if (direction === "left") {
        // 只计算左侧非固定列
        result = colgroups.reduce((total, currentVal, index) => {
            return index < currentIndex && !currentVal.fixed
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    } else if (direction === "right") {
        // 只计算右侧非固定列
        result = colgroups.reduce((total, currentVal, index) => {
            return index > currentIndex && !currentVal.fixed
                ? currentVal._realTimeWidth + total
                : total;
        }, 0);
    }

    return result;
}

/*
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

/*
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

// get contextmenu body option collection
export function getContextmenuBodyOptionCollection(t) {
    return [
        {
            type: CONTEXTMENU_TYPES.SEPARATOR,
        },
        {
            label: t("insertRowAbove"),
            type: CONTEXTMENU_TYPES.INSERT_ROW_ABOVE,
        },
        {
            label: t("insertRowBelow"),
            type: CONTEXTMENU_TYPES.INSERT_ROW_BELOW,
        },
        {
            label: t("removeRow"),
            type: CONTEXTMENU_TYPES.REMOVE_ROW,
        },
        {
            label: t("hideColumn"),
            type: CONTEXTMENU_TYPES.HIDE_COLUMN,
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

/*
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

/*
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

/*
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

/*
 * @isCellInSelectionRange
 * @desc is cell in selection range
 * @param {object} cellData - cell data
 * @param {object} cellSelectionRangeData
 * @param {array<object>} colgroups
 * @param {array<object>} allRowKeys
 * @return Array<colKeys>
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

/*
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

/*
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

/*
 * @getLeftmostColKey
 * @desc get leftmost column key
 * @param {array<object>} colgroups
 * @param {array<any>} colKeys
 * @return colKey
 */
export function getLeftmostColKey({ colgroups, colKeys }) {
    let result = null;

    if (Array.isArray(colKeys) && colKeys.length) {
        let leftmostObj = {
            colKey: null,
            colIndex: null,
        };
        colKeys.forEach((colKey) => {
            const colIndex = colgroups.findIndex((x) => x.key === colKey);

            if (colIndex === -1) {
                console.error(
                    `getLeftmostColKey error:: can't find colKey:${colKey}`,
                );
                return false;
            }

            if (isEmptyValue(leftmostObj.colKey)) {
                leftmostObj = {
                    colKey,
                    colIndex: colIndex,
                };
            } else {
                if (colIndex < leftmostObj.colIndex) {
                    leftmostObj = {
                        colKey,
                        colIndex: colIndex,
                    };
                }
            }
        });

        result = leftmostObj.colKey;
    }

    return result;
}

/*
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

/*
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
