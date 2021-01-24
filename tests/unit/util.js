import Vue from "vue";

export function later(delay = 0) {
    return new Promise(resolve => {
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
