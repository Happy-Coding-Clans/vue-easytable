// is input key code
export function isInputKeyCode(event) {
    let result = false;

    const { keyCode, altKey, ctrlKey, shiftKey } = event;

    // exclude keys
    if (altKey || ctrlKey || shiftKey) {
        return result;
    }

    // Digit0 to Digit9
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
        result = true;
    }
    // A to Z
    else if (keyCode >= 65 && keyCode <= 90) {
        result = true;
    } else if (
        [186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222].indexOf(
            keyCode,
        ) > -1
    ) {
        /*
    Semicolon:186
    Equal("="):187
    Comma (","):188
    Minus("-"):189
    Period("."):190
    Slash("/"):191
    Backquote("`"):192
    Open square bracket ("["):219
    Backslash("\"):220
    Close square bracket ("]"):221
    Quote("'"):222
    */
        result = true;
    }
    // Support non-English languages. Chinese, Japanese, French, etc.
    else if (keyCode == 229) {
        result = true;
    }

    return result;
}

// is direction key code
export function isDirectionKeyCode(keyCode) {
    return [37, 38, 39, 40].indexOf(keyCode) > -1;
}

// is single key
// export function isSingleKey() {}
