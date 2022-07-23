const regUniversalNewLine = /^(\r\n|\n\r|\r|\n)/;
const regNextCellNoQuotes = /^[^\t\r\n]+/;
const regNextEmptyCell = /^\t/;

/**
 * @decodeSpreadsheetStr
 * @desc Decode spreadsheet string into array.  refer from http://github.com/warpech/sheetclip/
 * @param {string} str The string to parse.
 * @returns {array}
 */
export function decodeSpreadsheetStr(str) {
    let arr = [[""]];

    if (str.length === 0) {
        return arr;
    }

    let column = 0;
    let row = 0;
    let lastLength;

    while (str.length > 0) {
        if (lastLength === str.length) {
            // In the case If in last cycle we didn't match anything, we have to leave the infinite loop
            break;
        }

        lastLength = str.length;

        if (str.match(regNextEmptyCell)) {
            str = str.replace(regNextEmptyCell, "");

            column += 1;
            arr[row][column] = "";
        } else if (str.match(regUniversalNewLine)) {
            str = str.replace(regUniversalNewLine, "");
            column = 0;
            row += 1;

            arr[row] = [""];
        } else {
            let nextCell = "";

            if (str.startsWith('"')) {
                let quoteNo = 0;
                let isStillCell = true;

                while (isStillCell) {
                    const nextChar = str.slice(0, 1);

                    if (nextChar === '"') {
                        quoteNo += 1;
                    }

                    nextCell += nextChar;

                    str = str.slice(1);

                    if (
                        str.length === 0 ||
                        (str.match(/^[\t\r\n]/) && quoteNo % 2 === 0)
                    ) {
                        isStillCell = false;
                    }
                }

                nextCell = nextCell
                    .replace(/^"/, "")
                    .replace(/"$/, "")
                    .replace(/["]*/g, (match) =>
                        new Array(Math.floor(match.length / 2))
                            .fill('"')
                            .join(""),
                    );
            } else {
                const matchedText = str.match(regNextCellNoQuotes);

                nextCell = matchedText ? matchedText[0] : "";
                str = str.slice(nextCell.length);
            }

            arr[row][column] = nextCell;
        }
    }
    // 去除 excel 最后一个多余的换行数据
    if (Array.isArray(arr) && arr.length > 1) {
        if (arr[arr.length - 1].length === 1 && arr[arr.length - 1][0] === "") {
            arr = arr.slice(0, arr.length - 1);
        }
    }

    return arr;
}

/**
 * @decodeSpreadsheetStr
 * @desc encode array to spreadsheet string.  refer from http://github.com/warpech/sheetclip/
 * @param {array} str The string to parse.
 * @returns {string}
 */
export function encodeToSpreadsheetStr(arr) {
    let r;
    let rLen;
    let c;
    let cLen;
    let str = "";
    let val;

    for (r = 0, rLen = arr.length; r < rLen; r += 1) {
        cLen = arr[r].length;

        for (c = 0; c < cLen; c += 1) {
            if (c > 0) {
                str += "\t";
            }
            val = arr[r][c];

            if (typeof val === "string") {
                if (val.indexOf("\n") > -1) {
                    str += `"${val.replace(/"/g, '""')}"`;
                } else {
                    str += val;
                }
            } else if (val === null || val === void 0) {
                // void 0 resolves to undefined
                str += "";
            } else {
                str += val;
            }
        }

        if (r !== rLen - 1) {
            str += "\n";
        }
    }

    return str;
}

/**
 * @onBeforeCopy
 * @desc on before copy
 * @param {Event} event
 * @return {selectionRangeIndexes,selectionRangeKeys,data}
 */
export function onBeforeCopy({
    cellSelectionRangeData,
    selectionRangeData,
    colgroups,
    allRowKeys,
}) {
    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;

    const selectionRangeIndexes = {
        startColIndex: colgroups.findIndex((x) => x.key === leftColKey),
        endColIndex: colgroups.findIndex((x) => x.key === rightColKey),
        startRowIndex: allRowKeys.indexOf(topRowKey),
        endRowIndex: allRowKeys.indexOf(bottomRowKey),
    };

    const selectionRangeKeys = {
        startColKey: leftColKey,
        endColKey: rightColKey,
        startRowKey: topRowKey,
        endRowKey: bottomRowKey,
    };

    const response = {
        selectionRangeIndexes,
        selectionRangeKeys,
        data: selectionRangeData,
    };

    return response;
}

/**
 * @onAfterCopy
 * @desc on after copy
 * @param {Event} event
 * @return
 */
export function onAfterCopy({ event, selectionRangeData }) {
    const spreadsheetStr = encodeToSpreadsheetStr(selectionRangeData);

    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", spreadsheetStr);
    }
    // IE browser
    else if (window.clipboardData) {
        window.clipboardData.setData("Text", spreadsheetStr);
    }
}

/**
 * @onBeforePaste
 * @desc on before paste
 * @param {Event} event
 * @return
 */
export function onBeforePaste({
    event,
    cellSelectionRangeData,
    colgroups,
    allRowKeys,
}) {
    let pastedData;

    if (event.clipboardData) {
        pastedData = event.clipboardData.getData("text/plain");
    }
    // IE browser
    else if (window.clipboardData) {
        pastedData = window.clipboardData.getData("Text");
    }

    if (typeof pastedData !== "string") {
        return null;
    }

    let decodePasteData = decodeSpreadsheetStr(pastedData);

    const startColIndex = colgroups.findIndex(
        (x) => x.key === cellSelectionRangeData.leftColKey,
    );
    const endColIndex = Math.min(
        startColIndex + decodePasteData[0].length - 1,
        colgroups.length - 1,
    );
    const startRowIndex = allRowKeys.indexOf(cellSelectionRangeData.topRowKey);
    const endRowIndex = Math.min(
        startRowIndex + decodePasteData.length - 1,
        allRowKeys.length - 1,
    );

    let response = {
        selectionRangeIndexes: {
            startColIndex,
            endColIndex,
            startRowIndex,
            endRowIndex,
        },
        selectionRangeKeys: {
            startColKey: colgroups[startColIndex].key,
            endColKey: colgroups[endColIndex].key,
            startRowKey: allRowKeys[startRowIndex],
            endRowKey: allRowKeys[endRowIndex],
        },
        data: [],
    };

    const sourceFieldNames = colgroups
        .slice(startColIndex, endColIndex + 1)
        .map((x) => x.field);

    response.data = decodePasteData
        .slice(0, endRowIndex - startRowIndex + 1)
        .map((rowData) => {
            let newRow = {};

            rowData.forEach((cellData, cellIndex) => {
                if (cellIndex <= endColIndex - startColIndex) {
                    newRow[sourceFieldNames[cellIndex]] = cellData;
                }
            });
            return newRow;
        });

    return response;
}

/**
 * @onAfterPaste
 * @desc on after paste
 * @param {Event} event
 * @return
 */
export function onAfterPaste({ tableData, beforePasteResponse }) {
    const { data: pasteData, selectionRangeIndexes } = beforePasteResponse;

    pasteData.forEach((rowData, rowIndex) => {
        Object.assign(
            tableData[selectionRangeIndexes.startRowIndex + rowIndex],
            rowData,
        );
    });
}

/**
 * @onBeforeCut
 * @desc on before cut
 * @param {Event} event
 * @return {selectionRangeIndexes,selectionRangeKeys,data}
 */
export function onBeforeCut({
    cellSelectionRangeData,
    selectionRangeData,
    colgroups,
    allRowKeys,
}) {
    const { leftColKey, rightColKey, topRowKey, bottomRowKey } =
        cellSelectionRangeData;

    const selectionRangeIndexes = {
        startColIndex: colgroups.findIndex((x) => x.key === leftColKey),
        endColIndex: colgroups.findIndex((x) => x.key === rightColKey),
        startRowIndex: allRowKeys.indexOf(topRowKey),
        endRowIndex: allRowKeys.indexOf(bottomRowKey),
    };

    const selectionRangeKeys = {
        startColKey: leftColKey,
        endColKey: rightColKey,
        startRowKey: topRowKey,
        endRowKey: bottomRowKey,
    };

    const response = {
        selectionRangeIndexes,
        selectionRangeKeys,
        data: selectionRangeData,
    };

    return response;
}

/**
 * @onAfterCut
 * @desc on after cut
 * @param {Event} event
 * @return
 */
export function onAfterCut({
    event,
    tableData,
    colgroups,
    selectionRangeData,
    selectionRangeIndexes,
}) {
    const spreadsheetStr = encodeToSpreadsheetStr(selectionRangeData);

    const { endColIndex, endRowIndex, startColIndex, startRowIndex } =
        selectionRangeIndexes;

    // 移除制定的表格数据
    const fieldNames = colgroups
        .slice(startColIndex, endColIndex + 1)
        .map((x) => x.field);

    tableData.forEach((rowData, rowIndex) => {
        if (rowIndex >= startRowIndex && rowIndex <= endRowIndex) {
            fieldNames.forEach((fieldName) => {
                rowData[fieldName] = "";
            });
        }
    });

    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", spreadsheetStr);
    }
    // IE browser
    else if (window.clipboardData) {
        window.clipboardData.setData("Text", spreadsheetStr);
    }
}
