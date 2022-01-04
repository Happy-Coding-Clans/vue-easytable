/*
fork from:
https://github.com/ElemeFE/element
*/

const trim = function (string) {
    return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

// add class
export function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || "").split(" ");

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += " " + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

// remove class
export function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(" ");
    var curClass = " " + el.className + " ";

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(" " + clsName + " ", " ");
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// has class
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(" ") !== -1)
        throw new Error("className should not contain space.");
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
    }
}

/*获取当前元素的left、top偏移
 *   left：元素最左侧距离文档左侧的距离
 *   top:元素最顶端距离文档顶端的距离
 *   right:元素最右侧距离文档右侧的距离
 *   bottom：元素最底端距离文档底端的距离
 *   right2：元素最左侧距离文档右侧的距离
 *   bottom2：元素最底端距离文档最底部的距离
 * */
export function getViewportOffset(element) {
    var doc = document.documentElement,
        box =
            typeof element.getBoundingClientRect !== "undefined"
                ? element.getBoundingClientRect()
                : 0,
        scrollLeft =
            (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
        scrollTop =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        offsetLeft = box.left + window.pageXOffset,
        offsetTop = box.top + window.pageYOffset;

    var left = offsetLeft - scrollLeft,
        top = offsetTop - scrollTop;

    return {
        left: left,
        top: top,
        right: window.document.documentElement.clientWidth - box.width - left,
        bottom: window.document.documentElement.clientHeight - box.height - top,
        right2: window.document.documentElement.clientWidth - left,
        bottom2: window.document.documentElement.clientHeight - top,
    };
}

/**
 * Returns caret position in text input.
 *
 * @author https://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea
 * @param {HTMLElement} el An element to check.
 * @returns {number}
 */
export function getCaretPosition(el) {
    const rootDocument = document;

    if (el.selectionStart) {
        return el.selectionStart;
    } else if (rootDocument.selection) {
        // IE8
        el.focus();

        const r = rootDocument.selection.createRange();

        if (r === null) {
            return 0;
        }
        const re = el.createTextRange();
        const rc = re.duplicate();

        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint("EndToStart", re);

        return rc.text.length;
    }

    return 0;
}

/**
 * Sets caret position in text input.
 *
 * @author http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
 * @param {Element} element An element to process.
 * @param {number} pos The selection start position.
 * @param {number} endPos The selection end position.
 */
export function setCaretPosition(element, pos, endPos) {
    if (endPos === void 0) {
        endPos = pos;
    }
    if (element.setSelectionRange) {
        element.focus();

        try {
            element.setSelectionRange(pos, endPos);
        } catch (err) {
            const elementParent = element.parentNode;
            const parentDisplayValue = elementParent.style.display;

            elementParent.style.display = "block";
            element.setSelectionRange(pos, endPos);
            elementParent.style.display = parentDisplayValue;
        }
    }
}
