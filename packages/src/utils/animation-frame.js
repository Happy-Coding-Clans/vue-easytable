/*
fork from:
https://github.com/bvaughn/react-virtualized/blob/HEAD/source/utils/animationFrame.js
*/

// Properly handle server-side rendering.
let win;
if (typeof window !== "undefined") {
    win = window;
} else if (typeof self !== "undefined") {
    win = self;
} else {
    win = {};
}

// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
const request =
    win.requestAnimationFrame ||
    win.webkitRequestAnimationFrame ||
    win.mozRequestAnimationFrame ||
    win.oRequestAnimationFrame ||
    win.msRequestAnimationFrame ||
    function (callback) {
        return win.setTimeout(callback, 1000 / 60);
    };

const cancel =
    win.cancelAnimationFrame ||
    win.webkitCancelAnimationFrame ||
    win.mozCancelAnimationFrame ||
    win.oCancelAnimationFrame ||
    win.msCancelAnimationFrame ||
    function (id) {
        win.clearTimeout(id);
    };

export const raf = request;
export const caf = cancel;
