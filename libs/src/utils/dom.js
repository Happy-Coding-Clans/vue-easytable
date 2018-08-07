'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

function addClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.add(cls);
    } else {

        var clsArr = el.className.split(" ");

        if (clsArr.indexOf(cls) === -1) {
            el.className += " " + cls;
        }
    }
};

function removeClass(el, cls) {
    if (!el || !cls) return;

    if (el.classList) {
        el.classList.remove(cls);
    } else {

        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};