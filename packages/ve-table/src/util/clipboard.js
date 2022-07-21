const regUniversalNewLine = /^(\r\n|\n\r|\r|\n)/;
const regNextCellNoQuotes = /^[^\t\r\n]+/;
const regNextEmptyCell = /^\t/;

/**
 * @decodeSpreadsheetStr
 * @desc Decode spreadsheet string into array.  refer from http://github.com/warpech/sheetclip/
 * @param {string} str The string to parse.
 * @returns {Array}
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
 * @onCopy
 * @desc on copy
 * @param {Event} event
 * @return onCopy
 */
export function onCopy({ event }) {
    // feature
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
 * @onCut
 * @desc on cut
 * @param {Event} event
 * @return onCut
 */
export function onCut({ event }) {
    // feature
}
