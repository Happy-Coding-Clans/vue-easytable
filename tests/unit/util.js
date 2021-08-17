import Vue from "vue";

export function later(delay = 0) {
    return new Promise((resolve) => {
        if (typeof delay === "number") {
            setTimeout(() => {
                resolve();
            }, delay);
        } else {
            Vue.nextTick(() => {
                resolve();
            });
        }
    });
}

/*
 * @mockScrollTo
 * @desc mock scrollTo function
 */
export function mockScrollTo() {
    const fn = jest.fn();
    Element.prototype.scrollTo = fn;
    return fn;
}
