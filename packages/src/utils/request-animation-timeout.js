/*
fork from:
https://github.com/bvaughn/react-virtualized/blob/HEAD/source/utils/requestAnimationTimeout.js
*/

import { caf, raf } from "./animation-frame";

export const cancelAnimationTimeout = (frame) => caf(frame.id);

/**
 * Recursively calls requestAnimationFrame until a specified delay has been met or exceeded.
 * When the delay time has been reached the function you're timing out will be called.
 *
 * Credit: Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)
 */
export const requestAnimationTimeout = (callback, delay) => {
    let start;
    // wait for end of processing current event handler, because event handler may be long
    Promise.resolve().then(() => {
        start = Date.now();
    });

    const timeout = () => {
        if (Date.now() - start >= delay) {
            callback.call();
        } else {
            frame.id = raf(timeout);
        }
    };

    const frame = {
        id: raf(timeout),
    };

    return frame;
};
