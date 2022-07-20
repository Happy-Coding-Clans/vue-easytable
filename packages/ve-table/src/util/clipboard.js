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
    const arr = [[""]];

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
 * @onPaste
 * @desc on paste
 * @param {Event} event
 * @return onPaste
 */
export function onPaste({
    event,
    isReplaceData,
    tableData,
    cellSelectionRangeData,
    colgroups,
    allRowKeys,
}) {
    event.preventDefault();

    let pastedData;

    if (event.clipboardData) {
        pastedData = event.clipboardData.getData("text/plain");
    }
    // IE browser
    else if (window.clipboardData) {
        pastedData = window.clipboardData.getData("Text");
    }

    if (typeof pastedData !== "string") {
        return false;
    }

    let decodePastedData = decodeSpreadsheetStr(pastedData);

    const startColIndex = colgroups.findIndex(
        (x) => x.key === cellSelectionRangeData.leftColKey,
    );
    const endColIndex = Math.min(
        startColIndex + decodePastedData[0].length - 1,
        colgroups.length - 1,
    );
    const startRowIndex = allRowKeys.indexOf(cellSelectionRangeData.topRowKey);
    const endRowIndex = Math.min(
        startRowIndex + decodePastedData.length - 1,
        allRowKeys.length - 1,
    );

    let response = {
        coords: {
            startColIndex,
            endColIndex,
            startRowIndex,
            endRowIndex,
        },
        data: [],
    };

    const sourceFieldNames = colgroups
        .slice(startColIndex, endColIndex + 1)
        .map((x) => x.field);

    response.data = decodePastedData
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

    if (Array.isArray(decodePastedData) && isReplaceData) {
        //
        response.data.forEach((rowData, rowIndex) => {
            Object.assign(tableData[startRowIndex + rowIndex], rowData);
        });
    }

    return response;
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
